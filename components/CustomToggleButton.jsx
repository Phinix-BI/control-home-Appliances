import React, { useState, useEffect , useContext } from "react";
import { View, TouchableOpacity, Animated, StyleSheet, ToastAndroid } from "react-native";
import axios from 'axios';
import { ServerAddressContext } from "../context/ServerAddressContext";

const CustomToggleButton = ({
  isEnabled = false, // Initial state
  onToggle, // Callback function to handle toggle
  activeColor = "#E3F2FD", // Background color when enabled
  inactiveColor = "#F3F4F6", // Background color when disabled
  circleColor = "#FFFFFF", // Circle color
  pinNo
}) => {
  const translateX = useState(new Animated.Value(isEnabled ? 22 : 0))[0];
  const { serverAddress : ESP32_SERVER_URL } = useContext(ServerAddressContext);
  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isEnabled ? 22 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isEnabled]);

  const handleToggle = async() => {
    const power = isEnabled ? 'L' : 'H';
    try {
      onToggle(!isEnabled);
      const response = await axios.post(ESP32_SERVER_URL + "control_light", {
        pin: pinNo,
        state: power,
      });
      ToastAndroid.show("Action successful!", ToastAndroid.SHORT);
      console.log(response.data);
    } catch (error) {
      ToastAndroid.show("Check the server address", ToastAndroid.SHORT);
      console.error("Error toggling pin:", error);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handleToggle}
      style={[
        styles.container,
        { backgroundColor: isEnabled ? activeColor : inactiveColor },
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: circleColor,
            transform: [{ translateX }],
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 56, // Tailwind: w-14
    height: 32, // Tailwind: h-8
    borderRadius: 16, // Fully rounded
    padding: 2,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2, // Shadow for Android
  },
  circle: {
    width: 24, // Tailwind: w-6
    height: 24, // Tailwind: h-6
    borderRadius: 12, // Fully rounded
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Shadow for Android
  },
});

export default CustomToggleButton;
