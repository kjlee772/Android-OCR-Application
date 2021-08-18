import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { StackActions } from '@react-navigation/native';

export default class storage_screen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: this.props.route.params.from,
            all_data: this.props.route.params.all_data,
            all_key: null,
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
        } catch (e) {
            console.log('!!! multi err');
        }
    }

    test(){
        console.log(this.state.all_data);
        this.setState({
            all_data: this.props.route.params.all_data,
        })
    }

    move_detail(temp) {
        this.props.navigation.dispatch(StackActions.replace('Ocr', { file_uri: temp.file_uri, file_data: temp.file_data, file_name: temp.file_name, subject: temp.subject, from: 'storage'}));
        // this.props.navigation.navigate('Ocr', { file_uri: temp.file_uri, file_data: temp.file_data, file_name: temp.file_name, subject: temp.subject, from: 'storage'});
    }

    delete_alert(key){
        Alert.alert(
            '해당 데이터를 삭제하시겠습니까?',
            '',
            [
                {
                    text: '예',
                    onPress: () => this.delete_data(key),
                },
                {
                    text: '아니오',
                },
            ],

        )
    }
    delete_data = async (key) => {
        try{
            await AsyncStorage.removeItem(key);
            this.get_all_keys()
        }catch(e){
            console.log('!!! remove err');
        }
    }

    refresh(){
        
    }

    render() {
        let temp = this.state.all_data.map(([key, value]) => {
            return (
                <TouchableOpacity onLongPress={() => this.delete_alert(key)} onPress={() => this.move_detail(value)} key={key} style={{ marginBottom: 3, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ width: Dimensions.get('window').width / 2, height: Dimensions.get('window').width / 2, }} source={{ uri: value.file_uri }} />
                        <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: 3 }}>{value.subject}</Text>
                    </View>
                </TouchableOpacity>
            )
        });
        if(Object.keys(temp).length < 1){
            return(
                <View style={{flex:1,alignItems:'center', justifyContent:'center'}}>
                    <Text style={{color:'black', fontSize:30, fontWeight:'bold'}}>저장된 데이터가 없습니다.</Text>
                </View>
            );
        }
        else{
            return (
                <ScrollView>
                    <View >
                        {temp}
                        {/* <TouchableOpacity style={styles.touch_btn} onPress={() => this.test()} ><Text style={styles.text_btn}>값</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.touch_btn} onPress={() => this.refresh()} ><Text style={styles.text_btn}>삭제</Text></TouchableOpacity> */}
                    </View>
                </ScrollView>
            );
        }
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