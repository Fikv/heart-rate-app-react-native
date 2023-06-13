import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { UserContext } from './UserContext';


const SaveResult = () => {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const { login } = useContext(UserContext);
  
  async function fetchDataWithPathVariable() {
    const apiUrl = 'http://192.168.0.12:8080/user/login/' + login;
  
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Request failed');
    }
    const data = await response.json();
    console.log(data)
    return data;
  }
  
  const saveData = async () => {
    const now = new Date();
    const id =  await fetchDataWithPathVariable();
    console.log(id)
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    const formattedDate = now.toLocaleString('en-GB', options);
    const data = {
      userId: parseInt(id),
      notificationId: 7,
      systolic: parseInt(systolic),
      diastolic: parseInt(diastolic),
      heartRate: parseInt(heartRate),
      dateOfMeasurement: null,
    };

    fetch('http://192.168.0.12:8080/results/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        alert('result saved.');
        console.log(login)
        console.log(result,login);
      })
      .catch(error => {
        
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Systolic</Text>
        <TextInput
          style={styles.input}
          value={systolic}
          onChangeText={text => setSystolic(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Diastolic</Text>
        <TextInput
          style={styles.input}
          value={diastolic}
          onChangeText={text => setDiastolic(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Heart Rate</Text>
        <TextInput
          style={styles.input}
          value={heartRate}
          onChangeText={text => setHeartRate(text)}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={saveData}>
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
    height: 40,
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