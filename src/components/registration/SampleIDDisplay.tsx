import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Check, Camera } from "lucide-react";

interface SampleIDDisplayProps {
  onCapture?: () => void;
  onUseExample?: () => void;
}

const SampleIDDisplay = ({
  onCapture = () => console.log("Capture clicked"),
  onUseExample = () => console.log("Use example clicked"),
}: SampleIDDisplayProps) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="overflow-hidden border-2 border-dashed border-blue-300 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-3 text-blue-700">
              Sample ID
            </h3>
            <div className="relative w-full mb-4 bg-white rounded-md overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80"
                alt="Sample California Driver License"
                className="w-full h-auto object-cover"
                style={{ display: "none" }} /* Hide placeholder image */
              />
              <img
                src="https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/california-dl-sample.jpg"
                alt="Sample California Driver License"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                className="flex-1 bg-white hover:bg-blue-50"
                onClick={onCapture}
              >
                <Camera className="h-4 w-4 mr-2" />
                Capture Your ID
              </Button>
              <Button className="flex-1" onClick={onUseExample}>
                <Check className="h-4 w-4 mr-2" />
                Use Example
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SampleIDDisplay;
