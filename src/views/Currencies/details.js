import {
    Container,
    Box,
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
    Tbody,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    TableContainer,
    Tabs,
    TabList,
    TabPanels,
    TabPanel,
    Tab,
    Select,
  } from '@chakra-ui/react';
import { BsBox, BsCapslockFill, BsCurrencyDollar } from 'react-icons/bs';

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCurrency } from './store';
import { useDispatch, useSelector } from 'react-redux';
import Bc from '../../components/Breadcrumb';
import PercentageChange from '../../components/PercentageChange';

import { AdvancedRealTimeChart, TechnicalAnalysis } from "react-ts-tradingview-widgets";

import { formatDateTime } from '../../utility/Utils'
import { CheckIcon, Icon } from '@chakra-ui/icons';
import { FcComboChart, FcInfo } from 'react-icons/fc';

const numeral = require('numeral');

const StatsCard = (props) => {
    const { title, stat, icon, change } = props
    return (
        <Stat
            px={{ base: 2, md: 4 }}
            py={'5'}
            shadow={'xl'}
            border={'1px solid'}
            borderColor={useColorModeValue('gray.200', 'gray.200')}
            rounded={'lg'}>
            <Flex justifyContent={'space-between'}>
            <Box pl={{ base: 2, md: 4 }}>
                <StatLabel fontWeight={'medium'}>
                    {title}
                </StatLabel>
                <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                    {stat}
                    {change ? (
                        <PercentageChange title="Last hour" style={{ marginLeft: '5px' }} number={change} />
                    ) : null}
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
    const color = useColorModeValue('dark', 'light');
    const dispatch = useDispatch()
    const store = useSelector(state => state.currencies)

    const [currency, setCurrency] = useState("")
    const [fiat, setFiat] = useState("USD")
    const [loading, setLoading] = useState(true)

    const [state, setState] = useState(
        'initial'
    )

    const { slug } = useParams()

    useEffect(() => {
        setCurrency(slug)
        if (store.selected?.slug !== currency) {
            dispatch(
                getCurrency(slug)
            ).then(() => {
                setLoading(false)
            })

        }
    }, [slug])

    const watchCurrency = () => {
        setTimeout(() => {
            setState('watch_success')
        }, 1000)

        setTimeout(() => {
            setState('initial')
        }, 5000)
    }

    return (
        <Container maxW='4xl' mt={2} style={{ minHeight: '100vh', marginBottom: '150px', marginTop: '50px' }}>
            <Bc 
                items={breadcrumbItems}
                currentPage={{
                    title: store.selected?.name ? store.selected?.name : currency,
                    href: `/currencies/${currency}`
                }}
            />
            {loading ? (
                <Box style={{ textAlign: 'center', fontWeight: '600', fontSize: '25px' }}>
                    <Spinner size='xl' />
                </Box>
            ) : (
                <Box textAlign="left">
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 1, lg: 2 }}>

                        <chakra.h1
                            textAlign={'left'}
                            fontSize={'4xl'}
                            py={2}
                            fontWeight={'bold'}
                        >
                        {store.selected?.name ? store.selected?.name : currency}
                        {store.selected?.quotes[0]?.ytdPriceChangePercentage ? (
                            <PercentageChange title="This year" style={{ marginLeft: '5px' }} number={store.selected?.quotes[0]?.ytdPriceChangePercentage} />
                        ) : null}
                        </chakra.h1>
                        {store.selected?.lastUpdated ?
                            <Text size={'sm'} margin={{ base: 2, lg: 0 }} textAlign={{ base: 'center', md: 'right' }} textColor={'lightgray'} alignSelf={"center"} fontSize={10}>
                                Last updated: {formatDateTime(store.selected?.quotes[0]?.lastUpdated ? store.selected?.quotes[0]?.lastUpdated : store.selected?.lastUpdated)}
                            </Text>
                        : null}
                    </SimpleGrid>
                    <SimpleGrid columns={{ base: 1, md: 8 }} spacing={{ base: 1, lg: 2 }}>
                        <Button 
                            colorScheme={state === 'watch_success' ? 'gray' : 'blue'}
                            isLoading={state === 'watch_submitting'}
                            size='sm'
                            onClick={() => {
                                setState('watch_submitting')
                                watchCurrency()
                            }}
                        >
                            {state === 'watch_success' ? <CheckIcon /> : 'Watch'}
                        </Button>
                        <Button colorScheme='green' size='sm'>
                            New Alert
                        </Button>
                    </SimpleGrid>
                    <Box maxW="7xl" mx={'auto'} pt={5} >
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                        <StatsCard
                            title={'Price'}
                            stat={ 
                                store.selected?.quotes[0]?.price <= 0.01 ? (
                                    numeral(store.selected?.quotes[0]?.price).format('0.00000a')
                                ) : (
                                    numeral(store.selected?.quotes[0]?.price).format('0.00a')
                                )                                
                            }
                            change={store.selected?.quotes[0]?.percentChange1h}
                            icon={<BsCurrencyDollar size={'3em'} />}
                        />
                        <StatsCard
                            title={'Market Cap'}
                            stat={numeral(store.selected?.quotes[0]?.marketCap).format('0.00a')}
                            icon={<BsCapslockFill size={'3em'} />}
                        />
                        <StatsCard
                            title={'Supply'}
                            stat={numeral(store.selected?.circulatingSupply).format('0.00a')}
                            icon={<BsBox size={'3em'} />}
                        />
                        </SimpleGrid>
                    </Box>
                    <br />
                    <Box mt={5}>
                        <Tabs isFitted  marginTop={'20px'}>
                            <TabList mb='1em' marginTop={'20px'}>
                                <Tab>
                                    <Icon as={FcInfo} w={5} h={5} mr={1} /> Information
                                </Tab>
                                <Tab>
                                    <Icon as={FcComboChart} w={5} h={5} mr={1} /> Graphs
                                </Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <Text fontSize={20} marginTop={'30px'} marginBottom={'15px'}>
                                        Supply
                                    </Text>
                                    <TableContainer maxWidth={'100%'} maxW="100%">
                                        <Table size="sm" variant='striped' colorScheme='gray'>
                                            <Thead>
                                                <Tr>
                                                    <Th>Attribute</Th>
                                                    <Th>Value</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                <Tr>
                                                    <Td>Total supply</Td>
                                                    <Td>{numeral(store.selected?.totalSupply).format('0.00a')}</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>Circulating supply</Td>
                                                    <Td>{numeral(store.selected?.circulatingSupply).format('0.00a')}</Td>
                                                </Tr>
                                            </Tbody>
                                        </Table>
                                    </TableContainer>

                                    <Text fontSize={20} marginTop={'30px'} marginBottom={'15px'}>
                                        Market cap
                                    </Text>
                                    <TableContainer maxWidth={'100%'} maxW="100%">
                                        <Table size="sm" variant='striped' colorScheme='gray'>
                                            <Thead>
                                                <Tr>
                                                    <Th>Attribute</Th>
                                                    <Th>Value</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                <Tr>
                                                    <Td>Market cap</Td>
                                                    <Td>{numeral(store.selected?.quotes[0]?.marketCap).format('0.00a')}</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>Fully diluted market cap</Td>
                                                    <Td>{numeral(store.selected?.quotes[0]?.fullyDilluttedMarketCap).format('0.00a')}</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>Market cap by supply</Td>
                                                    <Td>{numeral(store.selected?.quotes[0]?.marketCapByTotalSupply).format('0.00a')}</Td>
                                                </Tr>
                                                {store.selected?.quotes[0]?.selfReportedMarketCap && store.selected?.quotes[0]?.selfReportedMarketCap !== "0" &&
                                                    <Tr>
                                                        <Td>Self reported market cap</Td>
                                                        <Td>{numeral(store.selected?.quotes[0]?.selfReportedMarketCap).format('0.00a')}</Td>
                                                    </Tr>
                                                }
                                            </Tbody>
                                        </Table>
                                    </TableContainer>

                                    <Text fontSize={20} marginTop={'30px'} marginBottom={'15px'}>
                                        Volume
                                    </Text>
                                    <TableContainer maxWidth={'100%'} maxW="100%">
                                        <Table size="sm" variant='striped' colorScheme='gray'>
                                            <Thead>
                                                <Tr>
                                                    <Th>Attribute</Th>
                                                    <Th>Value</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                <Tr>
                                                    <Td>24 hours</Td>
                                                    <Td>{numeral(store.selected?.quotes[0]?.volume24h).format('0.00a')}</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>7 days</Td>
                                                    <Td>{numeral(store.selected?.quotes[0]?.volume7d).format('0.00a')}</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>30 days</Td>
                                                    <Td>{numeral(store.selected?.quotes[0]?.volume30d).format('0.00a')}</Td>
                                                </Tr>
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </TabPanel>
                                <TabPanel style={{ minHeight: '450px' }}>
                                    <Select 
                                        placeholder='Select currency' 
                                        size='md' 
                                        mb={5}
                                        onChange={(e) => {
                                            if (e.target.value !== "") {
                                                if (e.target.value === "MC") {
                                                    setFiat("")
                                                } else {
                                                    setFiat(e.target.value)
                                                }
                                            }
                                        }}
                                    >
                                        <option value={`MC`} defaultChecked={true}>Market Cap</option>
                                        <option value={`USD`} defaultChecked={true}>U.S Dollar - {store.selected?.symbol + '/USD'}</option>
                                        <option value={`EUR`}>EURO - {store.selected?.symbol + '/EUR'}</option>
                                    </Select>
                                    <AdvancedRealTimeChart 
                                        symbol={store.selected?.symbol + fiat}
                                        width="100%"
                                        height="450px"
                                        allow_symbol_change={false}
                                        hide_side_toolbar={true}
                                        details={false}
                                        theme={color === "dark" ? 'light' : 'dark'}
                                    />
                                    {fiat ? (
                                        <TechnicalAnalysis 
                                            symbol={store.selected?.symbol + fiat}
                                            width="100%"
                                            colorTheme={color === "dark" ? 'light' : 'dark'}
                                        />
                                    ) : null}
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                </Box>
            )}
        </Container>
    )
}

export default Currency