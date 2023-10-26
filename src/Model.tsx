import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import React, { useEffect, useState } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import func from './Prediction';

export default function Model()
{
  const [tsReady, setTsReady] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [predict, predState] = useState(false);
  const [prob, setProb] = useState<String | Number>(0);
  const [plant, setPlant] = useState<String | Number>(" ");

  const modelJson = require('../assets/ShubhamModel/model.json');
  const modelBins = require('../assets/ShubhamModel/weights.bin');
  
  async function tfjsMount()
  {
    await tf.ready();
    setTsReady(true);
    console.log(`TFJS state: ${tsReady}`);
  }
  

  const getModel = async () =>
  {
    tfjsMount();
    const retModels = await tf.loadLayersModel(bundleResourceIO(modelJson,modelBins));
    setModelReady(true);
    return retModels;
  } 

  useEffect (() => {
    getModel();
  }, [])

  const getPredictions = async () =>
  {
    const model = await getModel();
    const [maxi, classified] = await func(model);
    predState(true);
    setProb(maxi);
    setPlant(classified);
  }

    const styles = StyleSheet.create({
      container: {
        paddingTop: 50,
        flex: 1
      }
    })

  return (
    <View style={styles.container}>
      <Text>State of tfjs: </Text>{tsReady?<Text>Yes</Text>: ''}
      <Text>Our model state:
        {modelReady?
          <Text>Ready</Text>:
          <Text>Model is Loading</Text>
        }
      </Text>
      <View>
        <Button title='Predict the image' onPress={getPredictions}/>
      </View>
      <View>
        <Text>Model state:</Text>
        {predict?
        <View>
          <Text>It has loaded</Text>
          <Text>The predictions are as follows: </Text>
          <Text>Bro is a </Text>
          <Text>{plant}</Text>
          <Text>With the probability of {prob}</Text>
        </View>
        :<Text>Still loading</Text>}
      </View>
    </View>
  )
}