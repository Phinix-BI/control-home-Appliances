import React, { useState, useEffect, useContext, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  GestureResponderEvent,
  Image,
} from "react-native";
import ToastManager, { Toast } from "toastify-react-native";
import InfoCard from "../../components/InfoCard";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import GestureRecognizer from "react-native-swipe-gestures"; // Import gesture recognizer
import { MaterialIcons } from "@expo/vector-icons";
import { ServerAddressContext } from "../../context/ServerAddressContext"; // Import the ServerAddressContext

const DEVICES_STORAGE_KEY = "devices";
const SERVER_ADDRESS_KEY = "serverAddress";

const TabThreeScreen = () => {
  const [serverAddress, setServerAddress] = useState("");
  const [currentTab, setCurrentTab] = useState("allDevices");
  const [deviceName, setDeviceName] = useState("");
  const [tagName, setTagName] = useState("");
  const [pinNo, setPinNo] = useState("");
  const [devices, setDevices] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [editServerAddress, setEditServerAddress] = useState(false);
  const { saveServerAddress: saveContextServerAddress, serverAddress: ESP32_SERVER_URL } = useContext(ServerAddressContext);

  // Fetch stored devices from AsyncStorage on component mount

  useFocusEffect(
    useCallback(() => {
      const fetchDevices = async () => {
        try {
          const storedDevices = await AsyncStorage.getItem(DEVICES_STORAGE_KEY);
          if (storedDevices) {
            setDevices(JSON.parse(storedDevices));
          }
        } catch (error) {
          console.error("Failed to fetch devices:", error);
          ToastAndroid.show("Error fetching devices", ToastAndroid.SHORT);
        }
      };
      fetchDevices();
    }, [])
  );

  // save server address to AsyncStorage

  const saveLocalServerAddress = async (address) => {
    try {
      await saveContextServerAddress(address);
      setEditServerAddress(!editServerAddress);
      ToastAndroid.show("Server address saved!", ToastAndroid.SHORT); // Feedback to user
    } catch (error) {
      console.error("Failed to save server address:", error);
      ToastAndroid.show("Error saving server address", ToastAndroid.SHORT);
    }
  };

  // Save devices to AsyncStorage whenever they are updated
  const saveDevices = async (newDevices) => {
    try {
      await AsyncStorage.setItem(DEVICES_STORAGE_KEY, JSON.stringify(newDevices));
      setDevices(newDevices);
    } catch (error) {
      console.error("Failed to save devices:", error);
      ToastAndroid.show("Error saving devices", ToastAndroid.SHORT);
    }
  };

  // Handle adding a new device
  const handleAddDevice = () => {
    if (!deviceName || !tagName || !pinNo) {
      ToastAndroid.show("Please fill all fields!", ToastAndroid.SHORT);
      return;
    }

    const newDevice = { id: Date.now().toString(), deviceName, tagName, pinNo };
    const updatedDevices = [...devices, newDevice];
    saveDevices(updatedDevices);

    ToastAndroid.show("Device added successfully!", ToastAndroid.SHORT);
    setDeviceName("");
    setTagName("");
    setPinNo("");
  };

  // Handle deleting selected devices
  const handleDeleteDevice = (deviceId) => {
    const updatedDevices = devices.filter((device) => device.id !== deviceId);
    saveDevices(updatedDevices);
    setSelectedDevices(selectedDevices.filter((id) => id !== deviceId));
    ToastAndroid.show("Device deleted!", ToastAndroid.SHORT);
  };

  // Handle long press to select a device
  const handleLongPress = (deviceId) => {
    if (selectedDevices.includes(deviceId)) {
      setSelectedDevices(selectedDevices.filter((id) => id !== deviceId));
    } else {
      setSelectedDevices([...selectedDevices, deviceId]);
    }
  };

  // Render content for the current tab
  const renderTabContent = () => {
    if (currentTab === "allDevices") {
      return (
        <FlatList
          data={devices}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            // Inside the FlatList renderItem
            <TouchableOpacity
              onLongPress={() => handleLongPress(item.id)} // Long press to activate delete mode
              activeOpacity={0.8}
            >
              <View className="relative">
                <InfoCard
                  isTemperature={false}
                  iconName="bulb"
                  deviceName={item.deviceName}
                  pinNo={item.pinNo}
                  location={item.tagName}
                />
                {selectedDevices.includes(item.id) && (
                  <TouchableOpacity
                    onPress={() => handleDeleteDevice(item.id)}
                    className="absolute top-1 right-2"
                  >
                    <MaterialIcons name="delete" size={20} color="red" />
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>

          )}
          ListEmptyComponent={
            <View className="items-center mt-10">
              <Image source={require("../../assets/images/few.png")} style={{ width: 300, height: 280 }} />
              <Text className="text-center text-gray-500 mt-4">No devices added yet</Text>
            </View>
          }
        />
      );
    } else if (currentTab === "newDevices") {
      return (
        <View>
          <TextInput
            value={deviceName}
            onChangeText={setDeviceName}
            placeholder="Device name"
            className="border rounded-md p-3 mb-4 bg-gray-100 text-gray-800"
          />
          <View className="flex-row justify-between mb-4">
            <TextInput
              value={tagName}
              onChangeText={setTagName}
              placeholder="Tag Name"
              className="flex-1 border rounded-md p-3 bg-gray-100 text-gray-800 mr-2"
            />
            <TextInput
              value={pinNo}
              onChangeText={setPinNo}
              placeholder="Pin No"
              keyboardType="numeric"
              className="w-1/3 border rounded-md p-3 bg-gray-100 text-gray-800"
            />
          </View>
          <TouchableOpacity
            onPress={handleAddDevice}
            className="bg-[#60A5FA] rounded-md p-4"
          >
            <Text className="text-white text-center font-semibold">Submit</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  // Handle swipe gestures for tab switching
  const handleSwipe = (direction) => {
    if (direction === "SWIPE_LEFT" && currentTab === "allDevices") {
      setCurrentTab("newDevices");
    } else if (direction === "SWIPE_RIGHT" && currentTab === "newDevices") {
      setCurrentTab("allDevices");
    }
  };

  return (
    <GestureRecognizer
      onSwipe={(direction) => handleSwipe(direction)}
      style={{ flex: 1 }}
    >
      <View className="flex-1 bg-slate-100 px-4 py-6 mt-10">
        <View className="mb-5">
          <Text className="text-3xl font-bold text-gray-500 text-center">
            Connect It
          </Text>
        </View>
        <ToastManager style={{ top: 20 }} />
        <View>
          <TextInput
            value={editServerAddress ? serverAddress : ESP32_SERVER_URL}
            onChangeText={setServerAddress}
            placeholder="Enter server address"
            className="border rounded-md p-3 mb-4 bg-gray-100 text-gray-800"
          />
          <View className="absolute top-5 right-3">
            {!editServerAddress ?
              (<MaterialIcons name="edit" size={20} color="#60A5FA" onPress={() => setEditServerAddress(!editServerAddress)} />)
              : null
            }

          </View>
        </View>
        <TouchableOpacity
          onPress={() => saveLocalServerAddress(serverAddress)}
          className="bg-[#60A5FA] rounded-md p-4 mb-4"
        >
          <Text className="text-white text-center font-semibold">Submit</Text>
        </TouchableOpacity>

        <View className="flex-row justify-around border-b border-slate-200 mb-4">
          <TouchableOpacity
            onPress={() => setCurrentTab("allDevices")}
            className={`flex-1 pb-2 ${currentTab === "allDevices" ? "border-b-2 border-[#60A5FA]" : ""
              }`}
          >
            <Text
              className={`text-center font-semibold ${currentTab === "allDevices"
                  ? "text-[#60A5FA]"
                  : "text-gray-500"
                }`}
            >
              All Devices
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCurrentTab("newDevices")}
            className={`flex-1 pb-2 ${currentTab === "newDevices" ? "border-b-2 border-[#60A5FA]" : ""
              }`}
          >
            <Text
              className={`text-center font-semibold ${currentTab === "newDevices"
                  ? "text-[#60A5FA]"
                  : "text-gray-500"
                }`}
            >
              New Devices
            </Text>
          </TouchableOpacity>
        </View>

        {renderTabContent()}
      </View>
    </GestureRecognizer>
  );
};

export default TabThreeScreen;
