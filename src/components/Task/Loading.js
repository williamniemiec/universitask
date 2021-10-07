import React from 'react';
import { Center, Spinner } from 'native-base';

const Loading = () => (
  <Center flex={1} px="3">
      <Spinner 
        accessibilityLabel="Loading posts" 
        color='gray.500' 
        size='lg' 
      />
    </Center>
);

export default Loading;
