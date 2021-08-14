// 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
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import home_screen from './home_screen';
import image_screen from './image_screen';
import ocr_screen from './ocr_screen';
import storage_screen from './storage_screen';

const Stack = createNativeStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={home_screen} />
          <Stack.Screen name="Image" component={image_screen} />
          <Stack.Screen name="Ocr" component={ocr_screen} />
          <Stack.Screen name="Storage" component={storage_screen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

}

// const styles = StyleSheet.create({

// });