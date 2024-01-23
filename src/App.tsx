import React, { FC } from 'react';
import Main from './components/Main/Main';
import Chat from './components/Chat/Chat';

const App: FC = () => {
  return (
    <div>
      <Main />
      <Chat />
    </div>
  );
};

export default App;