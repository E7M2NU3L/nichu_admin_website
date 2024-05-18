import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FileUpload from "./utils/FileUpload";
import './utils/main.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import webinarDB from "../../api/db/WebinarsDb";

const UpdateWebinar = () => {
    const { webinarId } = useParams(); // Assuming you are using React Router v6 and `useParams` to get the webinar ID from the URL.
    const [formData, setFormData] = useState({
        WebinarName: '',
        Instructor: '',
        startDate: new Date(),
        CourseURL: '',
        Description: '',
        Duration: '',
        // Add other form fields as needed
    });
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch webinar data based on the ID from the URL
    const fetchWebinarData = async () => {
        try {
           // Get the current URL path from window.location.pathname
           const urlPath = window.location.pathname;

           // Split the path into an array of segments using the '/' separator
           const pathSegments = urlPath.split('/');

           // The last segment is the last part of the array
           const webinarId = pathSegments[pathSegments.length - 1];

           // Output the extracted ID
           console.log('Extracted ID:', webinarId);
            const response = await webinarDB.FetchSingleWebinars(webinarId);
            console.log(response);
            
            // Initialize form data with the fetched data
            setFormData({
                WebinarName: response.Webinar_Name,
                Instructor: response.Instructor,
                startDate: new Date(response.Webinar_Date),
                CourseURL: response.Webinar_Thumbnail,
                Description: response.Webinar_Description,
                Duration: response.Duration,
                // Map other fields as needed
            });

            if (formData !== null) {
                
                const WebinarName =  response.Webinar_Name;
                const Instructor =  response.Instructor;
                const startDate =  new Date(response.Webinar_Date);
                const CourseURL =  response.Webinar_Thumbnail;
                const Description =  response.Webinar_Description;
                const Duration =  response.Duration;


                const response = await webinarDB.UpdateWebinar(
                    webinarId, {
                        WebinarName, Duration, startDate, Webinar_Thumbnail, CourseURL, Description
                    }
                )
                console.log(response);
            }
        } catch (error) {
            console.error('Failed to fetch webinar data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchWebinarData();
    }, [webinarId]);

    // Handle changes to form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle ReactQuill changes
    const handleDescriptionChange = (content) => {
        setFormData((prevData) => ({
            ...prevData,
            Description: content,
        }));
    };

    // Handle date change
    const handleDateChange = (date) => {
        setFormData((prevData) => ({
            ...prevData,
            startDate: date,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update webinar data using the current form data
            const updateResponse = await webinarDB.updateWebinar(webinarId, {
                Webinar_Name: formData.WebinarName,
                Instructor: formData.Instructor,
                Webinar_Date: formData.startDate.toISOString(),
                Webinar_Thumbnail: formData.CourseURL,
                Webinar_Description: formData.Description,
                Duration: formData.Duration,
                // Add other fields as needed
            });

            console.log('Webinar updated successfully:', updateResponse);

            // Navigate to the webinars list page
            navigate('/admin/webinars');
        } catch (error) {
            console.error('Error updating webinar:', error);
        }
    };

    // Render the form
    return (
        <main className="flex justify-center items-center min-h-screen bg-dark-2 py-[4rem]">

            <form onSubmit={handleSubmit} className="py-[2rem] max-w-[20rem] sm:max-w-[30rem] gap-y-[1rem] flex flex-col">
                <Typography variant="h6" className="text-dark-1 pb-[1rem] font-semibold">
                    Update <span className="text-dark-5">
                        Webinar Details
                    </span>
                </Typography>

                <TextField
                    id="outlined-basic"
                    label="Webinar Name"
                    variant="outlined"
                    type='text'
                    required={true}
                    className="text-field pb-[1rem]"
                    name="WebinarName"
                    value={formData.WebinarName}
                    onChange={handleChange}
                />

                <section>
                    <Typography className="text-dark-1 font-semibold">
                        Choose the Date
                    </Typography>
                    <DatePicker
                        className="w-full outline-none hover:border-none bg-dark-2 backdrop-blur-md px-3 py-2 flex"
                        selected={formData.startDate}
                        onChange={handleDateChange}
                    />
                </section>

                <TextField
                    id="outlined-basic"
                    label="Webinar Duration"
                    variant="outlined"
                    type='text'
                    required={true}
                    className="text-field pb-[1rem]"
                    name="Duration"
                    value={formData.Duration}
                    onChange={handleChange}
                />

                <FormControl className="form-control">
                    <InputLabel id="demo-simple-select-label">Webinar Instructor</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="Instructor"
                        value={formData.Instructor}
                        label="Instructor"
                        onChange={handleChange}
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
                    <ReactQuill theme="snow" value={formData.Description} onChange={handleDescriptionChange} className='border border-dark-1 outline-none'/>
                </main>

                {/* You may need to handle the FileUpload component appropriately */}
                <FileUpload Title="Webinar Thumbnail" />
                <FileUpload Title="Additional Images" />

                <TextField
                    id="outlined-basic"
                    label="Webinar URL"
                    variant="outlined"
                    type='text'
                    required={true}
                    className="text-field pb-[1rem]"
                    name="CourseURL"
                    value={formData.CourseURL}
                    onChange={handleChange}
                />

                <Button type="submit" variant="contained" className="bg-dark-1 text-dark-2 flex justify-center w-1/2">
                    Update
                </Button>
            </form>
        </main>
    );
};

export default UpdateWebinar;