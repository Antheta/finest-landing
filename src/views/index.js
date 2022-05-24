import { VStack, Text, Link, Flex, Center, Box, Grid, Image } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom"

import logo from "../assets/svg/logo.svg"

const Home = () => {
    return (
        <Box textAlign="center" fontSize="xl">
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
            <Flex>
                <Center w='100%'>
                    <Link as={ReactLink} to='/legal/terms-of-service' mr={2}>Terms of Service</Link>
                    <Link as={ReactLink} to='/legal/privacy-policy' ml={2}>Privacy Policy</Link>
                </Center>
            </Flex>
        </Box>
    )
}

export default Home