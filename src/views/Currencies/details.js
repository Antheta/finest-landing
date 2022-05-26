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
    Button,
  } from '@chakra-ui/react';
import { BsBox, BsCapslockFill, BsCurrencyDollar, BsFillInboxFill, BsHandThumbsUp, BsHandThumbsUpFill, BsInboxFill, BsPerson } from 'react-icons/bs';
import { FiServer } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCurrency } from './store';
import { useDispatch, useSelector } from 'react-redux';
import Bc from '../../components/Breadcrumb';

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

const breadcrumbItems = [
    {
        title: "Currencies",
        href: "/currencies"
    }
]


const Currency = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state.currencies)

    const [currency, setCurrency] = useState("")
    const [loading, setLoading] = useState(true)

    const { slug } = useParams()

    useEffect(() => {
        setCurrency(slug)
        if (!store.selected) {
            dispatch(
                getCurrency(slug)
            ).then(() => {
                setLoading(false)
            })
        }

        console.log(store)
    }, [store.selected])

    useEffect(() => {
        console.log(store)
    }, [store])

    return (
        <Container maxW='4xl' mt={2} style={{ minHeight: '100vh', marginBottom: '150px', marginTop: '50px' }}>
            <Bc 
                items={breadcrumbItems}
                currentPage={{
                    title: currency,
                    href: `/currencies/${currency}`
                }}
            />
            {loading ? (
                <Box style={{ textAlign: 'center', fontWeight: '600', fontSize: '25px' }}>
                    <Spinner size='xl' />
                </Box>
            ) : (
                <Box textAlign="left">
                    <Grid alignItems='left'>
                        <chakra.h1
                            textAlign={'left'}
                            fontSize={'4xl'}
                            py={2}
                            fontWeight={'bold'}
                        >
                        {currency}
                        </chakra.h1>
                    </Grid>
                    <SimpleGrid columns={{ base: 1, md: 8 }} spacing={{ base: 1, lg: 2 }}>
                        <Button colorScheme='blue' size='sm'>
                            Follow
                        </Button>
                        <Button colorScheme='green' size='sm'>
                            Set Alerts
                        </Button>
                    </SimpleGrid>
                    <Box maxW="7xl" mx={'auto'} pt={5} >
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                        <StatsCard
                            title={'Price'}
                            stat={'5,000'}
                            icon={<BsCurrencyDollar size={'3em'} />}
                        />
                        <StatsCard
                            title={'Market Cap'}
                            stat={'1,000'}
                            icon={<BsCapslockFill size={'3em'} />}
                        />
                        <StatsCard
                            title={'Supply'}
                            stat={'7'}
                            icon={<BsBox size={'3em'} />}
                        />
                        </SimpleGrid>
                    </Box>
                    <Text fontSize={20} marginTop={'30px'}>
                        Details
                    </Text>
                    <Text>
                        ...info...
                    </Text>
                </Box>
            )}
        </Container>
    )
}

export default Currency