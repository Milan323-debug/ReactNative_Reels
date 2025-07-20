import SafeScreen from "@/components/SafeScreen";
import { AuthProvider } from "@/hooks/useAuth.jsx";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeScreen>
        <Slot />
      </SafeScreen>
    </AuthProvider>
  );
}
