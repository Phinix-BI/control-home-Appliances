import { Text, View, StyleSheet, SafeAreaView, Image, StatusBar, FlatList } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InfoCard from "../../components/InfoCard";
import { useFocusEffect } from '@react-navigation/native';

const DEVICES_STORAGE_KEY = "devices";

const TabOneScreen = () => {
  const [devices, setDevices] = useState([]);

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
        }
      };
      fetchDevices();
    }, [])
  );

  const renderHeader = () => (
    <View style={styles.screenContainer}>
      {/* Header */}
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-4xl font-bold text-gray-300 tracking-wider">Welcome Home,</Text>
          <Text className="text-3xl font-extrabold tracking-wider text-gray-500">Biswajit Dey</Text>
        </View>
        <Image source={require("../../assets/images/man1.jpg")} style={styles.profileImage} />
      </View>

      {/* Energy Usage Card */}
      <View className="bg-[#f7759c] rounded-3xl p-5 mb-5 mt-7">
        <View className="flex-row justify-between mb-3 mt-3">
          <Text className="text-white text-2xl font-bold">Energy Usage</Text>
          <MaterialIcons name="more-horiz" size={24} color="#fff" />
        </View>
        <View className="bg-white w-full mb-5 mt-2" style={{ height: 0.4 }}></View>
        <View className="flex-row justify-between mb-3">
          <View>
            <Text className="text-white text-xs font-bold">Today</Text>
            <Text className="text-white text-xl font-bold">30.7 kWh</Text>
          </View>
          <View>
            <Text className="text-white text-xs font-bold">This month</Text>
            <Text className="text-white text-xl font-bold">235.37 kWh</Text>
          </View>
        </View>
      </View>

      {/* Places */}
      <View className="flex-row items-center mb-5 gap-2" style={{ backgroundColor: "#f1f5f9" }}>
        <View className="rounded-3xl shadow-xl bg-slate-50 p-3 border border-slate-200">
          <Text className="text-md font-bold text-gray-500">Favourites</Text>
        </View>
        <View className="rounded-3xl shadow-xl bg-slate-50 p-3 border border-slate-200">
          <Text className="text-md font-bold text-gray-500">Living Room</Text>
        </View>
        <View className="rounded-3xl shadow-xl bg-slate-50 p-3 border border-slate-200">
          <Text className="text-md font-bold text-gray-500">Bedroom</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f1f5f9" />
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="px-6">
            <InfoCard isTemperature={false} iconName="bulb" deviceName={item.deviceName} pinNo={item.pinNo} location={item.tagName} />
          </View>
        )}
        ListEmptyComponent={
          <View className="items-center">
            <Image source={require("../../assets/images/few.png")} style={{ width: 300, height: 260 }} />
            <Text className="text-center text-gray-500 mt-4">No devices added yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default TabOneScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },
  screenContainer: {
    backgroundColor: "#f1f5f9",
    marginTop: 20,
    paddingTop: 20,
    paddingHorizontal: 25,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
