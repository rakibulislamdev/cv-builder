"use client"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from "react-redux"
import { updateEducation, setCurrentStep } from "@/lib/cvSlice"
import { Plus, Trash2 } from "lucide-react"
import { useState } from "react"

export default function Education() {
    const dispatch = useDispatch()
    const education = useSelector((state) => state.cv.education)

    const [educations, setEducations] = useState(
        education.length > 0 ? education : [
            { degree: "", institution: "", major: "", startDate: "", endDate: "" }
        ]
    )

    const addEducation = () => {
        setEducations([...educations, { degree: "", institution: "", major: "", startDate: "", endDate: "" }])
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

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updateEducation(educations))
        dispatch(setCurrentStep(5))
    }

    const onBack = () => {
        dispatch(setCurrentStep(3))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl shadow-xl">
                <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        Your Educational Background
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base">
                        Provide your academic qualifications and any relevant certifications to strengthen your resume.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-6">
                        {educations.map((edu, index) => (
                            <div key={index} className="space-y-4 p-4 border rounded-lg relative">
                                {educations.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        className="absolute top-2 right-2"
                                        onClick={() => removeEducation(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor={`degree-${index}`} className="text-sm font-medium">Your Degree</Label>
                                    <Input
                                        id={`degree-${index}`}
                                        placeholder="e.g., Bachelors, Masters"
                                        value={edu.degree}
                                        onChange={(e) => updateEducationItem(index, "degree", e.target.value)}
                                        className="w-full"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`institution-${index}`} className="text-sm font-medium">Institution Name</Label>
                                    <Input
                                        id={`institution-${index}`}
                                        placeholder="Dhaka University"
                                        value={edu.institution}
                                        onChange={(e) => updateEducationItem(index, "institution", e.target.value)}
                                        className="w-full"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`major-${index}`} className="text-sm font-medium">Major</Label>
                                    <Input
                                        id={`major-${index}`}
                                        placeholder="Electronic and Communication Engineering (ECE)"
                                        value={edu.major}
                                        onChange={(e) => updateEducationItem(index, "major", e.target.value)}
                                        className="w-full"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor={`startDate-${index}`} className="text-sm font-medium">Start Date</Label>
                                        <Input
                                            id={`startDate-${index}`}
                                            type="month"
                                            value={edu.startDate}
                                            onChange={(e) => updateEducationItem(index, "startDate", e.target.value)}
                                            className="w-full"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor={`endDate-${index}`} className="text-sm font-medium">End Date</Label>
                                        <Input
                                            id={`endDate-${index}`}
                                            type="month"
                                            value={edu.endDate}
                                            onChange={(e) => updateEducationItem(index, "endDate", e.target.value)}
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <Button type="button" onClick={addEducation} variant="outline" className="w-full">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Another Degree
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