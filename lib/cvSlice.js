import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 1,
  currentSection: "education",
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
    portfolio: "", // যোগ করা হয়েছে
    linkedin: "", // যোগ করা হয়েছে
  },
  education: [],
  workExperience: [],
  skills: [], // skills array আছে
  certifications: [],
  contactInfo: {},
  careerSummary: "",
  jobTitle: "",
  generatedResume: "",
};

const cvSlice = createSlice({
  name: "cv",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setCurrentSection: (state, action) => {
      state.currentSection = action.payload;
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
    updateJobTitle: (state, action) => {
      state.jobTitle = action.payload;
    },
    setGeneratedResume: (state, action) => {
      state.generatedResume = action.payload;
    },
    resetForm: (state) => {
      return initialState;
    },
  },
});

export const {
  setCurrentStep,
  setCurrentSection,
  updatePersonalInfo,
  updateEducation,
  updateWorkExperience,
  updateSkills,
  updateCertifications,
  updateContactInfo,
  updateCareerSummary,
  updateJobTitle,
  setGeneratedResume,
  resetForm,
} = cvSlice.actions;

export default cvSlice.reducer;
