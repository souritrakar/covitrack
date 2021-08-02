import React from "react"

import {Text, View} from "react-native"
import firebase from "firebase"
import { ActivityIndicator, StyleSheet} from "react-native";
import { Card, ListItem, Button, Icon, Modal  } from 'react-native-elements'
import { FAB } from 'react-native-paper';

export default class BlogScreen extends React.Component{

    constructor(props){
        super(props)
        this.state={
            blogs:[],
            text:"",

        }
    }
   
    componentDidMount() {
        //called before render, will automatically be called because it's a life cycle method
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyBp6sbiOc-OkbaQLvx5L8HOHPL7Q9rATNU",
                authDomain: "covitrack-b1f78.firebaseapp.com",
                projectId: "covitrack-b1f78",
                storageBucket: "covitrack-b1f78.appspot.com",
                messagingSenderId: "186583766250",
                appId: "1:186583766250:web:c48b9774e43808601ef393"
            });
         }else {
            firebase.app(); // if already initialized, use that one
         }
        
            firebase.firestore().collection("Blogs").onSnapshot(doc=>{
                var blogs = []
               doc.forEach(DOC=>{
                   console.log(DOC.data())
                  blogs.push(DOC.data())
               })
               console.log(blogs)
               this.setState({blogs:blogs})
            })
        
         }
    render(){
        return(
          <View style={{ flex: 1}}>
            <FAB
            style={styles.fab}
            small
            icon="plus"
            onPress={() => console.log('Pressed')}
            />
              {
                  this.state.blogs.map(blog=>{
                      return(
                        <Card>
                        <Card.Title style={{fontFamily:"NunitoSans_700Bold"}} key={blog.key} >{blog.text}</Card.Title>
                        <Card.Divider/>
                        <Text style={{fontFamily:"NunitoSans_700Bold", textAlign:"center"}}>Author: {blog.author}</Text>
                    
                        <Text style={{fontFamily:"NunitoSans_700Bold", textAlign:"center"}}>Time: {blog.time}</Text>
                        <Card.Divider/>
                        <Text style={{fontFamily:"NunitoSans_700Bold", textAlign:"center"}}>{blog.preview}</Text>
                        <Text>{"\n"}</Text>
                      
                        
                      </Card>
                      )
                      
                  })
              }
          </View>
            
        )
    }
}

const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
  })
  