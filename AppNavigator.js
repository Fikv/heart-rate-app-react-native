import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './LoginScreen';
import SettingsScreen from './SettingsScreen';
import SaveResult from './SaveResult';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
     <Stack.Screen
        name="Home"
        component={WelcomeScreen}
        options={{
          title: 'My home',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="SaveResult" component={SaveResult} />
    </Stack.Navigator>
  );
};

export default AppNavigator;