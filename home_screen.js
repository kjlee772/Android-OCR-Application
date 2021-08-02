// import React from 'react';
// import {
//     SafeAreaView,
//     StyleSheet,
//     View,
//     Text,
//     StatusBar,
//     Image,
//     Dimensions,
//     TouchableOpacity,
//   } from 'react-native';
// import {
//     Colors,
//   } from 'react-native/Libraries/NewAppScreen';

//   import {ImagePicker} from 'react-native-image-picker';

// const options = {
//     title: 'Select Avatar',
//     customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
//     storageOptions: {
//         skipBackup: true,
//         path: 'images',
//     },
// };

// export default class home_screen extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             filepath: {
//                 data: '',
//                 uri: ''
//             },
//             fileData: '',
//             fileUri: '',
//         }
//     }

//     chooseImage = () => {
//         let options = {
//             title: 'Select Image',
//             customButtons: [
//                 { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
//             ],
//             storageOptions: {
//                 skipBackup: true,
//                 path: 'images',
//             },
//         };
//         ImagePicker.showImagePicker(options, (response) => {
//             console.log('Response = ', response);

//             if (response.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             } else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton);
//                 alert(response.customButton);
//             } else {
//                 const source = { uri: response.uri };

//                 // You can also display the image using data:
//                 // const source = { uri: 'data:image/jpeg;base64,' + response.data };
//                 // alert(JSON.stringify(response));s
//                 console.log('response', JSON.stringify(response));
//                 this.setState({
//                     filePath: response,
//                     fileData: response.data,
//                     fileUri: response.uri
//                 });
//             }
//         });
//     }

//     launchCamera = () => {
//         let options = {
//             storageOptions: {
//                 skipBackup: true,
//                 path: 'images',
//             },
//         };
//         ImagePicker.launchCamera(options, (response) => {
//             console.log('Response = ', response);

//             if (response.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             } else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton);
//                 alert(response.customButton);
//             } else {
//                 const source = { uri: response.uri };
//                 console.log('response', JSON.stringify(response));
//                 this.setState({
//                     filePath: response,
//                     fileData: response.data,
//                     fileUri: response.uri
//                 });
//             }
//         });

//     }

//     launchImageLibrary = () => {
//         let options = {
//             storageOptions: {
//                 skipBackup: true,
//                 path: 'images',
//             },
//         };
//         ImagePicker.launchImageLibrary(options, (response) => {
//             console.log('Response = ', response);

//             if (response.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             } else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton);
//                 alert(response.customButton);
//             } else {
//                 const source = { uri: response.uri };
//                 console.log('response', JSON.stringify(response));
//                 this.setState({
//                     filePath: response,
//                     fileData: response.data,
//                     fileUri: response.uri
//                 });
//             }
//         });

//     }

//     renderFileData() {
//         if (this.state.fileData) {
//             return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
//                 style={styles.images}
//             />
//         }
//         // else {
//         //     return <Image source={require('./assets/dummy.png')}
//         //         style={styles.images}
//         //     />
//         // }
//     }

//     renderFileUri() {
//         if (this.state.fileUri) {
//             return <Image
//                 source={{ uri: this.state.fileUri }}
//                 style={styles.images}
//             />
//         }
//         // else {
//         //     return <Image
//         //         source={require('./assets/galeryImages.jpg')}
//         //         style={styles.images}
//         //     />
//         // }
//     }

//     render() {
//         return (
//           <>
//             <StatusBar barStyle="dark-content" />
//             <SafeAreaView>
//               <View style={styles.body}>
//                 <Text style={{textAlign:'center',fontSize:20,paddingBottom:10}} >Pick Images from Camera & Gallery</Text>
//                 <View style={styles.ImageSections}>
//                   <View>
//                     {this.renderFileData()}
//                     <Text  style={{textAlign:'center'}}>Base 64 String</Text>
//                   </View>
//                   <View>
//                     {this.renderFileUri()}
//                     <Text style={{textAlign:'center'}}>File Uri</Text>
//                   </View>
//                 </View>
    
//                 <View style={styles.btnParentSection}>
//                   <TouchableOpacity onPress={this.chooseImage} style={styles.btnSection}  >
//                     <Text style={styles.btnText}>Choose File</Text>
//                   </TouchableOpacity>
    
//                   <TouchableOpacity onPress={this.launchCamera} style={styles.btnSection}  >
//                     <Text style={styles.btnText}>Directly Launch Camera</Text>
//                   </TouchableOpacity>
    
//                   <TouchableOpacity onPress={this.launchImageLibrary} style={styles.btnSection}  >
//                     <Text style={styles.btnText}>Directly Launch Image Library</Text>
//                   </TouchableOpacity>
//                 </View>
    
//               </View>
//             </SafeAreaView>
//           </>
//         );
//       }

// }

// const styles = StyleSheet.create({
//     scrollView: {
//       backgroundColor: Colors.lighter,
//     },
  
//     body: {
//       backgroundColor: Colors.white,
//       justifyContent: 'center',
//       borderColor: 'black',
//       borderWidth: 1,
//       height: Dimensions.get('screen').height - 20,
//       width: Dimensions.get('screen').width
//     },
//     ImageSections: {
//       display: 'flex',
//       flexDirection: 'row',
//       paddingHorizontal: 8,
//       paddingVertical: 8,
//       justifyContent: 'center'
//     },
//     images: {
//       width: 150,
//       height: 150,
//       borderColor: 'black',
//       borderWidth: 1,
//       marginHorizontal: 3
//     },
//     btnParentSection: {
//       alignItems: 'center',
//       marginTop:10
//     },
//     btnSection: {
//       width: 225,
//       height: 50,
//       backgroundColor: '#DCDCDC',
//       alignItems: 'center',
//       justifyContent: 'center',
//       borderRadius: 3,
//       marginBottom:10
//     },
//     btnText: {
//       textAlign: 'center',
//       color: 'gray',
//       fontSize: 14,
//       fontWeight:'bold'
//     }
//   });
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
        }
        else {
            return <Image source={require('./wakeupcat.jpg')}
            style={styles.images}
          />
        }
    }

    renderFileUri() {
        if (this.state.fileUri) {
            return <TouchableOpacity onPress={()=>this.move_screen('Image')}>
                <Image source={{ uri: this.state.fileUri }}
                    style={styles.images}
                />
                </TouchableOpacity>
        } else {
            return <TouchableOpacity onPress={()=>this.move_screen('Image')}>
                <Image source={require('./wakeupcat.jpg')}
                style={styles.images}
                />
                </TouchableOpacity>
        }
    }

    move_screen(temp){
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
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity onPress={this.launchCamera} style={styles.btn}  >
                                    <Text style={styles.btn_text}>사진 촬영하기</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.chooseImage} style={styles.btn}  >
                                    <Text style={styles.btn_text}>사진 불러오기</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.btn} onPress={()=>this.move_screen('Ocr')}  >
                                <Text style={styles.btn_text}>텍스트 추출하기</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn} onPress={()=>this.move_screen('Storage')}  >
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
        flex:3,
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
        width: 150,
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