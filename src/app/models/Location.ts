import { Character } from './Character';

export interface Location {
  id?: string;
  name?: string;
  type?: string;
  dimension?: string;
  created?: string;
  residents?: Character[];
}
