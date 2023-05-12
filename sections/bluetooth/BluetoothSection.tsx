import React from 'react';
import RNBluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic';

import {StyleSheet, View} from 'react-native';
import {
  Button,
  DataTable,
  DefaultTheme,
  List,
  Switch,
  Text,
} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';

const style = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  deviceList: {
    maxHeight: 300,
  },
  listItem: {
    borderBottomColor: '0',
    borderBottomWidth: 1,
  },
  selectedListItem: {
    backgroundColor: DefaultTheme.colors.tertiaryContainer,
    borderRadius: 10,
    borderBottomColor: '0',
    borderBottomWidth: 1,
  },
  switch: {
    transform: [{scaleX: 2}, {scaleY: 2}],
  },
});

const BluetoothSection: React.FC = () => {
  const [devices, setDevices] = React.useState<BluetoothDevice[]>([]);
  const [selectedDevice, setSelectedDevice] =
    React.useState<BluetoothDevice | null>(null);

  const [fan, setFan] = React.useState<boolean>(false);
  const [light, setLight] = React.useState<boolean>(false);

  React.useEffect(() => {
    updateDevices();
  }, []);

  React.useEffect(() => {
    if (!selectedDevice) return;

    selectedDevice.connect({serviceName: '1101', delimiter: '\n'}).then(() => {
      selectedDevice.onDataReceived(event => {
        const {item, value} = JSON.parse(event.data);
        switch (item) {
          case 'fan':
            setFan(value);
            break;
          case 'light':
            setLight(value);
            break;
          default:
            console.log(`Error: Unknown item: ${item}`);
        }
      });

      selectedDevice.write(JSON.stringify({item: 'read'}));
    });
  }, [selectedDevice]);

  async function updateDevices(): Promise<void> {
    const bondedDevices = await RNBluetoothClassic.getBondedDevices();
    setDevices(bondedDevices);
  }

  function getItemStyle(item: BluetoothDevice) {
    if (item.name === selectedDevice?.name) {
      return style.selectedListItem;
    }
    return style.listItem;
  }

  async function handleFanChange(): Promise<void> {
    if (!selectedDevice) return;
    const newFanValue = !fan;
    try {
      await selectedDevice.write(
        JSON.stringify({item: 'fan', value: newFanValue}),
      );
      setFan(newFanValue);
    } catch (e) {
      console.log('Error: failed to update fan');
      console.log(e);
    }
  }
  async function handleLightChange(): Promise<void> {
    if (!selectedDevice) return;
    const newLightValue = !light;
    try {
      await selectedDevice.write(
        JSON.stringify({item: 'light', value: newLightValue}),
      );
      setLight(newLightValue);
    } catch (e) {
      console.log('Error: failed to update light');
      console.log(e);
    }
  }

  return (
    <View style={style.container}>
      <View style={style.deviceList}>
        <Text variant="labelLarge">Known Devices:</Text>
        {devices.length === 0 ? (
          <Text>No Known Devices. Please add a bluetooth device</Text>
        ) : (
          <FlatList
            data={devices}
            renderItem={({item}) => (
              <List.Item
                style={getItemStyle(item)}
                title={item.name}
                onPress={() => setSelectedDevice(item)}
              />
            )}
          />
        )}
        <Button
          style={{marginTop: 10}}
          mode="contained-tonal"
          onPress={() => updateDevices()}>
          Refresh
        </Button>
      </View>
      <View>
        <DataTable style={{gap: 25}}>
          <DataTable.Row>
            <DataTable.Cell>
              <Text variant="headlineSmall">Fan</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Switch
                style={style.switch}
                value={fan}
                onChange={handleFanChange}
              />
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text variant="headlineSmall">Light Bulb</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Switch
                style={style.switch}
                value={light}
                onChange={handleLightChange}
              />
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
    </View>
  );
};
export default BluetoothSection;
