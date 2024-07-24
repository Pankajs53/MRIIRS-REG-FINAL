import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    doctorCategory: "",
    formData: {}
};

const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        setDoctorCategory: (state, action) => {
            state.doctorCategory = action.payload;
        },
        setFormData: (state, action) => {
            state.formData = { ...state.formData, ...action.payload };
        },
        resetFormData: (state) => {
            state.doctorCategory = "";
            state.formData = {};
        }
    }
});

export const { setDoctorCategory, setFormData, resetFormData } = formSlice.actions;

export default formSlice.reducer;
