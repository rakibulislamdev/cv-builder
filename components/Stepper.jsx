"use client"
import { useSelector } from "react-redux"

const steps = [
    { number: "01", title: "Personal Information" },
    { number: "02", title: "Career Summary" },
    { number: "03", title: "Skills & Experience" },
    { number: "04", title: "Education & Certifications" },
    { number: "05", title: "Contact Information" },
    { number: "06", title: "AI Resume Generation" },
    { number: "07", title: "Review & Download" }
]

export default function Stepper() {
    const currentStep = useSelector((state) => state.cv.currentStep)

    return (
        <div className="flex items-center justify-center py-6 bg-white border-b shadow-sm">
            <div className="flex items-center space-x-4 md:space-x-8 overflow-x-auto">
                {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center flex-shrink-0">
                        <div className={`flex flex-col items-center ${index + 1 === currentStep ? 'text-blue-600' :
                            index + 1 < currentStep ? 'text-green-600' : 'text-gray-400'
                            }`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${index + 1 === currentStep ? 'border-blue-600 bg-blue-50' :
                                index + 1 < currentStep ? 'border-green-600 bg-green-50' : 'border-gray-300'
                                }`}>
                                <span className={`font-semibold text-sm ${index + 1 === currentStep ? 'text-blue-600' :
                                    index + 1 < currentStep ? 'text-green-600' : 'text-gray-400'
                                    }`}>
                                    {step.number}
                                </span>
                            </div>
                            <span className="text-xs mt-2 font-medium whitespace-nowrap">
                                {step.title}
                            </span>
                        </div>

                        {index < steps.length - 1 && (
                            <div className={`w-8 md:w-12 h-0.5 mx-2 md:mx-4 ${index + 1 < currentStep ? 'bg-green-600' : 'bg-gray-300'
                                }`} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}