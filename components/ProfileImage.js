import { Text, Image, StyleSheet, View } from 'react-native'
import { useContext, useState, useEffect } from 'react'
import { StorageContext } from '../contexts/StorageContext'
import { getStorage, ref, getDownloadURL } from "firebase/storage"

export function ProfileImage(props) {
  const storage = useContext(StorageContext)

  const [image, setImage] = useState()

  useEffect(() => {
    if (!image && props.file) {
      const imgRef = ref(storage, `profiles/${props.uid}/${props.file}`)
      getDownloadURL(imgRef).then((imgURL) => setImage(imgURL))
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