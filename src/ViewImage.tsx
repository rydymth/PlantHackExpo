import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const options = {
    mediaType: 'photo',
    quality: 1,
    width: 224,
    height: 224,
    allowsEditing: true,
    includeBase64: true
}

let imageUri = " ";
const setUri = (uri: string) =>
{
    imageUri = uri;
}

export function getUri ()
{
    return imageUri;
}

export default function gsImg()
{
    const [imgUri, setImgUri] = useState(" ");

    const openCamera = async () =>
    {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (permission.granted === false)
        {
            Alert.prompt(
                'Give Camera Access',
            )
            return;
        }
        const res = await ImagePicker.launchCameraAsync(options);
        if (!res.canceled)
        {
            setImgUri(res.assets[0].uri);
            setUri(imgUri);
            return res.assets[0].uri;
        }
    }

    const openLibrary = async () =>
    {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permission.granted === false)
        {
            Alert.prompt(
                'Give Media Access',
            );
            return;
        }
        const res = await ImagePicker.launchImageLibraryAsync(options);
        if (!res.canceled)
        {
            setImgUri(res.assets[0].uri);
            setUri(imgUri);
            return res.assets[0].uri;
        }
    }

    const styles = StyleSheet.create({
      container: {
        paddingTop: 50,
      },
      tinyLogo: {
        width: 300,
        height: 300,
        padding: 15
      },
      logo: {
        width: 66,
        height: 58,
      },
    });


    return(
        <View style={styles.container}>
            <Text>Getting And Displaying Image</Text>
            <View style={styles.container}>
                <View>
                    <Button title="Pick an image from library" onPress={openLibrary} />
                </View>
                <View>
                    <Button title="Pick an image from camera" onPress={openCamera} />
                </View>
                <View style={styles.logo}>
                    {imgUri
                        &&
                        <Image
                            style={styles.tinyLogo}
                            source={{ uri: `${imgUri}` }}
                        />
                    }
                </View>
            </View>
        </View>
    )
}