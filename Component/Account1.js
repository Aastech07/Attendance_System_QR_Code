import React from 'react'
import {  View ,Text,StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView} from 'react-native'
import { auth } from '../firebase'
import { useState,useEffect } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {LinearGradient} from 'expo-linear-gradient'
import firebase from 'firebase/compat'
const Account=({navigation }) =>{
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("LogOut");
      }
    });
    return unsubscribe
  }, []) ;

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username,setUsername] =useState( '')
  const [secure1,setSecure1] = useState('')
  const [error,setError] = useState({field:'',message:''}) 

  const registerUser = async(email,password,username)=>{

    let loginError ={field:'',message:''};
    if(email==='',password==='',username===''){
      loginError.field='email';
      loginError.message =' field is required'
    
      setError(loginError)
    }

    await firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(()=>{
       alert('Verification email sent')
    }).catch((error)=>{
      alert(error.message)
    }).then(()=>{
      firebase.firestore().collection('Admin')
      .doc(firebase.auth().currentUser.uid)
      .set({
        email,
        username
      
      })
    })
    .catch((error=>{
      alert(error.message)
    }))
  }
 


const TogglePass = ()=>{
  setSecure1 (!secure1);
}

  return (
 <KeyboardAvoidingView style={{flex:1,}}behavior='height' >
    <ScrollView style={{flex:1,backgroundColor:'#ffffff' }}>
      <FontAwesome5 name='user'size={45} color={'orange'} style={{top:50,left:60}}/>
    <LinearGradient colors={['orange','yellow',]}style={{height:120,marginLeft:190,borderBottomLeftRadius:180,overflow:'hidden',bottom:48}}/>
   {/* <LinearGradient colors={['yellow','orange']}style={{height:150,marginRight:170,borderBottomRightRadius:200,overflow:'hidden',bottom:150}}/>*/}

      
   <View style={{bottom:130}}>         
    <Text style={styles.heading}>Create Account</Text>
  {/* <Text style={styles.hip}>Create an account to View and manage your Attendence.</Text>*/}
  
    <View style={{top:130,left:6}}>
         <Text style={styles.text}>Email</Text>
        <FontAwesome5 name="envelope" size={25} color="black"    style={{left:50,top:25,opacity:0.3}}/>
         <TextInput  style={styles.input}
         placeholder="Enter your email"
          onChangeText={text=>setEmail(text)}
          value={email}/>
          {error.field === 'email' && (
             <Text style={{color:'red',left:50,bottom:20}}>{error.message}</Text>
          )}

         <Text style={styles.text}>Username</Text>
         <FontAwesome5 name="user" size={25} color="black"    style={{left:50,top:25,opacity:0.3}}/>
         <TextInput  style={styles.input}
          placeholder="Enter your Username"
         onChangeText={text=>setUsername(text)}
         value={username}/>
              {error.field === 'email' && (
             <Text style={{color:'red',left:50,bottom:20}}>{error.message}</Text>
          )}


         <Text style={styles.text}>Password</Text>
         <FontAwesome5 name="lock" size={25} color="black"    style={{left:50,top:25,opacity:0.3}}/>
         <TextInput  style={styles.input}
          placeholder="Enter your Password"
         onChangeText={text=>setPassword(text)}
          value={password}
          secureTextEntry={secure1 ? true : false}/>
          {error.field === 'email' && (
             <Text style={{color:'red',left:50,bottom:20}}>{error.message}</Text>
          )}


        <TouchableOpacity onPress={()=>TogglePass()}>
<Text  style={{left:300,bottom:60}}>{secure1 ?<FontAwesome5 name='eye-slash'size={17} color={"black"}/>:<FontAwesome5 name='eye'size={17} color={"black"}/>}</Text>
 </TouchableOpacity>

    </View>
 
    <View style={{top:110,left:20}}>
          <TouchableOpacity 
          onPress={()=>registerUser(email,password,username)}>
          <LinearGradient colors={['orange','yellow',]}style={{top:30,marginLeft:150,marginRight:80,padding:12,borderRadius:10,marginTop:20}}>
             <Text style={styles.button1}>SIGN UP</Text>
             </LinearGradient>
          </TouchableOpacity>
          </View>
     <View style={{alignItems:'center',paddingTop:180,right:30}}>
        <Text  style={styles.login}>Already have a Account:</Text>
         <TouchableOpacity
                 onPress={() => navigation.navigate('Admin')}>
            <Text  style={styles.login1} >Login</Text>
         </TouchableOpacity>
         </View>
    
         </View>
       </ScrollView>
      </KeyboardAvoidingView>
  )
}
export default Account

const styles = StyleSheet.create({
    
      heading:{
            alignSelf:'center',
            fontWeight:'bold',
            marginBottom:20,
            fontSize:30,
            top:120,
            right:40,
      },
     
      login:{
              fontWeight:'bold'
      },
      login1:{
            marginTop:8,
            fontSize:16,
            color:'orange'  ,
            left:110,
            bottom:30

      },

      hip:{
         left:15,
      marginBottom:22
         
      },
      input:{
       
       
     // borderBottomWidth:1,
        marginLeft:50,
        marginRight:50,
         padding :15,
         bottom:20,
        left:20
      },
      text:{
        left:50,
        fontWeight:'bold'
      },
         
button1:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize:15, 
    color:'white',
},




});


