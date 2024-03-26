import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// importing the navigation through the screens
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// importing the screens to the man app
import TrackScreen from './screens/trackScreen';
import CameraScreen from './screens/cameraScreen';
import CalendarScreen from './screens/calendar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
    //   <CalendarScreen />
    // </View>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen  name={'Progress'} component={TrackScreen}/>
        <Tab.Screen name={'Camera'} component={CameraScreen}/>
        <Tab.Screen name={'Scheduale'} component={CalendarScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
