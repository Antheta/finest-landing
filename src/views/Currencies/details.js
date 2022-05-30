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

import { formatDateTime, utcToLocal } from '../../utility/Utils'
import { CheckIcon, Icon } from '@chakra-ui/icons';
import { FcComboChart, FcInfo } from 'react-icons/fc';
import moment from 'moment';
import Change from '../../components/Currencies/Tables/Change';
import CurrencyTable from '../../components/Currencies/Tables/CurrencyTable';

const numeral = require('numeral');

const Charts = ({ fiat, symbol }) => {
    const color = useColorModeValue('dark', 'light')
    return (
        <>
            <AdvancedRealTimeChart 
                symbol={symbol + fiat}
                width="100%"
                height="450px"
                allow_symbol_change={false}
                hide_side_toolbar={true}
                details={false}
                isTransparent
                theme={color === "dark" ? 'light' : 'dark'}
            >
            </AdvancedRealTimeChart>
            {fiat ? (
                <TechnicalAnalysis 
                    symbol={symbol + fiat}
                    width="100%"
                    isTransparent
                    colorTheme={color === "dark" ? 'light' : 'dark'}
                >
                </TechnicalAnalysis>
            ) : null}
        </>
    )
}

const StatsCard = (props) => {
    const { title, stat, icon, change } = props
    return (
        <Stat
            px={{ base: 2, md: 4 }}
            py={'5'}
            shadow={'xl'}
            border={'0.2px solid'}
            borderColor={useColorModeValue('gray.400', 'gray.400')}
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
    const color = useColorModeValue('dark', 'light')
    const dispatch = useDispatch()
    const store = useSelector(state => state.currencies)

    const [currency, setCurrency] = useState("")
    const [fiat, setFiat] = useState("USD")
    const [info, setInfo] = useState({})
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
            ).then((data) => {
                setLoading(false)

                if (data.payload.data) {
                    setInfo(JSON.parse(data.payload.data))
                }
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
                                Last updated: {formatDateTime(utcToLocal(store.selected?.quotes[0]?.lastUpdated ? store.selected?.quotes[0]?.lastUpdated : store.selected?.lastUpdated))}
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
                                store.selected?.quotes[0]?.price <= 0.05 ? (
                                    `$${numeral(store.selected?.quotes[0]?.price).format('0.00000a')}`
                                ) : (
                                    `$${numeral(store.selected?.quotes[0]?.price).format('0.00a')}`
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
                        <Tabs isFitted  marginTop={'10px'}>
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
                                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 1, lg: 2 }}>
                                        <Change 
                                            values={{ 
                                                percentChange1h: store.selected?.quotes[0].percentChange1h,
                                                percentChange24h: store.selected?.quotes[0].percentChange24h,
                                                percentChange7d: store.selected?.quotes[0].percentChange7d,
                                                percentChange30d: store.selected?.quotes[0].percentChange30d,
                                                percentChange60d: store.selected?.quotes[0].percentChange60d,
                                                percentChange90d: store.selected?.quotes[0].percentChange90d,
                                                ytdPriceChangePercentage: store.selected?.quotes[0].ytdPriceChangePercentage,
                                            }}
                                        />

                                        <CurrencyTable
                                            title="Supply"
                                            rows={[
                                                {
                                                    title: "Total supply",
                                                    value: store.selected?.totalSupply,
                                                    numeral: true
                                                },
                                                {
                                                    title: "Circulating supply",
                                                    value: store.selected?.circulatingSupply,
                                                    numeral: true
                                                }
                                            ]} 
                                        />
                                    </SimpleGrid>
                                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 1, lg: 2 }}>
                                        <CurrencyTable
                                            title="Market Cap"
                                            rows={[
                                                {
                                                    title: "Market cap",
                                                    value: store.selected?.quotes[0]?.marketCap,
                                                    numeral: true
                                                },
                                                {
                                                    title: "Fully diluted market cap",
                                                    value: store.selected?.quotes[0]?.fullyDilluttedMarketCap,
                                                    numeral: true
                                                },
                                                {
                                                    title: "By supply",
                                                    value: store.selected?.quotes[0]?.marketCapByTotalSupply,
                                                    numeral: true
                                                }
                                            ]} 
                                        />

                                        <CurrencyTable
                                            title="Volume"
                                            rows={[
                                                {
                                                    title: "24 hours",
                                                    value: store.selected?.quotes[0]?.volume24h,
                                                    numeral: true
                                                },
                                                {
                                                    title: "7 days",
                                                    value: store.selected?.quotes[0]?.volume7d,
                                                    numeral: true
                                                },
                                                {
                                                    title: "30 days",
                                                    value: store.selected?.quotes[0]?.volume30d,
                                                    numeral: true
                                                }
                                            ]} 
                                        />
                                    </SimpleGrid>
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
                                    {/* <Charts 
                                        symbol={store.selected?.symbol} 
                                        fiat={fiat} 
                                    /> */}
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