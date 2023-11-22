import { Text, Image, StyleSheet, View } from 'react-native'
import { useContext, useState, useEffect } from 'react'
import { StorageContext } from '../contexts/StorageContext'
import { ref, getDownloadURL } from "firebase/storage"

export function ProfileImage(props) {
  const storage = useContext(StorageContext)

  const [image, setImage] = useState()

  const checkIfProfileImageExists = async () => {
    const imgRef = ref(storage, `profiles/${props.uid}/${props.file}`)
    console.log(props.file)
      try {
        await getDownloadURL(imgRef)
        return true
      }
      catch (error) {
        return false
      }
   
  }

  useEffect(() => {
    if (!image) {
      let imgRef = ref(storage, `profiles/${props.uid}/${props.file}`)
      checkIfProfileImageExists()
      .then((res) => {
        console.log(res)
        if(res == false ) {
          imgRef = ref(storage, `profiles/defaultProfile.png`)
        }
        getDownloadURL(imgRef).then((url) => setImage(url))
      }) 
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