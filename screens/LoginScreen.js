import React, { useState } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text, View, SafeAreaView, TextInput, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native"; // Correct import for React Navigation

const LoginScreen = () => { // No need to destructure navigation here

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation(); // Correct hook for getting navigation object

    const login = () => {
        if (username === 'user' && password === 'password') {
            Alert.alert('Login Successful', `Welcome ${username}!`);
            navigation.navigate('Home');
        } else {
            Alert.alert('Login Failed', 'Invalid Username or Password');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <View style={styles.buttonContainer}>
                <GestureHandlerRootView>
                    <TouchableOpacity onPress={login} style={styles.button}>
                        <Text style={styles.buttonTitle}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('Start'); }} style={styles.button}>
                        <Text style={styles.buttonTitle}>Start Trip</Text>
                    </TouchableOpacity>
                </GestureHandlerRootView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 40,
        color: 'black',
        width: '80%',
        paddingLeft: 20,
        backgroundColor: 'white',
        marginVertical: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#03BA0A',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonTitle: {
        color: 'black',
        textAlign: 'center',
        fontSize: 16,
    },
    buttonContainer: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        width: '80%',
    },
});

export default LoginScreen;
