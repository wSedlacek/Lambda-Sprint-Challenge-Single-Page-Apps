import React from 'react';
import styled from 'styled-components';

const H1 = styled.h1`
  text-align: center;
`;

export default function Header() {
  return (
    <header>
      <H1>Rick &amp; Morty Fan Page</H1>
    </header>
  );
}
