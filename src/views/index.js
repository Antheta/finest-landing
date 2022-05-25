import { VStack, Text, Box, Grid, Image } from "@chakra-ui/react";

import logo from "../assets/svg/logo.svg"

const Home = () => {
    return (
        <Box textAlign="center" fontSize="xl" style={{ minHeight: '100vh' }}>
            <Grid minH="80vh" p={3} alignItems='center'>
                <VStack spacing={8}>
                    <Text>
                        <Image
                            alignItems="center"
                            boxSize='120px'
                            src={logo}
                            alt="FINEST PROTOCOL"
                            style={{ marginTop: '-120px' }}
                            minW="100%"
                            mb={4}
                        />
                        A Crypto Bot that aims to deliver <br />
                        <b>actionable</b> data.
                    </Text>
                </VStack>
            </Grid>
        </Box>
    )
}

export default Home