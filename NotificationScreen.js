import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { UserContext } from './UserContext';

const NotificationScreen = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValues, setInputValues] = useState([]);
  const { login } = useContext(UserContext);

  useEffect(() => {
    fetch('http://192.168.0.12:8080/notifications/get/' + login)
      .then((response) => response.json())
      .then((data) => {
        const { hours } = data;
        const inputValuesArray = hours.split(',');
        setInputValues(inputValuesArray);
        setSelectedOption(getSelectedOption(inputValuesArray.length));
      })
      .catch((error) => {
        console.error('Error retrieving notification:', error);
      });
  }, []);

  const getSelectedOption = (length) => {
    switch (length) {
      case 1:
        return 'One measurement per day';
      case 2:
        return 'Two measurements per day';
      case 3:
        return 'Three measurements per day';
      default:
        return '';
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);

    switch (option) {
      case 'One measurement per day':
        setInputValues([0]);
        break;
      case 'Two measurements per day':
        setInputValues([0, 0]);
        break;
      case 'Three measurements per day':
        setInputValues([0, 0, 0]);
        break;
      default:
        setInputValues([]);
        break;
    }
  };

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const handleAddNotification = () => {
    const dto = {
      userName: 'Fik',
      dayOfTheWeek: 1,
      hours: inputValues.join(','),
    };

    fetch('http://192.168.0.12:8080/notifications/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Notification added successfully:', data);
      })
      .catch((error) => {
        console.error('Error adding notification:', error);
      });
  };

  const renderInputs = () => {
    switch (selectedOption) {
      case 'One measurement per day':
        return (
          <TextInput
            style={{ borderWidth: 1, borderColor: 'gray', padding: 5, margin: 10 }}
            value={inputValues[0]}
            onChangeText={(value) => handleInputChange(0, value)}
            placeholder="Enter value"
          />
        );
      case 'Two measurements per day':
        return (
          <>
            <TextInput
              style={{ borderWidth: 1, borderColor: 'gray', padding: 5, margin: 10 }}
              value={inputValues[0]}
              onChangeText={(value) => handleInputChange(0, value)}
              placeholder="Enter first value"
            />
            <TextInput
              style={{ borderWidth: 1, borderColor: 'gray', padding: 5, margin: 10 }}
              value={inputValues[1]}
              onChangeText={(value) => handleInputChange(1, value)}
              placeholder="Enter second value"
            />
          </>
        );
      case 'Three measurements per day':
        return (
          <>
            <TextInput
              style={{ borderWidth: 1, borderColor: 'gray', padding: 5, margin: 10 }}
              value={inputValues[0]}
              onChangeText={(value) => handleInputChange(0, value)}
              placeholder="Enter first value"
            />
            <TextInput
              style={{ borderWidth: 1, borderColor: 'gray', padding: 5, margin: 10 }}
              value={inputValues[1]}
              onChangeText={(value) => handleInputChange(1, value)}
              placeholder="Enter second value"
            />
            <TextInput
              style={{ borderWidth: 1, borderColor: 'gray', padding: 5, margin: 10 }}
              value={inputValues[2]}
              onChangeText={(value) => handleInputChange(2, value)}
              placeholder="Enter third value"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
        onPress={() => handleOptionSelect('One measurement per day')}
        style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}
      >
        <Text style={{ fontSize: 16, marginRight: 10 }}>One measurement per day</Text>
        <View
          style={{
            height: 20,
            width: 20,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {selectedOption === 'One measurement per day' && (
            <View
              style={{
                height: 10,
                width: 10,
                borderRadius: 5,
                backgroundColor: 'black',
              }}
            />
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleOptionSelect('Two measurements per day')}
        style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}
      >
        <Text style={{ fontSize: 16, marginRight: 10 }}>Two measurements per day</Text>
        <View
          style={{
            height: 20,
            width: 20,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {selectedOption === 'Two measurements per day' && (
            <View
              style={{
                height: 10,
                width: 10,
                borderRadius: 5,
                backgroundColor: 'black',
              }}
            />
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleOptionSelect('Three measurements per day')}
        style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}
      >
        <Text style={{ fontSize: 16, marginRight: 10 }}>Three measurements per day</Text>
        <View
          style={{
            height: 20,
            width: 20,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {selectedOption === 'Three measurements per day' && (
            <View
              style={{
                height: 10,
                width: 10,
                borderRadius: 5,
                backgroundColor: 'black',
              }}
            />
          )}
        </View>
      </TouchableOpacity>
      {renderInputs()}
      <TouchableOpacity onPress={handleAddNotification} style={{ backgroundColor: '#3498DB', padding: 10, marginTop: 20 }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Save Notification</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotificationScreen;
