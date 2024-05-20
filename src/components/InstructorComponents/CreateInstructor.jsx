import { Button, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import './utils/main.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "react-datepicker/dist/react-datepicker.css";
import { useDropzone } from "react-dropzone";
import './utils/main.css'
import instructorDB from "../../api/db/InstructorsDb";
import InstructorService from "../../api/bucket/InstructorBucket";

const CreateInstructor = () => {

  const [InstructorName, setInstructorName] = useState('');
  const [InstructorPortFolio, setInstructorPortfolio] = useState('') 
  const [Description, setDescription] = useState('');
  const [InstructorLinkedIn, setInstructorLinkedIn] = useState('') 
  const [InstructorIG, setInstructorIG] = useState('') 
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
  
  const handleDescription = (content, delta, source, editor) => setDescription(content);
  const handleInstructorName = (e) => setInstructorName(e.target.value);
  const handleInstructorPortfolio = (e) => setInstructorPortfolio(e.target.value);
  const handleInstructorLinkedin = (e) => setInstructorLinkedIn(e.target.value);
  const handleInstructorIG = (e) => setInstructorIG(e.target.value);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(
        InstructorName,
        InstructorIG,
        InstructorLinkedIn,
        InstructorPortFolio,
        Description,
        files[0].path
      )
        
      const response = await InstructorService.CreateInstructorImage(files[0]);

      console.log(response);
      
        const promise = await instructorDB.createInstructor({
          Instructor_Name: InstructorName,
          Instructor_Description: Description,
          Instructor_Portfolio: InstructorPortFolio,
          Instructor_Linked_in: InstructorLinkedIn,
          Instructor_IG: InstructorIG,
          Instructor_Photo: response ? response : "",
      })

      console.log(promise);
      
      console.log("The Instructor has been developed successfully");
      navigate('/admin/instructor')
    } catch (error) {
      console.log(error.message);
      navigate('/');
    }
  }

  return (
    <main className="flex justify-center items-center min-h-screen bg-dark-2 py-[4rem]">

        <form onSubmit={handleSubmit} className="py-[2rem] max-w-[20rem] sm:max-w-[30rem] gap-y-[1rem] flex flex-col">
          <Typography variant="h6" className="text-dark-1 pb-[1rem] font-semibold">
            Enroll <span className="text-dark-5">
              Instructors
            </span>
          </Typography>
          
          <TextField id="outlined-basic" label="Instructor Name" variant="outlined" type='text' required={true} className="text-field pb-[1rem]" value={InstructorName} onChange={handleInstructorName} />

          <TextField id="outlined-basic" label="Portfolio URL" variant="outlined" type='text' required={true} className="text-field pb-[1rem]" value={InstructorPortFolio} onChange={handleInstructorPortfolio} />

          <TextField id="outlined-basic" label="Instructor IG URL" variant="outlined" type='text' required={true} className="text-field pb-[1rem]" value={InstructorIG} onChange={handleInstructorIG} />

          <TextField id="outlined-basic" label="Instructor LinkedIN URL" variant="outlined" type='text' required={true} className="text-field pb-[1rem]" value={InstructorLinkedIn} onChange={handleInstructorLinkedin} />

          <main className='pb-[1rem]'>
            <Typography className='font-semibold text-dark-1' variant="p">
                Instructor Description
            </Typography>
            <ReactQuill theme="snow" value={Description} onChange={handleDescription}  className='border border-dark-1 outline-none'/>
        </main>
        <main>
        <Typography className='text-dark-1 font-semibold' variant='p'>
            Upload Instructor Profile Picture
        </Typography>
            <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''} mt-[1rem]`}>
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

          <Button type="submit" variant="contained" className="bg-dark-1 text-dark-2 flex justify-center w-1/2">
            Create
          </Button>
        </form>
    </main>
  )
}

export default CreateInstructor