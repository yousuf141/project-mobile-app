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

    socket.on('data', data => {
      const {item, value} = JSON.parse(data);
      if (item === 'fan') setFan(value == 1);
      if (item === 'light') setLight(value == 1);
    });

    socket.emit('data', {type: 'GET_INFO'});

    return () => {
      socket.disconnect();
    };
  }, []);

  function handleLightChange() {
    const newLight = !light;
    setLight(newLight);

    socket.emit('data', {type: newLight ? 'LIGHT_ON' : 'LIGHT_OFF'});
  }

  function handleFanChange() {
    const newFan = !fan;
    setFan(newFan);

    socket.emit('data', {type: newFan ? 'FAN_ON' : 'FAN_OFF'});
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
        </DataTable>
      </View>
    </View>
  );
};
export default InternetSection;
