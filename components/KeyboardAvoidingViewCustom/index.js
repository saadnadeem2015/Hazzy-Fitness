import React from "react"
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native'

export default function KeyboardAvoidingViewCustom({ style, children, keyboardVerticalOffset=0, behavior, ...rest }) {

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, ...style }}
      behavior={
        behavior !== undefined ? behavior : (Platform.OS === 'ios' ? 'padding' : null)
      }
      keyboardVerticalOffset={keyboardVerticalOffset}
      {...rest}
    >
      {children}
    </KeyboardAvoidingView>
  )
}
