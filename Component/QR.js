import React, { useState } from 'react'
import { View,Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView ,StyleSheet,KeyboardAvoidingView} from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebase'

const  QR=()=> {
 
  const navigation = useNavigation()

  const handleSignOut = () => {
  auth
  .signOut()
      .then(() => {
        navigation.replace("Admin")
      })
      .catch(error => alert(error.message))
  };

    const [input,setInput] =useState("");
    const [qrcode,setQrcode]= useState("");
  return (
    <KeyboardAvoidingView style={{flex:1,}}behavior='height' >
        <ScrollView style={{flex:1,}}>
<LinearGradient colors={['orange','yellow',]}style={{height:130,marginLeft:200,borderBottomLeftRadius:180,overflow:'hidden',}}/>
     <View style={{top:100,alignSelf:'center',left:30}}>
      <Text style={{bottom:50,right:30,color:'orange',fontWeight:'bold'}}>Generation of QR Code in React Native</Text>
       <QRCode
       value={qrcode?qrcode:'NA'}
       size={200}
       color={'orange'}
       backgroundColor="white"/>
      </View>

<View style={{alignSelf:'center',top:140}}>

<FontAwesome5 name="qrcode" size={25} color="black" style={{left:80,top:40,opacity:0.3,}}/>
   <TextInput 
    style={{marginLeft:60,marginRight:60,top:10,left:50}}
    placeholder="Generate QR Code"
    onChangeText={(text)=>setInput(text)}
    value={input}/>
  <View style={{top:10}}>
<TouchableOpacity  onPress={()=>setQrcode(input)}>
    <LinearGradient colors={['orange','yellow',]}style={{top:50,marginLeft:100,marginRight:100,padding:12,
       overflow:'hidden',
      borderRadius:10,marginBottom:200,marginTop:80,paddingLeft:50,paddingRight:50}}>
       <Text style={styles.button1}>Click</Text>
    </LinearGradient>
   </TouchableOpacity>
   </View>
</View>
<View style={styles.container1}>
      
      <TouchableOpacity
        onPress={handleSignOut}>
        
        <Text><FontAwesome5 name='arrow-left'size={35} color={'orange'}/></Text>
      </TouchableOpacity>
    </View>
 </ScrollView>
 </KeyboardAvoidingView>

  )
}

export default QR

const styles= StyleSheet.create({
  button1:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize:15, 
    color:'white',
    },
    container1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      bottom:690,
      right:150
    },

  

})