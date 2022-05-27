import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
    SimpleGrid,
} from '@chakra-ui/react';

import { Link as ReactLink } from "react-router-dom";
import FeaturesBox from '../components/Features';

const Home = () => {
    return (
        <>
            <Container maxW={'3xl'}>
                <Stack
                    as={Box}
                    textAlign={'center'}
                    spacing={{ base: 8, md: 14 }}
                    py={{ base: 20, md: 36 }}>
                    <Heading
                        fontWeight={600}
                        fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                        lineHeight={'110%'}>
                        <Text 
                            className='gradient-text' 
                            fontSize={{ base: '6xl', sm: '8xl', md: '8xl' }}
                            lineHeight={'110%'}
                            mb={5}
                        >
                            FINEST
                        </Text> 
                            A gateway for crypto <br />
                        <Text as={'span'} color={'blue.400'}>
                            notifications
                        </Text>
                    </Heading>
                    <Text color={'gray.500'}>
                        Finest aims to deliver <b>actionable</b> data you your preferred endpoints based on 
                        your filters. Just simply setup alerts for the currencies that you wish to follow and we'll 
                        handle the rest.
                    </Text>
                    <Stack
                        direction={'column'}
                        spacing={3}
                        align={'center'}
                        alignSelf={'center'}
                        position={'relative'}>
                            <SimpleGrid
                                columns={2}
                                direction={'column'}
                                spacing={2}
                                align={'center'}
                                alignSelf={'center'}
                                position={'relative'}>
                            <Button
                                as={ReactLink} 
                                to={'/signin'}
                                colorScheme={'blue'}
                                bg={'blue.400'}
                                rounded={'full'}
                                px={6}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Get Started
                            </Button>
                            <Button
                                as={ReactLink} 
                                to={'/currencies'}
                                colorScheme={'white'}
                                bg={'gray.400'}
                                rounded={'full'}
                                px={6}
                                _hover={{
                                    bg: 'gray.500',
                                }}>
                                Available currencies
                            </Button>
                        </SimpleGrid>
                        <Button as={ReactLink} to={'/features'} variant={'link'} colorScheme={'blue'} size={'sm'}>
                            Learn more
                        </Button>
                    </Stack>
                </Stack>
            </Container>
            <Container maxW={'4xl'} style={{ marginBottom: '100px' }}>
                <FeaturesBox />
            </Container>
        </>
    )
}

export default Home