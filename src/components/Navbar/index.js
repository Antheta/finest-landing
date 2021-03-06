import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link as ChakraLink,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Image,
    Circle,
} from '@chakra-ui/react';

import { Link as ReactLink } from "react-router-dom"

import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons';


import logo from "../../assets/svg/logo.svg"
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import Notifications from '../Notifications';
import WalletModal from '../WalletModal';
import { useState } from 'react';

import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import Identicon from '../Identicon';

export default function WithSubnavigation() {
    const { activateBrowserWallet, account } = useEthers();
    const etherBalance = useEtherBalance(account);

    const { isOpen, onToggle } = useDisclosure();

    const [modalOpen, setModalOpen] = useState()
    const handleWalletModal = () => setModalOpen(!modalOpen)

    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <Text
                        textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                        fontFamily={'heading'}
                        color={useColorModeValue('gray.800', 'white')}>
                        <Image
                            display={{ base: 'none', md: 'inline-flex' }}
                            boxSize='45px'
                            objectFit='cover'
                            src={logo}
                            alt="FINEST PROTOCOL"
                        />
                    </Text>

                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>
                    {account ? (
                        <>
                            <Button
                                display={{ base: 'none', md: 'inline-flex' }}
                                fontSize={'sm'}
                                fontWeight={400}
                                variant={'link'}
                                as={ReactLink}
                                to={'/alerts'}>
                                My Alerts
                            </Button>
                            {Notifications()}
                        </>
                    ) : null}
                    <Button
                        // display={{ md: 'inline-flex' }}
                        textAlign="center"
                        mr={2}
                        style={{ marginLeft: '10px' }}
                        fontSize={'sm'}
                        fontWeight={600}
                        variant='solid' 
                        colorScheme='gray'
                        onClick={() => {
                            handleWalletModal()
                        }}
                    >
                        {account ? (
                            <>
                                <Circle size='10px' bg='green.400' mr={2} color='white' />
                                {`${account.slice(0, 6)}...${account.slice(
                                    account.length - 4,
                                    account.length
                                )}`}
                                <Identicon style={{ marginLeft: '7px' }} />
                            </>
                        ) : (
                            'Connect'
                        )}
                    </Button>
                    <ColorModeSwitcher style={{ marginLeft: '10px' }} justifySelf="flex-end" />
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
            <WalletModal isOpen={modalOpen} handleModal={handleWalletModal} />
        </Box>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack direction={'row'} spacing={4} alignItems="center">
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label} 
                display={navItem.mobile ? 
                    { base: 'inline-flex', md: 'none' }
                    : null
                }>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <ChakraLink
                                as={ReactLink}
                                p={2}
                                to={navItem.href ?? '#'}
                                fontSize={'sm'}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}>
                                {navItem.label}
                            </ChakraLink>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}>
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav 
                                            key={child.label} 
                                            {...child} 
                                        />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
    return (
        <ChakraLink
            as={ReactLink}
            to={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'pink.400' }}
                        fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </ChakraLink>
    );
};

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem 
                    key={navItem.label} 
                    {...navItem} 
                />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={ReactLink}
                to={href ?? '#'}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text
                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <ChakraLink key={child.label} py={2} href={child.href}>
                                {child.label}
                            </ChakraLink>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

const NAV_ITEMS = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Features',
        href: '/features',
    },
    {
        label: 'Currencies',
        href: '/currencies',
    },
    {
        label: 'Gateway',
        href: '/gateway',
    }
    // {
    //   label: 'Features',
    //   children: [
    //     {
    //       label: 'Alerts',
    //       subLabel: 'Setup custom alerts based on your filters',
    //       href: '/features',
    //     },
    //     {
    //       label: 'Responses',
    //       subLabel: 'Ask the for prices, supply, market cap ...',
    //       href: '/features',
    //     },
    //     {
    //       label: 'API',
    //       subLabel: 'Create your own custom integrations',
    //       href: '/features',
    //     },
    //   ],
    // },
];