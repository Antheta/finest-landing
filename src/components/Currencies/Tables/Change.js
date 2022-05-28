import { Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import moment from "moment"
import { Fragment } from "react"
import PercentageChange from "../../PercentageChange"

const Change = ({ values }) => {
    return (
        <Fragment>
            <TableContainer maxWidth={'100%'} maxW="100%">
                <Text fontSize={20} marginTop={'30px'} marginBottom={'15px'}>
                    Change
                </Text>
                <Table size="sm" variant='striped' colorScheme='gray'>
                    <Thead>
                        <Tr>
                            <Th>Attribute</Th>
                            <Th>Value</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>1 hour</Td>
                            <Td><PercentageChange title="Last hour" style={{ marginLeft: '5px' }} number={values.percentChange1h} /></Td>
                        </Tr>
                        <Tr>
                            <Td>24 hours</Td>
                            <Td><PercentageChange title="24 hours" style={{ marginLeft: '5px' }} number={values.percentChange24h} /></Td>
                        </Tr>
                        <Tr>
                            <Td>7 days</Td>
                            <Td><PercentageChange title="7 days" style={{ marginLeft: '5px' }} number={values.percentChange7d} /></Td>
                        </Tr>
                        <Tr>
                            <Td>30 days</Td>
                            <Td><PercentageChange title="30 days" style={{ marginLeft: '5px' }} number={values.percentChange30d} /></Td>
                        </Tr>
                        <Tr>
                            <Td>60 days</Td>
                            <Td><PercentageChange title="60 days" style={{ marginLeft: '5px' }} number={values.percentChange60d} /></Td>
                        </Tr>
                        <Tr>
                            <Td>90 days</Td>
                            <Td><PercentageChange title="90 days" style={{ marginLeft: '5px' }} number={values.percentChange90d} /></Td>
                        </Tr>
                        <Tr>
                            <Td>This year ({moment().format('Y')})</Td>
                            <Td><PercentageChange title="This year" style={{ marginLeft: '5px' }} number={values.ytdPriceChangePercentage} /></Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Fragment>
    )
}

export default Change