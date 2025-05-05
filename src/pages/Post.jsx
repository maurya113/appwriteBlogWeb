import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser"



export default function Post() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const isAuthor = post && userData ? userData.$id === post.userId : false
    // If both post and userData is present, it compares the logged-in user's ID with the user ID of the post.

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                } else {
                    navigate("/")
                }
            })
        } else {
            navigate("/")
        }
    }, [slug, navigate])

    const deletePost = () => {
        service.deletePost(post.$id).then((response) => {
            if (response) {
                service.deleteFile(post.featuredImage);
                navigate("/")
            }
        })
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <div className="w-full h-auto flex justify-center item-center">
                        <img
                            src={service.getFilePreview(post.featuredImage)}

                            alt={post.title}
                            className="rounded-xl w-70 h-70"
                        />
                    </div>
                    {/* {console.log(service.getFilePreview(post.featuredImage))} */}

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500"
                                    className="mr-3"
                                >
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}

                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div>
                    {parse(post.content)}
                </div>

            </Container>
        </div>
    ) : null;

}

// before parsing it's a string of html->
// "<p>Hello <strong>World</strong></p>"

// after parsing
// <p>Hello <strong>World</strong></p>


