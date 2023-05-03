import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';


const SaveResult = () => {
    return (
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>HH</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>MM</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Heart Rate</Text>
            <TextInput style={styles.input} />
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
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
        height: 40, // added this line
      },
      button: {
        backgroundColor: '#3498DB',
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
      },
      buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
      },
    });

export default SaveResult;