import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FileUpload from "./utils/FileUpload";
import VideoUpload from "./utils/VideoUpload";
import CourseVids from "./utils/CourseVids";

const CreateCourses = () => {

  const [CourseName, setCourseName] = useState('');
  const [Duration, setDuration] = useState('');
  const [Instructor, setInstructor] = useState('');
  const [CourseType, setCourseType] = useState('');
  const [Tags, setTags] = useState('');
  const [Description, setDescription] = useState('');

  const handleCourseName = (e) => setCourseName(e.target.value);
  const handleDuration = (e) => setDuration(e.target.value);
  const handleInstructor = (e) => setInstructor(e.target.value);
  const handleCourseType = (e) => setCourseType(e.target.value);
  const handleTags = (e) => setTags(e.target.value);
  const handleDescription = (content, delta, source, editor) => setDescription(content);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(
        CourseName,
        Duration,
        Instructor,
        CourseType,
        Tags,
        Description
      )
      console.log("The Course has been developed successfully");
      navigate('/admin/course');
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
              Course
            </span>
          </Typography>
          
          <TextField id="outlined-basic" label="Course Name" variant="outlined" type='text' required={true} className="text-field pb-[1rem]" value={CourseName} onChange={handleCourseName} />
            <TextField id="outlined-basic" label="Course Duration" variant="outlined" type='text' required={true}  className="text-field pb-[1rem]" value={Duration} onChange={handleDuration} />

            <TextField id="outlined-basic" label="Tags" variant="outlined" type='text' required={true} className="text-field pb-[1rem]" value={Tags} onChange={handleTags} />

          <FormControl className="form-control">
            <InputLabel id="demo-simple-select-label">Course Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={CourseType}
              label="Age"
              onChange={handleCourseType}
            >
              <MenuItem value={"Online"}>Online</MenuItem>
              <MenuItem value={"Self Paced"}>Self-Paced</MenuItem>
              <MenuItem value={"Offline"} disabled={true}>Offline</MenuItem>
            </Select>
          </FormControl>

          <FormControl className="form-control">
            <InputLabel id="demo-simple-select-label">Course Instructor</InputLabel>
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
                Course Description
            </Typography>
            <ReactQuill theme="snow" value={Description} onChange={handleDescription}  className='border border-dark-1 outline-none'/>
        </main>
          <FileUpload Title="Course Thumbnail" />
          <FileUpload Title="Other Images" />
          
          <VideoUpload Title="Course Introduction Video" />

          <CourseVids />

          <Button type="submit" variant="contained" className="bg-dark-1 text-dark-2 flex justify-center w-1/2">
            Create
          </Button>
        </form>
    </main>
  )
}

export default CreateCourses