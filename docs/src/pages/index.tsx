import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function ToIndex(): JSX.Element {
  return (
    <BrowserOnly>
      {() => {
        /**
         * Redirect to the home page
         */
        window.location.href = '/index';
        return <></>;
      }}
    </BrowserOnly>
  );
}
