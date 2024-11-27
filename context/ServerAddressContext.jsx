import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SERVER_ADDRESS_KEY = "serverAddress";

export const ServerAddressContext = createContext();

export const ServerAddressProvider = ({ children }) => {
  const [serverAddress, setServerAddress] = useState("");

  // Load the server address on app startup
  useEffect(() => {
    const fetchServerAddress = async () => {
      try {
        const storedAddress = await AsyncStorage.getItem(SERVER_ADDRESS_KEY);
        if (storedAddress) {
          setServerAddress(storedAddress);
        }
      } catch (error) {
        console.error("Error fetching server address:", error);
      }
    };

    fetchServerAddress();
  }, []);

  // Save the server address to AsyncStorage
  const saveServerAddress = async (address) => {
    try {
      await AsyncStorage.setItem(SERVER_ADDRESS_KEY, address);
      setServerAddress(address);
    } catch (error) {
      console.error("Error saving server address:", error);
    }
  };

  return (
    <ServerAddressContext.Provider value={{ serverAddress, saveServerAddress }}>
      {children}
    </ServerAddressContext.Provider>
  );
};
