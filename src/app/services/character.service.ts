import axios from 'axios';
import { BehaviorSubject, of, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

import { Character } from '../models/Character';
import { Index } from '../models/Index';

export enum To {
  Next,
  Prev,
}

export class CharacterService {
  private static index = new BehaviorSubject<Index>({ page: 1, next: true, prev: false });
  private static characters = new BehaviorSubject<Character[]>([]);
  private static filter = new BehaviorSubject<string>('');

  public static subscribe(setCharacters: (characters: Character[]) => void) {
    return this.characters.subscribe(setCharacters);
  }

  public static subscribeIndex(setIndex: (index: Index) => void) {
    return this.index.subscribe(setIndex);
  }

  public static search(value: string) {
    this.filter.next(value);
  }

  public static searchResults() {
    const debounced = this.filter.pipe(debounce(() => timer(100)));
    return debounced.subscribe(() => {
      this.index.next({ page: 1, next: true, prev: false });
      this.getCharacters();
    });
  }

  public static async getCharacters(to?: To) {
    let { page, next, prev } = this.index.getValue();
    let filter = this.filter.getValue();

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
          characters(page: ${page} ${filter ? `filter: {name: "${filter}" }` : ''}) {
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

    this.characters.next(result.characters.results ? [...result.characters.results] : []);
  }
}
