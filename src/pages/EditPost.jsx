import React, {useEffect, useState} from "react";
import {Container, PostForm} from "../components"
import service from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";


export default function EditPost(){
    const [post, setPost] = useState(null)
    // used name post not because it is plu ral but because it always has new post
    const {slug} = useParams()
    // here slug may refer to the id of the post.
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
            service.getPost(slug).then((post)=>{
                if(post){
                    setPost(post)
                }
            })
        }else{ 
            navigate("/") 
        }
    },[slug, navigate])

    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ) : null

}

// using useParams() we can access the URL parameters in our component.
// if our route is sometihng like -> /post/:id
// then we can access the id using -> const {id} = useParams()
// it will automatically fetch the parameter :id from the url 