import React, { useContext, useEffect } from "react"
import { Provider } from "react-redux"
import "react-native-gesture-handler"
import {GestureHandlerRootView} from "react-native-gesture-handler"
import persistStore from "redux-persist/es/persistStore"
import { PersistGate } from "redux-persist/integration/react";

import store from './store';



import {AppNavigator} from './navigator/mainNavigator';
import { setupHttpConfig } from "./assets/utils/http"
import { Alert } from "react-native"
import { BLACK_COLOR } from "./assets/colors"





const persistS = persistStore(store);
const App = () => {

  useEffect(()=>{
    const updateAccess = async()=>{
      await setupHttpConfig();
    }

    updateAccess();
  },[]);
  

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistS}>
        <GestureHandlerRootView style={{flex:1,backgroundColor:BLACK_COLOR}}>
          <AppNavigator/>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  )
}

export default App
