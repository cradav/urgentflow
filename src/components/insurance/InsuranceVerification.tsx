import React, { useState, useEffect } from "react";
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
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  CheckCircle,
  AlertCircle,
  DollarSign,
  CreditCard,
  Shield,
  Info,
  Loader2,
} from "lucide-react";

interface InsuranceDetails {
  insuranceProvider: string;
  memberId: string;
  groupNumber: string;
  planType: string;
  coverageStatus: "verified" | "pending" | "issues";
  coverageDetails?: {
    inNetwork: boolean;
    deductible: {
      individual: number;
      family: number;
      met: number;
      remaining: number;
    };
    copay: number;
    coinsurance: number;
  };
  estimatedCosts?: {
    visitFee: number;
    additionalServices: number;
    total: number;
  };
  issues?: string[];
}

interface InsuranceVerificationProps {
  insuranceDetails?: InsuranceDetails;
  onContinue?: () => void;
  onBack?: () => void;
}

const InsuranceVerification = ({
  insuranceDetails = {
    insuranceProvider: "Blue Shield California",
    memberId: "XYZ123456789",
    groupNumber: "G9876543",
    planType: "PPO",
    coverageStatus: "verified",
    coverageDetails: {
      inNetwork: true,
      deductible: {
        individual: 1500,
        family: 3000,
        met: 500,
        remaining: 1000,
      },
      copay: 25,
      coinsurance: 20,
    },
    estimatedCosts: {
      visitFee: 25,
      additionalServices: 0,
      total: 25,
    },
  },
  onContinue = () => console.log("Continue clicked"),
  onBack = () => console.log("Back clicked"),
}: InsuranceVerificationProps) => {
  const navigate = useNavigate();
  const [showAlternativePayment, setShowAlternativePayment] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  const handleShowAlternativePayment = () => {
    setShowAlternativePayment(true);
  };

  // Simulate verification process
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVerifying(false);
    }, 2500); // Show loading state for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-3 sm:p-4 bg-white rounded-lg">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-primary">
        Insurance Verification
      </h2>

      {isVerifying ? (
        <Card className="mb-6 border-blue-200">
          <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center min-h-[300px]">
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
            <h3 className="text-lg font-medium text-center mb-2">
              Verifying Insurance Information
            </h3>
            <p className="text-center text-muted-foreground">
              Please wait while we verify your insurance details with your
              provider. This usually takes less than a minute.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Insurance Information</span>
                {insuranceDetails.coverageStatus === "verified" && (
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" /> Verified
                  </Badge>
                )}
                {insuranceDetails.coverageStatus === "pending" && (
                  <Badge
                    variant="outline"
                    className="bg-yellow-50 text-yellow-700 border-yellow-200"
                  >
                    <Info className="h-4 w-4 mr-1" /> Pending
                  </Badge>
                )}
                {insuranceDetails.coverageStatus === "issues" && (
                  <Badge
                    variant="outline"
                    className="bg-red-50 text-red-700 border-red-200"
                  >
                    <AlertCircle className="h-4 w-4 mr-1" /> Issues
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                Your insurance information has been processed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Insurance Provider
                  </p>
                  <p className="font-medium">
                    {insuranceDetails.insuranceProvider}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member ID</p>
                  <p className="font-medium">{insuranceDetails.memberId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Group Number</p>
                  <p className="font-medium">{insuranceDetails.groupNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Plan Type</p>
                  <p className="font-medium">{insuranceDetails.planType}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {insuranceDetails.coverageStatus === "verified" &&
            insuranceDetails.coverageDetails && (
              <Card className="mb-6 border-green-200">
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-green-700 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Coverage Details
                  </CardTitle>
                  <CardDescription>
                    Your insurance coverage has been verified successfully.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-blue-500" />
                        <span className="font-medium">Network Status:</span>
                        <span className="ml-2">
                          {insuranceDetails.coverageDetails.inNetwork
                            ? "In-Network"
                            : "Out-of-Network"}
                        </span>
                      </div>

                      <div>
                        <p className="font-medium mb-2">
                          Deductible Information
                        </p>
                        <div className="pl-4 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Individual Deductible:
                            </span>
                            <span>
                              $
                              {insuranceDetails.coverageDetails.deductible.individual.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Family Deductible:
                            </span>
                            <span>
                              $
                              {insuranceDetails.coverageDetails.deductible.family.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Amount Met:
                            </span>
                            <span>
                              $
                              {insuranceDetails.coverageDetails.deductible.met.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Remaining:
                            </span>
                            <span>
                              $
                              {insuranceDetails.coverageDetails.deductible.remaining.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Copay:</span>
                        <span>${insuranceDetails.coverageDetails.copay}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Coinsurance:</span>
                        <span>
                          {insuranceDetails.coverageDetails.coinsurance}%
                        </span>
                      </div>
                      <Separator className="my-4" />
                      {insuranceDetails.estimatedCosts && (
                        <div>
                          <p className="font-medium mb-2">Estimated Costs</p>
                          <div className="bg-blue-50 p-4 rounded-md">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm">
                                Urgent Care Visit Fee:
                              </span>
                              <span>
                                ${insuranceDetails.estimatedCosts.visitFee}
                              </span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm">
                                Additional Services (est.):
                              </span>
                              <span>
                                $
                                {
                                  insuranceDetails.estimatedCosts
                                    .additionalServices
                                }
                              </span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between items-center font-bold">
                              <span>Estimated Total:</span>
                              <span>
                                ${insuranceDetails.estimatedCosts.total}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              *Final costs may vary based on services provided
                              during your visit
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

          {insuranceDetails.coverageStatus === "issues" && (
            <Card className="mb-6 border-red-200">
              <CardHeader className="bg-red-50">
                <CardTitle className="text-red-700 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Coverage Issues
                </CardTitle>
                <CardDescription>
                  We found some issues with your insurance information.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Verification Failed</AlertTitle>
                  <AlertDescription>
                    We were unable to verify your insurance coverage. Please
                    review the issues below.
                  </AlertDescription>
                </Alert>

                <ul className="list-disc pl-5 space-y-2 mb-6">
                  {insuranceDetails.issues?.map((issue, index) => (
                    <li key={index} className="text-red-700">
                      {issue}
                    </li>
                  )) || (
                    <>
                      <li className="text-red-700">
                        The member ID provided could not be found in the
                        insurance database.
                      </li>
                      <li className="text-red-700">
                        The insurance plan may be inactive or expired.
                      </li>
                      <li className="text-red-700">
                        The group number provided does not match our records.
                      </li>
                    </>
                  )}
                </ul>

                <div className="space-y-4">
                  <p className="font-medium">What would you like to do?</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      onClick={onBack}
                      className="flex-1"
                    >
                      Edit Insurance Information
                    </Button>
                    <Button
                      onClick={() => {
                        handleShowAlternativePayment();
                        navigate("/payment-options");
                      }}
                      className="flex-1"
                    >
                      Continue Without Insurance
                    </Button>
                  </div>
                </div>

                {showAlternativePayment && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-md">
                    <h3 className="font-medium text-lg mb-2 flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-blue-500" />
                      Alternative Payment Options
                    </h3>
                    <p className="mb-4">
                      You can still proceed with your visit using one of these
                      payment methods:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="p-3 bg-white rounded border border-gray-200">
                        <div className="flex items-center mb-2">
                          <CreditCard className="h-5 w-5 mr-2 text-gray-700" />
                          <span className="font-medium">Self-Pay</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Pay directly for services with credit card, debit
                          card, or cash.
                        </p>
                        <p className="font-medium mt-2">
                          Estimated cost: $150-$250
                        </p>
                      </div>

                      <div className="p-3 bg-white rounded border border-gray-200">
                        <div className="flex items-center mb-2">
                          <CreditCard className="h-5 w-5 mr-2 text-gray-700" />
                          <span className="font-medium">Payment Plan</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Spread your payment over multiple installments.
                        </p>
                        <p className="font-medium mt-2">
                          Available for bills over $100
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {insuranceDetails.coverageStatus === "pending" && (
            <Card className="mb-6 border-yellow-200">
              <CardHeader className="bg-yellow-50">
                <CardTitle className="text-yellow-700 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Verification Pending
                </CardTitle>
                <CardDescription>
                  We're still processing your insurance information.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Alert className="mb-6 bg-yellow-50 border-yellow-200 text-yellow-800">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Processing</AlertTitle>
                  <AlertDescription>
                    Your insurance information is being verified. This usually
                    takes just a few minutes.
                  </AlertDescription>
                </Alert>

                <p className="mb-4">You can:</p>
                <ul className="list-disc pl-5 space-y-2 mb-6">
                  <li>Wait for verification to complete</li>
                  <li>
                    Continue with your registration and we'll update your
                    coverage details when available
                  </li>
                  <li>
                    Edit your insurance information if you believe there might
                    be an error
                  </li>
                </ul>
              </CardContent>
            </Card>
          )}
        </>
      )}

      <CardFooter className="flex flex-wrap gap-2 px-0">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isVerifying}
          className="mr-auto"
        >
          Back
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            handleShowAlternativePayment();
            navigate("/payment-options");
          }}
          disabled={isVerifying}
        >
          Continue Without Insurance
        </Button>
        <Button
          onClick={() => {
            onContinue();
            navigate("/intake");
          }}
          disabled={isVerifying}
        >
          Continue
        </Button>
      </CardFooter>
    </div>
  );
};

export default InsuranceVerification;
