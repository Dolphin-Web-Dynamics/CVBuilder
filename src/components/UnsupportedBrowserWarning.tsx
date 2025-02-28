import { useEffect, useState } from "react";

const UnsupportedBrowserWarning = () => {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userAgent = navigator.userAgent;
      const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
      const isChromeIOS = /CriOS/i.test(userAgent);

      // Check if it's an iOS device and not Chrome
      if (isIOS && !isChromeIOS) {
        setShowWarning(true);
      }
    }
  }, []);

  return (
    showWarning && (
      <div
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "10px",
          textAlign: "center",
        }}
      >
        Browser not supported. Please use Chrome or switch to a desktop browser.
      </div>
    )
  );
};

export default UnsupportedBrowserWarning;
