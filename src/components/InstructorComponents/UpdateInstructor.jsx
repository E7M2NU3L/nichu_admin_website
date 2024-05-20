import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './utils/main.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "react-datepicker/dist/react-datepicker.css";
import instructorDB from "../../api/db/InstructorsDb";
import InstructorService from "../../api/bucket/InstructorBucket";
import { useDropzone } from "react-dropzone";

const UpdateInstructor = () => {
  const [InstructorData, setInstructorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [loading, setLoading] = useState(false);
  const [Image, setImage] = useState(null);

  const getImage = async () => {

    try {
      const promise = await InstructorService.GetInstructorImage(InstructorData?.Instructor_Photo);
      console.log(promise);
      return promise;
    } catch (error) {
      console.log("Error Occured: " + error.message);
      setLoading(false);
    }
  };

  
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

  // Fetch instructor data based on the instructorId
  const fetchInstructorData = async () => {
    try {
      // Get the current URL path from window.location.pathname
      const urlPath = window.location.pathname;

      // Split the path into an array of segments using the '/' separator
      const pathSegments = urlPath.split('/');

      // The last segment is the last part of the array
      const id = pathSegments[pathSegments.length - 1];

      // Output the extracted ID
      console.log('Extracted ID:', id);
      const response = await instructorDB.FetchSingleInstructor(id);
      console.log(response);
      setInstructorData(response);
    } catch (error) {
      console.error('Failed to fetch instructor data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Use effect to fetch instructor data when component mounts
  useEffect(() => {
    fetchInstructorData();
  }, []);

  useEffect(() => {
    if (InstructorData) {
      setDescription(InstructorData.Instructor_Description || "");
      setInstructorName(InstructorData.Instructor_Name || "");
      setInstructorPortfolio(InstructorData.Instructor_Portfolio || "");
      setInstructorLinkedIn(InstructorData.Instructor_Linked_in || "");
      setInstructorIG(InstructorData.Instructor_IG || "");
      getImage().then((image) => setImage(image));
    }
  }, [InstructorData]);

  const [InstructorName, setInstructorName] = useState('');
  const [InstructorPortfolio, setInstructorPortfolio] = useState('');
  const [Description, setDescription] = useState('');
  const [InstructorLinkedIn, setInstructorLinkedIn] = useState('');
  const [InstructorIG, setInstructorIG] = useState('');

  const handleInstructorName = (e) => setInstructorName(e.target.value);
  const handleInstructorPortfolio = (e) => setInstructorPortfolio(e.target.value);
  const handleInstructorIG = (e) => setInstructorIG(e.target.value);
  const handleInstructorLinkedIn = (e) => setInstructorLinkedIn(e.target.value);
  const handleDescription = (content) => setDescription(content);

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      console.log(
        InstructorName,
        InstructorIG,
        InstructorLinkedIn,
        InstructorPortfolio,
        Description
      );
        const fileId = await getImage()
        console.log(fileId);
        console.log(files[0]);
        const response = await InstructorService.CreateInstructorImage(files[0]);
        console.log("Updated Image: ", response);

        const file = await InstructorService.GetInstructorImage(response);
        console.log(file);

      const promise = await instructorDB.updateInstructor(
        InstructorData.$id, {
          InstructorName,
          Description,
        InstructorPortfolio,
        InstructorLinkedIn,
        InstructorIG,
        Instructor_Photo: response.toString()
        }
      )
      console.log("Updated: ", promise);
      console.log("The Instructor has been updated successfully");
      navigate('/admin/instructors');
    } catch (error) {
      console.log(error.message);
      navigate('/');
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-dark-2 py-[4rem]">
      <form onSubmit={handleSubmit} className="py-[2rem] max-w-[20rem] sm:max-w-[30rem] gap-y-[1rem] flex flex-col">
        <Typography variant="h6" className="text-dark-1 pb-[1rem] font-semibold">
          Update <span className="text-dark-5">
            Instructor Info
          </span>
        </Typography>

        <TextField id="outlined-basic" label="Instructor Name" variant="outlined" type='text' required={true} className="text-field pb-[1rem]" value={InstructorName} onChange={handleInstructorName} />

        <TextField id="outlined-basic" label="Portfolio URL" variant="outlined" type='text' required={true} className="text-field pb-[1rem]" value={InstructorPortfolio} onChange={handleInstructorPortfolio} />

        <TextField id="outlined-basic" label="Instructor IG URL" variant="outlined" type='text' required={true} className="text-field pb-[1rem]" value={InstructorIG} onChange={handleInstructorIG} />

        <TextField id="outlined-basic" label="Instructor LinkedIN URL" variant="outlined" type='text' required={true} className="text-field pb-[1rem]" value={InstructorLinkedIn} onChange={handleInstructorLinkedIn} />

        <main className='pb-[1rem]'>
          <Typography className='font-semibold text-dark-1' variant="p">
            Instructor Description
          </Typography>
          <ReactQuill theme="snow" value={Description} onChange={handleDescription} className='border border-dark-1 outline-none' />
        </main>

        <main>
        <Typography className='text-dark-1 font-semibold' variant='p'>
           Upload Instructor Profile Page
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

export default UpdateInstructor;
