import React from "react"; 
import {PostCard, PostForm, Container} from "../components"

export default function AddPost(){
    return(
        <div className="py-8">
            <Container>
                <PostForm/>
            </Container>
        </div>
    )
}

// here container is used to wrap the postform inside a div to make it look nice using some tailwind classes, container is used to provide the similar or even layout across the pages, we can simply wrap other components inside it.