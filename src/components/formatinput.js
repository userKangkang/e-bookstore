import React from 'react';
import {Input} from 'antd';

const FormatInput = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '20px',
        marginTop: '20px'
      }}
    >
      <label for={props.id} style={{flexShrink: 0}}>
        {props.label}
      </label>
      <Input id={props.id} style={{flexGrow: 0}} />
    </div>
  );
};

export default FormatInput;
