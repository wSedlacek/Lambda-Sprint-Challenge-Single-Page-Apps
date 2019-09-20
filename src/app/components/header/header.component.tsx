import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const H1 = styled.h1`
  text-align: center;
`;

export default function Header() {
  return (
    <header>
      <H1>Rick &amp; Morty Fan Page</H1>
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/characters'>Characters</NavLink>
        <NavLink to='/locations'>Locations</NavLink>
        <NavLink to='/episodes'>Episodes</NavLink>
      </nav>
    </header>
  );
}
