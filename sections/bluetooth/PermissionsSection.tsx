import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
  },
});

const PermissionsSection: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <View>
        <Text variant="headlineSmall" style={{marginBottom: 10}}>
          Bluetooth Permissions
        </Text>
        <Text>
          Please Allow The "Nearby Devices" permission to use Bluetooth
          functionality
        </Text>
      </View>
      <Button mode="contained" onPress={() => Linking.openSettings()}>
        Open Settings
      </Button>
    </View>
  );
};
export default PermissionsSection;
