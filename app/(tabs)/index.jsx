import { Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity,ScrollView, StatusBar } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from "react";
// import { StatusBar } from "expo-status-bar";
import InfoCard from "../../components/InfoCard";

const TabOneScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Set the StatusBar style */}
      <View>
      <StatusBar barStyle="dark-content" backgroundColor="#f1f5f9" />
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.screenContainer}>

      {/* header */}

      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-4xl font-bold text-gray-300 tracking-wider " >Welcome Home,</Text>
          <Text className="text-3xl font-extrabold tracking-wider text-gray-500"  >Biswajit Dey</Text>
        </View>
        <Image
          source={require("../../assets/images/man1.jpg")}
          style={styles.profileImage}
        />
      </View>

     {/* Energy Usage Card */}

     <View className="bg-[#f7759c] rounded-3xl p-5 mb-5 mt-7">
      {/* Card Header */}
      <View className="flex-row justify-between mb-3 mt-3">
        <Text className="text-white text-2xl font-bold">Energy Usage</Text>
        <MaterialIcons name="more-horiz" size={24} color="#fff" />
      </View>

       {/* horizontal line */}

      <View className="bg-white w-full mb-5 mt-2" style={{height:0.4}}></View>

      {/* Energy Details */}
      <View className="flex-row justify-between mb-3">
        <View>
          <Text className="text-white text-xs font-bold">Today</Text>
          <View className="flex-row">
          <Text className="text-white text-xl font-bold">30.7 kWh</Text>
          {/* <MaterialIcons name="arrow-drop-up" size={24} color="#fff"/> */}
          </View>
        </View>
        <View>
          <Text className="text-white text-xs font-bold">This month</Text>
          <View className="flex-row">
          <Text className="text-white text-xl font-bold">235.37 kWh</Text>
          {/* <MaterialIcons name="arrow-drop-up" size={24} color="#fff"/> */}
          </View>
  
        </View>
      </View>
    </View>

    {/* places */}
    <View className="flex-row  items-center mb-5 overflow-y-auto gap-2" style={{backgroundColor:'#f1f5f9'}}>
      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10}} style={{ backgroundColor: "white" }} > */}
      <View className="rounded-3xl shadow-xl bg-slate-50  p-3 border border-slate-200">
        <Text className="text-md font-bold text-gray-500">Favourites</Text>
      </View>
      
    
      <View className="rounded-3xl shadow-xl bg-slate-50 p-3 border border-slate-200">
        <Text className="text-md font-bold text-gray-500">Living Room</Text>
      </View>
      <View className="rounded-3xl shadow-xl bg-slate-50 p-3 border border-slate-200">
        <Text className="text-md font-bold text-gray-500">Bedroom</Text>
      </View>
      {/* </ScrollView> */}
    </View>

    {/* Cards Section */}
      <InfoCard isTemperature={true} temperature={29} humidity={72} location="Bedroom" />
      
      <InfoCard isTemperature={false} deviceName="Home Light" iconName="bulb" location="Bedroom" pinNo={5}/>

      <InfoCard isTemperature={false} deviceName="Night Light" iconName="bulb" location="Bedroom" pinNo={2}/>

      <InfoCard isTemperature={false} deviceName="Door Light" iconName="bulb" location="Outdoor" />

      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TabOneScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Ensures SafeAreaView takes the full height of the screen
    backgroundColor: "#f1f5f9", // Background color for safe area
  },
  screenContainer: {
    flex: 1, // Ensures View takes full remaining height
    backgroundColor: "#f1f5f9", // Matches the safe area background
    marginTop: 20,
    paddingTop:20,
    paddingHorizontal:25
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 20,
},
welcomeText: {
  fontSize: 18,
  color: '#aaa',
},
nameText: {
  fontSize: 24,
  fontWeight: 'bold',
},
profileImage: {
  width: 50,
  height: 50,
  borderRadius: 25,
},
});
