import React from 'react';
import TextField from '@material-ui/core/TextField';

const AdaInput = props => {
  return (
    <React.Fragment>
      <TextField
        onChange={props.changeFunction}
        variant='outlined'
        margin='normal'
        fullWidth
        id='email'
        label='Ada'
        name='email'
        autoFocus
      />
    </React.Fragment>
  );
};

export default AdaInput;
