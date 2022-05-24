import { Box, Container, Grid, Text } from "@chakra-ui/react"

const Tos = () => {
    return (
        <Container maxW='4xl' mt={3}>
            <Box textAlign="left">
                <Grid p={3} alignItems='left'>
                    <h1 style={{ textAlign: 'center', fontWeight: '600', fontSize: '25px' }}>Terms of Service</h1>
                </Grid>
                <Text>
                    ...to be added...
                </Text>
            </Box>
        </Container>
    )
}

export default Tos