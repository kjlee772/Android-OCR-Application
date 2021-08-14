import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';

export default class storage_screen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            all_data: this.props.route.params.all_data,
        }
    }

    // show_value() {
    //     console.log(this.state.all_data);
    // }

    // make_view() {
    //     console.log(this.state.all_data.length);
    //     let temp = this.state.all_data.map(([key, value]) => {
    //         return (
    //             <TouchableOpacity key={key}>
    //                 <View>
    //                     <View>
    //                         <Image style={{ width: 200, height: 200 }} source={{ uri: value.file_uri }} />
    //                     </View>
    //                     <View>
    //                         <Text>{value.subject}</Text>
    //                     </View>
    //                 </View>
    //             </TouchableOpacity>
    //         )
    //     }
    //     )
    //     console.log(temp)
    // }

    move_detail(temp){
        this.props.navigation.navigate('Ocr', {file_uri: temp.file_uri, file_data:temp.file_data, subject:temp.subject});
    }

    render() {
        let temp = this.state.all_data.map(([key, value]) => {
            return (
                <TouchableOpacity onPress={()=>this.move_detail(value)} key={key} style={{ marginBottom: 3, }}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Image style={{ width: Dimensions.get('window').width / 2, height: Dimensions.get('window').width / 2, }} source={{ uri: value.file_uri }} />
                        <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft:3}}>{value.subject}</Text>
                    </View>
                </TouchableOpacity>
            )
        })
        return (
            <ScrollView>
                <View >
                    {temp}
                    <TouchableOpacity style={styles.touch_btn} onPress={() => this.show_value()} ><Text style={styles.text_btn}>값</Text></TouchableOpacity>
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