import { StatusBar } from 'expo-status-bar';
import React, {useRef, useState, useEffect} from 'react';
import { StyleSheet, Text, View, AppState, ToastAndroid } from 'react-native';

export default function App() {

const appState = useRef(AppState.currentState)
const [useStateVisible, setappStateVisible] = useState(appState.current)


useEffect(() => {
  AppState.addEventListener("change", _handleAppStateChange)
  return () => {
    AppState.removeEventListener("change", _handleAppStateChange)
  }
}, [])

const _handleAppStateChange = (nextAppState) => {
  if(appState.current.match(/inactive|background/) && 
  nextAppState === "active"){
    console.log("App has come to the foreground")
  }

  appState.current = nextAppState
  setappStateVisible(appState.current)

  console.log("AppState: ",appState.current)

  if(appState.current == "background"){

    ToastAndroid.show('App run in background',
    ToastAndroid.SHORT)

  }

}

  return (
    <View style={styles.container}>
      <Text style ={styles.textStyle}>
        current state is:
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black'
  },
});
 