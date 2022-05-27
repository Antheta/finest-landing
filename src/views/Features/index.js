import { Badge, Box, Container, Grid, Icon, Image, SimpleGrid, Text } from "@chakra-ui/react"

import alerts from "../../assets/svg/alerts.svg"
import responses from "../../assets/svg/responses.svg"
import developers from "../../assets/svg/developers.svg"
import { FcInfo } from "react-icons/fc"

const Features = () => {
    return (
        <Container maxW='4xl' mt={3} style={{ minHeight: '100vh' }}>
            <Box textAlign="left">
                <Grid p={3} alignItems='left'>
                    <h1 style={{ textAlign: 'center', fontWeight: '600', fontSize: '35px' }}>Features</h1>
                </Grid>
                <SimpleGrid 
                    minChildWidth='180px'
                    columns={3} 
                    spacing={10}
                >
                    <Box w='100%' lg={3} sm={12} borderRadius={6}>
                        <Image 
                            src={alerts} 
                        />
                        <Text textAlign="center" style={{ fontSize: '20px', fontWeight: '600' }}>
                            Alerts
                            <Badge colorScheme='purple' ml={2}>In development</Badge>
                        </Text>
                        <Text textAlign="center" mt={2}>
                            Create your own alerts for the coins you wish to receive alerts about.
                        </Text>
                    </Box>
                    <Box w='100%' lg={3} sm={12} borderRadius={6}>
                        <Image 
                            src={developers} 
                        />
                        <Text textAlign="center" style={{ fontSize: '20px', fontWeight: '600' }}>
                            API
                            <Badge colorScheme='purple' ml={2}>In development</Badge>
                        </Text>
                        <Text textAlign="center" mt={2}>
                            Create your own integrations through our API.
                        </Text>
                    </Box>
                    <Box w='100%' lg={3} sm={12} borderRadius={6}>
                        <Image 
                            src={responses} 
                        />
                        <Text textAlign="center" style={{ fontSize: '20px', fontWeight: '600' }}>
                            BOT
                            <Badge colorScheme='orange' ml={2}>Planned</Badge>
                        </Text>
                        <Text textAlign="center" mt={2}>
                            Add our bot to your own chat groups so that everyone is up to date.
                        </Text>
                    </Box>
                </SimpleGrid>
            </Box>
        </Container>
    )
}

export default Features