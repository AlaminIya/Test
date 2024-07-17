import React, { useState } from "react";
import { Input } from 'react-native-elements';
import {
  SafeAreaView,
  Button,
  StyleSheet,
  View,
  ScrollView,
  Text,
  Alert,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";

const AddTripScreen = ({ navigation }) => {
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [project, setProject] = useState("");

  const scheduleTrip = () => {
    if (description && destination && project ) {
      // Add logic for scheduling the trip
      console.log("Trip Scheduled with Description:", description, "and Destination:", destination, 'For:',project);
    } else {
      Alert.alert("Error", "Please fill all fields.");
    }
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Trip Schedule Form</Text>
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
                  setDestination(details.name || data.description);
                }
              }}
              query={{
                key: "AIzaSyBdAKh-02zePorzFF2fAcaxwztoBB4vg4o",
                language: "en",
                components: "country:ng",
              }}
              styles={{
                container: {
                  flex: 0,
                  width: "100%",
                  zIndex: 1,
                  marginTop: 10,
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
            <Input
              placeholder="Trip Description"
              value={description}
              onChangeText={setDescription}
              containerStyle={styles.input}
            />
            <Input
              placeholder="Project Name"
              value={project}
              onChangeText={setProject}
              containerStyle={styles.input}
            />
            <TouchableOpacity onPress={scheduleTrip} style={styles.button}>
           <Text style={styles.buttonText}> Schedule Trip </Text>
            </TouchableOpacity>
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
  formContainer: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 10,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'tomato',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    alignSelf: 'center',
  },
});

export default AddTripScreen;
