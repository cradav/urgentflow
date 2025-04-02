import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Calendar } from "../ui/calendar";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import {
  MapPin,
  Clock,
  Calendar as CalendarIcon,
  Star,
  Phone,
  Building,
  ArrowRight,
} from "lucide-react";

interface Location {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  phone: string;
  waitTime: string;
  availableTimes: string[];
}

interface LocationDateSelectionProps {
  locations?: Location[];
  onComplete?: (locationId: string, date: Date, time: string) => void;
}

const LocationDateSelection = ({
  locations = [
    {
      id: "loc1",
      name: "Downtown Urgent Care",
      address: "123 Main Street, Suite 100",
      distance: "0.8 miles",
      rating: 4.7,
      phone: "(555) 123-4567",
      waitTime: "15-25 min",
      availableTimes: [
        "9:00 AM",
        "10:30 AM",
        "11:45 AM",
        "1:15 PM",
        "2:30 PM",
        "4:00 PM",
      ],
    },
    {
      id: "loc2",
      name: "Westside Medical Center",
      address: "456 Park Avenue",
      distance: "2.3 miles",
      rating: 4.5,
      phone: "(555) 987-6543",
      waitTime: "5-10 min",
      availableTimes: [
        "9:30 AM",
        "11:00 AM",
        "12:15 PM",
        "2:00 PM",
        "3:45 PM",
        "5:15 PM",
      ],
    },
    {
      id: "loc3",
      name: "Eastside Urgent Care",
      address: "789 Oak Street, Building B",
      distance: "3.5 miles",
      rating: 4.8,
      phone: "(555) 456-7890",
      waitTime: "30-40 min",
      availableTimes: [
        "8:45 AM",
        "10:15 AM",
        "12:30 PM",
        "1:45 PM",
        "3:15 PM",
        "4:45 PM",
      ],
    },
  ],
  onComplete = () => {},
}: LocationDateSelectionProps) => {
  const navigate = useNavigate();
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [selectedTime, setSelectedTime] = useState<string>("");

  const selectedLocation = locations.find(
    (loc) => loc.id === selectedLocationId,
  );

  const handleContinue = () => {
    if (selectedLocationId && selectedDate && selectedTime) {
      onComplete(selectedLocationId, selectedDate, selectedTime);
      navigate("/checkin");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Select Location & Appointment Time
        </h1>
        <p className="text-gray-600">
          Choose a convenient location and time for your urgent care visit
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-blue-500" />
              Nearby Locations
            </CardTitle>
            <CardDescription>
              Select from available urgent care locations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <RadioGroup
                value={selectedLocationId}
                onValueChange={setSelectedLocationId}
                className="space-y-4"
              >
                {locations.map((location) => (
                  <div
                    key={location.id}
                    className={`border rounded-lg p-4 transition-all ${selectedLocationId === location.id ? "border-blue-500 bg-blue-50" : ""}`}
                  >
                    <RadioGroupItem
                      value={location.id}
                      id={location.id}
                      className="absolute mt-1"
                    />
                    <div className="pl-7">
                      <div className="flex justify-between items-start">
                        <Label
                          htmlFor={location.id}
                          className="font-medium text-lg cursor-pointer"
                        >
                          {location.name}
                        </Label>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          <Clock className="mr-1 h-3 w-3" />
                          {location.waitTime}
                        </Badge>
                      </div>

                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <div className="flex items-start">
                          <Building className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>{location.address}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
                          <span>{location.distance}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="mr-2 h-4 w-4 flex-shrink-0" />
                          <span>{location.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="mr-2 h-4 w-4 text-yellow-500 flex-shrink-0" />
                          <span>{location.rating} / 5 rating</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5 text-blue-500" />
              Appointment Date & Time
            </CardTitle>
            <CardDescription>
              Select your preferred appointment slot
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <Label className="block mb-2">Select Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="border rounded-md p-3"
                  disabled={(date) => {
                    // Disable past dates and Sundays
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today || date.getDay() === 0;
                  }}
                />
              </div>

              <Separator />

              <div>
                <Label className="block mb-2">Available Times</Label>
                {selectedLocationId ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {selectedLocation?.availableTimes.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className={`justify-start ${selectedTime === time ? "bg-blue-500 text-white" : ""}`}
                        onClick={() => setSelectedTime(time)}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        {time}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500 italic p-4 text-center border rounded-md">
                    Please select a location first
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate("/intake")}>
              Back
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!selectedLocationId || !selectedDate || !selectedTime}
              className="gap-2"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LocationDateSelection;
