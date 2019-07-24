import React from 'react';
import Select from 'react-select';

const Ilceler = props => {
  return (
    <React.Fragment>
      <Select
        name='adresSelect'
        options={props.ilceler}
        onChange={props.changeFunction}
        placeholder='Select town...'
      />
    </React.Fragment>
  );
};

export default Ilceler;
