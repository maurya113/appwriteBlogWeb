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
            

        </div>
    )
}