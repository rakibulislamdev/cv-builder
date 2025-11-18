"use client"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useDispatch, useSelector } from "react-redux"
import { updateWorkExperience, setCurrentStep } from "@/lib/cvSlice"
import { Plus, Trash2 } from "lucide-react"
import { useState } from "react"

export default function WorkExperience() {
    const dispatch = useDispatch()
    const workExperience = useSelector((state) => state.cv.workExperience)

    const [experiences, setExperiences] = useState(
        workExperience.length > 0 ? workExperience : [
            { jobTitle: "", company: "", startDate: "", endDate: "", description: "" }
        ]
    )

    const addExperience = () => {
        setExperiences([...experiences, { jobTitle: "", company: "", startDate: "", endDate: "", description: "" }])
    }

    const removeExperience = (index) => {
        if (experiences.length > 1) {
            setExperiences(experiences.filter((_, i) => i !== index))
        }
    }

    const updateExperience = (index, field, value) => {
        const updated = experiences.map((exp, i) =>
            i === index ? { ...exp, [field]: value } : exp
        )
        setExperiences(updated)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updateWorkExperience(experiences))
        dispatch(setCurrentStep(4))
    }

    const onBack = () => {
        dispatch(setCurrentStep(2))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl shadow-xl">
                <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        Your Work Experience & Skills
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base">
                        Highlight your work experience and skills. The more detail you provide, the better the AI can tailor your resume to match job opportunities.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-6">
                        {experiences.map((exp, index) => (
                            <div key={index} className="space-y-4 p-4 border rounded-lg relative">
                                {experiences.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        className="absolute top-2 right-2"
                                        onClick={() => removeExperience(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor={`jobTitle-${index}`} className="text-sm font-medium">Job Title</Label>
                                        <Input
                                            id={`jobTitle-${index}`}
                                            placeholder="Mid-Level UI/UX Designer"
                                            value={exp.jobTitle}
                                            onChange={(e) => updateExperience(index, "jobTitle", e.target.value)}
                                            className="w-full"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor={`company-${index}`} className="text-sm font-medium">Company Name</Label>
                                        <Input
                                            id={`company-${index}`}
                                            placeholder="SM Technology (betopia Group)"
                                            value={exp.company}
                                            onChange={(e) => updateExperience(index, "company", e.target.value)}
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor={`startDate-${index}`} className="text-sm font-medium">Start Date</Label>
                                        <Input
                                            id={`startDate-${index}`}
                                            type="month"
                                            value={exp.startDate}
                                            onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                                            className="w-full"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor={`endDate-${index}`} className="text-sm font-medium">End Date</Label>
                                        <Input
                                            id={`endDate-${index}`}
                                            type="month"
                                            value={exp.endDate}
                                            onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`description-${index}`} className="text-sm font-medium">Job Description/Responsibilities</Label>
                                    <Textarea
                                        id={`description-${index}`}
                                        placeholder="An experienced marketing professional with over 5 years of expertise in digital marketing, specializing in SEO, social media strategies, and content creation."
                                        value={exp.description}
                                        onChange={(e) => updateExperience(index, "description", e.target.value)}
                                        className="w-full min-h-[100px]"
                                    />
                                </div>
                            </div>
                        ))}

                        <Button type="button" onClick={addExperience} variant="outline" className="w-full">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Another Work Experience
                        </Button>

                        <div className="flex justify-between pt-4">
                            <Button type="button" onClick={onBack} variant="outline">
                                Back
                            </Button>
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-8">
                                Next Step
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}