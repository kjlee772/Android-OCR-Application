import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { launchCamera, launchImageLibrary, showImagePicker } from 'react-native-image-picker';

export default class App extends Component {

    options = {
        title: 'Load Photo',
        customButtons: [
            { name: 'button_id_1', title: 'CustomButton 1' },
            { name: 'button_id_2', title: 'CustomButton 2' }
        ],
        storageOptions: {
        skipBackup: true,
        path: 'images',
        },
    };

    sip = () => {
        showImagePicker({}, (response) => {
            console.log('Response= ',response);

            setImageSource(response.uri);
        });
    };

    sc = () => {
        launchCamera({}, (response) => {
            if (response.error) {
                console.log('LaunchCamera Error: ', response.error);
            }
            else {
                setImageSource(response.uri);
            }
        });
    };
    
    scr = () => {
        launchImageLibrary({}, (response) => {
            if (response.error) {
                console.log('LaunchImageLibrary Error: ', response.error);
            }
            else {
                setImageSource(response.uri);
            }
        });
    };

    render () {
        return (
            <View style={styles.container}>
                <Button
                    title="촬영"
                    onPress={() => this.sip()}
                />
                <Button
                    title="앨범"
                    onPress={() => this.sc()}
                />
                <Button
                    title="뭐고"
                    onPress={() => this.scr()}
                />
                <Button
                    title="아카이브"

                />

            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink',
        //alignItems: 'center',
        //justifyContent: 'center'
    },

    avatar: {
        width: '100%',
        height: 400
    },

});
// import React, { Component } from 'react';
// import { View, Text, StyleSheet, Image, Button } from 'react-native';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// export default class App extends Component {

//     state = {
//         avatar: '이미지 uri',
//         result: '결과',
//         test_num:0
//     }

//     //촬영
//     addImage = () => {
//         launchCamera( {}, response => {
//             this.setState({
//                 avatar: response.uri
//             })
//         })
//         //ocr(this.state.avatar)
//         console.log('통과');
//     }

//     //앨범선택
//     ChoosePhoto = () => {
//          launchImageLibrary( {}, response => {
//                 this.setState({
//                     avatar: response.uri
//                 })
//          })
//          //ocr(this.state.avatar)
//     }

//     render () {
//         return (
//             <View style={styles.container}>

//                 <Image
//                     style={styles.avatar}
//                     source={{uri: this.state.avatar}}
//                 />

//                 <Text style={{margin:8}}> {this.state.avatar}</Text>
//                 <Text style={{margin:8}}> {this.state.result}</Text>
//                 <Text style={{margin:8}}> {this.state.test_num}</Text>
//                 <Button
//                     title="촬영"
//                     onPress={() => this.addImage()}
//                 />
//                 <Button
//                     title="앨범"
//                     onPress={() => this.ChoosePhoto()}
//                 />
//                 <Button
//                     title="아카이브"

//                 />

//             </View>
//         )
//     }
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'pink',
//         //alignItems: 'center',
//         //justifyContent: 'center'
//     },

//     avatar: {
//         width: '100%',
//         height: 400
//     },

// });