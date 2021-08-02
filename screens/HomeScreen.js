import React , {useState} from "react"
import AnimateNumber from 'react-native-countup'
import {Text} from "react-native"
import { StyleSheet, View, Dimensions, Image} from 'react-native';
import { ActivityIndicator} from "react-native";
import {Picker} from "@react-native-community/picker"
import { Card } from "react-native-elements"
import countrieslist from "../assets/countries"
import {Header} from "../components/Header"

import { LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts'
export default function HomeScreen({navigation}){

    // constructor(props){
    //     super(props)
    //     this.state={
    //         activeCases:43230,
    //         recoveries:123456,
    //         deaths:12354678,
    //         selectedValue:"India"
    //     }
    // }
    const [activeCases, setActiveCases] = React.useState(0)
    const [recoveries, setRecoveries] = React.useState(0)
    const [deaths, setDeaths] = React.useState(0)
    const [selectedValue, setSelectedValue] = React.useState("India")
    const [flag, setFlag] = React.useState("in")
    const [timeseriesData, setTimeseriesData] = React.useState([]);
    //const [timeseriesLabels, setTimeseriesLabels] = React.useState([]);
    const [data, setData] = React.useState({})
    const[loaded,setLoaded] = React.useState(false)
    //const screenWidth = Dimensions.get("window").width;
    //const [chart, setChart] = React.useState({})
    
    // const chartData = {
    //     labels: timeseriesLabels,
    //     datasets: [
    //       {
    //         data: timeseriesData,
    //         color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
    //         strokeWidth: 2 // optional
    //       }
    //     ],
    //     legend: ["Cases"] // optional
    //   };

  const  formatNumber =(num) =>{
        if(num > 1000000){
            return ((num / 1000000).toFixed(2) + "m")
        } else if(num > 1000){
            return ((num / 1000).toFixed(2) + "k")
        }
        return num;
    }
   
    React.useEffect( ()=>{
        fetch("https://covid-19-report-api.vercel.app/api/v1/cases/latest?iso="+flag.toUpperCase()).then(res=>res.json()).then(resobj=>{
            setData(resobj.data[0])
        })
        
        fetch("https://covid-19-report-api.vercel.app/api/v1/cases/timeseries?iso="+flag.toUpperCase()).then(res => res.json()).then(obj => {
            let temp = obj.data[0].timeseries;
            let labels = []
            let conf = []
            for (let i in temp){
                conf.push(temp[i].confirmed)
                labels.push(i)
            }
            setTimeseriesData(conf)
            setLoaded(true)
            //setTimeseriesLabels(labels)
            //setChart(chartData)
            //console.log("time series"+obj.data[0].timeseries)
            
        })
      
    }, [flag])
    const contentInset = { top: 20, bottom: 20 }

    var imagesource = {uri: "https://www.countryflags.io/"+flag+"/shiny/64.png"}
    if(loaded===false){
        return(
            <ActivityIndicator size="large"/>
        )
    }
    else if(loaded===true){
        return(
            <View style={styles.container}>
        
                <Card>
                    <Text style={{fontFamily:"NunitoSans_700Bold", textAlign:"center", fontSize:35}}><Image style={{width:30, height:30}} source={imagesource}/> {selectedValue}</Text>
                    
                    <View style={{display:"flex", alignItems:"center"}}>
                    <Picker
    
                        selectedValue={selectedValue}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) =>{ setSelectedValue(itemValue); setFlag(countrieslist[itemIndex].code.toLowerCase())}}
                     >
                    {
                        countrieslist.map((country) => {
                            return(
                            <Picker.Item label={country.name} value={country.name} />
                            )
                        })
                    }
             
                     </Picker>
                     </View>
    
                    <Text>{"\n"}</Text>
                    <View style={styles.box}>
                        <View style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                            <Text style={{fontFamily:"NunitoSans_700Bold",   fontSize:15, color: "darkblue" }}>Daily Cases:</Text>
                            <Text style={{fontFamily:"NunitoSans_700Bold",  fontSize:20}}>{formatNumber(data.confirmed)}</Text>
                        </View>
    
                        <View style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                            <Text style={{fontFamily:"NunitoSans_700Bold",   fontSize:15, color: "green" }}>Recovered:</Text>
                            <Text style={{fontFamily:"NunitoSans_700Bold",  fontSize:20}}>{formatNumber(data.recovered)}</Text>
                        </View>
    
                        <View style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                            <Text style={{fontFamily:"NunitoSans_700Bold",   fontSize:15, color: "red" }}>Deaths:</Text>
                            <Text style={{fontFamily:"NunitoSans_700Bold",  fontSize:20}}>{formatNumber(data.deaths)}</Text>
                        </View>
                    </View>
                </Card>
                
                <View style={{ height: 200, flexDirection: 'row', margin: 20 }}>
                    <YAxis
                        data={timeseriesData}
                        contentInset={contentInset}
                        svg={{
                            fill: 'grey',
                            fontSize: 10,
                        }}
                        // numberOfTicks={10}
                        formatLabel={(value) => `${value}`}
                    />
                    <LineChart
                        style={{ flex: 1, marginLeft: 16 }}
                        data={timeseriesData}
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                        contentInset={contentInset}
                    >
                        <Grid />
                    </LineChart>
                    
                </View>
                <Text style={{textAlign:"center", fontFamily: "NunitoSans_700Bold"}}>Graph of total cases over time</Text>
            </View>
        )    
    }
    
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
  