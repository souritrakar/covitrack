import React from "react"

import {View} from "react-native"

import {Header as ElementHeader,Badge,Icon} from "react-native-elements"
import { Ionicons } from '@expo/vector-icons'; 

export default class Header extends React.Component{
    constructor(props){
        super(props)
     

    }

    
    render(){
        return(
            <ElementHeader
            containerStyle={{
                backgroundColor: '#3D6DCC',
                justifyContent: 'space-around',
                flex:1,
                width:"100%"
            
              }}
            leftComponent={<Hamburger onpress={this.props.onpress2}/>}
            centerComponent={{ text: 'Home', style: { color: '#fff' } }}
        
            />
        )
    }
}


const Hamburger=(props)=>{
    return(
        
        <Icon name="menu"  onpress={props.onpress}/>
    )
}
