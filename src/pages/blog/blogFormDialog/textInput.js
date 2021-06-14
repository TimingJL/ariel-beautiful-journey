import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormLabel from './formLabel';

const TextInput = ({
  autoFocus = false,
  label,
  value,
  isRequired,
  handleOnChange,
}) => (
  <div className="blog-title">
    <FormLabel label={label} isRequired={isRequired} />
    <TextField
      autoFocus={autoFocus}
      label={label}
      fullWidth
      variant="outlined"
      value={value}
      onChange={handleOnChange}
    />
  </div>
);

export default TextInput;
