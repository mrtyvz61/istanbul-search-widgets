import React from 'react';
import TextField from '@material-ui/core/TextField';

const PaftaInput = props => {
  return (
    <React.Fragment>
      <TextField
        onChange={props.changeFunction}
        variant='outlined'
        margin='normal'
        // required
        fullWidth
        id='email'
        label='Pafta'
        name='email'
        autoFocus
      />
    </React.Fragment>
  );
};

export default PaftaInput;
