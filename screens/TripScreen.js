// EndTripScreen.js
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Button,
  StyleSheet,
  Alert,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const TripScreen = ({ navigation }) => {
  const trips = [
    {
      id: "1",
      description: "Trip to Facility",
      duration: "45 mins",
      distance: "10 km",
    },
    {
      id: "2",
      description: "Trip to Facility",
      duration: "45 mins",
      distance: "10 km",
    },
    {
      id: "3",
      description: "Trip to Facility",
      duration: "45 mins",
      distance: "10 km",
    },
    {
      id: "4",
      description: "Trip to Facility",
      duration: "45 mins",
      distance: "10 km",
    },
    {
      id: "5",
      description: "Trip to Facility",
      duration: "45 mins",
      distance: "10 km",
    },

    // Add more trips as needed
  ];
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={styles.listView}>
          <Text style={styles.titleList}>Completed Trips</Text>
          <FlatList
            data={trips}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.trip}>
                  {item.description} {item.duration} {item.distance}
                </Text>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listView: {
    backgroundColor: "white",
    width: "auto",
    borderRadius: 30,
    marginTop: 20,
  },
  map: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',

},
titleList: {
    color: 'black',
    marginLeft: 30,
    marginTop: 10,
    fontWeight: 'bold',
    

},
trip: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingLeft: 80,
    paddingRight: 80,
    padding: 30,
    color: 'black',
    marginBottom: 15,
    marginTop: 10,
},
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 10,
    paddingLeft: 20,
  },
  buttonContainer: {
    margin: 20,
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    width: 100,
    backgroundColor: "black",
    borderRadius: 6,
    alignSelf: "center",
    padding: 10,
  },
});

export default TripScreen;
