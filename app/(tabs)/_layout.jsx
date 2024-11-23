import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

/**
 * Custom Tab Bar Component
 */
function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        // Skip rendering the middle slot for the floating button
        if (index === Math.floor(state.routes.length / 2)) {
          return <View key={route.key} style={{ flex: 1 }} />;
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            <Feather
              name={options.tabBarIconName}
              size={24}
              color={isFocused ? "#4B5563" : "#9CA3AF"}
            />
            <Text style={[styles.tabText, isFocused ? styles.tabTextFocused : {}]}>
              {options.title || route.name}
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* Floating Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("third")}
        style={styles.floatingButton}
      >
        <Feather name="plus" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

/**
 * Main Layout Component
 */
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIconName: getIconName(route.name),
        title: getTitle(route.name),
      })}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="two" />
      <Tabs.Screen
        name="third"
        options={{ tabBarButton: () => null }} // Hide from tabs
      />
      <Tabs.Screen name="four" />
      <Tabs.Screen name="five" />
    </Tabs>
  );
}

/**
 * Helper functions to assign icons and titles dynamically
 */
function getIconName(name) {
  switch (name) {
    case "index":
      return "home";
    case "two":
      return "clock";
    case "third": // Added support for 'third'
      return "plus";
    case "four":
      return "file-text";
    case "five":
      return "settings";
    default:
      return "plus";
  }
}

function getTitle(name) {
  switch (name) {
    case "index":
      return "Home";
    case "two":
      return "Schedule";
    case "third": // Added title for 'third'
      return "Create";
    case "four":
      return "Tasks";
    case "five":
      return "Settings";
    default:
      return "";
  }
}

/**
 * Styles for the tab bar and components
 */
const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    height: 70,
    alignItems: "center",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  tabText: {
    marginTop: 4,
    fontSize: 12,
    color: "#9CA3AF",
  },
  tabTextFocused: {
    color: "#4B5563",
    fontWeight: "bold",
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    left: "50%",
    transform: [{ translateX: -35 }],
    backgroundColor: "#4B5563",
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    elevation: 5,
  },
});
