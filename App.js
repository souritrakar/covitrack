import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Dimensions, Button, Alert } from 'react-native';
import WelcomeScreen from "./screens/WelcomeScreen"
import {NavigationContainer} from "@react-navigation/native"
import { createStackNavigator} from "@react-navigation/stack"
import Vaccine from './screens/Vaccine';
import CovidNews from './screens/CovidNews';
import HomeScreen from "./screens/HomeScreen"
import NavContainer from './screens/NavContainer';
import { Ionicons } from '@expo/vector-icons'; 
import { Icon } from 'react-native-elements'
import BlogPost from './screens/BlogPost';
import AnimatedSplash from "react-native-animated-splash-screen";
import AppWrapper from './AppWrapper';
 

export default function App(props) {
  // d
const [loaded, setLoaded] = React.useState(false)
React.useEffect(()=>{
  setInterval(function(){
    setLoaded(true)
  } , 5000)
})

  return (
  
      <AnimatedSplash
        translucent={true}
        isLoaded={loaded}
        logoImage={require("./assets/logocovid.png")}
        backgroundColor={"#262626"}
        logoHeight={150}
        logoWidth={150}
      >
      <AppWrapper/>
      </AnimatedSplash>
 
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
