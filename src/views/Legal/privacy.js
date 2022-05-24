import { Box, Container, Grid, Text } from "@chakra-ui/react"

const Privacy = () => {
    return (
        <Container maxW='4xl' mt={3} style={{ minHeight: '100vh' }}>
            <Box textAlign="left">
                <Grid p={3} alignItems='left'>
                    <h1 style={{ textAlign: 'center', fontWeight: '600', fontSize: '25px' }}>Privacy Policy</h1>
                </Grid>
                <Text>
                    ...to be added...
                </Text>
            </Box>
        </Container>
    )
}

export default Privacy