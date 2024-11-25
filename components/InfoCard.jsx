import React , {useState} from "react";
import { View, Text, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomToggleButton from "./CustomToggleButton";
const InfoCard = ({
  isTemperature = true,
  deviceName = "AC",
  temperature = 29,
  humidity = 72,
  activeHours = "8 hours",
  location = "Kitchen",
  iconName = "time-outline",
  iconColor = "#60A5FA",
  pinNo
}) => {

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const handleToggle = (newState) => {
    console.log("Switch State:", newState);
    setIsSwitchOn(newState);
  };

  return (
    <View className="bg-white rounded-2xl shadow-md p-6 mb-3">
      {/* First Row */}
      <View className="flex-row justify-between items-center mb-6">
        {/* Left Icon and Title */}
        <View className="flex-row items-center space-x-3" style={{maxWidth:130}}>
          <View className="bg-blue-100 rounded-full p-3 mr-4">
            <Ionicons
              name={isTemperature ? "thermometer-outline" : iconName}
              size={30}
              color={iconColor} // Tailwind blue-400
            />
          </View>
          <Text className="text-black font-bold text-2xl">
            {isTemperature ? "Temperature and humidity" : deviceName}
          </Text>
        </View>

        {/* Right: Battery or Switch */}
        <View className="flex-row items-center">
          {isTemperature ? (
            <Ionicons name="battery-full" size={34} color="#60A5FA" />
          ) : (
            <CustomToggleButton
        isEnabled={isSwitchOn}
        onToggle={handleToggle}
        activeColor="#60A5FA"
        inactiveColor="#F3F4F6"
        circleColor="#FFFFFF"
        pinNo={pinNo}
      />
          )}
        </View>
      </View>
        
        <View className="flex-row items-center justify-between">
      {/* Second Row: Temperature, Humidity, and Location */}
      <View className="flex-row gap-2 items-center">
        {isTemperature ? (
          <>
            {/* Temperature */}
            <View className="flex-row items-center">
              <Ionicons name="thermometer-outline" size={24} color="#9CA3AF" />
              <Text className="text-[#60A5FA] text-sm font-medium ml-1">
                {temperature}°
              </Text>
            </View>
            {/* Humidity */}
            <View className="flex-row items-center">
              <Ionicons name="water-outline" size={24} color="#9CA3AF" />
              <Text className="text-[#60A5FA] text-sm font-medium ml-1">
                {humidity}%
              </Text>
            </View>
          </>
        ) : (
          <>
            
            {/* Active Hours */}
            <View>
              <Text className="text-gray-700 text-sm">
                Active Hours: {activeHours}
              </Text>
            </View>
          </>
        )}

      </View>
      
        {/* Location (on the right side) */}
        <View className="p-2 bg-slate-200 rounded-3xl">
            <Text className="text-gray-500 text-xs font-bold">{location}</Text>
        </View>
      </View>
    </View>
  );
};

export default InfoCard;
