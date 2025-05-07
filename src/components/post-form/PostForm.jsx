import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, Logo } from "../index"
import RTE from "../RTE";
import service from "../../appwrite/config";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function PostForm({ post }) {
    const { register, handleSubmit, watch, control, setValue, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            slug: post?.slug || "",
            status: post?.status || "active "
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null

            if (file) {
                await service.deleteFile(post.featuredImage)
            }

            const dbPost = await service.updatePost
                (post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined
                })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        }
        else {
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null

            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId
                // this featuredImage property will be added in the data object.
                const dbPost = await service.createPost({
                    ...data,
                    userId: userData.$id
                })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')  
                .replace(/\s+/g, '-') 
                .replace(/-+/g, '-');
        }else{
            return ''
        }
         // if no value is passed then return empty string
    }, [])

   React.useEffect(()=>{
        watch((value, {name})=>{
            if(name === 'title'){
                setValue('slug', slugTransform(value.title),{shouldValidate: true})
            }
        })
   }, [watch, slugTransform, setValue]) 

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
           <div className="w-2/3 px-2">
            <Input
            label="Title: "
            placeholder="Title"
            className="mb-4"
            {...register("title", {required: "title is required"})}
            />

            <Input
            label="Slug: "
            placeholder="Slug"
            className="mb-4"
            {...register("slug", {required: "this is an auto-generated field"})}
            onInput={(e) => {
                setValue('slug', slugTransform(e.currentTarget.value), {shouldValidate: true})
            }}
            // this also allow user input and user input is also transformed as slug
            />
            <RTE label="Content: " name="content" control={control} defaultValue={getValues("content")} />
           </div>

           <div className="w-1/3 px-2">
           <Input
           label="Featured Image: "
           type="file"
           className="mb-4"
           accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
           {...register("image", {required: !post})}
           />

           {post && (
            <div className="w-full mb-4">
                <img
                src={service.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg max-w-full h-auto"
                />
            </div>
        
           )}
           <Select
           options={["active", "inactive"]}
           label="Status: "
           className="mb-4"
           {...register("status", {required: true})}
           />  
           
           <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">{post ? "Update" : "Submit"}</Button>
           </div> 
        </form>
    )
}

export default PostForm;


// target -> the element that triggered the event.
// currentTarget -> the element the event handler is attached to
// in case of input field target and currentTarget are same.