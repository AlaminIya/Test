import { useState } from "react";
import React from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text, View, Button, SafeAreaView, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const LogoutScreen = ({ navigation }) => {

    const [username, setUsername] = useState('');

    const logout = () => {
        Alert.alert('Logout Successful', `Goodbye ${username}!`);
        navigation.navigate('LoginScreen'); // Assuming you have a login screen to navigate back to
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Logout</Text>

            <Text style={styles.usernameLabel}>Username: {username}</Text>

            <View style={styles.buttonContainer}>
                <GestureHandlerRootView>
                    <TouchableOpacity onPress={logout} style={styles.button}>
                        <Text style={styles.buttonTitle}>Logout</Text>
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
    usernameLabel: {
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 40,
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
        flexDirection: 'row',
        justifyContent: 'center',
    }
});

export default LogoutScreen;
