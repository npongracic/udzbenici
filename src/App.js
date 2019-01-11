import React, { Component } from 'react';
import TextbookSearch  from './containers/TextbookSearch';
import './normalize.css';
import './skeleton.css';
import './App.css';
import 'core-js/es6/map';
import 'core-js/es6/set';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <h5>Odaberite školu i razred te naručite udžbenike koje su odabrali profesori vašeg djeteta <small>(Trebate pomoć? Nazovite nas na <strong>043 221 300</strong> ili pošaljite upit na <a href="mailto:informacije@hardjura.hr">informacije@hardjura.hr</a>)</small></h5>
        <TextbookSearch />
      </div>
    );
  }
}

export default App;
