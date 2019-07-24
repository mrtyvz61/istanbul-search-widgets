import React from 'react';
import TextField from '@material-ui/core/TextField';

const ParselInput = props => {
  return (
    <React.Fragment>
      <TextField
        value={props.value}
        onChange={props.changeFunction}
        variant='outlined'
        margin='normal'
        fullWidth
        id='email'
        label='Parsel'
        name='email'
        autoFocus
      />
    </React.Fragment>
  );
};

export default ParselInput;
