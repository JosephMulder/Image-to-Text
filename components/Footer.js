import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Platform } from 'react-native';

export default Footer = (props) => {
    return (
        <View style={styles.footer}>
            <TouchableOpacity 
                onPress={props.changeMainView} 
                style={styles.captureBtn}>
                <Text style={styles.captureBtnText}>{props.cameraBtnText}</Text>
            </TouchableOpacity> 
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        height: 70,
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        backgroundColor: 'black'
    },
    captureBtn: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
    captureBtnText: {
        fontSize: 14
    }
  });