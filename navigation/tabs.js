import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import EndScreen from "../screens/EndScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { StyleSheet, Text, View, Image } from "react-native";
import TripScreen from "../screens/TripScreen";
import AddTripScreen from "../screens/EndScreen";




const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Schedule") {
            iconName = focused ? "car" : "car";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person";
          } else if (route.name ==="Trip") {
            iconName = focused ? "book" : "book";
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: "#ffffff",
            borderRadius: 15,
            height: 90,
            ...styles.shadow,
          },
        ],
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Schedule" component={AddTripScreen} />
      <Tab.Screen name="Trip" component={TripScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
