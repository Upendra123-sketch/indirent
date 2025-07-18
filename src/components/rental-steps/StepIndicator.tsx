import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepNames: string[];
}

const StepIndicator = ({ currentStep, totalSteps, stepNames }: StepIndicatorProps) => {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {stepNames.map((stepName, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            const isLast = index === stepNames.length - 1;

            return (
              <React.Fragment key={stepName}>
                <div className="flex items-center cursor-pointer">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center border-2 font-medium transition-colors",
                      {
                        "bg-blue-600 text-white border-blue-600": isCompleted,
                        "bg-white text-blue-600 border-blue-600": isActive,
                        "border-gray-300 text-gray-400": !isActive && !isCompleted,
                      }
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span className="text-sm">{stepNumber}</span>
                    )}
                  </div>
                  <span
                    className={cn(
                      "ml-3 text-sm font-medium hidden md:block transition-colors",
                      {
                        "text-blue-600": isActive || isCompleted,
                        "text-gray-400": !isActive && !isCompleted,
                      }
                    )}
                  >
                    {stepName}
                  </span>
                </div>
                {!isLast && (
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-4 transition-colors",
                      {
                        "bg-blue-600": isCompleted,
                        "bg-gray-200": !isCompleted,
                      }
                    )}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
