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

// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const stack = createStackNavigator();

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
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response['assets'][0].uri);
            console.log(response.data);
            
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
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
            console.log('Response = ', response);

           if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };
                console.log('response', JSON.stringify(response));
                this.setState({
                    filePath: response,
                    fileData: response['assets'][0].uri,
                    fileUri: response['assets'][0].uri
                });
            }
        });
    }
    
    touchtest = () => {
        console.log("touch");
    }

    renderFileData() {
        if (this.state.fileData) {
            return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
            style={styles.images}
          />
        } else {
            return <Image source={require('./wakeupcat.jpg')}
            style={styles.images}
          />
        }
    }

    renderFileUri() {
        if (this.state.fileUri) {
            return <TouchableOpacity onPress={this.touchtest}>
                <Image source={{ uri: this.state.fileUri }}
                    style={styles.images}
                />
                </TouchableOpacity>
        } else {
            return <TouchableOpacity onPress={this.touchtest}>
                <Image source={require('./wakeupcat.jpg')}
                style={styles.images}
                />
                </TouchableOpacity>
        }
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
                            <TouchableOpacity onPress={this.launchCamera} style={styles.btn}  >
                                <Text style={styles.btn_text}>사진 촬영하기</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.chooseImage} style={styles.btn}  >
                                <Text style={styles.btn_text}>사진 불러오기</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn}  >
                                <Text style={styles.btn_text}>ARCHIVE</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn}  >
                                <Text style={styles.btn_text}>사용방법</Text>
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
        flex:2,
        backgroundColor: '#CCFFFF',
    },

    images: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
        backgroundColor:'black',
    },

    button_section: {
        alignItems: 'center',
        marginTop:10,
        flex:1,
        justifyContent:'flex-end',
        marginBottom:20,
    },

    btn: {
        width: 225,
        height: 50,
        backgroundColor: '#DCDCDC',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom:10
    },

    btn_text: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 20,
        fontWeight:'bold'
    }
});



// {
//     "assets": [
//         {
//             "fileName": "rn_image_picker_lib_temp_a07c8313-1f6d-4d76-8163-72c7a574af94.jpg", 
//             "fileSize": 3933534, 
//             "height": 3024, 
//             "type": "image/jpeg", 
//             "uri": "file:///data/user/0/com.test_1/cache/rn_image_picker_lib_temp_a07c8313-1f6d-4d76-8163-72c7a574af94.jpg", 
//             "width": 4032
//         }
//     ]
// }

// [
//     {
//         "fileName": "rn_image_picker_lib_temp_f3c8d0c4-b22e-4e3c-9fbf-bded41c2bf4c.jpg", 
//         "fileSize": 1257184, 
//         "height": 1440, 
//         "type": "image/jpeg", 
//         "uri": "file:///data/user/0/com.test_1/cache/rn_image_picker_lib_temp_f3c8d0c4-b22e-4e3c-9fbf-bded41c2bf4c.jpg", 
//         "width": 1080
//     }
// ]
