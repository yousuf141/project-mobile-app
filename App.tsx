import React from 'react';
import 'react-native-gesture-handler';

// import providers
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

// import screens
import BaseScreen from './screens/BaseScreen';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
  },
};

const App: React.FC = () => {
  return (
    <PaperProvider theme={theme}>
      <BaseScreen />
    </PaperProvider>
  );
};
export default App;