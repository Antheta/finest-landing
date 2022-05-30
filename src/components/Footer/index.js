import {
    Box,
    chakra,
    Container,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
} from '@chakra-ui/react'
import { FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa'

import moment from 'moment'

import { Link as ReactLink } from "react-router-dom"

import logo from "../../assets/svg/logo.svg"

const Logo = () => {
    return (
        <Image
            boxSize='85px'
            objectFit='cover'
            src={logo}
            alt="Finest Protocol"
        />
    )
}

const SocialButton = ({
    children,
    label,
    href,
}) => {
    return (
        <chakra.button
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

export default function SmallCentered() {
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
            style={{ marginTop: 'auto' }}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                spacing={4}
                justify={'center'}
                align={'center'}>
                <Logo />
                <Stack direction={'row'} spacing={6}>
                    <Link as={ReactLink} to='/legal/terms-of-service'>Terms of Service</Link>
                    <Link as={ReactLink} to='/legal/privacy-policy'>Privacy Policy</Link>
                </Stack>
            </Container>

            <Box
                borderTopWidth={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <Container
                    as={Stack}
                    maxW={'6xl'}
                    py={4}
                    direction={{ base: 'column', md: 'row' }}
                    spacing={4}
                    justify={{ base: 'center', md: 'space-between' }}
                    align={{ base: 'center', md: 'center' }}>
                    <Text>{moment().format('YYYY')} © Finest Protocol.</Text>
                    <Stack direction={'row'} spacing={6}>
                        <SocialButton label={'Twitter'} href={'https://twitter.com/AnthetaApp'} target="_blank">
                            <FaTwitter />
                        </SocialButton>
                        <SocialButton label={'Instagram'} href={'https://www.instagram.com/anthetacom/'} target="_blank">
                            <FaInstagram />
                        </SocialButton>
                        <SocialButton label={'Github'} href={'https://github.com/Antheta'} target="_blank">
                            <FaGithub />
                        </SocialButton>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}