
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { reducer as authReducer } from './features/auth/authSlice';
import { reducer as characterReducer } from './features/characters/charactersSlice';
import { reducer as conversationReducer } from './features/conversations/conversationsSlice';
import App from './App';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CharacterSelectionPage from './pages/CharacterSelectionPage';
import ConversationPage from './pages/ConversationPage';
import './index.css';

const store = configureStore({
  reducer: {
    auth: authReducer,
    characters: characterReducer,
    conversation: conversationReducer,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/characters" component={CharacterSelectionPage} />
          <Route path="/conversation/:conversationId" component={ConversationPage} />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

