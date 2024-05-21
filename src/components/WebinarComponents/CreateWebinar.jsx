import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDropzone } from "react-dropzone";
import webinarDB from "../../api/db/WebinarsDb";
import instructorDB from "../../api/db/InstructorsDb";
import Loading from "./utils/Loading";
import webinarBucket from "../../api/bucket/WebinarsBucket";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import ReactQuill from "react-quill";

const CreateWebinar = () => {
  const [WebinarName, setWebinarName] = useState('');
  const [Instructor, setInstructor] = useState('');
  const [webinarDate, setStartDate] = useState(new Date());
  const [CourseURL, setCourseURL] = useState('');
  const [Description, setDescription] = useState('');
  const [Duration, setDuration] = useState('');
  const [files, setFiles] = useState([]);
  const [Instructors, setInstructors] = useState(null);

  const handleWebinarDate = (e) => setStartDate(e.target.value);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchInstructors = async() => {
      try {
        const promise = await instructorDB.FetchAllInstructors();
        if (promise.documents) {
          setInstructors(promise.documents);
        } else {
          throw new Error("No instructors found");
        }
      } catch (error) {
        console.error("Error fetching instructors: ", error.message);
      }
    };

    fetchInstructors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await webinarBucket.CreateWebinarThumbnail(files[0]);
      const webinarThumbnail = response ? response : "";

      const promise = await webinarDB.CreateWebinar({
        Webinar_Name: WebinarName,
        Duration,
        Webinar_Date: webinarDate,
        Webinar_Thumbnail: webinarThumbnail,
        Webinar_URL: CourseURL,
        Webinar_Description: Description,
        Instructor_Id: Instructor
      });

      if (promise) {
        console.log("Webinar created successfully");
        navigate('/admin/webinars');
      } else {
        throw new Error("Failed to create webinar");
      }
    } catch (error) {
      console.error("Error creating webinar: ", error.message);
      navigate('/');
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-dark-2 py-[4rem]">
      <form onSubmit={handleSubmit} className="py-[2rem] max-w-[20rem] sm:max-w-[30rem] gap-y-[1rem] flex flex-col">
        <Typography variant="h6" className="text-dark-1 pb-[1rem] font-semibold">
          Create <span className="text-dark-5">Webinar</span>
        </Typography>
        <TextField label="Webinar Name" variant="outlined" required value={WebinarName} onChange={(e) => setWebinarName(e.target.value)} />
        <section>
          <Typography className="text-dark-1 font-semibold">Choose the Date</Typography>
          <TextField id="webinar-date" label="Webinar Date" variant="outlined" type='date' required={true} className="text-field pb-[1rem]" value={webinarDate} onChange={handleWebinarDate} />
         </section>
        <TextField label="Duration (in hours)" variant="outlined" required value={Duration} onChange={(e) => setDuration(e.target.value)} />
        {Instructors ? (
          <FormControl>
            <InputLabel>Webinar Instructor</InputLabel>
            <Select value={Instructor} onChange={(e) => setInstructor(e.target.value)}>
              {Instructors.map((instructor) => (
                <MenuItem
                 key={instructor.$id} value={instructor.$id}>{instructor.Instructor_Name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <Loading />
        )}
        <main className='pb-[1rem]'>
          <Typography className='font-semibold text-dark-1'>Webinar Description</Typography>
          <ReactQuill theme="snow" value={Description} onChange={(content) => setDescription(content)} />
        </main>
        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''} mt-[1rem]`}>
          <input {...getInputProps()} />
          <p>{isDragActive ? 'Drop files here...' : 'Drag & drop files here, or click to select files'}</p>
          {files.length > 0 && (
            <div className="preview-container">
              {files.map((file, index) => (
                <div key={index} className="preview-item">
                  <img src={file.preview} alt={file.name} />
                  <button onClick={() => setFiles(files.filter((_, i) => i !== index))}>Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>
        <TextField label="Webinar URL" variant="outlined" required value={CourseURL} onChange={(e) => setCourseURL(e.target.value)} />
        <Button type="submit" variant="contained">Create</Button>
      </form>
    </main>
  );
};

export default CreateWebinar;
