import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

const H1 = styled.h1`
  text-align: center;
`;

export default function Header() {
  return (
    <header>
      <H1>Rick &amp; Morty Fan Page</H1>
      <nav>
        <NavLink to='/'>
          <Button>Home</Button>
        </NavLink>
        <NavLink to='/characters'>
          <Button>Characters</Button>
        </NavLink>
        <NavLink to='/locations'>
          <Button>Locations</Button>
        </NavLink>
        <NavLink to='/episodes'>
          <Button>Episodes</Button>
        </NavLink>
      </nav>
    </header>
  );
}
