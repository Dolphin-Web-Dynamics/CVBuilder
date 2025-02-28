// context/AmplifyContext.tsx
"use client";

import React, { createContext, ReactNode, useContext } from "react";
import { Amplify } from "aws-amplify";
import outputs from "amplify_outputs.json";

// Configure Amplify once.
Amplify.configure(outputs);

interface AmplifyContextProps {
  // You can expose the Amplify client or any helper methods if needed.
  amplify: typeof Amplify;
}

const AmplifyContext = createContext<AmplifyContextProps | undefined>(
  undefined
);

export const AmplifyProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AmplifyContext.Provider value={{ amplify: Amplify }}>
      {children}
    </AmplifyContext.Provider>
  );
};

export const useAmplify = () => {
  const context = useContext(AmplifyContext);
  if (!context) {
    throw new Error("useAmplify must be used within an AmplifyProvider");
  }
  return context;
};
