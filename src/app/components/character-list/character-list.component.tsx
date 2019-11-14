import React from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

import { Index } from '../../models/Index';
import { Character } from '../../models/Character';
import { CharacterService, To } from '../../services/character.service';
import CharacterCard from '../character-card/character-card.component';
import SearchForm from '../search-form/search-form.component';

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

const NoResults = styled.h2`
  text-align: center;
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
    const subscription = CharacterService.subscribe(setCharacters);
    const indexSubscription = CharacterService.subscribeIndex(setIndex);
    const searchSubscription = CharacterService.searchResults();
    return () => {
      subscription.unsubscribe();
      indexSubscription.unsubscribe();
      searchSubscription.unsubscribe();
    };
  }, []);

  if (!index)
    return (
      <Section>
        <h2>Characters</h2>>
      </Section>
    );

  return (
    <Section>
      <h2>Characters</h2>
      <SearchForm />
      <Pages>
        {index.prev && (
          <Button
            variant='contained'
            color='primary'
            onClick={() => CharacterService.getCharacters(To.Prev)}
          >
            Previous
          </Button>
        )}
        {index.next && (
          <Button
            variant='contained'
            color='primary'
            onClick={() => CharacterService.getCharacters(To.Next)}
          >
            Next
          </Button>
        )}
      </Pages>
      {characters.length === 0 && <NoResults>No Search Results Found</NoResults>}
      <Grid>
        {characters.map(character => (
          <CharacterCard character={character} key={character.id} />
        ))}
      </Grid>
    </Section>
  );
}
