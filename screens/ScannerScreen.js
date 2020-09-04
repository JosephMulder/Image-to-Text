import React, { Component, useRef } from 'react';
import { StyleSheet, SafeAreaView, Platform, Text, Modal, View, TouchableOpacity, Image, StatusBar, AsyncStorage, DeviceEventEmitter, NativeModules, Alert, ToastAndroid, ScrollView, Button, Dimensions, Animated, PanResponder, PixelRatio } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Fontisto';
import { Input } from 'react-native-elements';
import { RNCamera } from 'react-native-camera';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");


export default class ScannerScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      takeTextNow: false,
      selectedComponent: "camera",
      textFound: [{bounds: {origin: {x: 0, y: 0}, size: {width: 0, height: 0} }, value: "" }],
      savedTextFound: [{bounds: {origin: {x: 0, y: 0}, size: {width: 0, height: 0} }, value: "" }],
      imageTaken: "",
      dimensions: {
        window,
        screen
      },
      cameraPreview: {
        height: window.height -200,
        width: window.width,
        alignItems: 'center',
        justifyContent: 'center',
        display: "flex"
      },
      OCRPreview: {
        flex: 1,
        backgroundColor: 'white', 
        display: "none",
        margin: 10
      }
    };
  }

  
    changeMainView = () => {
      this.setState({
        cameraPreview: { ...this.state.cameraPreview, display: this.state.cameraPreview.display === "none" ? "flex" : "none" },
        OCRPreview: { ...this.state.OCRPreview, display: this.state.OCRPreview.display === "none" ? "flex" : "none"  },
        savedTextFound: this.state.textFound
      }, () => console.log(this.state.cameraPreview))
    }
    static navigationOptions = {
      title: 'Scan',
    };

    takePicture = async () => {
      if (this.camera) {
        const options = { quality: 0.5, base64: true };
        const data = await this.camera.takePictureAsync(options);
        console.log(data.uri);
        this.setState({
          imageTaken: data.uri
        });
      }
    };

    textRecognized = (e) => {
      let textArr = [];
      if (e.textBlocks) {
        for (let i = 0; i < e.textBlocks.length;i++) {
          if (e.textBlocks[i].components.length > 0) {
            textArr.push(e.textBlocks[i]);
          }
        }
      }
      this.setState({
        textFound: textArr,
      });
    }



    onInputTextChange = (e, identifier) => {
      const { eventCount, target, text } = e.nativeEvent;
      this.setState({
        [identifier]: text
      });
    }

  render() { 
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{height: 100, width: '100%', backgroundColor: 'black'}}>

        </View>
          
          <RNCamera
            ref={(ref) => {
              this.camera = ref;
            }}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            style={this.state.cameraPreview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
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
              this.textRecognized(e);
            }}
          />
        <ScrollView style={this.state.OCRPreview}>
            <Text selectable>
            {this.state.savedTextFound.map((text, index) => (
               <Text key={index} style={{fontSize: 12, color: "black"}} selectable>{text.value} {"\n"}</Text>
           ))}
           </Text>
        </ScrollView>

        <View style={{height: 100,width: '100%', flexDirection: 'row', justifyContent: 'center', backgroundColor: 'black' }}>
          <TouchableOpacity 
            onPress={this.changeMainView} 
            style={styles.capture}>
            <Text style={{ fontSize: 14 }}> Get Text </Text>
          </TouchableOpacity>
        </View>



 
           {this.state.textFound.map((text, index) => (
             <View style={{ position: 'absolute', zIndex: 15, top: text.bounds.origin.y +100, left: text.bounds.origin.x, width: text.bounds.size.width, height: text.bounds.size.height, backgroundColor: 'purple', opacity:.7 }} key={index}>
               <Text style={{fontSize: 8, color: "#39ff14"}} >{text.value}</Text>
             </View>
           ))}

      </SafeAreaView>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    height: window.height -200,
    width: window.width,
    alignItems: 'center',
    justifyContent: 'center',
    display: "none"
  },
  capture: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  text_btn: {
    position: 'absolute',
    zIndex: 15,
    marginTop: 100,
    flexDirection: 'row',
    width: 100, 
    height: 100,
    backgroundColor: "blue"
  },
  tinyImage : {
    width: window.width,
    height: window.width
  },
  detectedText: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  leftIcon: {
    paddingRight: 10,
  },
  textAbs: {
    position: 'absolute',
    zIndex: 15,
  }
});