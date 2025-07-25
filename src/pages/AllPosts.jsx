import React, {useState, useEffect} from "react";
import service from "../appwrite/config";
import {Container, PostCard} from "../components"

export default function AllPosts(){
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        service.getPosts([]).then((posts) => {
            if(posts){
                setPosts(posts.documents)
                // [
                //     { "$id": "1", "title": "Post 1", ... },
                //     { "$id": "2", "title": "Post 2", ... }
                // ]
            }
        })
    },[])

    

    return(
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap ">
                    {posts.map((post)=>(
                        <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                            <PostCard {...post }/>
                        </div> 
                    ))}
                </div>   
            </Container>
        </div>
    )
    // getposts() is a promise so we have applied .then() so if it successfully fetches all the posts then we will get the response in the .then() as a callback, we have called it at posts, then we are setting these posts  into out posts variable using setPosts()  
    return(
        <div className="py-8">
            
        </div>
    )
}

// when we will do this- 
// service.getPosts([]).then((posts) => {
//     if(posts){
//         setPosts(posts.documents)
//     }
// })

// the reposonse would be something like this -> 

// [
//     { "$id": "1", "title": "Post 1", ... },
//     { "$id": "2", "title": "Post 2", ... }
// ]