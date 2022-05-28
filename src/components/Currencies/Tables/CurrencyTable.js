import { Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { Fragment } from "react"

const numeral = require('numeral');

const CurrencyTable = ({ title, rows }) => {
    return (
        <Fragment>
            <TableContainer maxWidth={'100%'} maxW="100%">
                <Text fontSize={20} marginTop={'30px'} marginBottom={'15px'}>
                    {title}
                </Text>
                <Table size="sm" variant='striped' colorScheme='gray'>
                    <Thead>
                        <Tr>
                            <Th>Attribute</Th>
                            <Th>Value</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {rows.map((row, i) => {
                            return (
                                <Tr key={i}>
                                    <Td>{row.title}</Td>
                                    <Td>{row.numeral ? 
                                            numeral(row.value).format('0.00a')
                                            : row.value}</Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </Fragment>
    )
}

export default CurrencyTable