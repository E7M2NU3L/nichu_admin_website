const { createSlice } = require("@reduxjs/toolkit");

const initial_state = {
    
}

const Instructors = createSlice({
    name: "instructors",
    initialState: initial_state,
    reducers: {
        create(state, action) {

        },
        update(state, action) {

        },
        destroy(state, action){

        }
    }
})

export const {create, update, destroy} = Instructors.actions;
export default Instructors.reducer;