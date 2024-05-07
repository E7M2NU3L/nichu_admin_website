import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './main.css';
import { Typography } from '@mui/material';

const ProfileUpload = ({Title}) => {
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

  return (
    <main>
        <Typography className='text-dark-1 font-semibold' variant='p'>
            {Title}
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
  );
};

export default ProfileUpload;
