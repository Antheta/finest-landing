import React from 'react';
import {
  Box,
  ChakraProvider,
  Grid,
  theme,
} from '@chakra-ui/react';
import Home from './views/index'
import { ColorModeSwitcher } from './ColorModeSwitcher';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Home />
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
