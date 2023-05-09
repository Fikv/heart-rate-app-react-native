import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SaveResult from './SaveResult';

const SettingsScreen = () => {
    const navigation = useNavigation();

    const handleSave = () => {
        navigation.navigate('SaveResult');
    };
    
    const handleResults = () => {
        navigation.navigate('ResultScreen');
    };

    const handleNotification = () => {
      navigation.navigate('NotificationScreen');
  };

 return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={handleSave}>Save the Measurement</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleResults}>
            <Text style={styles.buttonText}>View Results</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNotification}>
            <Text style={styles.buttonText}>Notification Settings</Text>
          </TouchableOpacity>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      button: {
        backgroundColor: '#3498DB',
        borderRadius: 30,
        padding: 30,
        marginBottom: 60,
        width: '80%',
        alignItems: 'center',
      },
      buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
      },
    });

export default SettingsScreen;
