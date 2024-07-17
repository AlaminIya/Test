// EndTripScreen.js
import React, { useState, useEffect } from 'react';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import {
  SafeAreaView,
  Text,
  Button,
  StyleSheet,
  Alert,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const ProfileScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      ]).then(result => {
        if (
          result['android.permission.CAMERA'] !== PermissionsAndroid.RESULTS.GRANTED ||
          result['android.permission.READ_EXTERNAL_STORAGE'] !== PermissionsAndroid.RESULTS.GRANTED ||
          result['android.permission.WRITE_EXTERNAL_STORAGE'] !== PermissionsAndroid.RESULTS.GRANTED
        ) {
          Alert.alert('Permissions Denied', 'Please grant the necessary permissions to use this feature.');
        }
      });
    }
  }, []);

  const selectPhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = { uri: response.assets[0].uri };
        setPhoto(source);
      }
    });
  };

  const takePhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        const source = { uri: response.assets[0].uri };
        setPhoto(source);
      }
    });
  };


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
      contentContainerStyle={styles.containerKey}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
    >
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={selectPhoto}>
        {photo ? (
          <Image source={photo} style={styles.profilePhoto} />
        ) : (
          <Image
            source={require('../assets/images/react-logo.png')}
            style={styles.profilePhoto}
          />
        )}
        </TouchableOpacity>
        <Button title="Select Photo" onPress={selectPhoto} />
        <Button title="Take Photo" onPress={takePhoto} />
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('EditAccount')}
      >
        <Text style={styles.buttonText}>Edit Account</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('CustomerSupport')}
      >
        <Text style={styles.buttonText}>Customer Support</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => alert('Logging out...')}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      </View>
      </KeyboardAwareScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginBottom: 20,

  },
  containerKey: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30, 
  },
  button: {
    backgroundColor: 'tomato',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: 250,
    alignSelf: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    alignSelf: 'center',
  },
  
});

export default ProfileScreen;
