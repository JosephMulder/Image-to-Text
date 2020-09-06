import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

const window = Dimensions.get("window");

export default Header = (props) => {
    return (
        <View style={styles.header}>

          <TouchableOpacity style={styles.btn} onPress={props.copyToClipBoard}>
            <Icon
              name='copy'
              size={props.size}
              color='black'
              />
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={props.emailMessage}>
            <Icon
              name='email'
              size={props.size}
              color='black'
              />
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={props.toggleTorchMode}>
            <Icon
              name='flash'
              size={props.size}
              color='black'
              />
          </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    header: {
        height: 70, 
        width: '100%', 
        backgroundColor: 'black', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: "center"
    },
    btn: {
      width: window.width / 9,
      height: window.width / 9,
      backgroundColor: 'white',
      borderRadius: window.width / 18,
      justifyContent: 'center',
      alignItems: 'center',
      margin:  window.width / 18
    }
  });