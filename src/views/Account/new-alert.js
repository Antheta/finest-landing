import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Flex, Grid, Input, InputGroup, InputLeftElement, Select, Stack } from "@chakra-ui/react"
import { Fragment, useState } from "react";

import { useSelector } from "react-redux";

const NewAlert = () => {
    const store = useSelector(state => state.currencies)

    const [query, setQuery] = useState("")

    return (
        <Fragment>
            <Container maxW='2xl' minH='100vh'>
                <Grid p={3} marginTop="35px" alignItems='left'>
                    <h1 style={{ textAlign: 'center', fontWeight: '600', fontSize: '35px' }}>New Alert</h1>
                </Grid>
                <Flex
                    style={{ marginTop: '40px', marginBottom: '0px' }}>
                    <Stack minW="100%">
                        <InputGroup>
                            <Input 
                                placeholder='Name for the alert... (optional)' 
                                fontSize={20}
                                minH="45px"
                                defaultValue={store.params?.q ? store.params.q : query}
                            />
                        </InputGroup>
                        <Box textAlign="left" spacing={0} mx={'auto'} py={0} px={0} style={{ marginTop: '17px' }}>
                            <Select placeholder='Currency' fontSize={20} minH="45px">
                                
                            </Select>
                        </Box>
                        <Box textAlign="left" spacing={0} mx={'auto'} py={0} px={0} style={{ marginTop: '17px' }}>
                            <Select placeholder='Attribute' fontSize={20} minH="45px">
                                <optgroup label="Supply">
                                    <option value='SUPPLY_CIRCULATING'>Circulating supply</option>
                                    <option value='SUPPLY_TOTAL'>Total supply</option>
                                </optgroup>
                                <optgroup label="Market Cap">
                                    <option value='SUPPLY_TOTAL'>By </option>
                                </optgroup>
                            </Select>
                        </Box>
                        <Box textAlign="left" spacing={0} mx={'auto'} py={0} px={0} style={{ marginTop: '17px' }}>
                            <Select placeholder='Rise or fall?' fontSize={20} minH="45px">
                                <option value='1'>Rise</option>
                                <option value='0'>Fall</option>
                            </Select>
                        </Box>
                        <Box textAlign="left" spacing={0} mx={'auto'} py={0} px={0} style={{ marginTop: '17px' }}>
                            <Select placeholder='Type' fontSize={20} minH="45px">
                                <option value='PERCENTAGE'>%</option>
                                <option value='VALUE'>Value</option>
                            </Select>
                        </Box>
                        <InputGroup style={{ marginTop: '17px' }}>
                            <Input 
                                placeholder='Your value (%)' 
                                fontSize={20}
                                minH="45px"
                                defaultValue={store.params?.q ? store.params.q : query}
                            />
                        </InputGroup>
                        <Button colorScheme='blue' size='lg' style={{ marginTop: '25px' }}>
                            Create
                        </Button>
                    </Stack>

                </Flex>
            </Container>
        </Fragment>
    )
}

export default NewAlert