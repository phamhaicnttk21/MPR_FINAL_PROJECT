import React from 'react';
import './config/firebaseConfig';
import RootNavigation from './navigation';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {
  return (
    <RootSiblingParent>
      <RootNavigation/>
    </RootSiblingParent>
  );
}
