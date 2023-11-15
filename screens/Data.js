import { View, Text, FlatList, Pressable, Modal, TextInput, StyleSheet } from 'react-native'
import { useContext, useState, useEffect } from 'react'
import { DbContext } from '../contexts/DbContext'
import { AuthContext } from '../contexts/AuthContext'
import { ListItem } from '../components/ListItem'

import { 
  collection, 
  getDocs, 
  query, 
  onSnapshot, 
  QuerySnapshot, 
  addDoc, 
  updateDoc, 
  doc, 
  deleteDoc 
} from "firebase/firestore"
import { ListHeader } from '../components/ListHeader'

export function Data(props) {
  const db = useContext(DbContext)
  const Auth = useContext(AuthContext)

  const [data, setData] = useState([])
  const [user, setUser] = useState()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [ docId, setDocId ] = useState()

  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')

  // get data only once (when loaded)
  const getData = async () => {
    if (!user) {
      return
    }
    const col = collection(db, `things/${user.uid}/list`)
    const snapshot = await getDocs(col)
    let dataList = []
    snapshot.forEach((item) => {
      let obj = item.data()
      obj.id = item.id
      dataList.push(obj)
    })
    setData(dataList)
    console.log(dataList)
  }
  // get data with real time updates
  const getRealTimeData = () => {
    if (!user) {
      return
    }
    const col = query(collection(db, `things/${user.uid}/list`))
    const unsub = onSnapshot(col, (snapshot) => {
      let dataList = []
      snapshot.forEach((item) => {
        let obj = item.data()
        obj.id = item.id
        dataList.push(obj)
      })
      setData(dataList)
    })
  }

  const addListItem = async () => {
    if (note.length < 1 || title.length < 1) { return }
    const item = { name: title, note: note, status: false }
    const colRef = collection(db, `things/${user.uid}/list`)
    await addDoc(colRef, item)
  }

  const updateListItem = async () => {
    //create a reference to the document inside "/things/USERID/list"
    const docRef = doc(db, `things/${user.uid}/list`, docId )
    await updateDoc( docRef, { name: title, note: note})
    console.log("updating..." + docId )
    setTitle('')
    setNote('')
    setDocId(null)
  }

  const deleteListItem = async () => {
    console.log("deleting...")
    //create a reference to the document inside "/things/USERID/list"
    const docRef = doc(db, `things/${user.uid}/list`, docId)
    await deleteDoc( docRef )
    setOpen(false)
    setTitle('')
    setNote('')
    setEditing(false)
  }

  useEffect(() => {
    if (Auth.currentUser) {
      setUser(Auth.currentUser)
      //getData()
      getRealTimeData()
    }
    else {
      setUser(null)
    }
  }, [user])

  useEffect(() => {
    setTitle('')
    setNote('')
  }, [data])

  const openItem = (itemData) => {
    setEditing(true)
    setTitle(itemData.name)
    setNote(itemData.note)
    setDocId(itemData.id)
    setOpen(true)
  }

  const renderItem = ({ item }) => {
    return (
      <ListItem item={item} editor={openItem} />
    )
  }

  const openModal = () => {
    console.log("open")
    setOpen(true)
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<ListHeader text="List" handler={openModal} />}
        numColumns={2}
      />
      <Modal
        visible={open}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.vcenter}>
          <View style={styles.modalView}>
            <Text>Title</Text>
            <TextInput
              style={styles.input}
              onChangeText={(val) => setTitle(val)}
              value={title}
            />
            <Text>Note</Text>
            <TextInput
              multiline={true}
              style={styles.input}
              numberOfLines={3}
              onChangeText={(val) => setNote(val)}
              value={note}
            />
            <Pressable
              onPress={() => {
                setOpen(false)
                if (editing) {
                  updateListItem()
                }
                else { 
                  addListItem() 
                }
                setEditing(false)
              }}
              style={styles.button}
            >
              <Text style={styles.button.text} >
                {(editing) ? "Update" : "Add"}
              </Text>
            </Pressable>
            { (editing) ? 
              <Pressable 
                style={styles.button}
                onPress={ () => {deleteListItem()} }
                >
                <Text style={styles.button.text}>Delete</Text>
              </Pressable> : null
            }
            <Pressable
              style={styles.buttonClose}
              onPress={() => {
                setOpen(false)
                setEditing(false)
                setTitle('')
                setNote('')
              }
              }>
              <Text style={styles.button.text}>Close</Text>
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
    marginVertical: 10,
    text: {
      color: "white",
      textAlign: "center",
    }
  },
  buttonClose: {
    backgroundColor: "#333333",
    padding: 5,
    marginVertical: 10,
  }

})