import React from 'react';
import {Image ,View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('LoginScreen');
  };
  const handleRegisterPress = () => {
    navigation.navigate('RegisterScreen');
  };


  return (
    <View style={styles.container}>
     <Image
        source={{ uri: 'data:image/png;base64,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' }}
        style={{ width: 350, height: 300 }}
      />
      <Text style={styles.text}>Heart rate register App</Text>
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRegisterPress}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3498DB',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  text:{
    fontSize: 30,
    margin: 20,
    
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});

export default WelcomeScreen;