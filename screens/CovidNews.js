import React from "react"
import { Shadow } from 'react-native-neomorph-shadows';
import {Text, View, StyleSheet, Image, ScrollView, Dimensions, Linking} from "react-native"
import { Card } from "react-native-elements"
import Carousel from 'react-native-snap-carousel';
import AwesomeButton from "react-native-really-awesome-button";
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman'
import { Ionicons } from '@expo/vector-icons'; 

export default class CovidNews extends React.Component{

    constructor(props){
        super(props)
        this.state={
            articles:[],
            source:"",
            articleobj:{},
            header:"",
            imageurl:"",
            date:""
        }
    }
    
    _renderItem = ({item, index}) => {
        return (
            <Card containerStyle={{borderRadius:40, height:"92%", backgroundColor:"#FBFDFF"}} >
                <Image source={{uri:item.urlToImage ?? "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/E731_Google_Health_Illustration_Blog.max-1000x1000.png"}} style={styles.coverimage}/>
                <Text style={{fontFamily:"NunitoSans_800ExtraBold", textAlign:"left", marginLeft:"5%",marginTop:"5%"}} numberOfLines={2} >{item.title}</Text>
                <View style={{display:"flex", flexDirection:"row"}}>
                    <Image source={{uri: "https://w7.pngwing.com/pngs/906/671/png-transparent-newspaper-editorial-cartoon-headline-comics-white-cartoon.png" }} style={{ width:"10%", height:"75%", marginTop:"5%" , borderRadius:100, marginLeft:"5%"}}/>
                    <Text style={{fontFamily:"NunitoSans_700Bold", marginLeft:"5%",marginTop:"6%" }}>{item.source.name}</Text>
                    <Text style={{textAlign:"right", fontFamily:"NunitoSans_700Bold", marginTop:"6%", marginLeft:"10%"}}>3 Aug 2021</Text>
                </View>
                <Ionicons name="open" onPress={()=>{Linking.openURL(item.url)}} size={30} color="black" style={{alignSelf:"center", marginTop:"1%"}} />
            </Card>
        );
    }

    componentDidMount(){
        fetch("https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=5bc1ac39e2da4d2f92f001447e838760").then(res=>res.json()).then(resobj=>{
     
            const randomnum = Math.floor(Math.random()*resobj.articles.length)
            this.setState({articleobj:resobj.articles[randomnum], source:resobj.articles[randomnum].source.name, articles:resobj.articles})
            
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={{fontSize:38,fontWeight:"200", fontFamily:"NunitoSans_700Bold", textAlign:"left", marginLeft:"8%", marginTop:"5%", color:"white"}}>Latest news</Text>
                <Text>{"\n"}</Text>
        
                {/* <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.articles}
                    renderItem={this._renderItem}
                    sliderWidth={300}
                    itemWidth={300}
                /> */}
                <Carousel 
                    layout={"default"}
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.articles}
                    renderItem={this._renderItem}
                    sliderWidth={Dimensions.get("window").width}
                    itemWidth={Dimensions.get("window").width}
                    itemHeight={Dimensions.get("window").height/4}
                
                />
                {/* <View
                    style={{
                    borderBottomColor: 'white',
                    borderBottomWidth: 1,
                }}
                /> */}
                <View style={{display:"flex", flexDirection:"row", marginBottom:"20%"}}>
                    <Image source={{uri:this.state.articleobj.urlToImage ? this.state.articleobj.urlToImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0CfHdOtO6_CHK7HY0YXGJ-VHzkl7rkiPZNYpkYiL1CLeDRVXUl9QGONobafVy14zW4AI&usqp=CAU"}} style={styles.smallthum}/>
                    <Text onPress={()=>{Linking.openURL(this.state.articleobj.url)}} style={{fontFamily:"NunitoSans_700Bold", marginLeft:"6%", color:"white", marginTop:"10%", flexShrink: 1, marginRight:"2%"}} numberOfLines={2}  >{this.state.articleobj.title}</Text>
                </View>
            </View>
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