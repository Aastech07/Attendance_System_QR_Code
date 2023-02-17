
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, FlatList, TextInput, Pressable,Button,Modal, Alert } from 'react-native';
import firebase from 'firebase/compat';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Fetch = () => {
  const [search, setSearch] = useState('');
  const [search1, setSearch1] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [shouldShow, setShouldShow] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const todoref = firebase.firestore().collection("userData")
  
  useEffect(() => {
  (async () => {  
      todoref
        .onSnapshot(
          querySnapshot => {
            const users = []
            querySnapshot.forEach((doc) => {
              const {Email,user,rollno,branch ,T,d,text} = doc.data()
              users.push({ 
             id:doc.id,
                Email,
                user,
                rollno,
                branch,T,d,
                text
              });
            }); 
            setMasterDataSource(users);
            setFilteredDataSource(users);
          }
        )
     })();
  }, []);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter((item) => {
            const itemData = item.rollno
              ? item.rollno.toUpperCase()
        :''.toUpperCase();

      const textData = text.toUpperCase();
      return itemData.indexOf(textData) >-1;
      });
       setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource)
      setSearch(text);
    }
  };
  const searchFilterFunction1 = (text) => {
    if (text) {
      const newData = masterDataSource.filter((item) => {
            const itemData = item.branch
              ? item.branch.toUpperCase()
        :''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) >-1;

      });
       setFilteredDataSource(newData);
      setSearch1(text);
    } else {
      setFilteredDataSource(masterDataSource)
      setSearch1(text);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>

        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search RollNo" />
      <FontAwesome5 name='list-ol'size={20} color={'orange'} style={{left:40,bottom:5,opacity:0.5}}/>

    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => { 
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide</Text>
            </Pressable>
          </View>
        </View>
        <View style={{}}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction1(text)}
          value={search1}
          underlineColorAndroid="transparent"
          placeholder="Search Branch" />
        </View>
      </Modal>
      <View style={{left:40, bottom:30}}>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Set Branch</Text>
      </Pressable>
      </View>
    </View>
<View style={{marginTop:10}}>
  {shouldShow ? 
    <FlatList
    style={{height: 665}}
    data={filteredDataSource}
    keyExtractor={(item, index) => index}
    renderItem={({ item }) => (
<Pressable style={{ backgroundColor: '#e5e5e5', padding: 15, borderRadius: 15,
 margin:5, marginHorizontal:10,}}>
        <View style={{}}>
          <Text style={{ alignItems: 'center', flexDirection: 'column',fontWeight:'bold' ,top:2}}>{item.Email}</Text>
          <Text style={{ fontWeight: 'bold',top:6 }}>{item.user}</Text>
          <Text style={{ fontWeight: 'bold',left:250 }}>Present 
          <FontAwesome5 name='user'size={15} color={'black'} style={{bottom:5,opacity:0.5}}/></Text>
          <Text style={{ fontWeight: 'bold',bottom:10 }}>{item.rollno}</Text>
          <Text style={{ fontWeight: 'bold',bottom:5 }}>{item.branch}</Text>
          <Text style={{ fontWeight: 'bold',bottom:4 }}>{item.text}</Text>
          <Text style={{ fontWeight: 'bold' }}>{item.d}</Text>
          <Text style={{ fontWeight: 'bold',top:5 }}>{item.T}</Text>


        </View>
      </Pressable>)} /> : null}
      
        <Button
          title=" Click me" color={"orange"} 
          onPress={() => setShouldShow(!shouldShow)}/>
          </View>
            </View>
    </SafeAreaView>
  );
    }  
    
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    top:30,
    height: 40,
    paddingLeft: 70,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
      },
  centeredView: {
    
    justifyContent: "center",
    alignItems: "center",
      left:100
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 5,
    padding: 7,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "orange",
  },
  buttonClose: {
    backgroundColor: "orange",
  },
  textStyle: {
      color:'white',
    fontWeight: "bold",
    textAlign: "center",
    
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },

});

export default Fetch;