import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { ArrowRight, UserPlus, UserRound } from "lucide-react";

interface WelcomeSectionProps {
  title?: string;
  subtitle?: string;
  onNewPatientClick?: () => void;
  onReturningPatientClick?: () => void;
}

const WelcomeSection = ({
  title = "Welcome to Urgent Care Patient Intake",
  subtitle = "Complete your registration quickly and securely before your visit to reduce wait times and improve your care experience.",
  onNewPatientClick = () => console.log("New patient button clicked"),
  onReturningPatientClick = () =>
    console.log("Returning patient button clicked"),
}: WelcomeSectionProps) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12 bg-gradient-to-b from-blue-50 to-white rounded-lg shadow-sm overflow-hidden">
      <div className="text-center mb-4 sm:mb-6 md:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900 mb-2 sm:mb-3 md:mb-4">
          {title}
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-2">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto px-2 sm:px-0">
        <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all duration-300">
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <UserPlus className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-blue-800 mb-1 sm:mb-2">
                New Patient
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                First time visiting? Create your account and complete your
                registration.
              </p>
              <Button
                onClick={onNewPatientClick}
                className="w-full bg-blue-600 hover:bg-blue-700 text-sm sm:text-base"
              >
                Register Now{" "}
                <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-100 hover:border-green-300 transition-all duration-300">
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <UserRound className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-green-800 mb-1 sm:mb-2">
                Returning Patient
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Already registered? Sign in to your account to check in quickly.
              </p>
              <Button
                onClick={onReturningPatientClick}
                className="w-full bg-green-600 hover:bg-green-700 text-sm sm:text-base"
              >
                Sign In{" "}
                <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 sm:mt-12 text-center">
        <p className="text-xs sm:text-sm text-gray-500">
          Your information is protected by HIPAA-compliant security measures
        </p>
      </div>
    </div>
  );
};

export default WelcomeSection;
