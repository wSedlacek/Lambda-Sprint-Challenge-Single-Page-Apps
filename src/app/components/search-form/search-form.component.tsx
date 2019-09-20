import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { CharacterService } from '../../services/character.service';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    margin: 10,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

export default function SearchForm() {
  const classes = useStyles();

  return (
    <section className='search-form'>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder='Search'
          onChange={event => CharacterService.search(event.target.value)}
        />
      </Paper>
    </section>
  );
}
