import { Badge, Box, Container, Grid, GridItem, Img, Text } from "@chakra-ui/react"

import alerts from "../../assets/svg/alerts.svg"
import responses from "../../assets/svg/responses.svg"
import developers from "../../assets/svg/developers.svg"

const Features = () => {
    return (
        <Container maxW='4xl' mt={3}>
            <Box textAlign="left">
                <Grid p={3} alignItems='left'>
                    <h1 style={{ textAlign: 'center', fontWeight: '600', fontSize: '25px' }}>Features</h1>
                </Grid>
                <Grid templateColumns='repeat(3, 1fr)' gap={3} alignItems="center">
                    <GridItem w='100%' lg={3} sm={12} borderRadius={6} p={2} pt={4} pb={4}>
                        <Img 
                            src={alerts} 
                        />
                        <Text textAlign="center" style={{ fontSize: '20px', fontWeight: '600' }}>
                            Alerts
                            <Badge colorScheme='purple' ml={2}>In development</Badge>
                        </Text>
                        <Text textAlign="center">
                            Setup your own alerts for the bot. The bot will then let you know on time.
                        </Text>
                    </GridItem>
                    <GridItem w='100%' lg={3} sm={12} borderRadius={6} p={2} pt={4} pb={4}>
                        <Img 
                            src={responses} 
                        />
                        <Text textAlign="center" style={{ fontSize: '20px', fontWeight: '600' }}>
                            Responses
                            <Badge colorScheme='orange' ml={2}>Planned</Badge>
                        </Text>
                        <Text textAlign="center">
                            Ask the bot for prices, supply, market cap and so on.
                        </Text>
                    </GridItem>
                    <GridItem w='100%' lg={3} sm={12} borderRadius={6} p={2} pt={4} pb={4}>
                        <Img 
                            src={developers} 
                        />
                        <Text textAlign="center" style={{ fontSize: '20px', fontWeight: '600' }}>
                            API
                            <Badge colorScheme='purple' ml={2}>In development</Badge>
                        </Text>
                        <Text textAlign="center">
                            API available for developers, create your own custom integrations.
                        </Text>
                    </GridItem>
                </Grid>
            </Box>
        </Container>
    )
}

export default Features