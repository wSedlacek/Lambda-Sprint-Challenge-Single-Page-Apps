import React from 'react';
import styled from 'styled-components';

import { Character } from '../../models/Character';
import { CharacterService } from '../../services/character.service';
import CharacterCard from '../character-card/character-card.component';

const Grid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

export default function CharacterList() {
  const [characters, setCharacters] = React.useState<Character[]>([]);

  React.useEffect(() => {
    CharacterService.getCharacters();
    const subscription = CharacterService.subscribe(setCharacters);
    return () => subscription.unsubscribe();
  }, []);

  React.useEffect(() => {}, []);

  return (
    <section className='character-list'>
      <h2>Characters</h2>
      <Grid>
        {characters.map(character => (
          <CharacterCard character={character} key={character.id} />
        ))}
      </Grid>
    </section>
  );
}
