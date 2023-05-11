import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DataTable, Divider, Switch, Text} from 'react-native-paper';

import {socket} from '../../services/socket';

const style = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  infoPanel: {
    gap: 10,
  },
  switch: {
    transform: [{scaleX: 2}, {scaleY: 2}],
  },
});

const InternetSection: React.FC = () => {
  const [light, setLight] = React.useState(false);
  const [fan, setFan] = React.useState(false);

  React.useEffect(() => {
    socket.connect();

    socket.on('itemUpdated', ({item, value}) => {
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

    socket.emit('readItem');

    return () => {
      socket.disconnect();
    };
  }, []);

  function handleLightChange() {
    const newLight = !light;
    setLight(newLight);

    socket.emit('updateItem', {item: 'light', value: newLight});
  }

  function handleFanChange() {
    const newFan = !fan;
    setFan(newFan);

    socket.emit('updateItem', {item: 'fan', value: newFan});
  }

  return (
    <View style={style.container}>
      <View style={style.infoPanel}>
        <Text variant="headlineSmall">Via Internet</Text>
        <Divider />
        <Text>
          Control the Raspberry PI via the internet. Click the toggle buttons to
          enable/disable a fan and light bulb. The toggles will also
          automatically switch whenever the light or fan has been changed on the
          Raspberry PI.
        </Text>
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
export default InternetSection;
