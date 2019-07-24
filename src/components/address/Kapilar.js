import React from 'react';
import Select from 'react-select';

const Kapilar = props => {
  return (
    <React.Fragment>
      <Select
        name='adresSelect'
        options={props.kapilar}
        placeholder='Select gate...'
      />
    </React.Fragment>
  );
};

export default Kapilar;
