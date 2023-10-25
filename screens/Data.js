import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useContext, useState, useEffect } from 'react'
import { DbContext } from '../contexts/DbContext'
import { AuthContext } from '../contexts/AuthContext'

import { collection, getDocs } from "firebase/firestore"

export function Data( props ) {
  const db = useContext( DbContext )
  const Auth = useContext( AuthContext )

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

  useEffect( () => {
    if( Auth.currentUser ) {
      setUser( Auth.currentUser )
      getData()
    }
    else {
      setUser( null )
    }
  }, [ Auth ])

  return(
    <View style={ styles.container }>
      <Text>Data</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  }
})