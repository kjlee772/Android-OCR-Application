import React from 'react';
import { View, Text, Image, TextInput, ScrollView, Dimensions, TouchableOpacity, StyleSheet, Alert, BackHandler } from 'react-native';
import { StackActions } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ocr_screen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: this.props.route.params.from,
            save_data: {
                file_name: this.props.route.params.file_name,
                file_uri: this.props.route.params.file_uri,
                file_data: this.props.route.params.file_data,
                subject: this.props.route.params.subject,
            },
            all_key: null,
            all_data: null,
        }
    }

    get_all_keys = async () => {
        let keys = []
        try {
            keys = await AsyncStorage.getAllKeys();
            this.setState({
                all_key: keys
            })
            this.get_multi_value();
        } catch (e) {
            console.log('!!! get all key error');
        }
    }
    get_multi_value = async () => {
        let values
        try {
            values = await AsyncStorage.multiGet(this.state.all_key);
            let new_value = values.map(([key, value]) => [key, JSON.parse(value)]);
            this.setState({
                all_data: new_value,
            })
            this.move_screen();
        } catch (e) {
            console.log('!!! multi err');
        }
    }

    save = async (key, value) => {
        if (this.state.save_data.subject == null || this.state.save_data.subject == '') {
            Alert.alert(
                '주제를 입력해주세요.'
            );
        }
        else {
            try {
                const json_value = JSON.stringify(value);
                await AsyncStorage.setItem(key, json_value);
                Alert.alert(
                    '저장 완료',
                );
            } catch (e) {
                console.log('!!! save error');
            }
            console.log('save success!!');
        }
    }

    move_screen() {
        if (this.state.from == 'home') {
            this.props.navigation.navigate('Storage', { all_data: this.state.all_data, from: this.state.from });
        }
        else {
            this.props.navigation.dispatch(StackActions.replace('Storage', { all_data: this.state.all_data, from: this.state.from }));
        }
    }
    // 저장소에서 ocr로 갔을 때 뒤로 가기 막기
    

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#DCF5FA' }}>
                <ScrollView>
                    <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center', marginBottom: 5, justifyContent: 'center' }}>
                        <Image style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height / 4, resizeMode: 'contain' }} source={{ uri: this.state.save_data.file_uri }} />
                    </View>
                    <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: '80%' }}>
                            <TextInput style={{ backgroundColor: 'pink', color: 'black', marginBottom: 5, textAlign: 'center', fontSize: 22, fontWeight: 'bold', borderRadius: 5 }}
                                placeholder={'주제를 입력해주세요.'}
                                value={this.state.save_data.subject}
                                placeholderTextColor={'black'}
                                onChangeText={(ch) => { this.setState({ save_data: { subject: ch, file_uri: this.state.save_data.file_uri, file_data: this.state.save_data.file_data, file_name: this.state.save_data.file_name } }) }} />
                        </View>
                        <View style={{ width: '99%' }}>
                            <TextInput style={{ backgroundColor: 'white', color: 'black', borderWidth: 1, borderRadius: 5 }}
                                value={this.state.save_data.file_data} placeholderTextColor={'black'} multiline={true}
                                onChangeText={(ch) => { this.setState({ save_data: { file_data: ch, file_uri: this.state.save_data.file_uri, subject: this.state.save_data.subject, file_name: this.state.save_data.file_name } }) }} />
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                        <TouchableOpacity style={styles.touch_btn} onPress={() => this.save(this.state.save_data.file_name, this.state.save_data)} ><Text style={styles.text_btn}>저장하기</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.touch_btn} onPress={() => this.get_all_keys()} ><Text style={styles.text_btn}>저장소</Text></TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text_btn: {
        fontSize: 27,
        fontWeight: 'bold',
    },
    touch_btn: {
        backgroundColor: 'gray',
        width: 150,
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
});