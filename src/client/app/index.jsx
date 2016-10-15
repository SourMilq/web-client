import React from 'react';
import {render} from 'react-dom';
import ShopBox from './shopBox.jsx';

class App extends React.Component {
  render () {
    return (
        <div>
            <ShopBox/>
        </div>
        );
  }
}

render(<App/>, document.getElementById('app'));
