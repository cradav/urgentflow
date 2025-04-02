import React from "react";
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
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ArrowRight, CreditCard, ArrowLeft, LockIcon } from "lucide-react";

const CreditCardAuthorization = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process payment and navigate to intake
    navigate("/intake");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Credit Card Authorization
        </h1>
        <p className="text-gray-600">
          Please enter your credit card information to continue
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5 text-blue-500" />
            Payment Information
          </CardTitle>
          <CardDescription>
            Your card will be charged after your visit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardName">Name on Card</Label>
                <Input
                  id="cardName"
                  placeholder="John Smith"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="4242 4242 4242 4242"
                  required
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    required
                    className="mt-1"
                    type="password"
                    maxLength={4}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-md">
              <div className="flex items-center text-blue-700 font-medium">
                <LockIcon className="h-5 w-5 mr-2" />
                Secure Payment
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Your payment information is encrypted and secure. We will only
                charge your card after your visit is complete.
              </p>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate("/payment-options")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleSubmit} className="gap-2">
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreditCardAuthorization;
