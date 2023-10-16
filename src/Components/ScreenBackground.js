import React from 'react'
import { ImageBackground, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
function ScreenBackground({ children }) {
  return (
    <ImageBackground
      style={{
        flex: 1
      }}
      source={require('../assets/images/background.png')}
    >
      <SafeAreaView
        style={{ flex: 1 }}
      >
        {children}
      </SafeAreaView>
    </ImageBackground>
  )
}

export default ScreenBackground