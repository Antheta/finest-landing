import { CheckIcon } from '@chakra-ui/icons';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Badge,
} from '@chakra-ui/react';
import { useState } from 'react';

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [state, setState] = useState(
        'initial'
    )
    const [error, setError] = useState(false)

    return (
        <Flex
            minH={'93vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <Badge colorScheme={'purple'}>In development</Badge>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack 
                        spacing={4}
                        as={'form'}
                        onSubmit={(e) => {
                            e.preventDefault()
                            setError(false)
                            setState('submitting')
                
                            // remove this code and implement your submit logic right here
                            setTimeout(() => {
                                if (email === 'fail@example.com') {
                                    setError(true)
                                    setState('initial')
                                    return
                                }
                
                                setState('success')
                            }, 1000)
                        }}
                    >
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input 
                                type="email" 
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                {/* <Link color={'blue.400'}>Forgot password?</Link> */}
                            </Stack>
                            <Button
                                colorScheme={state === 'success' ? 'green' : 'blue'}
                                isLoading={state === 'submitting'}
                                w="100%"
                                type={state === 'success' ? 'button' : 'submit'}>
                                {state === 'success' ? <CheckIcon /> : 'Sign in'}
                            </Button>
                            <Text
                                mt={2}
                                textAlign={'center'}
                                color={error ? 'red.500' : 'gray.500'}>
                                {error
                                    ? 'Oh no an error occured! 😢 Please try again later.'
                                    : "Sign in to continue."}
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}

export default SignIn