import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import './main.css'; // Import a separate CSS file for styling
import { Typography } from '@mui/material';

const CourseVideos = () => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({}); // State to track upload progress

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'video/*', // Accept only video files
    multiple: true, // Allow multiple files
    onDrop: (acceptedFiles) => {
      // Add the files to state
      setFiles((prevFiles) =>
        prevFiles.concat(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
              progress: 0 // Initialize progress to 0 for each new file
            })
          )
        )
      );
      // Initiate upload process
      initiateUploads(acceptedFiles);
    }
  });

  // Clean up previews when component unmounts
  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  // Function to initiate the upload process
  const initiateUploads = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      // Simulate file upload and progress
      let progress = 0;
      const intervalId = setInterval(() => {
        if (progress >= 100) {
          clearInterval(intervalId);
        } else {
          progress += 10; // Increment progress by 10
          setUploadProgress((prevProgress) => ({
            ...prevProgress,
            [file.name]: progress
          }));
        }
      }, 200); // Simulate upload progress every 200ms
    });
  };

  // Function to remove a file
  const removeFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    setUploadProgress((prevProgress) => {
      const { [fileName]: _, ...remainingProgress } = prevProgress;
      return remainingProgress;
    });
  };

  return (
    <div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <Typography>
            Upload Course Videos
        </Typography>
        <p>Drag & drop videos here, or click to select videos</p>
      </div>

      <div className="uploaded-files-container">
        {files.map((file, index) => (
          <div key={index} className="uploaded-file">
            <video
              width="150"
              height="100"
              controls
              src={file.preview}
              alt={file.name}
            />
            <div className="file-info">
              <p>{file.name}</p>
              <div className="progress-bar">
                <div
                  className={`progress-fill ${uploadProgress[file.name] === 100 ? 'complete' : ''} my-[0.9rem] `} // Add 'complete' class when progress reaches 100
                  style={{ width: `${uploadProgress[file.name]}%` }}
                >
                  <Typography className='pt-[1rem] justify-end flex w-full'>
                  {uploadProgress[file.name]}%
                  </Typography>
                </div>
              </div>
              <button variant='contained' className="bg-gradient-to-tr from-dark-3 to-dark-4 hover:bg-dark-1 hover:text-dark-2 text-dark-1 font-semibold rounded-lg remove-button" onClick={() => removeFile(file.name)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseVideos;
