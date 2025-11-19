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
    portfolio: "",
    linkedin: "",
  },
  education: [],
  workExperience: [],
  skills: [],
  certifications: [],
  contactInfo: {},
  careerSummary: "",
  jobTitle: "",
  generatedResume: "",
  isAIEnhanced: false,
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
      const enhancedData = action.payload;

      // Personal Info update
      if (enhancedData.personalInfo) {
        state.personalInfo = {
          ...state.personalInfo,
          ...enhancedData.personalInfo,
        };
      }

      // Job Title update
      if (enhancedData.jobTitle) {
        state.jobTitle = enhancedData.jobTitle;
      }

      // Career Summary update
      if (enhancedData.careerSummary) {
        state.careerSummary = enhancedData.careerSummary;
      }

      // Skills update
      if (enhancedData.skills && Array.isArray(enhancedData.skills)) {
        state.skills = enhancedData.skills;
      }

      // Work Experience update
      if (
        enhancedData.workExperience &&
        Array.isArray(enhancedData.workExperience)
      ) {
        state.workExperience = enhancedData.workExperience;
      }

      // Education update
      if (enhancedData.education && Array.isArray(enhancedData.education)) {
        state.education = enhancedData.education;
      }

      // Certifications update
      if (
        enhancedData.certifications &&
        Array.isArray(enhancedData.certifications)
      ) {
        state.certifications = enhancedData.certifications;
      }

      state.generatedResume = JSON.stringify(enhancedData);

      // AI enhanced flag
      state.isAIEnhanced = true;
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
