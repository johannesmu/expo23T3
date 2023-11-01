import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native'
import { useContext, useState, useEffect } from 'react'
import { DbContext } from '../contexts/DbContext'
import { AuthContext } from '../contexts/AuthContext'

import { collection, getDocs, addDoc } from "firebase/firestore"

export function Data( props ) {
  const db = useContext( DbContext )
  const Auth = useContext( AuthContext )
  const DataSource = require("../data/Books.json")

  const[ data, setData ] = useState([])
  const[ user, setUser ] = useState()

  const getData = async () => {
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

  const writeDocs = async (source, path) => {
    for( let i=0; i< source.length; i++ ) {
      let item = source[i]
      item.tags = item.tags.split(",")
      const docRef = await addDoc( collection(db, path), item ) 
      console.log( docRef.id )
    }
  }

  useEffect( () => {
    if( Auth.currentUser ) {
      setUser( Auth.currentUser )
      getData()
      console.log( DataSource )
    }
    else {
      setUser( null )
    }
  }, [ Auth ])

  return(
    <View style={ styles.container }>
      <Text>Data</Text>
      <Pressable onPress={ () => writeDocs() }>
        <Text>Add data</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  }
})