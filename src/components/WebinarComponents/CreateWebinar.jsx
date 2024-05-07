import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import FileUpload from "./utils/FileUpload";
import './utils/main.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateWebinar = () => {

  const [WebinarName, setWebinarName] = useState('');
  const [Instructor, setInstructor] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [CourseURL, setCourseURL] = useState('');
  const [Description, setDescription] = useState('');
  const [Duration, setDuration] = useState('');

  const handleWebinarName = (e) => setWebinarName(e.target.value);
  const handleInstructor = (e) => setInstructor(e.target.value);
  const handleCourseURL = (e) => setCourseURL(e.target.value);
  const handleDate = (e) => setStartDate(e);
  const handleDuration = (e) => setDuration(e.target.value);
  const handleDescription = (content, delta, source, editor) => setDescription(content);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(
        WebinarName,
        Instructor,
        startDate,
        CourseURL,
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
            Create <span className="text-dark-5">
              Webinar
            </span>
          </Typography>
          
          <TextField id="outlined-basic" label="Webinar Name" variant="outlined" type='text' required={true} className="text-field pb-[1rem]" value={WebinarName} onChange={handleWebinarName} />

          <section>
            <Typography className="text-dark-1 font-semibold">
              Choose the Date
            </Typography>
          <DatePicker className="w-full outline-none hover:border-none bg-dark-2 backdrop-blur-md px-3 py-2 flex" selected={startDate} onChange={handleDate} />
          </section>

            <TextField id="outlined-basic" label="Webinar Date" variant="outlined" type='text' required={true} className="text-field pb-[1rem]" value={Duration} onChange={handleDuration} />

          <FormControl className="form-control">
            <InputLabel id="demo-simple-select-label">Webinar Instructor</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={Instructor}
              label="Age"
              onChange={handleInstructor}
            >
              <MenuItem value={"Online"}>Nishok</MenuItem>
              <MenuItem value={"Self Paced"}>Ronnie Coleman</MenuItem>
              <MenuItem value={"Offline"} disabled={true}>CBUM</MenuItem>
            </Select>
          </FormControl>

          <main className='pb-[1rem]'>
            <Typography className='font-semibold text-dark-1' variant="p">
                Webinar Description
            </Typography>
            <ReactQuill theme="snow" value={Description} onChange={handleDescription}  className='border border-dark-1 outline-none'/>
        </main>
          <FileUpload Title="Webinar Thumbnail" />
          <FileUpload Title="Additional Images" />

          <TextField id="outlined-basic" label="Webinar URL" variant="outlined" type='text' required={true} className="text-field pb-[1rem]" value={CourseURL} onChange={handleCourseURL} />

          <Button type="submit" variant="contained" className="bg-dark-1 text-dark-2 flex justify-center w-1/2">
            Create
          </Button>
        </form>
    </main>
  )
}

export default CreateWebinar