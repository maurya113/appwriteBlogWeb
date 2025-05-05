import React, { useId } from "react";

function Select({
    options = [],
    label,
    className = '',
    ...props
}, ref){
    const id = useId()
    return(
        <div className="w-full">
            {label && <label className="mb-2" htmlFor={id}>
            {label}    
            </label>
            }
            <select
            {...props}
            id={id}
            ref={ref}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none border border-gray-200 w-full focus:bg-gray-50 duration-200 ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)



/*
<select>
    <option value=""></option>
    <option value=""></option>
    <option value=""></option>
</select> 
*/