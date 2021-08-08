import React from 'react';
import { View, Text, Image } from 'react-native';

export default class ocr_screen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file_uri: this.props.route.params.file_uri,
            file_data: this.props.route.params.file_data,
        }
        console.log('받은 거: '+this.state.file_data);
    }

    render() {
        return (
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <View style={{flex:1,width:'100%',height:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'black'}}>
                    <Image style={{height:'100%',width:'100%',resizeMode:'contain'}} source={{uri:this.state.file_uri}} />
                    
                </View>
                <View style={{flex:3}}>

                </View>
            </View>
    );
    }

}

// const styles = StyleSheet.create({

// });