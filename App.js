import Login from './Component/Login';
import HomeScreen from './Component/HomeScreen';
import Account from './Component/Account';
import Fetch from './Component/Fetch';
import Component from './Component/Component';
import FirstPage from './Component/FirstPage';
import Admin from './Component/Admin';
import Account1 from './Component/Account1';
import LogOut from './Component/LogOut';
import QR from './Component/QR';
import Component1 from './Component/Component1';
import {FetchData }from './Component/Fetch1';
import QrCode from './Component/QrCode';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

 
const stack = createNativeStackNavigator();


const App=()=> {
  return (
    <NavigationContainer> 
    <stack.Navigator>
 <stack.Screen name ='Page' options={{ headerShown: false }}  component={FirstPage}/>
  <stack.Screen name='Login' options={{headerShown:false }} component={Login}/>
<stack.Screen name='Account' options={{ headerShown: false  }}  component={Account }/>
  <stack.Screen name='Home' options={{ headerShown: false }}  component={HomeScreen}/>
  <stack.Screen name='Comp' options={{ headerShown: false }}  component={Component}/>
  <stack.Screen name='QrCode' options={{ headerShown: false }} component={QrCode}/>
  <stack.Screen name='Fetch' options={{ headerShown: false }}  component={Fetch}/>
 <stack.Screen name='Admin' options={{ headerShown: false }}  component={Admin}/>
  <stack.Screen name='Account1' options={{ headerShown: false }}  component={Account1}/>
  <stack.Screen name='LogOut' options={{ headerShown: false }}  component={LogOut}/>
<stack.Screen name='QR' options={{ headerShown: false }}  component={QR}/>
  <stack.Screen name='Component1' options={{ headerShown: false }}  component={Component1}/>
<stack.Screen name='FetchData' options={{ headerShown: false }}  component={FetchData}/>



</stack.Navigator>
</NavigationContainer>


  );
}
export default App