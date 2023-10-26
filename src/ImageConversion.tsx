import * as tf from '@tensorflow/tfjs';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as fs from 'expo-file-system';


export const imgTransform = async (imgUri : string) =>
{
    const image = await fs.readAsStringAsync(imgUri, {encoding:fs.EncodingType.Base64});
    const imageUintArr = tf.util.encodeString(image, 'base64');
    const imgTensorData = decodeJpeg(imageUintArr, 3);
    let imgTensor = tf.image.resizeNearestNeighbor(imgTensorData, [224, 224]);
    const tensorImg = tf.reshape(imgTensor, [1, 224, 224, 3])
    return tensorImg;
}