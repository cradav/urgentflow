import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

// Lazy load components for better performance
const SymptomCollector = lazy(
  () => import("./components/intake/SymptomCollector"),
);
const DocumentScanner = lazy(
  () => import("./components/registration/DocumentScanner"),
);
const InsuranceVerification = lazy(
  () => import("./components/insurance/InsuranceVerification"),
);
const PaymentOptions = lazy(
  () => import("./components/payment/PaymentOptions"),
);
const CreditCardAuthorization = lazy(
  () => import("./components/payment/CreditCardAuthorization"),
);
const LocationDateSelection = lazy(
  () => import("./components/checkin/LocationDateSelection"),
);
const AppointmentConfirmation = lazy(
  () => import("./components/checkin/AppointmentConfirmation"),
);

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration/documents" element={<DocumentScanner />} />
          <Route path="/insurance" element={<InsuranceVerification />} />
          <Route path="/payment-options" element={<PaymentOptions />} />
          <Route
            path="/credit-card-authorization"
            element={<CreditCardAuthorization />}
          />
          <Route path="/intake" element={<SymptomCollector />} />
          <Route
            path="/location-selection"
            element={<LocationDateSelection />}
          />
          <Route path="/checkin" element={<AppointmentConfirmation />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
