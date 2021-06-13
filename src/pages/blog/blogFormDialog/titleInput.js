import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormLabel from './formLabel';

const TitleInput = ({
  blogTitleInputRef,
  handleOnChange,
}) => (
  <div className="blog-title">
    <FormLabel label="標題" />
    <TextField
      ref={blogTitleInputRef}
      autoFocus
      label="標題"
      fullWidth
      variant="outlined"
      onChange={handleOnChange}
    />
  </div>
);

export default TitleInput;
