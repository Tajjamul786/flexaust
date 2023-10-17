import React from 'react'
import { Image, Text, View } from 'react-native'

function Images({ source }) {
  return (
    <View
      style={{ width: "100%", height: 200, backgroundColor: "#cccccc" }}
    >
      {
        !!source
          ?
          <Image
            style={{
              width: "100%",
              height: 200,
              objectFit: 'fill',
              alignSelf: "center"
            }}
            source={{ uri: source }}
          />
          :
          <Text style={{
            color: "#ffffff90",
            fontSize: 18,
            textAlign: 'center',
            marginTop: 100
          }}>No Thumbnail available</Text>
      }
    </View>
  )
}

export function LargeImages({ source }) {
  return (
    <View
      style={{ width: "100%", height: 'auto', backgroundColor: "#cccccc" }}
    >
      {
        !!source
          ?
          <Image
            style={{
              width: "100%",
              height: undefined,
              aspectRatio: 2.2,
              alignSelf: "center"
            }}
            source={{ uri: source }}
          />
          :
          <View
            style={{ width: "100%", height: 200 }}
          >
            <Text style={{
              color: "#ffffff90",
              fontSize: 18,
              textAlign: 'center',
              marginTop: 90,
            }}>No Thumbnail Available</Text>
          </View>
      }
    </View>
  )
}
export default Images