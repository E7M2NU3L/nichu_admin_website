import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDropzone } from "react-dropzone";
import CourseBucket from "../../api/bucket/CoursesBucket";
import courseDB from "../../api/db/CoursesDb";
import instructorDB from "../../api/db/InstructorsDb";
import Loading from "./utils/Loading";
import { ID } from "appwrite";

const CreateCourses = () => {
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

  const [loading, setLoading] = useState(true);

  const [CourseName, setCourseName] = useState('');
  const [Duration, setDuration] = useState('');
  const [Instructor, setInstructor] = useState('');
  const [CourseType, setCourseType] = useState('');
  const [Tags, setTags] = useState('');
  const [Description, setDescription] = useState('');

  const [instruct, setInstruct] = useState(null);

  const handleCourseName = (e) => setCourseName(e.target.value);
  const handleDuration = (e) => setDuration(e.target.value);
  const handleInstructor = (e) => setInstructor(e.target.value);
  const handleCourseType = (e) => setCourseType(e.target.value);
  const handleTags = (e) => setTags(e.target.value);
  const handleDescription = (content) => setDescription(content);

  const navigate = useNavigate();

  const [Image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async() => {
      try {
        const Image = await CourseBucket.CreateCourseThumbnail(files[0]);
        console.log(Image);
  
        const fileID = Image.$id;
        console.log(fileID);
  
        const fileURL = await CourseBucket.GetCourseThumbnail(fileID);
        console.log(fileURL);

        setImage(fileURL);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchImage()
  }, [files]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(
        CourseName,
        Duration,
        Instructor,
        CourseType,
        Tags,
        Description,
        files[0]
      );
      console.log("The Course has been developed successfully");

      if (Image) {
        const Course = await courseDB.CreateCourse({
          Course_name: CourseName,
          Course_Duration: Duration,
          Description: Description,
          Course_Thumbnail: Image ? Image : "",
          instructors: Instructor,
          CourseType: CourseType,
          tags: Tags
        });
        console.log(Course);
        navigate('/admin/course');
      }
    } catch (error) {
      console.log(error.message);
      navigate('/');
    }
  };

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const instructor_id = await instructorDB.FetchAllInstructors();
        setInstruct(instructor_id.documents);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        return false;
      }
    };

    fetchInstructor();
  }, []);

  return (
    <main className="flex justify-center items-center min-h-screen bg-dark-2 py-[4rem]">
      <React.Fragment>
        {loading === false && instruct !== null ? (
          <form onSubmit={handleSubmit} className="py-[2rem] max-w-[20rem] sm:max-w-[30rem] gap-y-[1rem] flex flex-col">
            <Typography variant="h6" className="text-dark-1 pb-[1rem] font-semibold">
              Create <span className="text-dark-5">Course</span>
            </Typography>
            
            <TextField
              id="outlined-basic"
              label="Course Name"
              variant="outlined"
              type="text"
              required
              className="text-field pb-[1rem]"
              value={CourseName}
              onChange={handleCourseName}
            />
            <TextField
              id="outlined-basic"
              label="Course Duration"
              variant="outlined"
              type="text"
              required
              className="text-field pb-[1rem]"
              value={Duration}
              onChange={handleDuration}
            />
            <TextField
              id="outlined-basic"
              label="Tags"
              variant="outlined"
              type="text"
              required
              className="text-field pb-[1rem]"
              value={Tags}
              onChange={handleTags}
            />

            <FormControl className="form-control">
              <InputLabel id="demo-simple-select-label">Course Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={CourseType}
                label="Course Type"
                onChange={handleCourseType}
              >
                <MenuItem value={"online"}>Online</MenuItem>
                <MenuItem value={"self-paced"}>Self-Paced</MenuItem>
                <MenuItem value={"Offline"} disabled>Offline</MenuItem>
              </Select>
            </FormControl>

            <FormControl className="form-control">
              <InputLabel id="demo-simple-select-label">Course Instructor</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Instructor}
                label="Course Instructor"
                onChange={handleInstructor}
              >
                {instruct.map((instructor) => (
                  <MenuItem key={instructor.$id} value={instructor.$id}>
                    {instructor.Instructor_Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <main className="pb-[1rem]">
              <Typography className="font-semibold text-dark-1" variant="p">
                Course Description
              </Typography>
              <ReactQuill theme="snow" value={Description} onChange={handleDescription} className="border border-dark-1 outline-none" />
            </main>

            <main>
              <Typography className="text-dark-1 font-semibold" variant="p">
                Course Thumbnail
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

            <Button type="submit" variant="contained" className="bg-dark-1 text-dark-2 flex justify-center w-1/2">
              Create
            </Button>
          </form>
        ) : (
          <Loading />
        )}
      </React.Fragment>
    </main>
  );
};

export default CreateCourses;
