import React from 'react';
import {
  ChakraProvider,
  FormLabel,
  FormControl,
  Input,
  extendTheme,
} from '@chakra-ui/react';

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px)',
};
export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label':
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: 'absolute',
              backgroundColor: 'white',
              pointerEvents: 'none',
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: 'left top',
            },
          },
        },
      },
    },
  },
});

const FloatingInput = (props) => {
  return (
    <ChakraProvider theme={theme}>
      <FormControl variant="floating" id="first-name" isRequired>
        <Input placeholder=" " ref={props.inputRef} />
        {/* It is important that the Label comes after the Control due to css selectors */}
        <FormLabel className="!font-normal !text-xs !sm:text-sm !md:text-base">
          {props.text}
        </FormLabel>
      </FormControl>
    </ChakraProvider>
  );
};

export default FloatingInput;
