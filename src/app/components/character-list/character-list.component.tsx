import React from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

import { Character } from '../../models/Character';
import { CharacterService, To } from '../../services/character.service';
import CharacterCard from '../character-card/character-card.component';
import { Index } from '../../models/Index';

const Section = styled.section`
  position: relative;
`;

const Pages = styled.div`
  position: absolute;
  right: 0;
  top: 0;

  button {
    margin: 0 10px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

export default function CharacterList() {
  const [index, setIndex] = React.useState<Index>();
  const [characters, setCharacters] = React.useState<Character[]>([]);

  React.useEffect(() => {
    CharacterService.getCharacters();
    const subscription = CharacterService.subscribe(setCharacters);
    const indexSubscription = CharacterService.subscribeIndex(setIndex);
    return () => {
      subscription.unsubscribe();
      indexSubscription.unsubscribe();
    };
  }, []);

  React.useEffect(() => {}, []);

  return (
    <Section>
      <h2>Characters</h2>
      <Pages>
        {index && index.prev && (
          <Button
            variant='contained'
            color='primary'
            onClick={() => CharacterService.getCharacters(To.Prev)}
          >
            Previous
          </Button>
        )}
        {index && index.next && (
          <Button
            variant='contained'
            color='primary'
            onClick={() => CharacterService.getCharacters(To.Next)}
          >
            Next
          </Button>
        )}
      </Pages>
      <Grid>
        {characters.map(character => (
          <CharacterCard character={character} key={character.id} />
        ))}
      </Grid>
    </Section>
  );
}
