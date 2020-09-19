import { Component } from './Component.js';
import { TripsContainer } from './TripsContainer.js';

class App extends Component {
  static init() {
    const tripsContainer = new TripsContainer('app__main');
    tripsContainer.render();
  }
}

App.init();
