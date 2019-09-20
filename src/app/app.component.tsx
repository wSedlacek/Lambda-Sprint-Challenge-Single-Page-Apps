import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Header from './components/header/header.component';
import SearchForm from './components/search-form/search-form.component';
import WelcomePage from './components/welcome-page/welcome-page.component';
import CharacterList from './components/character-list/character-list.component';
import CharacterCard from './components/character-card/character-card.component';
import LocationCard from './components/location-card/location-card.component';
import LocationsList from './components/location-list/location-list.component';

const Main = styled.main`
  width: 85vw;
  min-height: 80vh;
  max-width: 1024px;
  margin: 35px auto;
  background: #fff;
  padding: 15px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
`;

export default function App() {
  return (
    <Router>
      <Main>
        <Header />
        <SearchForm />
        <Switch>
          <Route exact path='/' render={() => <WelcomePage />} />
          <Route exact path='/characters' render={() => <CharacterList />} />
          <Route path='/characters/:id' render={() => <CharacterCard />} />
          {/* <Route exact path='/locations' render={() => <LocationsList />} />
          <Route path='/locations/:id' render={() => <LocationCard />} /> */}
        </Switch>
      </Main>
    </Router>
  );
}
