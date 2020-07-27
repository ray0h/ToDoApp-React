import React from 'react';
import { StoreProvider } from './store-provider';
import Wrapper from './components/Wrapper';
import './app.css';

function App() {

  return (
    <StoreProvider>
      <Wrapper/>
    </StoreProvider>
  );
}

export default App;
