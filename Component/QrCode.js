import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button,TouchableOpacity,TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import { LinearGradient } from "expo-linear-gradient";
import firebase from 'firebase/compat';

const QrCode = () => {
   
    const [users, setUsers] = useState([]);
   useEffect(() => {
      firebase.firestore().collection("user").doc(firebase.auth().currentUser.uid).get()
        .then(docSnap => {
          setUsers(docSnap.data())
        })
   }, []);
   const Email = users.email
   const user = users.username
   const branch = users.branch
   const rollno  = users.rollno
    
        const date = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const hours = new Date().getHours();       
        const min = new Date().getMinutes(); 
        const sec = new Date().getSeconds(); 


    const d=  date + '-' + month + '-' + year
    const T =  hours + ':'+min+':'+ sec

  const todoRef = firebase.firestore().collection("userData");
  const todoref=()=>{
      
     if(text && text || Email && Email ||
       user && user || branch && branch ||rollno && rollno
       ||d && d || T && T .length>0){
     
      const data={
        text,
        Email,
        user,
        branch,
        rollno,
        d,
        T
      }
      todoRef
      .add(data)
      .then(()=>{
        setText('')
        
      }).catch((error)=>{
      alert(error)
      })
    }
  }
  
  const navigation = useNavigation()
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  };

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned')
  const [email, setEmail] = useState("");


  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  
  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data)
    console.log('Type: ' + type + '\nData: ' + data)
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }
  // Return the View
  return (
  <>
  
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 800, width: 500 }} />
      </View>
      <View style={{ bottom: 150 }}>
        <Text style={styles.maintext}>{text}</Text>
        {scanned && <Button title={'Click'} onPress={() => setScanned(false)+todoref()} color='orange' />}
      </View>
   
      <View style={{ bottom: 60, right: 100 }}>
        <TouchableOpacity
          onPress={() => handleSignOut()}>
          <LinearGradient colors={['orange', 'yellow']} style={{ top: 10, marginLeft: 130, marginRight: 80, padding: 15, borderRadius: 10, marginTop: 20 }}>
            <Text style={styles.button1}>Back</Text>
          </LinearGradient>
        </TouchableOpacity>
    
      </View>
    </View>
  </>
  );
}
export default QrCode
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 500,
    width: 700,
    overflow: 'hidden',
    borderRadius: 30,
    // backgroundColor: 'tomato',
    bottom: 180
  },
  container2: {
    bottom: 100
  },
 
  text: {
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  container1: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    right: 130,
    bottom: 30
  },
  button1: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    paddingLeft: 30,
    paddingRight: 30,
  },
  input:{
       
    marginLeft:50,
    marginRight:50,
     padding :15,
     bottom:20,
    left:20
  },
}); 