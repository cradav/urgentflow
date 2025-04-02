import React from "react";
import { Phone, Mail, MapPin, Heart } from "lucide-react";
import { Separator } from "../ui/separator";

interface FooterProps {
  clinicName?: string;
  address?: string;
  phone?: string;
  email?: string;
  privacyPolicyUrl?: string;
  termsOfServiceUrl?: string;
}

const Footer = ({
  clinicName = "Catalyze Urgent Care",
  address = "123 Healthcare Ave, Manhattan Beach, CA 90266",
  phone = "(310) 123-4567",
  email = "contact@urgentcareclinic.com",
  privacyPolicyUrl = "#",
  termsOfServiceUrl = "#",
}: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 py-4 sm:py-6 px-3 sm:px-4 md:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-4 sm:mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
              {clinicName}
            </h3>
            <div className="flex items-start space-x-2 text-slate-600 mb-2">
              <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
              <span>{address}</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600 mb-2">
              <Phone className="h-5 w-5 text-slate-400" />
              <span>{phone}</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600">
              <Mail className="h-5 w-5 text-slate-400" />
              <span>{email}</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Insurance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Legal</h3>
            <ul className="space-y-2 text-slate-600">
              <li>
                <a
                  href={privacyPolicyUrl}
                  className="hover:text-blue-600 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href={termsOfServiceUrl}
                  className="hover:text-blue-600 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  HIPAA Compliance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Patient Rights
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-slate-500">
          <p>
            &copy; {currentYear} {clinicName}. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center">
            <span>Made with</span>
            <Heart className="h-4 w-4 mx-1 text-red-500 inline" />
            <span>for better healthcare</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
