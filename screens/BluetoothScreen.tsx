import React from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';

// import components
import PermissionsSection from '../sections/bluetooth/PermissionsSection';
import BluetoothSection from '../sections/bluetooth/BluetoothSection';
import {bluetoothService} from '../services/bluetooth/bluetoothService';

const Stack = createStackNavigator();

const BluetoothScreen: React.FC = () => {
  const [hasPermissions, setHasPermissions] = React.useState(false);

  React.useEffect(() => {
    updatePermissions();
  }, []);

  useFocusEffect(() => {
    updatePermissions();
  });

  async function updatePermissions() {
    const granted = await bluetoothService.getPermissions();
    setHasPermissions(granted);
  }

  function renderStacks() {
    if (!hasPermissions) {
      return (
        <Stack.Screen
          options={{headerTitle: 'Permissions'}}
          name="PermissionsSection"
          component={PermissionsSection}
        />
      );
    }

    return (
      <Stack.Screen
        options={{headerTitle: 'Bluetooth'}}
        name="BluetoothSection"
        component={BluetoothSection}
      />
    );
  }

  return <Stack.Navigator>{renderStacks()}</Stack.Navigator>;
};
export default BluetoothScreen;
