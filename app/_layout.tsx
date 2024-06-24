import { Stack } from "expo-router";
import "../global.css";
import { AppProvider } from "@/context/AppContext";

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </AppProvider>
  );
}
