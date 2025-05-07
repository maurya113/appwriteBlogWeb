import React from "react";

export default function Logo({width = '100px', imgSrc="", alt="logo"}) {
    return(
        <div>
        {imgSrc &&
        
            <img className={`${width} rounded-lg`} 
            src={imgSrc} 
            style={{width, height: 'auto'}}
            alt={alt} />
        
        }
            <span className="text-xl font-semibold px-2 py-1 text-gray-800 bg-blue-100 hover:bg-blue-200 transition duration-300 ease-in-out rounded-lg"></span>

        </div>
    )
}