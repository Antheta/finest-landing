import { Badge, Box, Center, Container, Grid } from "@chakra-ui/react"

const Connect = () => {
    return (
        <Container maxW='4xl' mt={3} style={{ minHeight: '100vh' }}>
            <Box textAlign="left">
                <Grid p={2} alignItems='left'>
                    <h1 style={{ textAlign: 'center', fontWeight: '600', fontSize: '25px' }}>Connect</h1>
                    <Box mt={5} textAlign="center">
                        Continue with your provider
                    </Box>
                </Grid>
                <Center h='100px' color='white'>
                    {/* <Button minW="100%" colorScheme='orange' variant='solid'>
                        Metamask
                    </Button> */}
                    <Badge colorScheme='orange'>In development</Badge>
                </Center>
            </Box>
        </Container>
    )
}

export default Connect