import React from 'react';
import RichTextEditor from 'src/components/richTextEditor';

import FormLabel from './formLabel';

const ContentEditor = ({
  htmlString, handleOnEditorChange,
}) => (
  <div className="blog-content">
    <FormLabel label="內容" />
    <RichTextEditor
      htmlString={htmlString}
      handleOnChange={handleOnEditorChange}
    />
  </div>
);

export default ContentEditor;
