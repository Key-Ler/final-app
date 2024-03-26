import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, TouchableOpacity, Text, View } from 'react-native';

// importing camera
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';

const CameraScreen = () => {
    const [type, setType] = useState(CameraType.front);
    const [ permission, requestPermission] = Camera.useCameraPermissions();

    if(!permission)
    {
        return <View />;
    }
    
    if(!permission.granted)
    {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center'}}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title='Grant Permission'/> 
            </View>
        );
    }
  return (
    <View style={styles.container}>
        <Camera style={styles.camera} type={type}>
            <TouchableOpacity style={styles.button} onPress={null}>
                <Text style={styles.text}>Show model</Text>
            </TouchableOpacity>
        </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
      },
      camera: {
        flex: 1,
      },
      buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
      },
      button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        
      },
      text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
      },
});

export default CameraScreen;