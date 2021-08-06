import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, } from 'react-native';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import * as RNFS from 'react-native-fs';

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filepath: {
                data: '',
                uri: ''
            },
            fileData: '',
            fileUri: '',
            base_64: '',
            mime: '',
            path: '',
        }
        // console.log("ImagePicker: " + ImagePicker);
        // console.log("openPicker: " + ImagePicker.openPicker);
        // console.log("openCamera: " + ImagePicker.openCamera);
    }

    chooseImage = () => {
        let options = {
            title: 'Select Image',
            customButtons: [
                { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            // includeBase64: true,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                console.log("LaunchImageLibrary= ");
                var temp = JSON.stringify(response);
                console.log(temp);
                const source = { uri: response.uri };
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                // alert(JSON.stringify(response));

                // console.log('response', JSON.stringify(response));
                this.setState({
                    filePath: response,
                    fileData: response['assets'][0].uri,
                    fileUri: response['assets'][0].uri
                });
            }
        });
    }
    launchCamera() {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                console.log("LaunchCamera= " + JSON.stringify(response));
                const source = { uri: response.uri };
                this.setState({
                    filePath: response,
                    fileData: response['assets'][0].uri,
                    fileUri: response['assets'][0].uri
                });
            }
        });
    }

    renderFileData() {
        if (this.state.fileData) {
            return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
                style={styles.images}
            />
        }
        else {
            return <Image source={require('./wakeupcat.jpg')}
                style={styles.images}
            />
        }
    }

    renderFileUri() {
        if (this.state.fileUri) {
            return <TouchableOpacity t_uri={this.state} onPress={() => this.edit_image()}>
                <Image source={{ uri: this.state.fileUri }}
                    style={styles.images}
                />
            </TouchableOpacity>
        } else {
            return <TouchableOpacity onPress={() => this.edit_image()}>
                <Image source={require('./wakeupcat.jpg')}
                    style={styles.images}
                />
            </TouchableOpacity>
        }
    }

    edit_image() {
        ImagePicker.openPicker({
            width: 2500,
            height: 2500,
            cropping: true,
            includeBase64: true,
            freeStyleCropEnabled: true,
        }).then(image => {
            console.log(image.size);
            this.setState({
                base_64: image.data,
                mime: image.mime,
                path: image.path,
            })
        });
    }

    move_screen(temp) {
        ImagePicker.clean().then(() => {
            console.log('removed all tmp images from tmp directory');
        }).catch(e => {
            alert(e);
        });
        this.props.navigation.navigate(temp);
    }

    render_img() {
        if (this.state.base_64) {
            console.log("tlqkf")
            // console.log(this.state.mime)
            // console.log(this.state.base_64)
            return <Image style={{width:300,height:300}} source={{uri: `data:${this.state.mime};base64,${this.state.base_64}`}} />
            // return <Image style={{ width: 300, height: 300 }} source={{ uri: this.state.path }} />
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.image_section}>
                    {this.renderFileUri()}
                    {this.render_img()}
                </View>
                <View style={styles.button_section}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={this.launchCamera} style={styles.btn}  >
                            <Text style={styles.btn_text}>사진 촬영하기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.chooseImage} style={styles.btn}  >
                            <Text style={styles.btn_text}>사진 불러오기</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={() => this.move_screen('Ocr')}  >
                        <Text style={styles.btn_text}>텍스트 추출하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => this.move_screen('Storage')}  >
                        <Text style={styles.btn_text}>ARCHIVE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1,
        height: Dimensions.get('screen').height - 20,
        width: Dimensions.get('screen').width,
    },

    scrollView: {
        backgroundColor: 'white',
    },

    image_section: {
        display: 'flex',
        paddingHorizontal: 8,
        paddingVertical: 8,
        justifyContent: 'center',
        flex: 3,
        backgroundColor: '#CCFFFF',
    },

    images: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
        backgroundColor: 'black',
    },

    button_section: {
        alignItems: 'center',
        marginTop: 10,
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 20,
    },

    btn: {
        width: 150,
        height: 50,
        backgroundColor: '#DCDCDC',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 10
    },

    btn_text: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 20,
        fontWeight: 'bold'
    }
});