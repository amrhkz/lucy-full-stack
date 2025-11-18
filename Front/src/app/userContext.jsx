"use client";
import { createContext, useEffect, useState } from "react";
import axios from "@/lib/axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/auth/profile")
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}
