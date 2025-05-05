import React, {useEffect, useState} from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";
import {Link} from "react-router-dom"

export default function Home(){
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        service.getPosts().then((post)=>{
            if(post){
                setPosts(post.documents)
            }
        })
        .catch((error)=>console.log("no posts"))
    },[])

    if(posts.length === 0){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No posts available
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        ) 
    }
    return(
        <div className="w-full py-8">
            <Container>
                 <div className="flex flex-wrap">
                    {posts.map((post)=>(
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post }/>
                        </div>
                    ))}
                 </div>
            </Container>
        </div>
    )
}