import "../global.css";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { vars } from "nativewind";
import React , { memo, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {ServerAddressProvider} from "../context/ServerAddressContext";
 
// Prevent the splash screen from auto-hiding until we are ready to hide it.

SplashScreen.preventAutoHideAsync();

const theme = vars({
  "--theme-fg": "black",
  "--theme-bg": "rgba(230,230,230,1)",
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
};



function RootLayoutNav() {
  return (
    <ServerAddressProvider>
    <View style={[theme, StyleSheet.absoluteFill]}> 
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </View>
    </ServerAddressProvider>
  );
}
