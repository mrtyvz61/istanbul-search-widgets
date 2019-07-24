import React from 'react';
import Select from 'react-select';

const Mahalleler = props => {
  return (
    <React.Fragment>
      <Select
        name='adresSelect'
        options={props.mahalleler}
        onChange={props.changeFunction}
        placeholder='Select district...'
      />
    </React.Fragment>
  );
};

export default Mahalleler;
