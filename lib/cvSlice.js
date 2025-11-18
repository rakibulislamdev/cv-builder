import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 1,
  personalInfo: {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    country: "",
    city: "",
    address: "",
    state: "",
    zipCode: "",
  },
  education: [],
  workExperience: [],
  skills: [],
  certifications: [],
  contactInfo: {},
  careerSummary: "",
};

const cvSlice = createSlice({
  name: "cv",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updatePersonalInfo: (state, action) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    updateEducation: (state, action) => {
      state.education = action.payload;
    },
    updateWorkExperience: (state, action) => {
      state.workExperience = action.payload;
    },
    updateSkills: (state, action) => {
      state.skills = action.payload;
    },
    updateCertifications: (state, action) => {
      state.certifications = action.payload;
    },
    updateContactInfo: (state, action) => {
      state.contactInfo = action.payload;
    },
    updateCareerSummary: (state, action) => {
      state.careerSummary = action.payload;
    },
    resetForm: (state) => {
      return initialState;
    },
  },
});

export const {
  setCurrentStep,
  updatePersonalInfo,
  updateEducation,
  updateWorkExperience,
  updateSkills,
  updateCertifications,
  updateContactInfo,
  updateCareerSummary,
  resetForm,
} = cvSlice.actions;

export default cvSlice.reducer;
