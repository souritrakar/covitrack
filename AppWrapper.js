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
 
const Stack= createStackNavigator()

function MyStack(props){
  return(
      <Stack.Navigator
          screenOptions={{
            headerStyle:{
              backgroundColor:'white',
              height:Dimensions.get("window").height/13,
            },
            headerTintColor:'black',
            headerTitleStyle:{
              fontWeight:"900",
              fontFamily:"NunitoSans_700Bold",
              alignSelf:"center"
              
            }
          }}
      >

      <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{headerShown: false, headerTitleAlign:"center"}}
      />
  
      <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{title:'Home', headerTitleAlign:"center"}}
      />
      
      <Stack.Screen
          name="NewsScreen"
          component={CovidNews}
          options={{title:'Latest News', headerTitleAlign:"center"}}
       />

      <Stack.Screen
          name="VaccineScreen"
          component={Vaccine}       
          options={{title:'Vaccination Stats',headerLeft:null, headerTitleAlign:"center"}}
      />

      <Stack.Screen
          name="NavContainer"
          component={NavContainer}
          options={{ title:"CoviMate",headerLeft:null, headerTitleAlign:"center",  headerLeft: () => (
            <View>
            <Ionicons name="menu"  size={50} color="black" />
            </View>
          ), }}
       />
      </Stack.Navigator>
  )
}

export default function AppWrapper(props) {
  return (
    <NavigationContainer>
     
      <MyStack navigation={props.navigation} />
     
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
