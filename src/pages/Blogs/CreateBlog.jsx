import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDropzone } from "react-dropzone";
import './main.css';
import blogs_db from "../../api/db/Blog";
import blog_bucket from "../../api/bucket/blogsBucket";

const CreateBlog = () => {
  const [files, setFiles] = useState([]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const [title, settitle] = useState('');
  const [Description, setDescription] = useState('');

  const handletitle = (e) => settitle(e.target.value);
  const handleDescription = (content, delta, source, editor) => setDescription(content);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(
        title,
        Description
      )

      const image_upload = await blog_bucket.UploadImage(files[0]);
      console.log(image_upload);

      const fileId = image_upload ? image_upload.$id : '';

      const file = await blog_bucket.GetImage(fileId);

      const res = await blogs_db.createBlog(
        {Title: title, Description: Description, Image: file}
      );
      console.log(res);

      if (res.$id) {
        console.log("The Course has been developed successfully");
        navigate('/admin/blogs/fetch-all-blogs');
      }
      else {
        return false;
      }
    } catch (error) {
      console.log(error.message);
      navigate('/');
    }
  }

  return (
    <main className="flex justify-center items-center min-h-screen bg-dark-2 py-[4rem]">

        <form onSubmit={handleSubmit} className="py-[2rem] max-w-[20rem] sm:max-w-[30rem] gap-y-[1rem] flex flex-col">
          <Typography variant="h6" className="text-dark-1 pb-[1rem] font-semibold">
            Create <span className="text-dark-5">
              Blog
            </span>
          </Typography>
          
          <TextField id="outlined-basic" label="Title" variant="outlined" type='text' required={true} className="text-field pb-[1rem]" value={title} onChange={handletitle} />

          <main className='pb-[1rem]'>
            <Typography className='font-semibold text-dark-1' variant="p">
                Description
            </Typography>
            <ReactQuill theme="snow" value={Description} onChange={handleDescription}  className='border border-dark-1 outline-none'/>
        </main>
          
        <main>
        <Typography className='text-dark-1 font-semibold' variant='p'>
            Blog Thumbnail
        </Typography>
            <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
                <input {...getInputProps()} />
                <p>{isDragActive ? 'Drop files here...' : 'Drag & drop files here, or click to select files'}</p>

                {files.length > 0 && (
                    <div className="preview-container">
                    {files.map((file, index) => (
                    <div key={index} className="preview-item">
                    <img src={file.preview} alt={file.name} />
                    <button onClick={() => handleRemoveFile(index)}>Remove</button>
                </div>
            ))}
            </div>
        )}
        </div>
    </main>

          <Button type="submit" variant="contained" className="bg-dark-1 text-dark-2 flex justify-center w-1/2" >
            Create
          </Button>
        </form>
    </main>
  )
}

export default CreateBlog