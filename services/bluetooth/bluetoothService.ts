import {Permission, PermissionsAndroid} from 'react-native';

class BluetoothService {
  async getPermissions() {
    const permissionsNeeded: Permission[] = [];

    let permissionCheck = await PermissionsAndroid.check(
      'android.permission.BLUETOOTH_SCAN',
    );
    if (permissionCheck === false) {
      permissionsNeeded.push('android.permission.BLUETOOTH_SCAN');
    }

    permissionCheck = await PermissionsAndroid.check(
      'android.permission.BLUETOOTH_CONNECT',
    );
    if (permissionCheck === false) {
      permissionsNeeded.push('android.permission.BLUETOOTH_CONNECT');
    }

    let allGranted = true;
    if (permissionsNeeded.length > 0) {
      for (const permission of permissionsNeeded) {
        const res = await PermissionsAndroid.request(permission);
        if (res !== 'granted') allGranted = false;
      }
    }
    return allGranted;
  }
}

export const bluetoothService = new BluetoothService();
