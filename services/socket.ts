import Config from 'react-native-config';

import {io} from 'socket.io-client';

const WS_ENDPOINT = Config.WS_ENDPOINT ?? 'http://localhost:3333';

export const socket = io(WS_ENDPOINT, {
  autoConnect: false,
});
