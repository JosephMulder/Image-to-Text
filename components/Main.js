import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default Main = (props) => {
    return (
        <>
            <RNCamera
                autoFocus={RNCamera.Constants.AutoFocus.on}
                style={props.cameraPreview}
                type={RNCamera.Constants.Type.back}
                flashMode={props.torchMode ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
                }}
                onTextRecognized={(e) => {
                props.textRecognized(e);
                }}
            />
            <ScrollView style={props.OCRPreview}>
                <Text selectable>
                {props.savedTextFound.map((text, index) => (
                    <Text key={index} style={{fontSize: 12, color: "black"}} selectable>{text.value} {"\n"}</Text>
                ))}
                </Text>
            </ScrollView>
        </>
    );
}