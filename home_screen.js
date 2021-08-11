import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Pressable, } from 'react-native';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

import * as RNFS from 'react-native-fs';

const image_option = {
    quality: 1,
    includeBase64: true,
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file_uri: null,
            file_size: null,
            file_base64: null,
            file_name: null,
            file_data: '현재 Google Vision은 연동되지 않고 있음 테스트하는 중임\n테스트 중입니다.\n로컬 스토리지 테스트 중',
        }
    }

    chooseImage() {
        console.log('choose image called');
        launchImageLibrary(image_option, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                this.setState({
                    file_uri: response['assets'][0].uri,
                    file_size: response['assets'][0].fileSize,
                    file_base64: response['assets'][0].base64,
                    file_name: response['assets'][0].fileName,
                });
                console.log('uri: ' + this.state.file_uri);
                console.log('size: ' + this.state.file_size);
                // console.log('base64: '+this.state.file_base64);
                console.log('filename: ' + this.state.file_name);
            }
        });
    }
    launchCamera() {
        console.log('launch camera called');
        launchCamera(image_option, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                this.setState({
                    file_uri: response['assets'][0].uri,
                    file_size: response['assets'][0].fileSize,
                    file_base64: response['assets'][0].base64,
                    file_name: response['assets'][0].fileName,
                });
                console.log('uri: ' + this.state.file_uri);
                console.log('size: ' + this.state.file_size);
                // console.log('base64: '+this.state.file_base64);
                console.log('filename: ' + this.state.file_name);
            }
        });
    }
    editImage() {
        console.log('edit image called');
        ImagePicker.openCropper({
            path: this.state.file_uri,
            width: 1024,
            height: 1024,
            includeBase64: true,
            freeStyleCropEnabled: true,
        }).then(image => {
            this.setState({
                file_uri: image.path,
                file_size: image.size,
                file_base64: image.data,
            });
            console.log('uri: ' + this.state.file_uri);
            console.log('size: ' + this.state.file_size);
            // console.log('base64: '+this.state.file_base64);
            console.log('filename: ' + this.state.file_name);
        });
    }

    shouldComponentUpdate(prevProps, prevState) {
        return this.state.file_uri != prevState.file_uri;
    }

    render_image() {
        if (this.state.file_uri) {
            this.send_image();
            return (
                <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={() => this.editImage()} >
                    <Image source={{ uri: this.state.file_uri }} style={styles.images} />
                </TouchableOpacity>
            );
        }
        else {
            return (
                <TouchableOpacity style={{ width: '100%', height: '100%' }}>
                    <Image source={require('./wakeupcat.jpg')} style={styles.images} />
                </TouchableOpacity>
            );
        }
    }

    move_screen_ocr() {
        this.props.navigation.navigate('Ocr', { file_uri: this.state.file_uri, file_data: this.state.file_data });
    }
    move_screen_storage() {
        this.props.navigation.navigate('Storage');
    }

    send_image() {
        console.log('send image called');
        fetch('http://221.158.52.168:3001/sendImage', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.file_name,
                data: this.state.file_base64,
            }),
        })
            .then(res => res.json())
            .then(res => {
                console.log(res.message);
            })
            .catch(err => {
                console.log('send image 문제: ' + err.message, err.code);
            });
    }
    ocr() {
        console.log('ocr called');
        this.move_screen_ocr();

        // fetch('http://221.158.52.168:3001/ocr', {
        //     method: 'POST',
        //     headers: {
        //         'Content-type': 'application/json',
        //         'Accept': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         name: this.state.file_name,
        //     }),
        // })
        //     .then(res => res.json())
        //     .then(res => {
        //         console.log(res.Res);
        //         this.setState({
        //             file_data: res.Res,
        //         });
        //         this.move_screen_ocr();
        //     })
        //     .catch(err => {
        //         console.log('Ocr 문제: ' + err.message, err.code);
        //     });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.view_image}>
                    {this.render_image()}
                </View>
                <View style={styles.view_menu}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                        <TouchableOpacity style={[styles.touch_btn, { marginRight: 10 }]} onPress={() => this.launchCamera()} ><Text style={styles.text_btn}>사진 촬영하기</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.touch_btn} onPress={() => this.chooseImage()}><Text style={styles.text_btn}>사진 불러오기</Text></TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[styles.touch_btn, { marginBottom: 10, width: 200 }]} onPress={() => this.ocr()} ><Text style={styles.text_btn}>텍스트 추출하기</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.touch_btn, { width: 120 }]} onPress={() => this.move_screen_storage()} ><Text style={styles.text_btn}>저장소</Text></TouchableOpacity>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    view_image: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        display: 'flex',
    },
    view_menu: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    images: {
        backgroundColor: 'black',
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
    },
    text_btn: {
        fontSize: 27,
        fontWeight: 'bold',
    },
    touch_btn: {
        backgroundColor: 'gray',
        width: 170,
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
});