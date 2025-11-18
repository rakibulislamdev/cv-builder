"use client"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from "react-redux"
import { updateEducation, setCurrentStep, setCurrentSection } from "@/lib/cvSlice"
import { Plus, X, Upload, FileText, CalendarIcon, ChevronRight } from "lucide-react"
import { useState, useRef } from "react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function Education() {
    const dispatch = useDispatch()
    const education = useSelector((state) => state.cv.education)
    const fileInputRef = useRef(null)

    const parseDateString = (dateStr) => {
        if (!dateStr) return null
        const [day, month, year] = dateStr.split('/').map(Number)
        return new Date(year, month - 1, day)
    }

    const initialEducationState = education.length > 0 ? education.map(edu => ({
        ...edu,
        startDate: parseDateString(edu.startDate),
        endDate: parseDateString(edu.endDate),
        achievements: edu.achievements || []
    })) : [
        { degree: "", institution: "", major: "", startDate: null, endDate: null, achievements: [] }
    ]

    const [educations, setEducations] = useState(initialEducationState)

    const [uploadedFiles, setUploadedFiles] = useState([])


    const addEducation = () => {
        setEducations([...educations, { degree: "", institution: "", major: "", startDate: null, endDate: null, achievements: [] }])
    }

    const removeEducation = (index) => {
        if (educations.length > 1) {
            setEducations(educations.filter((_, i) => i !== index))
        }
    }

    const updateEducationItem = (index, field, value) => {
        const updated = educations.map((edu, i) =>
            i === index ? { ...edu, [field]: value } : edu
        )
        setEducations(updated)
    }


    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files)
        const newFiles = files.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
        }))
        setUploadedFiles(prev => [...prev, ...newFiles])

        const fileNames = files.map(file => file.name)
        const updatedEducations = educations.map((edu, i) => {
            if (i === 0) {
                return {
                    ...edu,
                    achievements: [...edu.achievements, ...fileNames]
                }
            }
            return edu
        })
        setEducations(updatedEducations)
    }

    const removeFile = (index) => {
        const fileToRemove = uploadedFiles[index]
        const updatedFiles = uploadedFiles.filter((_, i) => i !== index)
        setUploadedFiles(updatedFiles)

        const updatedEducations = educations.map((edu, i) => {
            if (i === 0) {
                const updatedAchievements = edu.achievements.filter(achievement =>
                    achievement !== fileToRemove.name
                )
                return {
                    ...edu,
                    achievements: updatedAchievements
                }
            }
            return edu
        })
        setEducations(updatedEducations)
    }

    const handleBrowseClick = () => {
        fileInputRef.current?.click()
    }

    const handleButtonClick = (e) => {
        e.stopPropagation()
        handleBrowseClick()
    }



    const saveAndAdvance = (step) => {
        const formattedEducations = educations.map(edu => ({
            ...edu,
            startDate: edu.startDate ? format(edu.startDate, 'dd/MM/yyyy') : '',
            endDate: edu.endDate ? format(edu.endDate, 'dd/MM/yyyy') : '',
            achievements: edu.achievements || []
        }))
        dispatch(updateEducation(formattedEducations))
        dispatch(setCurrentStep(step))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        saveAndAdvance(5)
    }

    const handleCertificationsClick = () => {

        const formattedEducations = educations.map(edu => ({
            ...edu,
            startDate: edu.startDate ? format(edu.startDate, 'dd/MM/yyyy') : '',
            endDate: edu.endDate ? format(edu.endDate, 'dd/MM/yyyy') : '',
            achievements: edu.achievements || []
        }))
        dispatch(updateEducation(formattedEducations))


        dispatch(setCurrentSection('certifications'))
    }
    const onBack = () => {
        dispatch(setCurrentStep(3))
    }

    const boldGrayFocus = "focus:border-gray-500 focus:ring-2 focus:ring-gray-900 focus:ring-offset-0 focus:shadow-sm"

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <Card className="w-full max-w-5xl border-0 shadow-none">
                <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-2xl font-bold text-gray-800">
                                Your Educational Background
                            </CardTitle>
                            <CardDescription className="text-gray-600 text-base">
                                Provide your academic qualifications and any relevant certifications to strengthen your resume.
                            </CardDescription>
                        </div>

                        <Button
                            type="button"
                            onClick={handleCertificationsClick}
                            className="bg-gray-800 hover:bg-gray-700 cursor-pointer text-white"
                        >
                            Certifications
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-8">
                        {educations.map((edu, index) => (
                            <div key={index} className="space-y-6 relative">
                                {educations.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute -top-2 right-2 p-1 h-auto hover:bg-red-50"
                                        onClick={() => removeEducation(index)}
                                    >
                                        <X className="h-4 w-4 text-red-500" />
                                    </Button>
                                )}

                                {/* Degree Input */}
                                <div className="space-y-2">
                                    <Label htmlFor={`degree-${index}`} className="text-sm font-medium text-gray-700">Your Degree</Label>
                                    <Input
                                        id={`degree-${index}`}
                                        placeholder="e.g., Bachelors, Masters"
                                        value={edu.degree}
                                        onChange={(e) => updateEducationItem(index, "degree", e.target.value)}
                                        className={cn("w-full border-gray-300", boldGrayFocus)}
                                    />
                                </div>

                                {/* Institution & Major */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor={`institution-${index}`} className="text-sm font-medium text-gray-700">Institution Name</Label>
                                        <Input
                                            id={`institution-${index}`}
                                            placeholder="e.g., University of Dhaka"
                                            value={edu.institution}
                                            onChange={(e) => updateEducationItem(index, "institution", e.target.value)}
                                            className={cn("w-full border-gray-300", boldGrayFocus)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`major-${index}`} className="text-sm font-medium text-gray-700">Major</Label>
                                        <Input
                                            id={`major-${index}`}
                                            placeholder="e.g., Computer Science and Engineering"
                                            value={edu.major}
                                            onChange={(e) => updateEducationItem(index, "major", e.target.value)}
                                            className={cn("w-full border-gray-300", boldGrayFocus)}
                                        />
                                    </div>
                                </div>

                                {/* Dates */}
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">Graduation</Label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Start Date Picker */}
                                        <div className="space-y-2">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className={cn("w-full justify-between text-left font-normal border-gray-300", boldGrayFocus, !edu.startDate && "text-gray-400")}
                                                    >
                                                        {edu.startDate ? format(edu.startDate, "dd/MM/yyyy") : "Start Date"}
                                                        <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={edu.startDate}
                                                        onSelect={(date) => updateEducationItem(index, "startDate", date)}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>

                                        {/* End Date Picker */}
                                        <div className="space-y-2">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className={cn("w-full justify-between text-left font-normal border-gray-300", boldGrayFocus, !edu.endDate && "text-gray-400")}
                                                    >
                                                        {edu.endDate ? format(edu.endDate, "dd/MM/yyyy") : "End Date"}
                                                        <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={edu.endDate}
                                                        onSelect={(date) => updateEducationItem(index, "endDate", date)}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>
                                </div>

                                {/* Achievements Section */}
                                {index === 0 && (
                                    <div className="grid grid-cols-1 gap-6 w-full md:w-1/2">
                                        <div className="space-y-3">
                                            <Label className="text-sm font-medium text-gray-700">Achievements</Label>

                                            {/* File Upload Area */}
                                            <div
                                                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer bg-white"
                                                onClick={handleBrowseClick}
                                            >
                                                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                                <p className="text-sm text-gray-600 font-medium">Drop file or browse</p>
                                                <p className="text-xs text-gray-500 mt-1 mb-3">
                                                    Format: jpeg, png & Max file size: 25 MB
                                                </p>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-gray-300"
                                                    onClick={handleButtonClick}
                                                >
                                                    Browse Files
                                                </Button>
                                            </div>

                                            {/* Hidden File Input */}
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleFileUpload}
                                                multiple
                                                accept=".jpeg,.jpg,.png"
                                                className="hidden"
                                            />

                                            {/* Uploaded Files Preview */}
                                            {uploadedFiles.length > 0 && (
                                                <div className="space-y-2">
                                                    {uploadedFiles.map((file, fileIndex) => (
                                                        <div key={fileIndex} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white">
                                                            <div className="flex items-center gap-3">
                                                                <FileText className="h-6 w-6 text-blue-500" />
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-700">{file.name}</p>
                                                                    <p className="text-xs text-gray-500">{file.size}</p>
                                                                </div>
                                                            </div>
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => removeFile(fileIndex)}
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                                <hr className="border-t border-gray-200 mt-8 mb-4" />
                            </div>
                        ))}

                        {/* Add Another Button */}
                        <div className="flex justify-start border-t-2 border-gray-200">
                            <Button type="button" onClick={addEducation} variant="link" className="text-green-500 px-0">
                                <Plus className="h-5 w-5 mr-2 text-green-500" />
                                <span className="font-medium text-green-500">Add Another Education</span>
                            </Button>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between pt-6 mt-6">
                            <Button type="button" onClick={onBack} variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                                Back
                            </Button>
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-8 text-white font-medium">
                                Next Step
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div >
    )
}