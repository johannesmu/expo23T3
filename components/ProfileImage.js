import { Text, Image, StyleSheet, View } from 'react-native'
import { useContext, useState, useEffect } from 'react'
import { StorageContext } from '../contexts/StorageContext'
import { ref, getDownloadURL } from "firebase/storage"

export function ProfileImage(props) {
  const storage = useContext(StorageContext)

  const [image, setImage] = useState()

  useEffect(() => {
    if (!image && props.file) {
      const imgRef = ref(storage, `profiles/${props.uid}/${props.file}`)
      try{
        // getDownloadURL(imgRef)
        // .then((imgURL) => {
        //   console.log(imgURL)
        // })
        // .catch((error) => console.log(error))
      }
      catch(error) {
        console.log(error)
      }
     
    }
  })
  if (!image) {
    return (
      <View style={styles.noimage}>
        <Text>Loading...</Text>
      </View>
    )
  }
  else {
    console.log(image)
    return (
      <View>
        {/* <Image style={styles.tinyLogo} source={{ uri: image }} /> */}
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