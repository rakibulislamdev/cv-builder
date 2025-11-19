"use client"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from "react-redux"
import { updatePersonalInfo, setCurrentStep } from "@/lib/cvSlice"
import { ChevronDown } from "lucide-react"


const COUNTRIES = [
    { value: "Bangladesh", label: "Bangladesh" },
    { value: "United States", label: "United States" },
    { value: "Canada", label: "Canada" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "Australia", label: "Australia" },
    { value: "Germany", label: "Germany" },
];
// ------------------------------------------------

export default function PersonalInfo() {
    const dispatch = useDispatch()


    const personalInfo = useSelector((state) => state.cv.personalInfo)


    const defaultFormValues = {
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        phone: personalInfo.phone,
        email: personalInfo.email,
        country: personalInfo.country || "Bangladesh",
        city: personalInfo.city,
        address: personalInfo.address,
        state: personalInfo.state,
        zipCode: personalInfo.zipCode,
    };
    // ---------------------------------

    const { register, handleSubmit, formState: { errors } } = useForm({

        defaultValues: defaultFormValues
    })

    const onSubmit = (data) => {
        dispatch(updatePersonalInfo(data))
        dispatch(setCurrentStep(2))
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <Card className="w-full max-w-5xl shadow-none border-0">
                <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        Tell Us About Yourself
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base">
                        Fill in your personal details so we can tailor your resume perfectly to your career goals.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name  */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                                <Input
                                    id="firstName"
                                    placeholder="e.g. John"
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
                                    placeholder="e.g. Doe"
                                    {...register("lastName", { required: "Last name is required" })}
                                    className="w-full"
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                                <Input
                                    id="phone"
                                    placeholder="e.g. +1 555-123-4567"
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
                                    placeholder="e.g. john.doe@example.com"
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

                        {/* Address */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


                                <div className="space-y-2 col-span-1">
                                    <Label htmlFor="country" className="text-sm font-medium">Country/Region</Label>
                                    <div className="relative">
                                        <select
                                            id="country"
                                            {...register("country")}
                                            className="w-full h-[40px] px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white appearance-none "
                                        >
                                            {COUNTRIES.map((country) => (
                                                <option key={country.value} value={country.value}>
                                                    {country.label}
                                                </option>
                                            ))}
                                        </select>

                                        <ChevronDown className="absolute md:left-70 left-90 top-1/2 transform -translate-y-1/2  text-gray-400 pointer-events-none" />
                                    </div>
                                    {errors.country && (
                                        <p className="text-red-500 text-sm">{errors.country.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2 col-span-2">
                                    <Label htmlFor="address" className="text-sm font-medium">Address</Label>
                                    <Input
                                        id="address"
                                        placeholder="e.g. 123 Main St."
                                        {...register("address")}
                                        className="w-full"
                                    />
                                </div>

                            </div>



                            <div className="grid grid-cols-3 gap-4">

                                <div className="space-y-2">
                                    <Label htmlFor="city" className="text-sm font-medium">City</Label>
                                    <Input
                                        id="city"
                                        placeholder="e.g. London"
                                        {...register("city")}
                                        className="w-full"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="state" className="text-sm font-medium">State</Label>
                                    <Input
                                        id="state"
                                        placeholder="e.g. Dhaka"
                                        {...register("state")}
                                        className="w-full"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="zipCode" className="text-sm font-medium">ZIP Code</Label>
                                    <Input
                                        id="zipCode"
                                        placeholder="e.g. 10001"
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