"use client"
import { useSelector, useDispatch } from "react-redux"
import { Button } from "@/components/ui/button"
import { setCurrentStep } from "@/lib/cvSlice"
import { Linkedin, Dribbble, Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"

const SectionHeading = ({ children }) => (
    <h3 className="text-sm font-bold text-gray-800 tracking-wider mb-2 pb-1 border-b-2 border-green-700">
        {children}
    </h3>
)


const ResumePreview = () => {
    const cvData = useSelector(state => state.cv)


    const fallbackPersonalInfo = {
        firstName: 'SAIFUR',
        lastName: 'RAHMAN',
        jobTitle: 'UX/UI Designer.',
        phone: '+880 1867690747',
        email: 'saifurrahmaniume@gmail.com',
        address: 'House-79/B, Road-01 (Block-C, Section-08, Mirpur, Dhaka, Bangladesh',
        portfolio: 'dribbble.com/sai...saifur_info',
        linkedin: 'linkedin.com/in/sai...saifur',
        profileImage: '/path/to/profile.jpg',
        careerSummary: "Hello! I'm a Professional UI/UX Designer & Graphics Designer with a keen eye for detail and a drive for creativity. My expertise extends to proficiency in UI/UX Design, Landing Page, Mobile App, Dashboard Design.",
    };

    const personalInfo = cvData.personalInfo || fallbackPersonalInfo;


    const fallbackSkills = [
        'UI/UX Design.', 'Figma.', 'Graphic Designer.', 'Adobe XD.',
        'Adobe Illustrator.', 'Adobe Photoshop.', 'Adobe InDesign.',
        'Adobe Premiere Pro.', 'Data Entry.', 'Typing Bangla & English Both Language.'
    ];
    const fallbackEducation = [
        { degree: 'B. SC. in Electronics and Communication Engineering', major: 'Major in Science Trade & Technology (ST-T)', institution: 'Unknown University', startDate: '2016', endDate: '2022' },
        { degree: 'HSC in Science', institution: 'Sirajkhatak Govt. College', startDate: '2020', endDate: '2022' },
        { degree: 'SSC in Science', institution: 'Shatkhira Shamsul Alim Madrasah', startDate: '2018', endDate: '2019' },
    ];
    const fallbackCertifications = [
        { title: 'Course Name:- Certified UI/UX Design.', organization: 'Academy Name:- ISB Member, Practicing Academy', issueDate: 'Duration: [7 Months]', description: 'Topic:- User Experience, User Interface, Website Design, Mobile App, Ui Design.' }
    ];
    const fallbackWorkExperience = [
        { jobTitle: 'Jr. UI/UI Designer', company: 'bacalling IT ltd.', startDate: '01/08/2024', endDate: 'Till now', description: 'I am very happy to get the opportunity for UI/UX designer intern. I strive to bring morality, creativity and excellent services to every project. Eager to learn, I embrace challenges, and aim to exceed expectations with my innovative designs and user-centric approach.' },
        { jobTitle: 'Ui/UI Designer Intern', company: 'bacalling IT ltd.', startDate: '20/04/2022', endDate: '31/07/2023', description: 'I am very happy to get the opportunity for UI/UX designer intern. I strive to bring morality, creativity and excellent services to every project. Eager to learn, I embrace challenges, and aim to exceed expectations with my innovative designs and user-centric approach.' },
    ];
    const fallbackActivities = [
        'ISB Member.', 'Travelling.', 'Cricket.'
    ];

    const skills = cvData.skills && cvData.skills.length > 0 ? cvData.skills : fallbackSkills;
    const education = cvData.education && cvData.education.length > 0 ? cvData.education : fallbackEducation;
    const certifications = cvData.certifications && cvData.certifications.length > 0 ? cvData.certifications : fallbackCertifications;
    const workExperience = cvData.workExperience && cvData.workExperience.length > 0 ? cvData.workExperience : fallbackWorkExperience;
    const activities = cvData.activities && cvData.activities.length > 0 ? cvData.activities : fallbackActivities;


    return (
        <div
            className="p-10 bg-white  print:shadow-none border border-gray-300 font-sans"
            style={{
                width: '8.5in',
                minHeight: '11in',
                fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
                fontSize: '10pt'
            }}
        >


            <div className="flex items-start justify-between mb-4">


                <div className="flex items-start">

                    <div className="w-[90px] h-[90px] rounded-full overflow-hidden mr-6 border border-gray-300">
                        {personalInfo.profileImage ? (

                            <Image src={personalInfo.profileImage} width={90} height={90} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500 text-[8pt]">Photo</span>
                            </div>
                        )}
                    </div>

                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-800 tracking-wide mt-2">
                            {personalInfo.firstName || 'YOUR'} {personalInfo.lastName || 'NAME'}
                        </h1>
                        <p className="text-sm font-semibold text-gray-700">
                            {personalInfo.jobTitle || 'Your Profession'}
                        </p>
                    </div>
                </div>


                <div className="text-[9pt] text-right space-y-1 text-gray-700">
                    <div className="flex justify-end items-center">
                        <Phone size={10} className="inline-block mr-1 text-green-700" />
                        <span className="font-semibold">{personalInfo.phone || '+880 1XXXXXXXXX'}</span>
                    </div>
                    <div className="flex justify-end items-center">
                        <Mail size={10} className="inline-block mr-1 text-green-700" />
                        <span className="font-semibold">{personalInfo.email || 'your.email@example.com'}</span>
                    </div>
                    <div className="flex justify-end items-center">
                        <MapPin size={10} className="inline-block mr-1 text-green-700" />
                        <span className="text-wrap">
                            {personalInfo.address || 'Address Line 1, City, Country'}
                        </span>
                    </div>
                </div>
            </div>


            <div className="h-[2px] bg-gray-200 mb-6"></div>


            <div className="flex">


                <div className="w-[30%] pr-6 border-r border-gray-300 text-gray-700">


                    <SectionHeading>PORTFOLIO</SectionHeading>
                    <div className="flex flex-col space-y-1 mb-4 text-[9pt]">
                        <div className="flex items-center">
                            <Dribbble size={10} className="inline-block mr-2 text-green-700" />
                            <span className="text-wrap">{personalInfo.portfolio || 'dribbble.com/your-info'}</span>
                        </div>
                        <div className="flex items-center">
                            <Linkedin size={10} className="inline-block mr-2 text-green-700" />
                            <span className="text-wrap">{personalInfo.linkedin || 'linkedin.com/in/yourprofile'}</span>
                        </div>
                    </div>


                    <SectionHeading>SKILLS</SectionHeading>
                    <ul className="list-disc list-inside space-y-1 mb-4 text-[9pt]">
                        {skills.map((skill, index) => (
                            <li key={index} className="pl-1 leading-snug">{skill}</li>
                        ))}
                    </ul>


                    <SectionHeading>LANGUAGES</SectionHeading>
                    <ul className="list-disc list-inside space-y-1 mb-4 text-[9pt]">
                        <li>BANGLA</li>
                        <li>ENGLISH</li>
                    </ul>


                    <SectionHeading>CO-CURRICULAR ACTIVITIES</SectionHeading>
                    <ul className="list-disc list-inside space-y-1 text-[9pt]">
                        {activities.map((activity, index) => (
                            <li key={index} className="pl-1 leading-snug">{activity}</li>
                        ))}
                    </ul>
                </div>


                <div className="w-[70%] pl-6 text-gray-700">


                    <SectionHeading>ABOUT ME</SectionHeading>
                    <p className="mb-6 text-[9pt] leading-relaxed">
                        {personalInfo.careerSummary || fallbackPersonalInfo.careerSummary}
                    </p>


                    <SectionHeading>EDUCATION QUALIFICATION</SectionHeading>
                    {education.map((edu, index) => (
                        <div key={index} className="mb-4">
                            <div className="flex justify-between items-start">
                                <p className="font-bold text-[10pt] leading-snug">{edu.degree}</p>
                                <p className="text-[8pt] text-right font-semibold whitespace-nowrap">
                                    {edu.startDate} – {edu.endDate}
                                </p>
                            </div>
                            <p className="text-[9pt] leading-snug">{edu.institution}</p>
                            {edu.major && <p className="text-[9pt] leading-snug">{edu.major}</p>}
                        </div>
                    ))}


                    <SectionHeading>TRAINING /CERTIFICATION</SectionHeading>
                    {certifications.map((cert, index) => (
                        <div key={index} className="mb-4">
                            <div className="flex justify-between items-start">
                                <p className="font-bold text-[10pt] leading-snug">Course Name:- {cert.title || cert.name || 'Certification Name'}</p>
                                <p className="text-[8pt] text-right font-semibold whitespace-nowrap">
                                    {cert.issueDate} {cert.expiryDate ? `- ${cert.expiryDate}` : ''}
                                </p>
                            </div>
                            <p className="text-[9pt] leading-snug">Academy Name:- {cert.organization || 'Training Academy'}</p>

                            {cert.description && <p className="text-[9pt] leading-snug">Topic: {cert.description}</p>}
                        </div>
                    ))}


                    <SectionHeading>WORK EXPERIENCE</SectionHeading>
                    {workExperience.map((exp, index) => (
                        <div key={index} className="mb-4">
                            <div className="flex justify-between items-start">
                                <p className="font-bold text-[10pt] leading-snug">{exp.jobTitle}</p>
                                <p className="text-[8pt] text-right font-semibold whitespace-nowrap">
                                    {exp.startDate} – {exp.endDate}
                                </p>
                            </div>
                            <p className="text-[9pt] font-semibold text-gray-700 leading-snug">{exp.company}</p>
                            <p className="text-[9pt] leading-snug mt-1">
                                {exp.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default function Review() {
    const generatedResume = useSelector(state => state.cv.generatedResume)
    const dispatch = useDispatch()

    return (
        <div className="min-h-screen bg-white pb-20">


            <div className="bg-white pt-8 pb-4 mb-4">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-semibold text-gray-800">Review Your AI-Generated Resume</h1>
                    <p className="text-sm text-gray-600 mt-2">
                        Take a moment to review your resume. You can make changes and regenerate if needed. When you're ready, download it and start applying!
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8">


                <div className="mb-8">
                    <ResumePreview />
                </div>


                <div className="fixed bottom-0 left-0 right-0 bg-white border-gray-200 py-4  z-10">
                    <div className="max-w-4xl mx-auto flex justify-between px-4 sm:px-6 lg:px-8">
                        <Button
                            variant="outline"
                            className="text-gray-700 border-gray-300 hover:bg-gray-50 px-8 py-3 h-auto"
                            onClick={() => alert("Downloading Resume...")}
                        >
                            Download Resume
                        </Button>


                        <Button
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 h-auto"
                            onClick={() => dispatch(setCurrentStep(1))}
                        >
                            Find New Favorite Job
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}