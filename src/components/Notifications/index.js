import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Button,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Flex,
    Badge,
} from '@chakra-ui/react'
import { BsBell, BsBellFill } from 'react-icons/bs'

const Notifications = () => {
    return (
        <Flex justifyContent="center">
            <Popover placement="bottom" isLazy>
                <PopoverTrigger>
                    <Button
                        variant="ghost"
                        w="fit-content">
                       {<BsBellFill />}
                    </Button>
                </PopoverTrigger>
                <PopoverContent _focus={{ boxShadown: 'none' }}>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader fontWeight="bold">Notifications</PopoverHeader>
                    <PopoverBody w="full">
                        <Tabs isLazy colorScheme="blue">
                            <TabList>
                                <Tab
                                    _focus={{ boxShadow: 'none' }}
                                    fontSize="xs"
                                    fontWeight="bold"
                                    w="50%">
                                    Alerts
                                </Tab>
                                <Tab
                                    _focus={{ boxShadow: 'none' }}
                                    fontSize="xs"
                                    fontWeight="bold"
                                    w="50%">
                                    Watchlist
                                </Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <Badge w={"100%"} textAlign="center" colorScheme="orange">COMING SOON</Badge>
                                </TabPanel>
                                <TabPanel>
                                    <Badge w={"100%"} textAlign="center" colorScheme="orange">COMING SOON</Badge>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Flex>
    )
}

export default Notifications