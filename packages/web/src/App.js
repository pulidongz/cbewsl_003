import React, {Fragment} from 'react';
import './App.css';
import { fromCommons } from '@dyna/commons';
function App() {
  return (
    <Fragment>
      {fromCommons()}
    </Fragment>
  );
}
export default App;