import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Modal, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Button, ThemeProvider, Header } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/Entypo';


// const myIcon = <Icon name="menu" size={30} color="white" />;

export default class MainScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        modalVisible: false
      };
    }

    modalToggle = () => {
      this.setState({
        modalVisible: !this.state.modalVisible
      });
    }

    render() {
      return (
        <SafeAreaView style={styles.safeArea}> 
           {/* <Header
                leftComponent={<TouchableOpacity onPress={this.modalToggle}>{myIcon}</TouchableOpacity>}
                centerComponent={{ text: 'Text Recognition', style: { color: '#fff', fontSize: 18 } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
            /> */}

            <Modal
              animationType="fade"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Hello World!</Text>

                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={() => {
                      this.modalToggle();
                    }}
                  >
                    <Text style={styles.textStyle}>Hide Modal</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>

            <View>
                <Text>Hello</Text>
                <TouchableHighlight
                  onPress={this.modalToggle}>
                  <Text>Toggle Modal button</Text>
                </TouchableHighlight>

                <TouchableOpacity onPress={() => {this.props.navigation.navigate('Scan')}}>
                  <Text>Scanner Screen</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
      );
    }
}


const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: 'lightgrey',
    },
    headerStyle: {
      width: '100%',
      height: '100%',
      padding: 0,
      margin: 0
    },  
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      backgroundColor: 'white',
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: 'black',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'white'
        // backgroundColor: '#BA2745'
      }
  });
  
  