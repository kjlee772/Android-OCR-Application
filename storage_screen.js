import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, } from 'react-native';

import { StackActions } from '@react-navigation/native';

export default class storage_screen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: this.props.route.params.from,
            all_data: this.props.route.params.all_data,
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

    render() {
        let temp = this.state.all_data.map(([key, value]) => {
            return (
                <TouchableOpacity onLongPress={() => console.log(key)} onPress={() => this.move_detail(value)} key={key} style={{ marginBottom: 3, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ width: Dimensions.get('window').width / 2, height: Dimensions.get('window').width / 2, }} source={{ uri: value.file_uri }} />
                        <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: 3 }}>{value.subject}</Text>
                    </View>
                </TouchableOpacity>
            )
        })
        return (
            <ScrollView>
                <View >
                    {temp}
                    <TouchableOpacity style={styles.touch_btn} onPress={() => this.test()} ><Text style={styles.text_btn}>값</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.touch_btn}  ><Text style={styles.text_btn}>삭제</Text></TouchableOpacity>
                </View>
            </ScrollView>
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