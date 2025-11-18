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
    // Assuming 'currentStep' is a number from 1 to 7, default to 1
    const currentStep = useSelector((state) => state.cv.currentStep) || 1

    // Calculate the percentage width for the green progress bar.
    const progressWidth = ((currentStep - 1) / (steps.length - 1)) * 100

    return (
        <div className="w-full px-4 py-6 sm:px-6 sm:py-10 bg-white">
            <div className="relative max-w-7xl mx-auto">


                <div className="absolute top-4 sm:top-6 left-[90px] right-4 h-0.5 bg-gray-300"></div>


                <div
                    className="absolute top-4 sm:top-6 left-[90px] h-0.5 bg-green-500 transition-all duration-500"

                    style={{ width: `${progressWidth}%` }}
                ></div>


                <div className="flex justify-between flex-wrap">
                    {steps.map((step, index) => {
                        const stepNum = index + 1
                        const isActive = stepNum === currentStep


                        const isCompleted = stepNum < currentStep

                        return (
                            <div
                                key={step.number}
                                className="flex flex-col items-center w-1/7 min-w-0"
                            >


                                <div
                                    className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg transition-all relative z-10
                                        ${!isActive
                                            ? 'bg-white text-gray-500 border-2 border-gray-300'
                                            : ''
                                        }
                                        ${isActive
                                            ? 'bg-green-500 text-white border-2 border-green-500'
                                            : ''
                                        }
                                    `}
                                >

                                    {step.number}
                                </div>


                                <div className="mt-2 sm:mt-4 text-center px-1">
                                    <span
                                        className={`block text-xs sm:text-sm font-medium 
                                            ${isActive
                                                ? 'text-green-600 font-bold'
                                                : 'text-gray-500'
                                            }`}
                                    >
                                        {step.title}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}