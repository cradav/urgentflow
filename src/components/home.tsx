import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import WelcomeSection from "./home/WelcomeSection";
import AuthenticationPanel from "./auth/AuthenticationPanel";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const [showAuthPanel, setShowAuthPanel] = useState(false);
  const [authType, setAuthType] = useState<"login" | "register">("login");

  const handleNewPatientClick = () => {
    setAuthType("register");
    setShowAuthPanel(true);
    window.scrollTo({
      top: document.getElementById("auth-section")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  const handleReturningPatientClick = () => {
    setAuthType("login");
    setShowAuthPanel(true);
    window.scrollTo({
      top: document.getElementById("auth-section")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  const handleAuthenticate = (userData: any) => {
    console.log("User authenticated:", userData);
    // Returning patients go to symptom collection after login
    navigate("/intake");
  };

  const handleRegister = (userData: any) => {
    console.log("User registered:", userData);
    // New patients go to document scanning after registration
    navigate("/registration/documents");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-grow">
        <section className="py-8 sm:py-12 md:py-20 bg-gradient-to-b from-blue-50 to-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <WelcomeSection
              onNewPatientClick={handleNewPatientClick}
              onReturningPatientClick={handleReturningPatientClick}
            />
          </motion.div>
        </section>

        {showAuthPanel && (
          <section
            id="auth-section"
            className="py-8 sm:py-12 md:py-16 bg-white"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="container mx-auto px-4"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-blue-900 mb-6 sm:mb-8">
                {authType === "login" ? "Welcome Back" : "Create Your Account"}
              </h2>
              <AuthenticationPanel
                defaultTab={authType}
                onAuthenticate={handleAuthenticate}
                onRegister={handleRegister}
              />
            </motion.div>
          </section>
        )}

        <section className="py-8 sm:py-12 md:py-16 bg-slate-100">
          <div className="container mx-auto px-3 sm:px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 mb-8">
              Why Use Our Patient Intake System?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <motion.div
                className="bg-white p-6 rounded-lg shadow-md"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Save Time
                </h3>
                <p className="text-gray-600">
                  Complete your registration before arriving at the clinic to
                  reduce wait times by up to 70%.
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-lg shadow-md"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Secure & Private
                </h3>
                <p className="text-gray-600">
                  Your information is protected with HIPAA-compliant security
                  measures and encryption.
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-lg shadow-md"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-purple-800 mb-2">
                  Paperless Process
                </h3>
                <p className="text-gray-600">
                  Eliminate paperwork with digital forms, consent signatures,
                  and document uploads.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
