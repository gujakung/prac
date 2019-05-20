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
    taskName : '',
    tasks:[]
  }

  taskNameChangeHandler = val => {
    this.setState({
      taskName : val
    });
  };

  taskSubmitHander = () => {
    if(this.state.taskName.trim() === ""){
      return;
    }

    this.setState(prevState =>{
      return{
        tasks: prevState.tasks.concat({
          name: prevState.taskName,
          status: 'ready',
          id: `${Math.random()}`
        })
      }
    })

    this.setState({taskName:''})
  };

  completeTask = id =>{
    this.setState(prevState => {
      return {
        tasks: prevState.tasks.map(task => {
          if (task.id === id) return { ...task, status: task.status === 'complete' ? 'ready' : 'complete'};
          return task;
        })
      };
    });
  }
  render() {
    
    const tasksOutput = this.state.tasks.map((task) => (
      <TouchableOpacity 
        style={{
          width:"100%",
          margin: 5,
          padding: 10,
          backgroundColor: task.status === 'ready' ? '#eee' : 'green'  
        }}
        key={task.id} 
        onPress={()=>{
          this.completeTask(task.id)
        }}
        onLongPress={()=>{
          this.setState(prevState=>{
            const newTasks = prevState.tasks.filter(t => t.id !== task.id);
            return {
              tasks: newTasks
            }
          })
        }}
      >
        <View>
          <Text>{task.name}</Text>
        </View>
      </TouchableOpacity>
    ));
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput 
            style = {styles.taskInput}
            placeholder = 'enter your todo'
            value = {this.state.taskName}
            onChangeText={this.taskNameChangeHandler}
            autoCorrect={false}
          />
          <Button 
            style = {styles.taskButton} 
            title = "Add" 
            onPress = {this.taskSubmitHander}
          />
        </View>
        <View style={styles.listContainer}>
          {tasksOutput}
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
  taskInput:{
    width: "70%"
  },
  taskButton:{
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