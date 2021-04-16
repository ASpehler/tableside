import React from 'react';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
{{! CONTAINER_IMPORT !}}

export const App = () => (
  <{{! CONTAINER !}}>
    <h1>Welcome to Meteor!</h1>
    <Hello/>
    <Info/>
  </{{! CONTAINER !}}>
);
