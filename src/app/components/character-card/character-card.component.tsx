import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { Character } from '../../models/Character';

const useStyles = makeStyles({
  media: {
    height: 140,
  },
});

type CharacterCardProps = {
  character: Character;
};

export default function CharacterCard({ character }: CharacterCardProps) {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea>
        <CardMedia className={classes.media} image={character.image} title={character.name} />
      </CardActionArea>
      <CardContent>
        <Typography variant='h5' component='h2'>
          {character.name}
        </Typography>
        <Typography variant='subtitle1' color='textSecondary' component='p'>
          {character.species} - {character.gender}
        </Typography>
      </CardContent>
    </Card>
  );
}
