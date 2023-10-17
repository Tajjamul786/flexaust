/**
 * Copyright (c) 2020
 *
 * Main file for application whaich handles all the navigations
 *
 * @summary Main file of the app
 * @author Tajjamul <tajjamul.zaman@nxb.com.pk>
 *
 * Created at     : 2020-09-01 02:21:56 
 * Last modified  : 2020-10-02 11:19:30
 */
import 'react-native-gesture-handler';
import React from 'react';
import NavigationScreens from './src/Components/NavigationScreens';
import ProductContext from './src/Components/ProductContext';
import ErrorBoundary from 'react-native-error-boundary'
import { Alert } from 'react-native';

// unexpected exception handler
const CustomFallback = () => (
  Alert.alert("Something unexpected happened. Please close the App and try again")
)

const App = () => {

  return (

    <ProductContext>
      <ErrorBoundary FallbackComponent={CustomFallback as any}>
        <NavigationScreens />
      </ErrorBoundary>
    </ProductContext>
  );
};

export default App;
