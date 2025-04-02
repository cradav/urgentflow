import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  Upload,
  X,
  Check,
  FileText,
  CreditCard,
  User,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
interface DocumentScannerProps {
  onComplete?: (data: any) => void;
  isOpen?: boolean;
}

export const DocumentScanner = ({
  onComplete = () => {},
  isOpen = true,
}: DocumentScannerProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("id");
  const [scanMode, setScanMode] = useState<"camera" | "manual">("camera");
  const [scanningStatus, setScanningStatus] = useState<
    "idle" | "scanning" | "success" | "error"
  >("idle");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    // ID Data
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    idNumber: "",
    // Insurance Data
    insuranceProvider: "",
    memberId: "",
    groupNumber: "",
    policyHolderName: "",
    relationToPatient: "self",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const simulateScan = () => {
    setScanningStatus("scanning");

    // Simulate OCR processing delay
    setTimeout(() => {
      setScanningStatus("success");

      // Set different preview images based on the active tab
      if (activeTab === "id") {
        setPreviewImage("https://pbs.twimg.com/media/EOB9e79XUAETwQu.png");
        setFormData((prev) => ({
          ...prev,
          firstName: "Ima",
          lastName: "Cardholder",
          dateOfBirth: "1985-06-15",
          address: "123 Main Street",
          city: "Anytown",
          state: "CA",
          zipCode: "90210",
          idNumber: "DL12345678",
        }));
      } else {
        setPreviewImage(
          "https://www.blueshieldca.com/content/dam/bsca/en/shared/images/legacy/REF441914_1-21_BSCPHP_Medi-Cal_ID_Card_SD-front.jpg",
        );
        setFormData((prev) => ({
          ...prev,
          insuranceProvider: "HealthPlus Insurance",
          memberId: "MEM987654321",
          groupNumber: "GRP123456",
          policyHolderName: "Ima Cardholder",
        }));
      }
    }, 2000);
  };

  const handleContinue = () => {
    onComplete(formData);
    navigate("/insurance");
  };

  const resetScan = () => {
    setScanningStatus("idle");
    setPreviewImage(null);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-w-[95vw] sm:max-w-[600px] md:max-w-[800px] bg-white overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center text-primary">
            Document Scanner
          </DialogTitle>
          <DialogDescription className="text-center text-sm sm:text-base">
            Scan your ID and insurance card to automatically fill your
            information
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="id"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6">
            <TabsTrigger
              value="id"
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
            >
              <User size={14} className="sm:size-16" />
              ID Document
            </TabsTrigger>
            <TabsTrigger
              value="insurance"
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
            >
              <CreditCard size={14} className="sm:size-16" />
              Insurance Card
            </TabsTrigger>
          </TabsList>

          <TabsContent value="id" className="space-y-3 sm:space-y-4">
            <Card className="border-2 border-muted">
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="text-base sm:text-lg">
                  {activeTab === "id" ? "ID Document" : "Insurance Card"}{" "}
                  Scanner
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  {scanMode === "camera"
                    ? "Position your document within the frame and take a photo"
                    : "Enter your ID information manually"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
                {scanMode === "camera" ? (
                  <div className="space-y-3 sm:space-y-4">
                    {scanningStatus === "idle" && (
                      <div className="border-2 border-dashed border-muted rounded-lg p-4 sm:p-12 flex flex-col items-center justify-center bg-muted/20">
                        <Camera
                          size={36}
                          className="text-muted-foreground mb-2 sm:mb-4 sm:size-48"
                        />
                        <p className="text-center text-muted-foreground mb-2 sm:mb-4 text-xs sm:text-sm">
                          Position your ID card within the frame
                        </p>
                        <Button
                          onClick={simulateScan}
                          className="bg-primary hover:bg-primary/90 text-xs sm:text-sm"
                        >
                          Capture Image
                        </Button>
                      </div>
                    )}

                    {scanningStatus === "scanning" && (
                      <div className="border-2 border-dashed border-primary rounded-lg p-4 sm:p-12 flex flex-col items-center justify-center bg-primary/5">
                        <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-2 sm:mb-4" />
                        <p className="text-center text-primary font-medium text-xs sm:text-sm">
                          Scanning document...
                        </p>
                      </div>
                    )}

                    {scanningStatus === "success" && previewImage && (
                      <div className="space-y-2 sm:space-y-4">
                        <div className="relative">
                          <img
                            src={previewImage}
                            alt="Scanned document"
                            className="w-full h-[150px] sm:h-[200px] object-cover rounded-lg"
                          />
                          <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                            <Check size={16} />
                          </div>
                        </div>
                        <div className="bg-green-50 p-2 sm:p-3 rounded-lg border border-green-200 flex items-center gap-2">
                          <Check size={16} className="text-green-600" />
                          <p className="text-green-800 text-xs sm:text-sm">
                            Document scanned successfully! Information
                            extracted.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="firstName" className="text-xs sm:text-sm">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="text-xs sm:text-sm"
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="lastName" className="text-xs sm:text-sm">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="text-xs sm:text-sm"
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label
                        htmlFor="dateOfBirth"
                        className="text-xs sm:text-sm"
                      >
                        Date of Birth
                      </Label>
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="text-xs sm:text-sm"
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="idNumber" className="text-xs sm:text-sm">
                        ID Number
                      </Label>
                      <Input
                        id="idNumber"
                        name="idNumber"
                        value={formData.idNumber}
                        onChange={handleInputChange}
                        className="text-xs sm:text-sm"
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2 col-span-1 sm:col-span-2">
                      <Label htmlFor="address" className="text-xs sm:text-sm">
                        Address
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="text-xs sm:text-sm"
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="city" className="text-xs sm:text-sm">
                        City
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="text-xs sm:text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 col-span-1 sm:col-span-1">
                      <div className="space-y-1 sm:space-y-2">
                        <Label htmlFor="state" className="text-xs sm:text-sm">
                          State
                        </Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="text-xs sm:text-sm"
                        />
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <Label htmlFor="zipCode" className="text-xs sm:text-sm">
                          Zip Code
                        </Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="text-xs sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-3 sm:pt-4 p-3 sm:p-6">
                <Button
                  variant="outline"
                  onClick={() =>
                    setScanMode(scanMode === "camera" ? "manual" : "camera")
                  }
                  className="text-xs sm:text-sm"
                >
                  {scanMode === "camera" ? "Enter Manually" : "Use Camera"}
                </Button>
                {scanMode === "camera" && scanningStatus !== "idle" && (
                  <Button
                    variant="ghost"
                    onClick={resetScan}
                    className="text-xs sm:text-sm"
                  >
                    <X size={14} className="mr-1 sm:mr-2 sm:size-16" /> Reset
                    Scan
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="insurance" className="space-y-3 sm:space-y-4">
            <Card className="border-2 border-muted">
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="text-base sm:text-lg">
                  Insurance Card Scanner
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  {scanMode === "camera"
                    ? "Position your insurance card within the frame and take a photo"
                    : "Enter your insurance information manually"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
                {scanMode === "camera" ? (
                  <div className="space-y-3 sm:space-y-4">
                    {scanningStatus === "idle" && (
                      <div className="border-2 border-dashed border-muted rounded-lg p-4 sm:p-12 flex flex-col items-center justify-center bg-muted/20">
                        <Camera
                          size={36}
                          className="text-muted-foreground mb-2 sm:mb-4 sm:size-48"
                        />
                        <p className="text-center text-muted-foreground mb-2 sm:mb-4 text-xs sm:text-sm">
                          Position your insurance card within the frame
                        </p>
                        <Button
                          onClick={simulateScan}
                          className="bg-primary hover:bg-primary/90 text-xs sm:text-sm"
                        >
                          Capture Image
                        </Button>
                      </div>
                    )}

                    {scanningStatus === "scanning" && (
                      <div className="border-2 border-dashed border-primary rounded-lg p-4 sm:p-12 flex flex-col items-center justify-center bg-primary/5">
                        <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-2 sm:mb-4" />
                        <p className="text-center text-primary font-medium text-xs sm:text-sm">
                          Scanning document...
                        </p>
                      </div>
                    )}

                    {scanningStatus === "success" && previewImage && (
                      <div className="space-y-2 sm:space-y-4">
                        <div className="relative">
                          <img
                            src={previewImage}
                            alt="Scanned document"
                            className="w-full h-[150px] sm:h-[200px] object-cover rounded-lg"
                          />
                          <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                            <Check size={16} />
                          </div>
                        </div>
                        <div className="bg-green-50 p-2 sm:p-3 rounded-lg border border-green-200 flex items-center gap-2">
                          <Check size={16} className="text-green-600" />
                          <p className="text-green-800 text-xs sm:text-sm">
                            Insurance card scanned successfully! Information
                            extracted.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1 sm:space-y-2">
                      <Label
                        htmlFor="insuranceProvider"
                        className="text-xs sm:text-sm"
                      >
                        Insurance Provider
                      </Label>
                      <Input
                        id="insuranceProvider"
                        name="insuranceProvider"
                        value={formData.insuranceProvider}
                        onChange={handleInputChange}
                        className="text-xs sm:text-sm"
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="memberId" className="text-xs sm:text-sm">
                        Member ID
                      </Label>
                      <Input
                        id="memberId"
                        name="memberId"
                        value={formData.memberId}
                        onChange={handleInputChange}
                        className="text-xs sm:text-sm"
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label
                        htmlFor="groupNumber"
                        className="text-xs sm:text-sm"
                      >
                        Group Number
                      </Label>
                      <Input
                        id="groupNumber"
                        name="groupNumber"
                        value={formData.groupNumber}
                        onChange={handleInputChange}
                        className="text-xs sm:text-sm"
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label
                        htmlFor="policyHolderName"
                        className="text-xs sm:text-sm"
                      >
                        Policy Holder Name
                      </Label>
                      <Input
                        id="policyHolderName"
                        name="policyHolderName"
                        value={formData.policyHolderName}
                        onChange={handleInputChange}
                        className="text-xs sm:text-sm"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-3 sm:pt-4 p-3 sm:p-6">
                <Button
                  variant="outline"
                  onClick={() =>
                    setScanMode(scanMode === "camera" ? "manual" : "camera")
                  }
                  className="text-xs sm:text-sm"
                >
                  {scanMode === "camera" ? "Enter Manually" : "Use Camera"}
                </Button>
                {scanMode === "camera" && scanningStatus !== "idle" && (
                  <Button
                    variant="ghost"
                    onClick={resetScan}
                    className="text-xs sm:text-sm"
                  >
                    <X size={14} className="mr-1 sm:mr-2 sm:size-16" /> Reset
                    Scan
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <Separator className="my-3 sm:my-4" />

        <div className="flex justify-end gap-2">
          <Button variant="outline" className="text-xs sm:text-sm">
            Back
          </Button>
          <Button onClick={handleContinue} className="text-xs sm:text-sm">
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Keep default export for backward compatibility
export default DocumentScanner;
