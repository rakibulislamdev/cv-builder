"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from "react-redux"
import { updateSkills, setCurrentStep } from "@/lib/cvSlice"
import { Plus, Trash2 } from "lucide-react"
import { useState } from "react"

export default function Skills() {
    const dispatch = useDispatch()
    const skills = useSelector((state) => state.cv.skills)

    const [skillList, setSkillList] = useState(skills.length > 0 ? skills : [""])

    const addSkill = () => {
        setSkillList([...skillList, ""])
    }

    const removeSkill = (index) => {
        if (skillList.length > 1) {
            setSkillList(skillList.filter((_, i) => i !== index))
        }
    }

    const updateSkill = (index, value) => {
        const updated = skillList.map((skill, i) => i === index ? value : skill)
        setSkillList(updated)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updateSkills(skillList.filter(skill => skill.trim() !== "")))
        dispatch(setCurrentStep(6))
    }

    const onBack = () => {
        dispatch(setCurrentStep(4))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-xl">
                <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        Your Skills
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base">
                        Add your technical skills, soft skills, and any other relevant abilities.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="space-y-4">
                            {skillList.map((skill, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <Input
                                        placeholder="e.g., UI/UX Design, Figma, JavaScript"
                                        value={skill}
                                        onChange={(e) => updateSkill(index, e.target.value)}
                                        className="flex-1"
                                    />
                                    {skillList.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => removeSkill(index)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <Button type="button" onClick={addSkill} variant="outline" className="w-full">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Another Skill
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