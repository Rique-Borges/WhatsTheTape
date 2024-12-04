import { useRouter, useSegments } from "expo-router";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

interface AuthContextType {
  authToken: string | null;
  updateAuthToken: (newToken: string) => Promise<void>;
  removeAuthToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const segments = useSegments();
  const router = useRouter();

  console.log("Segments: ", segments);
  console.log("Auth token: ", authToken);

  // Redirect logic
  useEffect(() => {
    const isAuthGroup = segments[0] === "(auth)";

    if (!authToken && !isAuthGroup) {
      console.log("User is not signed in");
      router.replace("/signIn");
    } else if (authToken && isAuthGroup) {
      router.replace("/");
    }
  }, [segments, authToken]);

  // Load auth token from SecureStore on initialization
  useEffect(() => {
    const loadAuthToken = async () => {
      const res = await SecureStore.getItemAsync("authToken");
      if (res) {
        setAuthToken(res);
      }
    };
    loadAuthToken();
  }, []);

  const updateAuthToken = async (newToken: string) => {
    await SecureStore.setItemAsync("authToken", newToken);
    setAuthToken(newToken);
  };

  const removeAuthToken = async () => {
    await SecureStore.deleteItemAsync("authToken");
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, updateAuthToken, removeAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
