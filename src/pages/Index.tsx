
import { useState } from "react";
import { SecurePassApp } from "@/components/secure-pass-app";
import { LandingPage } from "@/components/landing-page";
import { AnimatePresence } from "framer-motion";

const Index = () => {
  const [showLanding, setShowLanding] = useState(true);

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  return (
    <AnimatePresence mode="wait">
      {showLanding ? (
        <LandingPage key="landing" onGetStarted={handleGetStarted} />
      ) : (
        <SecurePassApp key="app" />
      )}
    </AnimatePresence>
  );
};

export default Index;
