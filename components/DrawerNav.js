import {  createDrawerNavigator } from "react-navigation-drawer";
import {Ionicons, FontAwesome5} from "@expo/vector-icons"
import React from "react"
import AnalyticsTab from './AnalyticsTab'
import {createAppContainer} from "react-navigation" 

import VendorTab from "./VendorTab";
import HospitalScreen from "../screens/HospitalScreen";
const MainNavigator = createDrawerNavigator(
    {
      AnalyticsTab: {
        navigationOptions: {
          drawerIcon: () => (
            <Ionicons name="md-analytics-sharp" style={{ color: "#4973AB" }} size={20} />
          ),
          drawerLabel: "Analytics & News"
        },
        screen: AnalyticsTab
      },
      
      VendorTab: {
        navigationOptions: {
          drawerIcon: () => (
            <FontAwesome5 name="hospital" size={24} color="#4973AB" />
          ),
          drawerLabel: "Hospitals and Vendors"
        },
        screen: VendorTab
      },
    }
  );

const DrawerNav = createAppContainer(MainNavigator)
export default DrawerNav