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
                                    {/* You can add your content here. */}
                                    --- VISIBLE TO AUTHENTICATED USERS ---
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Elementum curabitur vitae nunc sed velit dignissim sodales ut
                                    eu. Mauris nunc congue nisi vitae suscipit tellus mauris a
                                    diam. Eros in cursus turpis massa tincidunt.
                                </TabPanel>
                                <TabPanel>
                                    {/* You can add your content here. */}
                                    --- VISIBLE TO AUTHENTICATED USERS ---
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Elementum curabitur vitae nunc sed velit dignissim sodales ut
                                    eu. Mauris nunc congue nisi vitae suscipit tellus mauris a
                                    diam. Eros in cursus turpis massa tincidunt.
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