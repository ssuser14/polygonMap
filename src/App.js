import React, { Component } from 'react';
import MapContainer from './containers/MapContainer.js';
import PointsList from './containers/PointsList.js';
import CordInput from './containers/CordInput.js'

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <div className="points-controllers">
          <CordInput />
          <PointsList />
        </div>
        <MapContainer />
      </div>
    );
  }
}

export default App;
