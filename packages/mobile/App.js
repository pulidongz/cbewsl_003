/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import React, {Fragment} from 'react';
 import {
   Text,
 } from 'react-native';
 import { fromCommons } from '@dyna/commons';
 import { useEffect } from 'react';
 const App = () => {
   
   return (
     <Fragment>{
       <Text>{fromCommons()}</Text>
     }</Fragment>
   )
 }
 export default App;