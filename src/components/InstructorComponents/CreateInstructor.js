import { Button, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import FileUpload from "./utils/FileUpload";
import './utils/main.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "react-datepicker/dist/react-datepicker.css";

const CreateInstructor = () => {

  const [InstructorName, setInstructorName] = useState('');
  const [InstructorPortFolio, setInstructorPortfolio] = useState('') 
  const [Description, setDescription] = useState('');
  const [InstructorLinkedIn, setInstructorLinkedIn] = useState('') 
  const [InstructorIG, setInstructorIG] = useState('') 
  
  const handleDescription = (content, delta, source, editor) => setDescription(content);
  const handleInstructorName = (e) => setInstructorName(e.target.value);
  const handleInstructorPortfolio = (e) => setInstructorPortfolio(e.target.value);
  const handleInstructorLinkedin = (e) => setInstructorLinkedIn(e.target.value);
  const handleInstructorIG = (e) => setInstructorIG(e.target.value);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(
        InstructorName,
        InstructorIG,
        InstructorLinkedIn,
        InstructorPortFolio,
        Description
      )
      console.log("The Course has been developed successfully");
      navigate('/admin/webinars');
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
          <FileUpload Title="Upload Instructor Profile Image" />

          <Button type="submit" variant="contained" className="bg-dark-1 text-dark-2 flex justify-center w-1/2">
            Create
          </Button>
        </form>
    </main>
  )
}

export default CreateInstructor