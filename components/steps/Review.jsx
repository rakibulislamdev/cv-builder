"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentStep } from "@/lib/cvSlice"
import { useState } from "react"
import { Download, Edit, Loader2 } from "lucide-react"

export default function Review() {
    const dispatch = useDispatch()
    const cvData = useSelector((state) => state.cv)
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedResume, setGeneratedResume] = useState("")

    const generateResume = async () => {
        setIsGenerating(true)
        try {
            const response = await fetch('/api/generate-resume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cvData),
            })

            const data = await response.json()
            setGeneratedResume(data.resume)
        } catch (error) {
            console.error('Error generating resume:', error)
            setGeneratedResume("Error generating resume. Please try again.")
        } finally {
            setIsGenerating(false)
        }
    }

    const onBack = () => {
        dispatch(setCurrentStep(6))
    }

    const downloadResume = () => {
        const element = document.createElement("a")
        const file = new Blob([generatedResume], { type: 'text/plain' })
        element.href = URL.createObjectURL(file)
        element.download = "resume.txt"
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }

    const editStep = (stepNumber) => {
        dispatch(setCurrentStep(stepNumber))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl shadow-xl">
                <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        {cvData.currentStep === 6 ? "AI Resume Magic" : "Review Your AI-Generated Resume"}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base">
                        {cvData.currentStep === 6
                            ? "Now, let's turn all the information you've provided into a professional resume! Our AI will generate a polished version that showcases your strengths and matches industry standards."
                            : "Take a moment to review your resume. You can make changes and regenerate if needed. When you're ready, download it and start applying!"
                        }
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {cvData.currentStep === 6 ? (
                        <div className="text-center py-8">
                            <div className="mb-4">
                                <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                                <p className="text-lg font-semibold">AI is refining your resume...</p>
                            </div>

                            <Button
                                onClick={generateResume}
                                disabled={isGenerating}
                                className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
                                size="lg"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                        Generating...
                                    </>
                                ) : (
                                    "Generate Resume"
                                )}
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Resume Preview */}
                            <div className="bg-white border rounded-lg p-6 space-y-4">
                                <div className="text-center border-b pb-4">
                                    <h2 className="text-2xl font-bold uppercase">
                                        {cvData.personalInfo.firstName} {cvData.personalInfo.lastName}
                                    </h2>
                                    <p className="text-lg text-gray-600">UX/UI Designer</p>
                                    <div className="flex justify-center gap-4 mt-2 text-sm">
                                        <span>{cvData.personalInfo.phone}</span>
                                        <span>{cvData.personalInfo.email}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{cvData.personalInfo.address}</p>
                                </div>

                                {/* Skills Section */}
                                <div>
                                    <h3 className="font-bold text-lg border-b mb-2">SKILLS</h3>
                                    <ul className="list-disc list-inside grid grid-cols-2 gap-1">
                                        {cvData.skills.map((skill, index) => (
                                            <li key={index} className="text-sm">{skill}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Work Experience */}
                                <div>
                                    <h3 className="font-bold text-lg border-b mb-2">WORK EXPERIENCE</h3>
                                    {cvData.workExperience.map((exp, index) => (
                                        <div key={index} className="mb-3">
                                            <div className="flex justify-between">
                                                <span className="font-semibold">{exp.jobTitle}</span>
                                                <span className="text-sm">
                                                    {exp.startDate} - {exp.endDate || 'Present'}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">{exp.company}</p>
                                            <p className="text-sm mt-1">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Education */}
                                <div>
                                    <h3 className="font-bold text-lg border-b mb-2">EDUCATION</h3>
                                    {cvData.education.map((edu, index) => (
                                        <div key={index} className="mb-2">
                                            <div className="flex justify-between">
                                                <span className="font-semibold">{edu.degree}</span>
                                                <span className="text-sm">
                                                    {edu.startDate} - {edu.endDate || 'Present'}
                                                </span>
                                            </div>
                                            <p className="text-sm">{edu.institution}</p>
                                            <p className="text-sm text-gray-600">{edu.major}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* AI Generated Content */}
                            {generatedResume && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <h4 className="font-bold text-lg mb-2">AI-Generated Resume Content:</h4>
                                    <p className="text-sm whitespace-pre-wrap">{generatedResume}</p>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
                                <div className="flex gap-2">
                                    <Button type="button" onClick={onBack} variant="outline">
                                        Back
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => editStep(1)}
                                        variant="outline"
                                    >
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Info
                                    </Button>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        onClick={generateResume}
                                        disabled={isGenerating}
                                        variant="outline"
                                    >
                                        {isGenerating ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                                Regenerating...
                                            </>
                                        ) : (
                                            "Regenerate"
                                        )}
                                    </Button>

                                    <Button
                                        onClick={downloadResume}
                                        className="bg-green-600 hover:bg-green-700"
                                        disabled={!generatedResume}
                                    >
                                        <Download className="h-4 w-4 mr-2" />
                                        Download Resume
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}