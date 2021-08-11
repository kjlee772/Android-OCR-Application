import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class storage_screen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            all_key: null,
        }
        this.get_all_keys()
    }

    get_all_keys = async () => {
        let keys = []
        try {
            keys = await AsyncStorage.getAllKeys();
            this.setState({
                all_key: keys
            })
        } catch (e) {
            console.log('!!! get all key error');
        }
    }

    show_key() {
        console.log(this.state.all_key);
    }

    show_value = async (key) => {
        try {
            let temp = await AsyncStorage.getItem(key);
            let value = JSON.parse(temp);
            let file_uri = value.file_uri;
            let file_data = value.file_data;
            let subject = value.subject;
            // console.log(typeof value);
            // console.log('URI: '+ file_uri);
            // console.log('DATA: '+ file_data);
            // console.log('SUBJECT: '+ subject);
            console.log('show: '+ value.file_uri);
            return value;
        } catch (e) {
            console.log('!!! get error');
        }
    }

    make_view(){
        const test = this.state.all_key.map((unit, idx) => {
            const value = this.show_value(unit);
            console.log(value.file_uri)
        })
    }

    render() {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.touch_btn} onPress={() => this.show_key()} ><Text style={styles.text_btn}>키</Text></TouchableOpacity>
                <TouchableOpacity style={styles.touch_btn} onPress={() => this.show_value(this.state.all_key[0])} ><Text style={styles.text_btn}>value</Text></TouchableOpacity>
                <TouchableOpacity style={styles.touch_btn} onPress={() => this.make_view()} ><Text style={styles.text_btn}>make</Text></TouchableOpacity>
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