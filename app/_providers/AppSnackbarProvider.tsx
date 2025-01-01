"use client";
import { SnackbarProvider } from "notistack";

import React from "react";
import type { ReactNode } from "react";

const AppSnackbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "right" }}>
      {children}
    </SnackbarProvider>
  );
};

export default AppSnackbarProvider;
