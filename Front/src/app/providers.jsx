"use client";
import { UserProvider } from "./userContext";

export function Providers({ children }) {
  return <UserProvider>{children}</UserProvider>;
}
