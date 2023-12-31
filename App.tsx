/**
 * Copyright (c) 2020
 *
 * Main file for application whaich handles all the navigations
 *
 * @summary Main file of the app
 * @author Tajjamul <tajzuman786@gmail.com>
 *
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

    <ErrorBoundary FallbackComponent={CustomFallback as any}>
      <ProductContext>
        <NavigationScreens />
      </ProductContext>
    </ErrorBoundary>
  );
};

export default App;
