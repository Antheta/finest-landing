import { BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import { Link as ReactLink } from "react-router-dom"

const Breadcrumb = (items, currentPage) => {
    return (
        <Breadcrumb>
            <BreadcrumbItem>
                <BreadcrumbLink as={ReactLink} to='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>

            {items.length ? (
                items.map((item) => {
                    <BreadcrumbItem>
                    <BreadcrumbLink as={ReactLink} to={`${item.href}`}>{item.title}</BreadcrumbLink>
                    </BreadcrumbItem>
                })
            ) : null}

            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink as={ReactLink} to={`${currentPage.href}`}>{currentPage.title}</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
    )
}

export default Breadcrumb