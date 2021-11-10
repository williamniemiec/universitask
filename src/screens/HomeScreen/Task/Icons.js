import React from 'react';
import { Flex, Image } from 'native-base';


//-----------------------------------------------------------------------------
//		Components
//-----------------------------------------------------------------------------
export const TrashIcon = () => (
  <Flex
    height={88}
    width={20}
    alignItems='center'
    justifyContent='center'
    backgroundColor='#f90233'
  >
    <Image
      source={require('../../../assets/img/icon/trash.png')}
      alt='remove task icon'
      style={{
        maxHeight: 40,
        maxWidth: 40
      }}
    />
  </Flex>
);

export const CheckIcon = () => (
  <Flex 
    height={88}
    width={20}
    alignItems='center'
    justifyContent='center'
    backgroundColor='#5ac18e'
  >
    <Image
      source={require('../../../assets/img/icon/check.png')}
      alt='mask as done'
      style={{
        maxHeight: 40,
        maxWidth: 40
      }}
    />
  </Flex>
);
