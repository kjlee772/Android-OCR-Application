import React, { Fragment, Component } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    Button,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filepath: {
                data: '',
                uri: ''
            },
            fileData: '',
            fileUri: '',
        }
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
            includeBase64: true,
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

    launchCamera = () => {
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
            return <TouchableOpacity onPress={() => this.move_screen('Image')}>
                <Image source={{ uri: this.state.fileUri }}
                    style={styles.images}
                />
            </TouchableOpacity>
        } else {
            return <TouchableOpacity onPress={() => this.move_screen('Image')}>
                <Image source={require('./wakeupcat.jpg')}
                    style={styles.images}
                />
            </TouchableOpacity>
        }
    }

    image_upload(){
        fetch('221.158.52.168:8888/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                imgsource: this.state.filePath.assets[0].base64,
            }),
        })
    }

    move_screen(temp) {
        this.props.navigation.navigate(temp);
    }

    render() {
        return (
            <Fragment>
                <SafeAreaView>
                    <View style={styles.container}>
                        <View style={styles.image_section}>
                            {this.renderFileUri()}
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
                </SafeAreaView>
            </Fragment>
        );
    }
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },

    container: {
        backgroundColor: Colors.white,
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1,
        height: Dimensions.get('screen').height - 20,
        width: Dimensions.get('screen').width,
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