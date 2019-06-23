import {Color} from 'ink';
import React from 'react';

export const Hello = () => {
  React.useEffect(() => {
    console.log('hello from use Effect');
    
  }, [])
  return (
    <Color green>
      {'hello world'}
    </Color>
  )
}