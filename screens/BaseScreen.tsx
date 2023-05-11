import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import screens
import BluetoothScreen from './BluetoothScreen';
import InternetScreen from './InternetScreen';
import {IconButton} from 'react-native-paper';

const Tab = createBottomTabNavigator();

const BaseScreen: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="BluetoothScreen"
        screenOptions={{headerShown: false}}>
        <Tab.Screen
          options={{
            tabBarLabel: 'Bluetooth',
            tabBarIcon: () => <IconButton icon="bluetooth" />,
          }}
          name="BluetoothScreen"
          component={BluetoothScreen}
        />
        <Tab.Screen
          options={{
            tabBarLabel: 'Internet',
            tabBarIcon: () => <IconButton icon="wifi" />,
          }}
          name="InternetScreen"
          component={InternetScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default BaseScreen;
