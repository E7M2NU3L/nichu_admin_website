import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, TextField, Typography } from '@mui/material';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import './main.css';
import blog_bucket from '../../api/bucket/blogsBucket';
import blogs_db from '../../api/db/Blog';
import Loading from '../../components/WebinarComponents/utils/Loading';

const UpdateBlogs = () => {
  const [blogData, setBlogData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const fetchBlogData = async () => {
    try {
      const urlPath = window.location.pathname;
      const pathSegments = urlPath.split('/');
      const id = pathSegments[pathSegments.length - 1];
      console.log('Extracted ID:', id);
      const response = await blogs_db.fetchSingleBlog(id);
      console.log(response);
      setBlogData(response);
    } catch (error) {
      console.error('Failed to fetch blog data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  useEffect(() => {
    if (blogData) {
      setTitle(blogData.Title || '');
      setDescription(blogData.Description || '');
    }
  }, [blogData]);

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

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (content) => setDescription(content);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(title, description);
      const fileResponse = files.length > 0 ? await blog_bucket.UploadImage(files[0]) : null;
      const url = await blog_bucket.GetImage(fileResponse.$id);
      const imageUrl = url ? url.toString() : blogData.imageUrl;
      console.log('Updated Image URL:', imageUrl);

      const response = await blogs_db.updateBlog(blogData.$id, {
        Title: title,
        Description: description,
        Image: imageUrl,
      });
      console.log('Updated:', response);
      console.log('The blog has been updated successfully');
      navigate('/admin/blogs/fetch-all-blogs');
    } catch (error) {
      console.log(error.message);
      navigate('/');
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="flex justify-center items-center min-h-screen bg-dark-2 py-[4rem]">
      <form onSubmit={handleSubmit} className="py-[2rem] max-w-[20rem] sm:max-w-[30rem] gap-y-[1rem] flex flex-col">
        <Typography variant="h6" className="text-dark-1 pb-[1rem] font-semibold">
          Update <span className="text-dark-5">Blog</span>
        </Typography>
        
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          type="text"
          required
          className="text-field pb-[1rem]"
          value={title}
          onChange={handleTitleChange}
        />

        <main className="pb-[1rem]">
          <Typography className="font-semibold text-dark-1" variant="p">
            Description
          </Typography>
          <ReactQuill theme="snow" value={description} onChange={handleDescriptionChange} className="border border-dark-1 outline-none" />
        </main>

        <main>
          <Typography className="text-dark-1 font-semibold" variant="p">
            Blog Thumbnail
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

export default UpdateBlogs;
