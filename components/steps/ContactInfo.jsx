"use client"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from "react-redux"
import { updateContactInfo, setCurrentStep } from "@/lib/cvSlice"

export default function ContactInfo() {
    const dispatch = useDispatch()
    const contactInfo = useSelector((state) => state.cv.contactInfo)

    const { register, handleSubmit } = useForm({
        defaultValues: contactInfo
    })

    const onSubmit = (data) => {
        dispatch(updateContactInfo(data))
        dispatch(setCurrentStep(7))
    }

    const onBack = () => {
        dispatch(setCurrentStep(4))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-xl">
                <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        Your Contact Information
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base">
                        Include additional contact details and social media links to showcase your professional presence.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="linkedin" className="text-sm font-medium">LinkedIn Profile</Label>
                                <Input
                                    id="linkedin"
                                    placeholder="Enter your LinkedIn profile URL"
                                    {...register("linkedin")}
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="portfolio" className="text-sm font-medium">Personal Website/Portfolio</Label>
                                <Input
                                    id="portfolio"
                                    placeholder="Enter your personal website or portfolio URL"
                                    {...register("portfolio")}
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-4 border-t pt-4">
                                <Label className="text-sm font-medium">Other Social Media</Label>

                                <div className="space-y-2">
                                    <Label htmlFor="facebook" className="text-sm font-medium text-gray-600">Facebook</Label>
                                    <Input
                                        id="facebook"
                                        placeholder="URL"
                                        {...register("facebook")}
                                        className="w-full"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="otherSocial" className="text-sm font-medium text-gray-600">
                                        Enter other social media profiles (optional)
                                    </Label>
                                    <Input
                                        id="otherSocial"
                                        placeholder="Other social media URLs"
                                        {...register("otherSocial")}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between pt-4">
                            <Button type="button" onClick={onBack} variant="outline">
                                Back
                            </Button>
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-8">
                                Generate Resume
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}