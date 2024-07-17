import React, { useState, useEffect } from "react";
import MapViewDirections from "react-native-maps-directions";
import { Input } from 'react-native-elements';
import {
  SafeAreaView,
  Button,
  StyleSheet,
  Alert,
  View,
  ScrollView,
} from "react-native";
import Geolocation from "react-native-geolocation-service";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import axios from 'axios';

navigator.geolocation = require("react-native-geolocation-service");

const HomeScreen = ({ navigation }) => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [inputAddress, setInputAddress] = useState(""); // New state to manage user input

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location Permission Must be Granted");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      reverseGeocode(currentLocation.coords.latitude, currentLocation.coords.longitude);
      console.log(currentLocation);
    };
    getPermissions();
  }, []);

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBdAKh-02zePorzFF2fAcaxwztoBB4vg4o`
      );
      if (response.data.status === 'OK') {
        const address = response.data.results[0].formatted_address;
        setAddress(address);
        setInputAddress(address); // Update the user input state with the reversed address
        console.log('Reversed Address:', address);
      } else {
        console.log('Unable to fetch address');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [pin, setPin] = useState({
    latitude: 9.06146,
    longitude: 7.50064,
  });

  const [region, setRegion] = useState({
    latitude: 9.06146,
    longitude: 7.50064,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const StartTrip = () => {
    if (description) {
      navigation.navigate("End");
    } else {
      Alert.alert("Error", "Please fill all fields.");
    }
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>
          <GooglePlacesAutocomplete
            placeholder={ address || "Search"}
            minLength={2}
            autoFocus={false}
            returnKeyType={"search"}
            listViewDisplayed="auto"
            fetchDetails={true}
            onPress={(data, details = null) => {
              console.log(data, details);
              if (details) {
                setRegion({
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                });
                reverseGeocode(details.geometry.location.lat, details.geometry.location.lng);
              }
            }}
            textInputProps={{
              value: inputAddress,
              InputComp: Input,
              searchIcon: { type: "font-awesome", name: "chevron-left" },
              errorStyle: { color: "red" },
            }}
            query={{
              key: "AIzaSyBdAKh-02zePorzFF2fAcaxwztoBB4vg4o",
              language: "en",
              components: "country:ng",
            }}
            styles={{
              container: {
                flex: 0,
                position: "absolute",
                width: "auto",
                zIndex: 1,
              },
              listView: { backgroundColor: "white" },
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            GooglePlacesSearchQuery={{
              rankby: "distance",
            }}
            debounce={200}
            currentLocation={true}
            currentLocationLabel="Current location"
            enableHighAccuracyLocation={true}
            enablePoweredByContainer={false}
          />
        </View>
        <ScrollView>
          <MapView
            style={styles.map}
            showsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            initialRegion={region}
          >
            <MapViewDirections
              origin={{
                latitude: 9.06671951810564,
                longitude: 7.500622831285001,
              }}
              destination={{
                latitude: 9.08165917787545,
                longitude: 7.459656447172166,
              }}
              apikey="AIzaSyBdAKh-02zePorzFF2fAcaxwztoBB4vg4o"
              strokeWidth={10}
              strokeColor="hotPink"
            />
            <Marker coordinate={region} />
            <Marker
              coordinate={pin}
              draggable={true}
              onDragStart={(e) => {
                console.log("Drag Start", e.nativeEvent.coordinate);
              }}
              onDragEnd={(e) => {
                setPin({
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                });
                reverseGeocode(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude);
              }}
            />
            <View></View>
          </MapView>
        </ScrollView>
        <View style={styles.inputContainer}>
          <GooglePlacesAutocomplete
            placeholder="Enter Destination"
            minLength={2}
            autoFocus={false}
            returnKeyType={"search"}
            listViewDisplayed="auto"
            fetchDetails={true}
            onPress={(data, details = null) => {
              console.log(data, details);
              if (details) {
                setDescription(details.name || data.description);
                setRegion({
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                });
              }
            }}
            getDefaultValue={() => ""}
            query={{
              key: "AIzaSyBdAKh-02zePorzFF2fAcaxwztoBB4vg4o",
              language: "en",
              components: "country:ng",
            }}
            styles={{
              container: {
                flex: 0,
                width: "auto",
                position: "relative",
                zIndex: 1,
                marginTop: 50, // Adjust to fit below the first search box
              },
              listView: { backgroundColor: "white" },
            }}
            textInputProps={{
              InputComp: Input,
              searchIcon: { type: "font-awesome", name: "chevron-left" },
              errorStyle: { color: "red" },
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            GooglePlacesSearchQuery={{
              rankby: "distance",
            }}
            debounce={200}
            currentLocation={true}
            currentLocationLabel="Current location"
            enableHighAccuracyLocation={true}
            enablePoweredByContainer={false}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  inputContainer: {
    flex: 0,
    position: "absolute",
    marginTop: 10,
    alignSelf: "auto",
    justifyContent: "center",
    width: '100%',
    paddingHorizontal: 10,
    zIndex: 1,
  },
  map: {
    marginTop: 0,
    height: 800,
    flex: 0,
  },
  button: {
    width: 100,
    backgroundColor: "black",
    borderRadius: 6,
    alignSelf: "center",
    padding: 10,
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  highlight: {
    nextFocusForward: 1,
    nextFocusUp: 3,
  },
  search: {
    flex: 0,
    zIndex: 1,
    position: "absolute",
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
    marginLeft: 15,
    marginRight: 15,
  },
});

export default HomeScreen;
