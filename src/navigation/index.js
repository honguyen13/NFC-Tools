import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens.js/Home';
import Profile from '../screens.js/Profile';
import Detail from '../screens.js/Detail';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
}
