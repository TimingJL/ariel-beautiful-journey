import React from 'react';
import RichTextEditor from 'src/components/richTextEditor';

import FormLabel from './formLabel';

const ContentEditor = ({
  isRequired, htmlString, handleOnEditorChange,
}) => (
  <div className="blog-content">
    <FormLabel label="內容" isRequired={isRequired} />
    <RichTextEditor
      htmlString={htmlString}
      handleOnChange={handleOnEditorChange}
    />
  </div>
);

export default ContentEditor;
