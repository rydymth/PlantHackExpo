import * as tf from '@tensorflow/tfjs';
import { imgTransform } from './ImageConversion';
import { getUri } from './ViewImage';
import { tmpClassnames } from './classNames';

const func = async (model: tf.LayersModel) =>
{
    try
    {
        const classNames = tmpClassnames;
        console.log("The uri is: " + getUri());
        const imgUri = getUri();
        const imgTensor = await imgTransform(imgUri);
        console.log(imgTensor.shape);
        console.log("The type is: " + typeof imgTensor);
        model.summary();
        const pred = await model.predict(imgTensor).toString();
        let predictions = pred.slice(14,45);
        let probArray = predictions.split(",").map(Number);
        console.log(probArray);
        const maxi = Math.max(...probArray);
        const classified = classNames[probArray.indexOf(maxi)];
        console.log(classified + maxi);
        return [maxi, classified];
    }
    catch (error)
    {
        console.log(error);
    }
}

export default func;