import React from "react"

import {Text, View, Dimensions, Image, StyleSheet} from "react-native"
import Carousel from 'react-native-snap-carousel';
import { Card, ListItem, Button, Icon,  } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'; 

export default class OxygenVendors extends React.Component{
    constructor(props){
        super(props)

        this.state={
            vendors:[
               {
                "name": "M/s Everest Kanto Cylinder Limited",
                "location": "Gandhidham & Tarapur",
                "person" : "Puneet Khurana",
                "mobile" : "9821029299",
                "email" : "qa.gdm@ekc.in",
                            
                },
                {
                    "name": "M/s Rama Cylinders Pvt. LTD, Bhimasar",
                    "location": "Gandhidham",
                    "person" : "Vashu Ramsinghani",
                    "mobile" : "9819515111",
                    "email" : "pramod.sangwai@ramacylinders.in",
                                
                    },
                {
                "name": "M/s Lizer Cylinders",
                "location": "Gandhidham",
                "person" : "N.C Bhatia",
                "mobile" : "9312402737",
                "email" : "ncbhatia@jayfecyl.com",
                                    
                },
                {
                    "name": "M/s Sahuwala High Pressure Cylinder",
                    "location": "Vishakhapatnam",
                    "person" : "Shri Pawan Kumar Gupta",
                    "mobile" : "7799950555",
                    "email" : "ppc@sahuwalacylinders.com",
                                        
                },
                {
                     "name": "M/s Euro India Cylinders Limited",
                    "location": "Gandhidham",
                    "person" : "Pravin Nandu",
                     "mobile" : "9821042582",
                     "email" : "chintain@euroindiacylinders.com",
                                            
                },
                {
                    "name": "M/s Shaba Cylinders",
                   "location": "Ujjain, MP",
                   "person" : "Shabbi H Naalwala",
                    "mobile" : "9425092052",
                    "email" : "shaba.hpr@gmail.com",
                                           
               },
               {
                "name": "M/s BGL Cylinders Industries",
               "location": "Ujjain, MP",
               "person" : "Gopal Krishan Sharma",
                "mobile" : "9818306663",
                "email" : "bglcylindersindustries@gmail.com",
                                       
           },
           {
            "name": "M/s Al-can Exports Pvt. Ltd",
           "location": "Thane",
           "person" : "Vijay Parikh",
            "mobile" : "9769111333",
            "email" : "vijay@alcanexports.com",
                                   
       },
               
            ]
        }
    }
    _renderItem = ({item, index}) => {
        return (
            <Card containerStyle={{borderRadius:40, height:"90%", backgroundColor:"#FBFDFF"}} >
            <Image source={{uri:"https://assets.telegraphindia.com/telegraph/2020/Dec/1608756248_1604434027_shutterstock_515744077.jpg"}} style={styles.coverimage}/>
            <Text style={{fontFamily:"NunitoSans_800ExtraBold", textAlign:"left", marginLeft:"5%",marginTop:"5%"}} numberOfLines={2} >{item.name}</Text>
            <View style={{display:"flex", flexDirection:"row"}}>
                
                <View style={{marginTop:"5%", marginLeft:"5%"}}>
            <Ionicons name="business" size={30} color="black" />
            </View>
                <Text style={{fontFamily:"NunitoSans_700Bold", fontSize:15, marginLeft:"5%",marginTop:"7%" }}>{item.location}</Text>

              
            
            </View>
            <View style={{marginTop:"8%", marginLeft:"6%"}}>
                <Ionicons name="call" size={24} color="black" />
                 <Text style={{textAlign:"left", marginLeft:"15%", fontFamily:"NunitoSans_700Bold", fontSize:15, marginTop:"-8%"}}>{item.mobile}</Text>
                 </View>
                 <View style={{marginTop:"8%", marginLeft:"6%"}}>
                 <Ionicons name="person" size={24} color="black" />
                 <Text style={{textAlign:"left", marginLeft:"15%", fontFamily:"NunitoSans_700Bold", fontSize:15, marginTop:"-8%"}}>{item.person}</Text>
                 </View>
                 <View style={{marginTop:"8%", marginLeft:"6%"}}>
                 <Ionicons name="mail" size={24} color="black" />
                 <Text style={{textAlign:"left", marginLeft:"15%", fontFamily:"NunitoSans_700Bold", fontSize:15, marginTop:"-8%"}}>{item.email}</Text>
                 </View>
           
        </Card>
        );
    }

    render(){
        return(
            <Carousel 
            ref={(c) => { this._carousel = c; }}
            data={this.state.vendors}
            renderItem={this._renderItem}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={Dimensions.get("window").width}
   
            layout={'tinder'} layoutCardOffset={9} />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor:"#11253f"
    },
    coverimage: {
   
        width:"100%",
        height:"60%",
        borderRadius:40,
        marginRight:"8%",
    },
    smallthum: {
        width:"25%",
        marginLeft:"5%",
        height:"100%",
        marginTop:"5%",
        borderRadius:15
    }
  });