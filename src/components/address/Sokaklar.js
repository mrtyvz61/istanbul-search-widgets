import React from 'react';
import Select from 'react-select';

const Sokaklar = props => {
  return (
    <React.Fragment>
      <Select
        name='adresSelect'
        options={props.sokaklar}
        onChange={props.changeFunction}
        placeholder='Select street...'
      />
    </React.Fragment>
  );
};

export default Sokaklar;
