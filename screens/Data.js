import { View, Text, FlatList, Pressable, Modal, TextInput, StyleSheet } from 'react-native'
import { useContext, useState, useEffect } from 'react'
import { DbContext } from '../contexts/DbContext'
import { AuthContext } from '../contexts/AuthContext'
import { ListItem } from '../components/ListItem'

import { collection, getDocs, query, onSnapshot, QuerySnapshot } from "firebase/firestore"
import { ListHeader } from '../components/ListHeader'

export function Data( props ) {
  const db = useContext( DbContext )
  const Auth = useContext( AuthContext )

  const[ data, setData ] = useState([])
  const[ user, setUser ] = useState()
  const[ open, setOpen ] = useState(false)

  // get data only once (when loaded)
  const getData = async () => {
    if( !user ) {
      return
    }
    const col = collection( db, `things/${ user.uid }/list` )
    const snapshot = await getDocs( col )
    let dataList = []
    snapshot.forEach( ( item ) => {
      let obj = item.data()
      obj.id = item.id
      dataList.push( obj )
    })
    setData( dataList )
    console.log( dataList )
  }
  // get data with real time updates
  const getRealTimeData = () => {
    if( !user ) {
      return
    }
    const col = query( collection( db, `things/${ user.uid }/list` ) )
    const unsub = onSnapshot( col, (snapshot) => {
      let dataList = []
      snapshot.forEach( ( item ) => {
        let obj = item.data()
        obj.id = item.id
        dataList.push( obj )
      })
      setData( dataList )
    } )
    
  }

  useEffect( () => {
    if( Auth.currentUser ) {
      setUser( Auth.currentUser )
      //getData()
      getRealTimeData()
    }
    else {
      setUser( null )
    }
  }, [ user ])

  const renderItem = ({item}) => {
    return(
      <ListItem item={item} />
    )
  }

  const openModal = () => { 
    console.log("open")
    setOpen(true) 
  }

  return(
    <View style={ styles.container }>
      <FlatList 
        data = {data}
        renderItem = {renderItem}
        keyExtractor = { (item) => item.id }
        ListHeaderComponent={<ListHeader text="List" handler={ openModal } />}
      />
      <Modal
        visible={open}
        animationType="slide"
        transparent={true}
      >
        <View style={ styles.vcenter}>
          <View style={ styles.modalView }>
            <Text>Title</Text>
            <TextInput style={styles.input} />
            <Text>Note</Text>
            <TextInput 
              multiline={true} 
              style={styles.input} 
              numberOfLines={3}
            />
            <Pressable 
              onPress={ () => setOpen(false) } 
              style={styles.button}
            >
              <Text style={styles.button.text} >Add</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  vcenter: {
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  },
  modalView: {
    backgroundColor: "white",
    padding: 10,
    marginHorizontal: 10,
    minHeight: 250,
  },
  input: {
    borderStyle: "solid",
    borderColor: "#cccccc",
    borderWidth: 1,
    padding: 5,
    fontSize: 18,
  },
  button: {
    backgroundColor: "#333333",
    padding: 5,
    marginVertical: 20,
    text: {
      color: "white",
      textAlign: "center",
    }
  }
})