import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './utils/main.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "react-datepicker/dist/react-datepicker.css";
import { useDropzone } from "react-dropzone";
import Loading from "../CoursesComponents/utils/Loading";
import webinarBucket from "../../api/bucket/WebinarsBucket";
import webinarDB from "../../api/db/WebinarsDb";

const UpdateWebinar = () => {
  const [webinarData, setWebinarData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [files, setFiles] = useState([]);

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

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const getImage = async () => {
    try {
      const promise = await webinarBucket.GetImage(webinarData?.Webinar_Thumbnail);
      console.log(promise);
      return promise;
    } catch (error) {
      console.log("Error Occurred: " + error.message);
      setIsLoading(false);
    }
  };

  const fetchWebinarData = async () => {
    try {
      const urlPath = window.location.pathname;
      const pathSegments = urlPath.split('/');
      const id = pathSegments[pathSegments.length - 1];

      const response = await webinarDB.FetchSingleWebinars(id);
      console.log("Webinar: ", response);
      setWebinarData(response);
    } catch (error) {
      console.error('Failed to fetch webinar data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWebinarData();
  }, []);

  useEffect(() => {
    if (webinarData) {
      setWebinarName(webinarData.Webinar_Name || "");
      setWebinarDate(webinarData.Webinar_Date || "");
      setWebinarDuration(webinarData.Duration || "");
      setWebinarDescription(webinarData.Webinar_Description || "");
      setWebinarInstructor(webinarData.instructors || "");
      getImage().then((image) => setImage(image));
    }
  }, [webinarData]);

  const [webinarName, setWebinarName] = useState('');
  const [webinarDate, setWebinarDate] = useState('');
  const [webinarDuration, setWebinarDuration] = useState('');
  const [webinarDescription, setWebinarDescription] = useState('');
  const [webinarInstructor, setWebinarInstructor] = useState('');

  const handleWebinarName = (e) => setWebinarName(e.target.value);
  const handleWebinarDate = (e) => setWebinarDate(e.target.value);
  const handleWebinarDuration = (e) => setWebinarDuration(e.target.value);
  const handleWebinarInstructor = (e) => setWebinarInstructor(e.target.value);
  const handleDescription = (content) => setWebinarDescription(content);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = files[0] ? await webinarBucket.CreateWebinarImage(files[0]) : null;
      const file = response ? await webinarBucket.GetWebinarImage(response) : webinarData.Webinar_Thumbnail;

      const promise = await webinarDB.updateWebinar(
        webinarData.$id, {
          Webinar_Name: webinarName,
          Webinar_Date: webinarDate,
          Duration: webinarDuration,
          Webinar_Description: webinarDescription,
          Webinar_Thumbnail: file || ""
        }
      );
      console.log("Updated: ", promise);
      console.log("The Webinar has been updated successfully");
      navigate('/admin/webinar');
    } catch (error) {
      console.log(error.message);
      navigate('/');
    }
  };

  if (isLoading) {
    return <Loading />; // Show loading animation while data is being fetched
  }

  return (
    <main className="flex justify-center items-center min-h-screen bg-dark-2 py-[4rem]">
      <form onSubmit={handleSubmit} className="py-[2rem] max-w-[20rem] sm:max-w-[30rem] gap-y-[1rem] flex flex-col">
        <Typography variant="h6" className="text-dark-1 pb-[1rem] font-semibold">
          Update <span className="text-dark-5">
            Webinar Info
          </span>
        </Typography>

        <TextField id="webinar-name" label="Webinar Name" variant="outlined" type='text' required={true} className="text-field pb-[1rem]" value={webinarName} onChange={handleWebinarName} />
        <TextField id="webinar-date" label="Webinar Date" variant="outlined" type='date' required={true} className="text-field pb-[1rem]" value={webinarDate} onChange={handleWebinarDate} />
        <TextField id="webinar-duration" label="Webinar Duration" variant="outlined" type='text' required={true} className="text-field pb-[1rem]" value={webinarDuration} onChange={handleWebinarDuration} />
        <TextField id="webinar-instructor" label="Instructor Name" variant="outlined" type='text' required={true} className="text-field pb-[1rem]" value={webinarInstructor} onChange={handleWebinarInstructor} />

        <main className='pb-[1rem]'>
          <Typography className='font-semibold text-dark-1' variant="p">
            Webinar Description
          </Typography>
          <ReactQuill theme="snow" value={webinarDescription} onChange={handleDescription} className='border border-dark-1 outline-none' />
        </main>

        <main>
          <Typography className='text-dark-1 font-semibold' variant='p'>
            Upload Webinar Thumbnail
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
          Update
        </Button>
      </form>
    </main>
  );
};

export default UpdateWebinar;
