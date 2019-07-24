import React from 'react';
import Select from 'react-select';

const Mahalleler = props => {
  return (
    <React.Fragment>
      <div className='form-group'>
        <Select
          name='adresSelect'
          options={props.mahalleler}
          onChange={props.changeFunction}
          placeholder='Select district...'
        />
      </div>
    </React.Fragment>
  );
};

export default Mahalleler;
