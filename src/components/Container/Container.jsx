import React from "react";

export default function Container({children}) {
    return <div className="w-full max-w-7xl mx-auto px-4">{children}</div>;
        
}

/* if we give children in betwwen button than children corresponds to the name of button but when we give children in between <div> tag then <div> tag doesn't have name in that case children corresponds to elements or content given in div. */

// that means this div is used to wrap the elements inside it.