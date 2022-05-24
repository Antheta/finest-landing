import { Badge, Box, Container, Grid} from "@chakra-ui/react";
import React from "react"

const Footer = () => {
    return (
        <Container maxW='4xl' mt={3} textAlign="center">
            <Grid templateColumns='repeat(1, 1fr)' gap={2}>
                <Box alignContent="center">
                    <Badge colorScheme='orange' ml={2}>Work in progress</Badge>
                </Box>
            </Grid>
        </Container>
    )
}

export default Footer