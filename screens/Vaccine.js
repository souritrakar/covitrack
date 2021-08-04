import React, {useState} from "react"
import AnimateNumber from 'react-native-countup'
import {Text} from "react-native"
import { StyleSheet, View, Dimensions, Image} from 'react-native';
import { ActivityIndicator } from "react-native";
import {Picker} from "@react-native-community/picker"
import { Card } from "react-native-elements"
import countrieslist from "../assets/countries"
import { LineChart, YAxis, Grid } from 'react-native-svg-charts'
import { StatusBar } from "expo-status-bar";

export default function Vaccine({navigation}){
    const [selectedValue, setSelectedValue] = useState("India")
    const [flag, setFlag] = useState("in")
    const [loaded,setLoaded] = useState(false)
    const [vaccinesDaily, setVaccinesDaily] = useState([]);

    const formatNumber =(num) =>{
        if(num > 1000000){
            return ((num / 1000000).toFixed(2) + "m")
        } else if(num > 1000){
            return ((num / 1000).toFixed(2) + "k")
        }
        return num;
    }
   
    React.useEffect(() => {
        fetch(`https://corona.lmao.ninja/v3/covid-19/vaccine/coverage/countries/${flag}?lastdays=all&fullData=true`).then(res => res.json()).then(obj => {
            let temp = obj["timeline"]
            let tempDaily = []
            for (let i in temp){
                tempDaily.push(temp[i]["daily"])
            }
            console.log(`tempDaily.length 1: ${tempDaily.length}`)
            // for (let i in tempDaily.reverse()){
            //     console.log(`i: ${i}`)
            //     if (i != 0){
            //         break;
            //     } else {
            //         tempDaily.pop()
            //     }
            // }

            for (let i = tempDaily.length - 1; i >= 0; i--){
                if ( tempDaily[i] > 0) {
                    break;
                } else {
                    tempDaily.pop()
                }
            }
            console.log(`tempDaily.length 2: ${tempDaily.length}`)
            setVaccinesDaily(tempDaily)
        })
    }, [flag])

    const contentInset = { top: 20, bottom: 20 }

    var imagesource = {uri: "https://www.countryflags.io/"+flag+"/shiny/64.png"}

    return (
        <View style={styles.container}>
          
            <Card containerStyle={{borderColor:"white", shadowColor:"white", borderBottomColor:"white"}}>

                <Text style={{fontFamily:"NunitoSans_700Bold", textAlign:"center", fontSize:35}}><Image style={{width:30, height:30}} source={imagesource}/>{selectedValue}</Text>
                
                <View style={{display:"flex", alignItems:"center"}}>
                    <Picker
                        selectedValue={selectedValue}
                        style={{ height: 50, width: 150, marginBottom: "2%" }}
                        onValueChange={(itemValue, itemIndex) => { setSelectedValue(itemValue); setFlag(countrieslist[itemIndex].code.toLowerCase())}}
                    >
                    {
                        countrieslist.map((country, i) => {
                            return (<Picker.Item key={i} label={country.name} value={country.name} />)
                        })
                    }                
                    </Picker>
                </View>

                <View style={styles.box}>
                    <View style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <Text style={{fontFamily:"NunitoSans_700Bold",   fontSize:15, color: "darkblue" }}>Most recent number of vaccinations:</Text>
                        <Text style={{fontFamily:"NunitoSans_700Bold",  fontSize:20}}>{formatNumber(vaccinesDaily[vaccinesDaily.length - 1])}</Text>
                    </View>
                </View>
            </Card>
            
            <View style={{ height: 200, flexDirection: 'row', margin: 20 }}>
                <YAxis
                    data={vaccinesDaily}
                    contentInset={contentInset}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    formatLabel={(value) => `${value}`}
                />
                <LineChart
                    style={{ flex: 1, marginLeft: 16 }}
                    data={vaccinesDaily}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={contentInset}
                >
                    <Grid />
                </LineChart>
            </View>
            <Text style={{textAlign:"center", fontFamily: "NunitoSans_700Bold"}}>Graph of vaccinations over time</Text>
        </View>
    )    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    box: {
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-evenly",
    }
  });
  