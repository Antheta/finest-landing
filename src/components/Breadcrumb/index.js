import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import { Link as ReactLink } from "react-router-dom"

const Bc = ({ items, currentPage }) => {
    return (
        <Breadcrumb>
            <BreadcrumbItem>
                <BreadcrumbLink as={ReactLink} to='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>

            {items ? (
                items.map((item) => {
                    return (
                        <BreadcrumbItem>
                            <BreadcrumbLink as={ReactLink} to={`${item.href}`}>{item.title}</BreadcrumbLink>
                        </BreadcrumbItem>
                    )
                })
            ) : null}

            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink as={ReactLink} to={`${currentPage.href}`}>{currentPage.title}</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
    )
}

export default Bc