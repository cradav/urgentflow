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
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Avatar } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import {
  MessageCircle,
  Send,
  ThumbsUp,
  AlertCircle,
  Thermometer,
  Clock,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface Symptom {
  id: string;
  name: string;
  severity: "mild" | "moderate" | "severe" | null;
  duration: string;
  notes: string;
}

interface SymptomCollectorProps {
  patientName?: string;
  initialMessages?: Message[];
  initialSymptoms?: Symptom[];
  onComplete?: (symptoms: Symptom[], chiefComplaint: string) => void;
}

const SymptomCollector = ({
  patientName = "Sarah Johnson",
  initialMessages = [
    {
      id: "1",
      content: `Hello! I'm your virtual medical assistant. I'll help collect information about your symptoms before your visit. What brings you in today?`,
      sender: "ai",
      timestamp: new Date(),
    },
  ],
  initialSymptoms = [],
  onComplete = () => {},
}: SymptomCollectorProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [symptoms, setSymptoms] = useState<Symptom[]>(initialSymptoms);
  const [currentSymptom, setCurrentSymptom] = useState<Symptom>({
    id: "",
    name: "",
    severity: null,
    duration: "",
    notes: "",
  });
  const [chiefComplaint, setChiefComplaint] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newUserMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      let responseContent = "";

      if (symptoms.length === 0) {
        responseContent =
          "I understand you're experiencing some discomfort. Let's add this as a symptom to track. Could you tell me how severe this is on a scale from mild to severe?";
        // Extract potential symptom from user message
        const potentialSymptom = {
          id: Date.now().toString(),
          name: inputValue,
          severity: null,
          duration: "",
          notes: "",
        };
        setCurrentSymptom(potentialSymptom);
        setActiveTab("symptoms");
      } else {
        responseContent =
          "Thank you for providing that information. Is there anything else you'd like to add about your symptoms or medical history?";
      }

      const aiResponse: Message = {
        id: Date.now().toString(),
        content: responseContent,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    }, 1000);
  };

  const handleAddSymptom = () => {
    if (!currentSymptom.name) return;

    setSymptoms([
      ...symptoms,
      { ...currentSymptom, id: Date.now().toString() },
    ]);
    setCurrentSymptom({
      id: "",
      name: "",
      severity: null,
      duration: "",
      notes: "",
    });
  };

  const handleComplete = () => {
    onComplete(symptoms, chiefComplaint);
    // Ensure we go to location selection after symptom collection
    navigate("/location-selection");
  };

  return (
    <div className="w-full max-w-[95%] sm:max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
        <h2 className="text-xl sm:text-2xl font-bold">Symptom Assessment</h2>
        <p>
          Please share your symptoms so we can better prepare for your visit
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            AI Assistant Chat
          </TabsTrigger>
          <TabsTrigger value="symptoms" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Symptom Tracker
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>Virtual Medical Assistant</CardTitle>
              <CardDescription>
                Chat with our AI to describe your symptoms and concerns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] sm:h-[400px] pr-2 sm:pr-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {message.sender === "ai" && (
                          <div className="flex items-center gap-2 mb-1">
                            <Avatar className="h-6 w-6">
                              <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=medical"
                                alt="AI Assistant"
                              />
                            </Avatar>
                            <span className="text-xs font-semibold">
                              Medical Assistant
                            </span>
                          </div>
                        )}
                        <p>{message.content}</p>
                        <div className="text-xs opacity-70 mt-1 text-right">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-center space-x-2">
                <Input
                  placeholder="Type your symptoms or questions here..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="symptoms" className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>Symptom Tracker</CardTitle>
              <CardDescription>
                Record and rate your symptoms for your upcoming visit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Current Symptoms</h3>
                  {symptoms.length > 0 ? (
                    <div className="space-y-3">
                      {symptoms.map((symptom) => (
                        <div key={symptom.id} className="border rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{symptom.name}</h4>
                              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                {symptom.severity && (
                                  <span className="flex items-center gap-1">
                                    <Thermometer className="h-3 w-3" />
                                    {symptom.severity}
                                  </span>
                                )}
                                {symptom.duration && (
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {symptom.duration}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          {symptom.notes && (
                            <p className="text-sm mt-2 text-gray-600">
                              {symptom.notes}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">
                      No symptoms recorded yet
                    </p>
                  )}
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-3">Add New Symptom</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="symptom-name">Symptom Description</Label>
                      <Input
                        id="symptom-name"
                        placeholder="e.g., Headache, Fever, Cough"
                        value={currentSymptom.name}
                        onChange={(e) =>
                          setCurrentSymptom({
                            ...currentSymptom,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label>Severity</Label>
                      <RadioGroup
                        value={currentSymptom.severity || ""}
                        onValueChange={(value) =>
                          setCurrentSymptom({
                            ...currentSymptom,
                            severity: value as "mild" | "moderate" | "severe",
                          })
                        }
                        className="flex flex-wrap gap-y-2 space-x-2 sm:space-x-4 mt-1"
                      >
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="mild" id="mild" />
                          <Label htmlFor="mild" className="cursor-pointer">
                            Mild
                          </Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="moderate" id="moderate" />
                          <Label htmlFor="moderate" className="cursor-pointer">
                            Moderate
                          </Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="severe" id="severe" />
                          <Label htmlFor="severe" className="cursor-pointer">
                            Severe
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        placeholder="e.g., 2 days, 1 week"
                        value={currentSymptom.duration}
                        onChange={(e) =>
                          setCurrentSymptom({
                            ...currentSymptom,
                            duration: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any other details about this symptom"
                        value={currentSymptom.notes}
                        onChange={(e) =>
                          setCurrentSymptom({
                            ...currentSymptom,
                            notes: e.target.value,
                          })
                        }
                      />
                    </div>

                    <Button onClick={handleAddSymptom} className="w-full">
                      Add Symptom
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <Label htmlFor="chief-complaint">
                    Chief Complaint (Main Reason for Visit)
                  </Label>
                  <Textarea
                    id="chief-complaint"
                    placeholder="Please summarize your main health concern in a few sentences"
                    value={chiefComplaint}
                    onChange={(e) => setChiefComplaint(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("chat")}>
                Back to Chat
              </Button>
              <Button onClick={handleComplete}>
                <ThumbsUp className="mr-2 h-4 w-4" />
                Complete Assessment
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SymptomCollector;
