import React from 'react';
import { View, Text, Image, TextInput, ScrollView } from 'react-native';

export default class ocr_screen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file_uri: this.props.route.params.file_uri,
            file_data: this.props.route.params.file_data,
            subject: null,
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ScrollView>
                    <View style={{ flex: 1, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
                        <Image style={{ height: '100%', width: '100%', resizeMode: 'contain' }} source={{ uri: this.state.file_uri }} />
                    </View>
                    <View style={{ flex: 3, alignItems:'center',justifyContent:'center' }}>
                        <View style={{width:'80%'}}>
                            <TextInput style={{ backgroundColor: 'pink', color: 'black', marginBottom:10, textAlign:'center', fontSize:22, fontWeight:'bold' }} 
                            placeholder={'주제를 입력해주세요.'} 
                            placeholderTextColor={'black'} 
                            onChangeText={(ch)=>{this.setState({subject:ch})}} />
                        </View>
                        <View>
                            <TextInput style={{ backgroundColor: 'yellow', color: 'black',borderWidth:1 }} 
                            value={this.state.file_data} placeholderTextColor={'black'} multiline={true} 
                            onChangeText={(ch)=>{this.setState({file_data:ch})}}  />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

}

// const styles = StyleSheet.create({

// });