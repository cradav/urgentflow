import React from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, Bell, HelpCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

interface HeaderProps {
  clinicName?: string;
  logoUrl?: string;
}

const Header = ({
  clinicName = "Catalyze Urgent Care",
  logoUrl = "https://framerusercontent.com/images/cFcHu84wTm9jxGwNg29aj6k5udU.png",
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 sm:h-20 items-center justify-between px-2 sm:px-4">
        {/* Logo and Clinic Name */}
        <div className="flex items-center gap-2">
          <img
            src={logoUrl}
            alt="Clinic Logo"
            className="h-8 w-8 sm:h-10 sm:w-10"
          />
          <h1 className="text-xl font-bold text-primary text-sm sm:text-xl">
            {clinicName}
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            to="/services"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Services
          </Link>
          <Link
            to="/locations"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Locations
          </Link>
          <Link
            to="/faq"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            FAQ
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">Help</span>
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
          <Button variant="default" className="hidden md:inline-flex">
            Sign In
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 py-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{clinicName}</h2>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                </div>
                <nav className="flex flex-col gap-4">
                  <Link
                    to="/"
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    Home
                  </Link>
                  <Link
                    to="/services"
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    Services
                  </Link>
                  <Link
                    to="/locations"
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    Locations
                  </Link>
                  <Link
                    to="/faq"
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    FAQ
                  </Link>
                </nav>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <User className="h-4 w-4" />
                    Account
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <Bell className="h-4 w-4" />
                    Notifications
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <HelpCircle className="h-4 w-4" />
                    Help & Support
                  </Button>
                  <Button variant="default" className="w-full mt-4">
                    Sign In
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
