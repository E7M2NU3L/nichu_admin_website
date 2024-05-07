import { createSlice } from "@reduxjs/toolkit";

// initial state setUp
const initial_state = {
    CourseName: '',
    CourseDuration: '',
    Tags: '',
    CourseType: '',
    CourseInstructor: '',
    CourseDescription: '',
    CourseThumnail: null,
    OtherImages: [],
    IntroVideo: null,
    CourseVideo: []
};

const CourseSlice = createSlice({
    name: "courses",
    initialState: initial_state,
    reducers: {
        create: (state, action) => {

        },
        update: (state, action) => {

        },
        delete: (state, action) => {

        }
    }
});

export default CourseSlice;