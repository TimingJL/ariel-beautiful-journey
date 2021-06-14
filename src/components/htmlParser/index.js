/* eslint-disable react/no-danger */
import React from 'react';

const createMarkup = (htmlString) => ({ __html: htmlString });

const HtmlParser = ({ htmlString }) => (
  <div dangerouslySetInnerHTML={createMarkup(htmlString)} />
);

export default HtmlParser;
