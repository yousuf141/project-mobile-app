import Config from 'react-native-config';

import {io} from 'socket.io-client';

const API_URL = Config.API_URL ?? 'http://localhost';
const API_PORT = Config.API_PORT ?? '3333';

export const socket = io(`${API_URL}:${API_PORT}`, {
  autoConnect: false,
});
