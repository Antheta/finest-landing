import { Box, Button, Container, Grid, Image, Stack } from "@chakra-ui/react";
import React from "react"
import { Link } from "react-router-dom";
import { Link as ReactLink } from "react-router-dom"
import { ColorModeSwitcher } from '../../ColorModeSwitcher';

import logo from "../../assets/svg/logo.svg"

const Navbar = () => {
    return (
        <Container maxW='4xl' mt={3}>
            <Grid templateColumns='repeat(2, 1fr)' gap={2}>
                <Box textAlign="left" fontSize="xl">
                    <Stack direction='row' alignItems="center">
                        <Link as={ReactLink} to='/'>
                            <Image
                                boxSize='55px'
                                objectFit='cover'
                                src={logo}
                                alt="FINEST PROTOCOL"
                                style={{ marginTop: '-6px' }}
                            />
                        </Link>
                        <Link as={ReactLink} to='/'>
                            <Button variant='ghost'>
                                Home
                            </Button>
                        </Link>
                        <Link as={ReactLink} to='/features'>
                            <Button variant='ghost' ml={2}>
                                Features
                            </Button>
                        </Link>
                        {/* <Link as={ReactLink} to='/docs'>
                            <Button variant='ghost' ml={2}>
                                Docs
                            </Button>
                        </Link> */}
                    </Stack>
                </Box>
                <Box textAlign="right" fontSize="xl" minH="55px" style={{ marginTop: '6px' }}>
                    <Link as={ReactLink} to='/connect'>
                        <Button variant='solid' colorScheme='gray' ml={2}>
                            Connect
                        </Button>
                    </Link>
                    <ColorModeSwitcher justifySelf="flex-end" />
                </Box>
            </Grid>
        </Container>
    )
}

export default Navbar