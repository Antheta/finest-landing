import { SearchIcon } from "@chakra-ui/icons";
import { Badge, Box, Button, Container, Flex, Grid, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightElement, Link, Spinner, Stack, Table, TableContainer, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { Fragment, useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getCurrencies } from "./store";

import { debounce } from 'lodash'
import { Link as ReactLink } from "react-router-dom";

const Currencies = () => {
    const dispatch = useDispatch()
    const store = useSelector(state => state.currencies)

    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState("")

    useEffect(() => {
        currenciesTable()
    }, [store.data])

    const numFormatter = (num) => {
        if(num > 999 && num < 1000000) {
            return (num/1000).toFixed(1) + 'K' // convert to K for number from > 1000 < 1 million 
        }else if(num > 1000000) {
            return (num/1000000).toFixed(2) + 'M' // convert to M for number from > 1 million 
        }else if(num > 1000000) {
            return (num/10000000).toFixed(1) + 'B' // convert to M for number from > 1 million 
        }else if(num < 900) {
            return num // if value < 1000, nothing to do
        }
    }

    const currenciesTable = () => {
        const currencies = store.data
        if (currencies.length) {
            return (
                <TableContainer maxWidth={'100%'} maxW="100%">
                    <Text textAlign={'left'} style={{ marginBottom: '30px' }}>
                        {store.total ? store.total : '0'} results
                    </Text>
                    <Table size="sm" variant='striped' colorScheme='gray'>
                        <Thead>
                            <Th fontSize={18}>#</Th>
                            <Th fontSize={18}>Name</Th>
                            <Th fontSize={18}>Circulating Supply</Th>
                            <Th fontSize={18}></Th>
                        </Thead>
                        {currencies.map((currency, i) => {
                            return (
                                <Tr key={i}>
                                    <Td>
                                        <Badge color={'gray'}>{currency.cmcRank}</Badge>
                                    </Td>
                                    <Td>
                                        <Link fontSize={15} as={ReactLink} to={`/currencies/${currency.slug}`}>
                                            {currency.name}
                                        </Link>
                                        <Text fontSize={10}>{currency.symbol}</Text>
                                    </Td>
                                    <Td>
                                        {numFormatter(currency.circulatingSupply)}
                                    </Td>
                                    <Td>
                                        <Button colorScheme='blue' size='xs' disabled title="Work in progress">
                                            Follow
                                        </Button>
                                    </Td>
                                </Tr>
                            )
                        })}
                    </Table>
                </TableContainer>
            )
        } else {
            return (
                'No currencies were found with your query.'
            )
        }
    }

    const debouncedSearch = useRef(
        debounce(async (search) => {
            setLoading(true)
            dispatch(
                getCurrencies({
                    page: 1,
                    perPage: 25,
                    q: search
                })
            ).then(() => {
                setLoading(false)
            })
        }, 500)
    ).current

    // ** Function to handle filter
    const handleFilter = e => {
        debouncedSearch(e.target.value)
    }

    useEffect(() => {
        store.total === 0 &&
            debouncedSearch(query)
    }, [query])

    return (
        <Fragment>
            <Container maxW='2xl' minH='100vh'>
                <Flex
                    style={{ marginTop: '80px', marginBottom: '0px' }}>
                    <Stack minW="100%">
                        <InputGroup
                            style={{  marginBottom: '10px' }}
                        >
                            <InputLeftElement
                                pointerEvents='none'
                                color='gray.300'
                                fontSize='20px'
                                style={{ marginTop: '2.5px', marginLeft: '2px' }}
                                children={<SearchIcon />}
                            />
                            <Input 
                                placeholder='Search available currencies...' 
                                fontSize={20}
                                minH="45px"
                                defaultValue={store.params?.q ? store.params.q : query}
                                onChange={(e) => {
                                    setQuery(e.target.value)
                                    handleFilter(e)
                                }}
                            />
                            {loading ? (
                                <InputRightElement
                                    pointerEvents='none'
                                    color='gray.300'
                                    fontSize='20px'
                                    style={{ marginTop: '2.5px' }}
                                    children={<Spinner size='md' />}
                                />
                            ) : null}
                        </InputGroup>
                        <Box textAlign="left" spacing={0} mx={'auto'} py={0} px={0} style={{ marginBottom: '45px' }}>
                            <Grid p={2} alignItems='left' mb={5}>
                                <Box mt={3} textAlign="center" style={{ maxWidth: '100%', overflowY: 'scroll' }}>
                                    {currenciesTable()}
                                </Box>
                            </Grid>
                        </Box>
                    </Stack>

                </Flex>
            </Container>
        </Fragment>
    )
}

export default Currencies