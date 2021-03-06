import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from './loading';

const image_option = {
    quality: 1,
    includeBase64: true,
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: 'home',
            file_uri: null,
            file_size: null,
            file_base64: null,
            file_name: null,
            file_data: null,
            all_key: null,
            all_data: null,
            subject: null,
            loading_flag: false,
            send_flag: false,
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
            this.move_screen_storage();
        } catch (e) {
            console.log('!!! multi err');
        }
    }

    chooseImage() {
        console.log('choose image called');
        this.setState({ send_flag: true })
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
                this.send_image();
            }
        });
    }
    launchCamera() {
        console.log('launch camera called');
        this.setState({ send_flag: true })
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
                this.send_image();
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
                send_flag: true,
            });
            this.send_image();
        }).catch((err) => {
            console.log('!!! edit error');
        });
    }

    edit_alert = () =>
        Alert.alert(
            '????????? ??????????????????????',
            '',
            [
                {
                    text: '???',
                    onPress: () => this.editImage(),
                },
                {
                    text: '?????????',
                },
            ],
        );

    // shouldComponentUpdate(prevProps, prevState) {
    //     return this.state.file_uri != prevState.file_uri;
    // }

    render_image() {
        if (this.state.file_uri) {
            return (
                <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={() => this.edit_alert()} >
                    <Image source={{ uri: this.state.file_uri }} style={styles.images} />
                </TouchableOpacity>
            );
        }
        else {
            return (
                <TouchableOpacity style={{ width: '100%', height: '100%', backgroundColor: 'black', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>?????????{'\n'}??????????????????</Text>
                </TouchableOpacity>
            );
        }
    }

    move_screen_ocr() {
        this.props.navigation.navigate('Ocr', { file_name: this.state.file_name, file_uri: this.state.file_uri, file_data: this.state.file_data, subject: this.state.subject, from: this.state.from });
    }
    move_screen_storage() {
        this.props.navigation.navigate('Storage', { all_data: this.state.all_data, from: this.state.from });
    }

    send_image() {
        console.log('send image called');
        this.setState({ loading_flag: true, });
        fetch('?????? ?????? ??????', {
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
                this.setState({ send_flag: false, loading_flag: false });
            })
            .catch(err => {
                console.log('send image ??????: ' + err.message, err.code);
                this.setState({ send_flag: false, loading_flag: false });
            });
    }
    ocr() {
        if (this.state.file_uri == null) {
            Alert.alert(
                '????????? ??????????????????',
                '',
                [
                    {
                        text: 'OK'
                    }
                ],
            );
        }
        else {
            this.setState({ loading_flag: true });
            console.log('ocr called');
            fetch('?????? ?????? ??????', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    name: this.state.file_name,
                }),
            })
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        file_data: res.Res,
                        loading_flag: false
                    });
                    this.move_screen_ocr();
                })
                .catch(err => {
                    console.log('Ocr ??????: ' + err.message, err.code);
                    Alert.alert(
                        '???????????? ??????',
                        '?????? ????????? ???????????? ??????????????????.',
                    );
                    this.setState({
                        loading_flag: false,
                    })
                });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.view_image}>
                    {this.render_image()}
                </View>
                <View style={styles.view_menu}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                        <TouchableOpacity style={[styles.touch_btn, { marginRight: 10 }]} onPress={() => this.launchCamera()} ><Text style={styles.text_btn}>?????? ????????????</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.touch_btn} onPress={() => this.chooseImage()}><Text style={styles.text_btn}>?????? ????????????</Text></TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[styles.touch_btn, { marginBottom: 10, width: 200 }]} onPress={() => this.ocr()} ><Text style={styles.text_btn}>????????? ????????????</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.touch_btn, { width: 120 }]} onPress={() => this.get_all_keys()} ><Text style={styles.text_btn}>?????????</Text></TouchableOpacity>
                </View>
                {this.state.loading_flag ?
                    <Loading /> : <></>}
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