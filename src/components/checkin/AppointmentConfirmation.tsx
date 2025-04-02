import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Progress } from "../../components/ui/progress";
import { Checkbox } from "../../components/ui/checkbox";
import { Label } from "../../components/ui/label";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Printer,
} from "lucide-react";

interface AppointmentConfirmationProps {
  patientName?: string;
  appointmentTime?: string;
  estimatedWaitTime?: number;
  qrCodeData?: string;
  consentForms?: Array<{
    id: string;
    name: string;
    completed: boolean;
    expanded?: boolean;
    content?: string;
  }>;
}

const AppointmentConfirmation = ({
  patientName = "Sarah Johnson",
  appointmentTime = "Today, 2:30 PM",
  estimatedWaitTime = 25,
  qrCodeData = "https://example.com/qr/12345",
  consentForms = [
    {
      id: "form1",
      name: "General Consent for Treatment",
      completed: true,
      content:
        "I hereby consent to evaluation, testing, and treatment as directed by my physician or his/her designee at Urgent Care Clinic. I authorize the release of my medical information to process healthcare claims. I understand that I am responsible for charges not covered by insurance.",
    },
    {
      id: "form2",
      name: "HIPAA Privacy Acknowledgment",
      completed: true,
      content:
        "I acknowledge that I have received a copy of the Urgent Care Clinic Notice of Privacy Practices, which describes how my health information may be used and disclosed and how I can access this information. I understand that the Clinic reserves the right to change this notice at any time.",
    },
    {
      id: "form3",
      name: "Financial Responsibility",
      completed: false,
      content:
        "I understand that I am financially responsible for all charges whether or not paid by my insurance. I authorize payment of medical benefits to Urgent Care Clinic for services rendered. I understand that co-payments, deductibles, and non-covered services are due at the time of service.",
    },
    {
      id: "form4",
      name: "Medical History Form",
      completed: false,
      content:
        "Please provide accurate information about your medical history, including current medications, allergies, past surgeries, and chronic conditions. This information is crucial for providing you with safe and effective care during your urgent care visit.",
    },
  ],
}: AppointmentConfirmationProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("confirmation");
  const [forms, setForms] = useState(
    consentForms.map((form) =>
      form.id === "form1" ? { ...form, completed: true } : form,
    ),
  );
  const completedForms = forms.filter((form) => form.completed).length;
  const formCompletionPercentage = (completedForms / forms.length) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4 sm:mb-6 text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Appointment Confirmation
        </h1>
        <p className="text-gray-600">
          Your urgent care visit is confirmed. Please complete all required
          forms before arrival.
        </p>
      </div>

      <Tabs
        defaultValue="confirmation"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 mb-4 sm:mb-8">
          <TabsTrigger value="confirmation">Confirmation</TabsTrigger>
          <TabsTrigger value="forms">Consent Forms</TabsTrigger>
          <TabsTrigger value="checkin">Check-In</TabsTrigger>
        </TabsList>

        <TabsContent value="confirmation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                Appointment Details
              </CardTitle>
              <CardDescription>
                Your urgent care visit information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Patient</h3>
                  <p className="text-lg font-semibold">{patientName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Appointment Time
                  </h3>
                  <p className="text-lg font-semibold">{appointmentTime}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Location
                  </h3>
                  <p className="text-lg font-semibold">Urgent Care Clinic</p>
                  <p className="text-sm text-gray-500">
                    123 Medical Center Dr, Suite 100
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Estimated Wait Time
                  </h3>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-blue-500" />
                    <p className="text-lg font-semibold">
                      {estimatedWaitTime} minutes
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Forms Completion Status
                </h3>
                <Progress
                  value={formCompletionPercentage}
                  className="h-2 mb-2"
                />
                <div className="flex justify-between text-sm">
                  <span>
                    {completedForms} of {consentForms.length} completed
                  </span>
                  {formCompletionPercentage < 100 ? (
                    <span className="text-amber-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" /> Please complete
                      all forms
                    </span>
                  ) : (
                    <span className="text-green-600 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" /> All forms
                      completed
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("forms")}>
                Complete Forms
              </Button>
              <Button
                onClick={() => setActiveTab("checkin")}
                disabled={formCompletionPercentage < 100}
              >
                Proceed to Check-In
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="forms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Consent Forms</CardTitle>
              <CardDescription>
                Please review and complete all required forms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {forms.map((form) => (
                <div
                  key={form.id}
                  className="flex flex-col p-3 rounded-md border"
                >
                  <div className="flex items-start space-x-3 mb-2">
                    <Checkbox
                      id={form.id}
                      checked={form.completed}
                      onCheckedChange={() => {
                        const updatedForms = [...forms];
                        const formIndex = updatedForms.findIndex(
                          (f) => f.id === form.id,
                        );
                        if (formIndex !== -1) {
                          updatedForms[formIndex] = {
                            ...updatedForms[formIndex],
                            completed: !updatedForms[formIndex].completed,
                          };
                        }
                        setForms(updatedForms);
                      }}
                    />
                    <div className="space-y-1 flex-1">
                      <Label htmlFor={form.id} className="font-medium">
                        {form.name}
                      </Label>
                      <p className="text-sm text-gray-500">
                        Required for your urgent care visit
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        // Show content and allow completion
                        const updatedForms = [...forms];
                        const formIndex = updatedForms.findIndex(
                          (f) => f.id === form.id,
                        );
                        if (formIndex !== -1) {
                          // Toggle expanded state to show content
                          updatedForms[formIndex] = {
                            ...updatedForms[formIndex],
                            expanded: true,
                          };
                          setForms(updatedForms);
                        }
                      }}
                    >
                      {form.completed ? "Review" : "Complete"}
                    </Button>
                  </div>
                  {form.content && (form.expanded || form.completed) && (
                    <div className="mt-2 p-3 bg-gray-50 rounded text-sm space-y-4">
                      <div>{form.content}</div>
                      {!form.completed && (
                        <div className="flex justify-end pt-2">
                          <Button
                            size="sm"
                            onClick={() => {
                              const updatedForms = [...forms];
                              const formIndex = updatedForms.findIndex(
                                (f) => f.id === form.id,
                              );
                              if (formIndex !== -1) {
                                updatedForms[formIndex] = {
                                  ...updatedForms[formIndex],
                                  completed: true,
                                };
                                setForms(updatedForms);
                              }
                            }}
                          >
                            I Agree & Complete
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveTab("confirmation")}
              >
                Back
              </Button>
              <Button
                onClick={() => setActiveTab("checkin")}
                disabled={formCompletionPercentage < 100}
              >
                Proceed to Check-In
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="checkin" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Self-Service Check-In</CardTitle>
              <CardDescription>
                Scan this QR code at the clinic kiosk to check in
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <img
                  src={`https://wallpapers.com/images/hd/complex-q-r-code-pattern-2vc4e61vosv1szgj.jpg`}
                  alt="QR Code for check-in"
                  className="w-64 h-64"
                />
              </div>

              <div className="text-center space-y-2">
                <h3 className="font-semibold">Appointment ID: #12345</h3>
                <p className="text-sm text-gray-500">
                  When you arrive at the clinic, scan this QR code at the
                  self-service kiosk to complete your check-in process.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full max-w-md">
                <Button className="flex-1" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Save QR Code
                </Button>
                <Button className="flex-1" variant="outline">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Details
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("forms")}>
                Back to Forms
              </Button>
              <Button variant="default" onClick={() => navigate("/")}>
                Complete Check-In
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppointmentConfirmation;
