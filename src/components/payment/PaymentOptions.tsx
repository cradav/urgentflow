import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import {
  CreditCard,
  DollarSign,
  Calendar,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

interface PaymentOption {
  id: string;
  name: string;
  description: string;
  estimatedCost: string;
  icon: React.ReactNode;
}

interface PaymentOptionsProps {
  options?: PaymentOption[];
  onContinue?: (selectedOption: string) => void;
  onBack?: () => void;
}

const PaymentOptions = ({
  options = [
    {
      id: "self-pay",
      name: "Self-Pay",
      description:
        "Pay directly for services with credit card, debit card, or cash.",
      estimatedCost: "$150-$250",
      icon: <CreditCard className="h-5 w-5 text-blue-500" />,
    },
    {
      id: "payment-plan",
      name: "Payment Plan",
      description: "Spread your payment over multiple installments.",
      estimatedCost: "Available for bills over $100",
      icon: <Calendar className="h-5 w-5 text-green-500" />,
    },
    {
      id: "cash-discount",
      name: "Cash Discount",
      description: "Pay with cash at time of service for a 15% discount.",
      estimatedCost: "$125-$210",
      icon: <DollarSign className="h-5 w-5 text-yellow-500" />,
    },
  ],
  onContinue = () => {},
  onBack = () => {},
}: PaymentOptionsProps) => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleContinue = () => {
    if (selectedOption) {
      onContinue(selectedOption);

      // Navigate based on the selected payment option
      if (selectedOption === "self-pay") {
        navigate("/credit-card-authorization");
      } else {
        navigate("/intake");
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Payment Options
        </h1>
        <p className="text-gray-600">
          Select a payment method to continue with your urgent care visit
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-blue-500" />
            Alternative Payment Options
          </CardTitle>
          <CardDescription>
            Choose how you'd like to pay for your visit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedOption}
            onValueChange={setSelectedOption}
            className="space-y-4"
          >
            {options.map((option) => (
              <div
                key={option.id}
                className={`border rounded-lg p-4 transition-all ${selectedOption === option.id ? "border-blue-500 bg-blue-50" : ""}`}
              >
                <RadioGroupItem
                  value={option.id}
                  id={option.id}
                  className="absolute mt-1"
                />
                <div className="pl-7">
                  <div className="flex items-center">
                    <Label
                      htmlFor={option.id}
                      className="font-medium text-lg cursor-pointer flex items-center"
                    >
                      {option.icon}
                      <span className="ml-2">{option.name}</span>
                    </Label>
                  </div>
                  <p className="mt-2 text-gray-600">{option.description}</p>
                  <div className="mt-2 font-medium text-blue-700">
                    {option.estimatedCost}
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>

          <div className="mt-6 p-4 bg-blue-50 rounded-md">
            <h3 className="font-medium flex items-center text-blue-700">
              <CheckCircle className="h-5 w-5 mr-2" />
              What to expect
            </h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>You'll receive an itemized bill after your visit</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Payment is due at the time of service</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  We accept all major credit cards, debit cards, and cash
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  You can request an itemized receipt for submission to your
                  insurance for potential reimbursement
                </span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/insurance")}>
            Back
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!selectedOption}
            className="gap-2"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentOptions;
