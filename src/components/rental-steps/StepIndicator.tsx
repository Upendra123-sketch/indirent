
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepNames: string[];
}

const StepIndicator = ({ currentStep, totalSteps, stepNames }: StepIndicatorProps) => {
  return (
    <div className="bg-indigo-900 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {stepNames.map((stepName, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            const isLast = index === stepNames.length - 1;

            return (
              <div key={stepName} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2",
                      {
                        "bg-white text-indigo-900 border-white": isActive,
                        "bg-green-600 border-green-600": isCompleted,
                        "border-gray-400 text-gray-400": !isActive && !isCompleted,
                      }
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4 text-white" />
                    ) : (
                      stepNumber
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-xs mt-1 text-center max-w-20",
                      {
                        "text-white font-medium": isActive,
                        "text-gray-300": !isActive,
                      }
                    )}
                  >
                    {stepName}
                  </span>
                </div>
                {!isLast && (
                  <div
                    className={cn(
                      "w-16 h-0.5 mx-2 mt-[-20px]",
                      {
                        "bg-green-600": isCompleted,
                        "bg-gray-400": !isCompleted,
                      }
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
