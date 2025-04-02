import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { AlertCircle, Mail, Lock, User, Phone, Calendar } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";

interface AuthenticationPanelProps {
  onAuthenticate?: (userData: any) => void;
  onRegister?: (userData: any) => void;
  defaultTab?: "login" | "register";
}

const AuthenticationPanel = ({
  onAuthenticate = () => {},
  onRegister = () => {},
  defaultTab = "login",
}: AuthenticationPanelProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    // For demo purposes, any email/password combination works
    if (email && password) {
      onAuthenticate({
        email,
        password,
        firstName: "John",
        lastName: "Doe",
        phone: "555-123-4567",
        dob: "1980-01-01",
      });
    } else {
      setLoginError("Please enter both email and password");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const firstName = (form.elements.namedItem("firstName") as HTMLInputElement)
      .value;
    const lastName = (form.elements.namedItem("lastName") as HTMLInputElement)
      .value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const dob = (form.elements.namedItem("dob") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    // Create a new user account
    onRegister({
      firstName,
      lastName,
      email,
      phone,
      dob,
      password,
    });
  };

  return (
    <div className="w-full max-w-[95%] sm:max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "login" | "register")}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="login"
            className="text-xs sm:text-sm py-1.5 sm:py-2"
          >
            Returning Patient
          </TabsTrigger>
          <TabsTrigger
            value="register"
            className="text-xs sm:text-sm py-1.5 sm:py-2"
          >
            New Patient
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card>
            <CardHeader className="px-4 py-3 sm:px-6 sm:py-4">
              <CardTitle className="text-lg sm:text-xl">
                Patient Login
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Welcome back! Please enter your credentials to access your
                account.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-2 sm:pb-4">
              <form onSubmit={handleLogin}>
                {loginError && (
                  <Alert
                    variant="destructive"
                    className="mb-3 sm:mb-4 text-xs sm:text-sm"
                  >
                    <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    <AlertDescription>{loginError}</AlertDescription>
                  </Alert>
                )}

                <div className="grid gap-3 sm:gap-4">
                  <div className="grid gap-1 sm:gap-2">
                    <Label htmlFor="email" className="text-xs sm:text-sm">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-2 sm:left-3 top-2 sm:top-3 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter any email"
                        className="pl-7 sm:pl-10 text-xs sm:text-sm h-8 sm:h-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-1 sm:gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-xs sm:text-sm">
                        Password
                      </Label>
                      <a
                        href="#"
                        className="text-xs sm:text-sm text-primary hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-2 sm:left-3 top-2 sm:top-3 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter any password"
                        className="pl-7 sm:pl-10 text-xs sm:text-sm h-8 sm:h-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" className="h-3 w-3 sm:h-4 sm:w-4" />
                    <Label
                      htmlFor="remember"
                      className="text-xs sm:text-sm font-normal"
                    >
                      Remember me for 30 days
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full text-xs sm:text-sm h-8 sm:h-10"
                  >
                    Sign In
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center justify-center pt-0 px-4 sm:px-6 pb-4 sm:pb-6">
              <p className="text-xs sm:text-sm text-muted-foreground mt-3 sm:mt-4">
                Don't have an account?
                <Button
                  variant="link"
                  className="pl-1 pr-0 text-primary text-xs sm:text-sm h-auto py-0"
                  onClick={() => setActiveTab("register")}
                >
                  Register now
                </Button>
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="register">
          <Card>
            <CardHeader className="px-4 py-3 sm:px-6 sm:py-4">
              <CardTitle className="text-lg sm:text-xl">
                New Patient Registration
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Create an account to streamline your urgent care visit.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-2 sm:pb-4">
              <form onSubmit={handleRegister}>
                {registerError && (
                  <Alert
                    variant="destructive"
                    className="mb-3 sm:mb-4 text-xs sm:text-sm"
                  >
                    <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    <AlertDescription>{registerError}</AlertDescription>
                  </Alert>
                )}

                <div className="grid gap-3 sm:gap-4">
                  <div className="grid grid-cols-2 gap-2 sm:gap-4">
                    <div className="grid gap-1 sm:gap-2">
                      <Label htmlFor="firstName" className="text-xs sm:text-sm">
                        First Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-2 sm:left-3 top-2 sm:top-3 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="John"
                          className="pl-7 sm:pl-10 text-xs sm:text-sm h-8 sm:h-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-1 sm:gap-2">
                      <Label htmlFor="lastName" className="text-xs sm:text-sm">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        className="text-xs sm:text-sm h-8 sm:h-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-1 sm:gap-2">
                    <Label htmlFor="email" className="text-xs sm:text-sm">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-2 sm:left-3 top-2 sm:top-3 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="patient@example.com"
                        className="pl-7 sm:pl-10 text-xs sm:text-sm h-8 sm:h-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-1 sm:gap-2">
                    <Label htmlFor="phone" className="text-xs sm:text-sm">
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-2 sm:left-3 top-2 sm:top-3 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        className="pl-7 sm:pl-10 text-xs sm:text-sm h-8 sm:h-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-1 sm:gap-2">
                    <Label htmlFor="dob" className="text-xs sm:text-sm">
                      Date of Birth
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-2 sm:left-3 top-2 sm:top-3 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                      <Input
                        id="dob"
                        name="dob"
                        type="date"
                        className="pl-7 sm:pl-10 text-xs sm:text-sm h-8 sm:h-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-1 sm:gap-2">
                    <Label htmlFor="password" className="text-xs sm:text-sm">
                      Create Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-2 sm:left-3 top-2 sm:top-3 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-7 sm:pl-10 text-xs sm:text-sm h-8 sm:h-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-start sm:items-center space-x-2">
                    <Checkbox
                      id="terms"
                      required
                      className="mt-0.5 sm:mt-0 h-3 w-3 sm:h-4 sm:w-4"
                    />
                    <Label
                      htmlFor="terms"
                      className="text-xs sm:text-sm font-normal"
                    >
                      I agree to the{" "}
                      <a href="#" className="text-primary hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full text-xs sm:text-sm h-8 sm:h-10"
                  >
                    Create Account
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center justify-center pt-0 px-4 sm:px-6 pb-4 sm:pb-6">
              <p className="text-xs sm:text-sm text-muted-foreground mt-3 sm:mt-4">
                Already have an account?
                <Button
                  variant="link"
                  className="pl-1 pr-0 text-primary text-xs sm:text-sm h-auto py-0"
                  onClick={() => setActiveTab("login")}
                >
                  Sign in
                </Button>
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthenticationPanel;
