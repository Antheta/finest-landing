import { Badge, Box, Button, Center, Container, Flex, Grid, Stack, Text } from "@chakra-ui/react"
import { Fragment } from "react";

import { SiMessenger, SiTelegram, SiSlack } from 'react-icons/si';

const Connect = () => {
    return (
        <Fragment>
            <Container maxW='4xl' minH='100vh'>
                <Flex
                    minH={'60vh'}
                    align={'center'}
                    justify={'center'}>
                    <Box textAlign="left" spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                        <Grid p={2} alignItems='left' mb={5}>
                            <h1 style={{ textAlign: 'center', fontWeight: '600', fontSize: '25px' }}>Connect</h1>
                            <Box mt={5} textAlign="center">
                                Choose where you want to add our bot. <br />
                                <Badge colorScheme={'purple'}>In development</Badge>
                            </Box>
                        </Grid>
                        <Center h='150px'>
                            <Stack spacing={2} align={'center'} maxW={'md'} w={'full'}>
                                <Button w={'full'}  colorScheme={'messenger'} leftIcon={<SiMessenger />} disabled>
                                    <Center>
                                        <Text>Add to Messenger</Text>
                                    </Center>
                                </Button>
                                <Button w={'full'}  colorScheme={'telegram'} leftIcon={<SiTelegram />} disabled>
                                    <Center>
                                        <Text>Add to Telegram</Text>
                                    </Center>
                                </Button>
                                <Button w={'full'}  colorScheme={'orange'} leftIcon={<SiSlack />} disabled>
                                    <Center> 
                                        <Text>Add to Slack</Text>
                                    </Center>
                                </Button>
                            </Stack>
                        </Center>
                    </Box>
                </Flex>
            </Container>
        </Fragment>
    )
}

export default Connect