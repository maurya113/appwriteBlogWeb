import React from "react";
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from "react-hook-form"


export default function RTE({ name, control, defaultValue = "", label }) {
    return (
        <div className="w-full">
            {label && <label className="inline-block mb-1 pl-1">
                {label}
            </label>
            }

            <Controller
                name={name}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey="n12l9f4i10wui7yfx090p12lhqd00owjz4o5syg39v29315p"
                        initialValue={defaultValue}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'

                        }}
                        onEditorChange={onChange}
                        
                    /> 
                )}
            />
        </div>
    )
}


// when we use register in react-hook-form it registers that component and starts managing its state but ...register can only be used with simple components like input for special components to manage the state acroos that form {Controller} is used.

// control which we are taking as a prop is later on passed to Controller.