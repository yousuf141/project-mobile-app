import Config from 'react-native-config';

import {io} from 'socket.io-client';

const REACT_APP_WS_ENDPOINT =
  Config.REACT_APP_WS_ENDPOINT ?? 'http://localhost:3333';

export const socket = io(REACT_APP_WS_ENDPOINT, {
  autoConnect: false,
});
