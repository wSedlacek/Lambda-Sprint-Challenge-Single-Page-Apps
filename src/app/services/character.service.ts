import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

import { Character } from '../models/Character';

type Index = {
  page: number;
  next: boolean;
  prev: boolean;
};

enum To {
  Next,
  Prev,
}

export class CharacterService {
  private static index = new BehaviorSubject<Index>({
    page: 1,
    next: true,
    prev: false,
  });
  private static characters = new BehaviorSubject<Character[]>([]);

  public static subscribe(setCharacters: (characters: Character[]) => void) {
    return this.characters.subscribe(setCharacters);
  }

  public static async getCharacters(to?: To) {
    let { page, next, prev } = this.index.getValue();

    if (to === undefined) page = page;
    else if (to === To.Next && next) page++;
    else if (to === To.Prev && prev) page--;
    else throw new Error('Invalid Page');

    const res = await axios({
      url: 'https://rickandmortyapi.com/graphql',
      method: 'post',
      data: {
        query: `
        {
          characters(page: ${page}) {
            info {
              next,
              prev
            }
            results {
              id
              name
              status
              species
              type
              gender
              image
              origin {
                id
                name
                dimension
              }
              location {
                id
                name
                dimension
              }
            }
          }
        }
        `,
      },
    });

    const result = res.data.data;
    this.index.next({
      page: page,
      next: result.characters.info.next !== null,
      prev: result.characters.info.prev !== null,
    });

    this.characters.next([...result.characters.results]);
  }
}
