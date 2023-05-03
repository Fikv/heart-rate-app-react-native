import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import SettingsScreen from './SettingsScreen';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLoginPress = () => {
      navigation.navigate('SettingsScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username       "
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      marginBottom: 10,
    },
    label: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: '#CCCCCC',
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
    },
    button: {
      backgroundColor: '#3498DB',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginTop: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 20,
    },
    image: {
      width: 200,
      height: 200,
      resizeMode: 'contain',
    },
  });

export default LoginScreen;