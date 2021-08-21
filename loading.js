import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, } from 'react-native';

export default class loading extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <View style={{backgroundColor:'black',opacity:0.5,position:'absolute',width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}}>
            </View>
        )
    }
}