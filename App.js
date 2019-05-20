/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    placeName : '',
    places:[]
  }

  placeNameChangeHandler = val => {
    this.setState({
      placeName : val
    });
  };

  placeSubmitHander = () => {
    if(this.state.placeName.trim() === ""){
      return;
    }

    this.setState(prevState =>{
      return{
        places: prevState.places.concat(prevState.placeName)
      }
    })

    this.setState({placeName:''})
  };

  colorChanger = j =>{
    if(j="#eee"){
      j = "green";
      return;
    }
    j="#eee";
    return;
  }

  render() {
    
    const placesOutput = this.state.places.map((place,i,j) => (
      j="#eee",
      <TouchableOpacity 
      style={{
        width:"100%",
        margin: 5,
        padding: 10,
        backgroundColor: j    
      }}
        key={i} 
        
        onPress={()=>{
          this.colorChanger(j)
        }}

        onLongPress={()=>{
          this.setState(prevState=>{
            return{
              places: prevState.places.slice(0,i).concat(prevState.places.slice(i+1))
            }
          })
        }}
      >
        <View>
          <Text>{place}</Text>
        </View>
      </TouchableOpacity>
    ));
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput 
            style = {styles.placeInput}
            placeholder = 'enter your todo'
            value = {this.state.placeName}
            onChangeText={this.placeNameChangeHandler}
          />
          <Button 
            style = {styles.placeButton} 
            title = "Add" 
            onPress = {this.placeSubmitHander}
          />
        </View>
        <View style={styles.listContainer}>
          {placesOutput}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    justifyContent: "flex-start",
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  inputContainer:{
    //flex:1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  placeInput:{
    width: "70%"
  },
  placeButton:{
    width: "30%"
  },
  listItem:{
    width:"100%",
    margin: 5,
    padding: 10,
    backgroundColor:"#eee"

  },
  listContainer:{
    width:"100%"
  },
  finList:{
    backgroundColor: "green"
  }
});