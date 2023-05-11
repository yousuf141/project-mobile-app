import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import InternetSection from '../sections/internet/InternetSection';

const Stack = createStackNavigator();

const InternetScreen: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerTitle: 'Internet'}}
        name="InternetSection"
        component={InternetSection}
      />
    </Stack.Navigator>
  );
};
export default InternetScreen;
