import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react"
import HomeScreen from "../screens/HomeScreen"
import Vaccine from "../screens/Vaccine";
import CovidNews from "../screens/CovidNews";
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'; 
import {NavigationContainer} from "@react-navigation/native"
import { Ionicons } from '@expo/vector-icons'; 

import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import OxygenVendors from "../screens/OxygenVendors";
import HospitalScreen from "../screens/HospitalScreen";
import BlogScreen from "../screens/BlogScreen";

const TabVendor= AnimatedTabBarNavigator();

const VendorTab=()=>{
    return(
      <NavigationContainer independent={true}>
    <TabVendor.Navigator
      
    tabBarOptions={{
      activeBackgroundColor:'rgb(55,65,53)',
      activeTintColor: "white",
      inactiveTintColor: "#222222",
      floating:true
    }}

  
 
    >
        <TabVendor.Screen 
        options={{
        tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome5
                name="pump-medical"
                size={size ? size : 24}
                color={focused ? color : "#222222"}
                focused={focused}
                color={color}
            />
        )
      }}  
      
      name="O₂ Vendors" component={OxygenVendors} />
      
        <TabVendor.Screen
         options={{
        tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome5
                name="hospital-alt"
                size={size ? size : 24}
                color={focused ? color : "#222222"}
                focused={focused}
                color={color}
            />

        )
      }} 
      
      name="Hospitals" component={HospitalScreen} />


        <TabVendor.Screen
         options={{
        tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome5
                name="pen-fancy"
                size={size ? size : 24}
                color={focused ? color : "#222222"}
                focused={focused}
                color={color}
            />

        )
      }} 
      
      component={BlogScreen} name="Blog" />

      </TabVendor.Navigator>
      
      </NavigationContainer>
    )

}

export default VendorTab