// src/app/providers/AuthProvider.tsx
"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getAuth, onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { getFirebaseApp } from "@/firebase";
import type { User } from "@/lib/types";

interface AuthContextValue {
  user: User | null;
}

const AuthContext = createContext<AuthContextValue>({ user: null });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth(getFirebaseApp());
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(
        u
          ? { uid: u.uid, email: u.email, displayName: u.displayName }
          : null,
      );
    });
    return unsub;
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
