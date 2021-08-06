import React from 'react';
import { View, Text } from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

export default class image_screen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        console.log(ImagePicker);
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        })
    }

    render() {
        return (
            <View>
                <Text>Image</Text>
            </View>
    );
    }

}

// const styles = StyleSheet.create({

// });