import { Badge } from "@chakra-ui/react"
import { Fragment } from "react"

const PercentageChange = ({ number, ...props }) => {
    const { title, style } = props
    return (
        <Fragment>
            <Badge title={title} style={style} colorScheme={number >= 0 ? 'green' : 'red'}>{number}%</Badge>
        </Fragment>
    )
}

export default PercentageChange