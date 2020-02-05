// == Import : npm
import React from 'react';
import { render } from 'react-dom';
// Ajout de React-Router
import { BrowserRouter as Router } from 'react-router-dom';
// Ajout de React-Redux
import { Provider } from 'react-redux';


// == Import : local

// Styles de base
import 'src/styles/index.scss';
// Composants racine
import App from 'src/containers/App';
import store from 'src/store';


// == Render
// 1. Le composant racine (celui qui contient l'ensemble de l'app)
const rootComponent = (
  <Provider store={store}>
    <Router
      basename="/"
    >
      <App />
    </Router>
  </Provider>
);

// 2. La cible du DOM (là où la structure doit prendre vie dans le DOM)
const target = document.getElementById('root');

// Le rendu de React => DOM
render(rootComponent, target);
