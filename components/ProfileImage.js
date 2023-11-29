import { Text, Image, StyleSheet, View } from 'react-native'
import { useContext, useState, useEffect } from 'react'
import { StorageContext } from '../contexts/StorageContext'
import { AuthContext  } from '../contexts/AuthContext'
import { ref, getDownloadURL } from "firebase/storage"

export function ProfileImage( props ) {
  const auth = useContext(AuthContext)
  const storage = useContext(StorageContext)
  const uid = auth.currentUser.uid

  const [image, setImage] = useState()
  const [path, setPath ] = useState()

  const loadImage = () => {
    console.log(path)
    getDownloadURL(ref( storage, path ))
    .then( (url) => { setImage(url) })
    .catch( (err) => console.log(err) )
  }

  useEffect(() => {
    if( props.custom ) {
      setPath( `profiles/${uid}/${props.img}`)
    }
    else {
      setPath( "profiles/defaultProfile.jpg" )
    }
  })

  useEffect(() => { 
    if( path ) {
      loadImage() 
    }
  }, [path])

  if (!image) {
    return (
      <View style={styles.noimage}>
        <Text>Loading...</Text>
      </View>
    )
  }
  else {
    return (
      <View>
        <Image style={styles.tinyLogo} source={{ uri: image }} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 100,
    height: 100
  },
  noimage: {
    height: 100
  }
})