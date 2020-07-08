import React, { Component, useRef } from 'react';
import { StyleSheet, SafeAreaView, Platform, Text, Modal, View, TouchableOpacity, Image, StatusBar, AsyncStorage, DeviceEventEmitter, NativeModules, Alert, ToastAndroid, ScrollView, Button, Dimensions, Animated, PanResponder } from 'react-native';
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
      textFound: [],
      imageTaken: "",
      keyTextArr: [],
      dimensions: {
        window,
        screen
      }
    };
  }

  
    takeText = () => {
      this.setState({
        takeTextNow: true
      });
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


    onInputTextChange = (e, identifier) => {
      const { eventCount, target, text } = e.nativeEvent;
      this.setState({
        [identifier]: text
      });
    }

  render() { 
    return (
      <SafeAreaView tyle={{flex: 1}}> 
        <ScrollView>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          onDoubleTap={this.zoomOnImage}
          style={styles.preview}
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
            if (this.state.takeTextNow) {
                console.log(e);
            //   this.textRecognized(e);
            }
          }}
          // onGoogleVisionBarcodesDetected={({ barcodes }) => {
          //   // console.log(barcodes, "barcode");
          // }}
        />
        <View style={{ zIndex: 11, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}>SNAP</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={this.takeText} 
            style={styles.capture}
            >
            <Text style={{ fontSize: 14 }}>OCR</Text>
          </TouchableOpacity>
        </View>

          <View>

            {this.state.imageTaken !== "" 
              ? 
              <ImageZoom cropWidth={window.width}
                  cropHeight={window.width}
                  imageWidth={window.width}
                  imageHeight={window.width}>
                <Image style={{width:window.width, height:window.width}}
                  source={{uri: this.state.imageTaken}}/>
              </ImageZoom>
              :
              <View></View>
            }
          </View>
          <View style={styles.detectedText}>

                <Input
                  label="Serial Number"
                  placeholder="serial number"
                  value={this.state.sn ? this.state.sn : ""}
                  onChange={(e) => this.onInputTextChange(e, "sn")}
                  leftIconContainerStyle={styles.leftIcon}
                  leftIcon={
                    <Icons
                      name='locked'
                      size={24}
                      color='#687582'
                    />
                  }
                />
  
                <Input
                  label="EAN"
                  placeholder="EAN"
                  value={this.state.ean ? this.state.ean : ""}
                  onChange={(e) => this.onInputTextChange(e, "ean")}
                  leftIconContainerStyle={styles.leftIcon}
                  leftIcon={
                    <Icons
                      name='locked'
                      size={24}
                      color='#687582'
                    />
                  }
                />
      
                <Input
                  label="UPC"
                  placeholder="UPC"
                  value={this.state.upc ? this.state.upc : ""}
                  onChange={(e) => this.onInputTextChange(e, "upc")}
                  leftIconContainerStyle={styles.leftIcon}
                  leftIcon={
                    <Icons
                      name='locked'
                      size={24}
                      color='#687582'
                    />
                  }
                />

                <Input
                  label="Model"
                  placeholder="model"
                  value={this.state.model ? this.state.model : ""}
                  onChange={(e) => this.onInputTextChange(e, "model")}
                  leftIconContainerStyle={styles.leftIcon}
                  leftIcon={
                    <Icons
                      name='locked'
                      size={24}
                      color='#687582'
                    />
                  }
                />

                <Input
                  label="Mac Adresss"
                  placeholder="mac"
                  value={this.state.mac ? this.state.mac : ""}
                  onChange={(e) => this.onInputTextChange(e, "mac")}
                  leftIconContainerStyle={styles.leftIcon}
                  leftIcon={
                    <Icons
                      name='locked'
                      size={24}
                      color='#687582'
                    />
                  }
                />
    
          </View>
          {this.state.textFound.map((text, index) => (
            <View style={styles.detectedText} key={index}>
              <Text selectable>{text}</Text>
            </View>
          ))}
          {this.state.keyTextArr.map((obj, index) => (
            <View style={styles.detectedText} key={index}>
              <Text selectable>{obj.term[0]}: {obj.term[1]}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    height: window.width,
    width: window.width,
    alignItems: 'center',
  },
  capture: {
    flex: 0,
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
  }
});