import React from 'react';
import { View, Text, Image, TextInput, ScrollView,Dimensions } from 'react-native';

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
            <View style={{ flex: 1,backgroundColor:'gray' }}>
                <ScrollView>
                    <View style={{ flex: 1, backgroundColor: 'black',alignItems: 'center',marginBottom: 5, justifyContent: 'center' }}>
                        <Image style={{width:Dimensions.get('window').width, height:Dimensions.get('window').height/4, resizeMode: 'contain' }} source={{ uri: this.state.file_uri }} />
                    </View>
                    <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: '80%' }}>
                            <TextInput style={{ backgroundColor: 'pink', color: 'black', marginBottom: 5, textAlign: 'center', fontSize: 22, fontWeight: 'bold', borderRadius:5 }}
                                placeholder={'주제를 입력해주세요.'}
                                placeholderTextColor={'black'}
                                onChangeText={(ch) => { this.setState({ subject: ch }) }} />
                        </View>
                        <View style={{ width: '99%' }}>
                            <TextInput style={{backgroundColor:'white', color: 'black', borderWidth: 1, borderRadius:5 }}
                                value={this.state.file_data} placeholderTextColor={'black'} multiline={true}
                                onChangeText={(ch) => { this.setState({ file_data: ch }) }} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

}

// const styles = StyleSheet.create({

// });