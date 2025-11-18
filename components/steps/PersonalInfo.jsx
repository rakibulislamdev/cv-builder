"use client"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from "react-redux"
import { updatePersonalInfo, setCurrentStep } from "@/lib/cvSlice"

export default function PersonalInfo() {
    const dispatch = useDispatch()
    const personalInfo = useSelector((state) => state.cv.personalInfo)

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: personalInfo
    })

    const onSubmit = (data) => {
        dispatch(updatePersonalInfo(data))
        dispatch(setCurrentStep(2))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-xl">
                <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        Tell Us About Yourself
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base">
                        Fill in your personal details so we can tailor your resume perfectly to your career goals.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                                <Input
                                    id="firstName"
                                    placeholder="Salfur"
                                    {...register("firstName", { required: "First name is required" })}
                                    className="w-full"
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                                <Input
                                    id="lastName"
                                    placeholder="Rahman"
                                    {...register("lastName", { required: "Last name is required" })}
                                    className="w-full"
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Contact Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                                <Input
                                    id="phone"
                                    placeholder="+880 1567808747"
                                    {...register("phone", { required: "Phone number is required" })}
                                    className="w-full"
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm">{errors.phone.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="ux.salfur.info@gmail.com"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                    className="w-full"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Address Section */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="country" className="text-sm font-medium">Country/Region</Label>
                                    <Input
                                        id="country"
                                        placeholder="Bangladesh"
                                        {...register("country")}
                                        className="w-full"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="city" className="text-sm font-medium">City</Label>
                                    <Input
                                        id="city"
                                        placeholder="Dhaka"
                                        {...register("city")}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address" className="text-sm font-medium">Address</Label>
                                <Input
                                    id="address"
                                    placeholder="Section-06, Mirpur, Dhaka"
                                    {...register("address")}
                                    className="w-full"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="state" className="text-sm font-medium">State</Label>
                                    <Input
                                        id="state"
                                        placeholder="Dhaka"
                                        {...register("state")}
                                        className="w-full"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="zipCode" className="text-sm font-medium">ZIP Code</Label>
                                    <Input
                                        id="zipCode"
                                        placeholder="1216"
                                        {...register("zipCode")}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
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