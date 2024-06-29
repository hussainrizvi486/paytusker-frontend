import { useState } from "react";
import { Info } from "lucide-react";

export const SingleFileInput = ({ name = "", handleChange = () => { } }) => {
    const [currentFile, setCurrentFile] = useState(null);

    const handlePreview = (e) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (file) {
                setCurrentFile(file);
                handleChange(file);
            }
        }
    }

    return (
        <div>
            {/* <div className="single-file-upload-wrapper"> */}
            <div className="input-file__wrapper">
                <input type="file" onChange={(e) => handlePreview(e)} name={name} />
                {currentFile ?
                    <img src={URL.createObjectURL(currentFile)} />
                    : <img src="https://cdn-icons-png.flaticon.com/512/401/401061.png" alt="" />
                }
            </div>
            <div className="mt-2">
                {currentFile ? <div className="text-sm nowrap flex gap"><Info size={16} strokeWidth={2.75} /> Click the image to change it</div> : ""}
            </div>
        </div>
    )
}
