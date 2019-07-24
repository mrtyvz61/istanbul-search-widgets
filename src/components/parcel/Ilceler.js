import React from 'react';
import Select from 'react-select';

const Ilceler = props => {
  return (
    <React.Fragment>
      <div className='form-group'>
        <Select
          name='adresSelect'
          options={props.ilceler}
          onChange={props.changeFunction}
          placeholder='Select town...'
        />
      </div>
    </React.Fragment>
  );
};

export default Ilceler;
