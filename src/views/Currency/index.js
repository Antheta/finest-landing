import {
    Container,
    Box,
    Grid,
    Text,
    chakra,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
    Spinner,
  } from '@chakra-ui/react';
import { BsPerson } from 'react-icons/bs';
import { FiServer } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCurrency } from './store';
import { useDispatch, useSelector } from 'react-redux';

const StatsCard = (props) => {
    const { title, stat, icon } = props
    return (
        <Stat
            px={{ base: 2, md: 4 }}
            py={'5'}
            shadow={'xl'}
            border={'1px solid'}
            borderColor={useColorModeValue('gray.800', 'gray.500')}
            rounded={'lg'}>
            <Flex justifyContent={'space-between'}>
            <Box pl={{ base: 2, md: 4 }}>
                <StatLabel fontWeight={'medium'} isTruncated>
                {title}
                </StatLabel>
                <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                {stat}
                </StatNumber>
            </Box>
            <Box
                my={'auto'}
                color={useColorModeValue('gray.800', 'gray.200')}
                alignContent={'center'}>
                {icon}
            </Box>
            </Flex>
        </Stat>
    )
}


const Currency = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state.currency)

    const [currency, setCurrency] = useState("")
    const [loading, setLoading] = useState(false)

    const { slug } = useParams()

    useEffect(() => {
        setCurrency(slug)
        dispatch(
            getCurrency(slug)
        ).then(() => {
            setLoading(false)
        })

        console.log(store)
    }, [slug])

    return (
        <Container maxW='4xl' mt={3} style={{ minHeight: '100vh', marginBottom: '150px', marginTop: '80px' }}>
            {loading ? (
                <Spinner size='xl' />
            ) : (
                <Box textAlign="left">
                    <Grid p={3} alignItems='left'>
                        <h1 style={{ textAlign: 'center', fontWeight: '600', fontSize: '25px' }}>
                            
                        </h1>
                    </Grid>
                    <Text style={{ marginTop: '40px' }}>
                        <Text></Text>
                    </Text>
                    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
                        <chakra.h1
                        textAlign={'center'}
                        fontSize={'4xl'}
                        py={10}
                        fontWeight={'bold'}>
                            {currency} Statistics
                        </chakra.h1>
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                        <StatsCard
                            title={'Users'}
                            stat={'5,000'}
                            icon={<BsPerson size={'3em'} />}
                        />
                        <StatsCard
                            title={'Servers'}
                            stat={'1,000'}
                            icon={<FiServer size={'3em'} />}
                        />
                        <StatsCard
                            title={'Datacenters'}
                            stat={'7'}
                            icon={<GoLocation size={'3em'} />}
                        />
                        </SimpleGrid>
                    </Box>
                </Box>
            )}
        </Container>
    )
}

export default Currency