import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider } from './UserContext';
import AppNavigator from './AppNavigator';
import LoginScreen from './LoginScreen';

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;