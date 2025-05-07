import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`} className="block w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
            <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden">
                <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden flex items-center justify-center bg-gray-200">
                    <img
                        src={service.getFilePreview(featuredImage)}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-4">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-800 truncate">
                        {title}
                    </h2>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
