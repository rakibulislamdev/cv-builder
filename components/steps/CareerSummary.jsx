"use client"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useDispatch, useSelector } from "react-redux"
import { updateCareerSummary, setCurrentStep } from "@/lib/cvSlice"

export default function CareerSummary() {
    const dispatch = useDispatch()
    const careerSummary = useSelector((state) => state.cv.careerSummary)

    const { register, handleSubmit } = useForm({
        defaultValues: {
            jobTitle: "Mid-Level UI/UX Designer",
            summary: careerSummary || "An experienced marketing professional with over 5 years of expertise in digital marketing, specializing in SEO, social media strategies, and content creation."
        }
    })

    const onSubmit = (data) => {
        dispatch(updateCareerSummary(data.summary))
        dispatch(setCurrentStep(3))
    }

    const onBack = () => {
        dispatch(setCurrentStep(1))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-xl">
                <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        Your Career Overview
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base">
                        A strong career summary will make a lasting impression on recruiters. Let&apos;s create a summary that highlights your experience and goals.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="jobTitle" className="text-sm font-medium">Job Title</Label>
                            <Input
                                id="jobTitle"
                                placeholder="Enter your most recent or current job title"
                                {...register("jobTitle")}
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="summary" className="text-sm font-medium">Career Summary</Label>
                            <Textarea
                                id="summary"
                                placeholder="An experienced marketing professional with over 5 years of expertise in digital marketing, specializing in SEO, social media strategies, and content creation."
                                {...register("summary")}
                                className="w-full min-h-[120px]"
                            />
                        </div>

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