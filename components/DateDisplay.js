import { View, Text, StyleSheet } from 'react-native'

export function DateDisplay( props ) {
  const dateData = new Date( props.date )
  const year = dateData.getFullYear()
  const month = (dateData.getMonth() + 1)
  const date = (dateData.getDate())

  const PaddedNumber = ( data ) => {
    if( data.toString().length == 1 ) {
      return ("0" + data.toString())
    }
    else {
      return data
    }
  }

  return(
    <View>
      <Text>{PaddedNumber(date)}/{PaddedNumber(month)}/{year}</Text>
    </View>
  )
}