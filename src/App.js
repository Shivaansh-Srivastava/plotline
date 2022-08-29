import './App.css';
import React from 'react';
import Header from './components/Header';
import Title from './components/Title';
import Texteditor from './components/TextEditor';
import Box from './components/Box';

// This is the main Component which conatins the other Components.

class App extends React.Component
{
  render()
  {
    return(
      <div>
        <Header />
        <Title />
        <Texteditor />
        <Box />
      </div>
    )
  }
}

export default App;
