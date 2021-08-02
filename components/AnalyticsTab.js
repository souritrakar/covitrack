import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react"
import HomeScreen from "../screens/HomeScreen"
import Vaccine from "../screens/Vaccine";
import CovidNews from "../screens/CovidNews";
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'; 

import { Ionicons } from '@expo/vector-icons'; 

import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";

const Tab= AnimatedTabBarNavigator();

const AnalyticsTab=()=>{
    return(
    <Tab.Navigator

    tabBarOptions={{
      activeBackgroundColor:'rgb(184,184,243)',
      activeTintColor: "white",
      inactiveTintColor: "#222222",
      floating:true
    }}

  
 
    >
        <Tab.Screen 
        options={{
        tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
                name="md-analytics-sharp"
                size={size ? size : 24}
                color={focused ? color : "#222222"}
                focused={focused}
                color={color}
            />
        )
      }}  
      
      name="Home" component={HomeScreen} />
      
        <Tab.Screen
         options={{
        tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
                name="shield"
                size={size ? size : 24}
                color={focused ? color : "#222222"}
                focused={focused}
                color={color}
            />

        )
      }} 
      
      name="Vaccines" component={Vaccine} />


        <Tab.Screen
         options={{
        tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
                name="md-newspaper"
                size={size ? size : 24}
                color={focused ? color : "#222222"}
                focused={focused}
                color={color}
            />

        )
      }} 
      
      component={CovidNews} name="News" />

      </Tab.Navigator>
    )

}

export default AnalyticsTab