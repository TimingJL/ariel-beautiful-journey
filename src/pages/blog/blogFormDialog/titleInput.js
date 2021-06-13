import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormLabel from './formLabel';

const TitleInput = () => (
  <div className="blog-title">
    <FormLabel label="標題" />
    <TextField
      autoFocus
      label="標題"
      fullWidth
      variant="outlined"
      onChange={() => null}
    />
  </div>
);

export default TitleInput;
