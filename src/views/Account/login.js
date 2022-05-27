import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

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
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

// ** JWT
// import useJwt from '../../auth/jwt/useJwt'
import useJwt from '../../@core/auth/jwt/useJwt'
import { handleLogin } from '../../redux/authentication';
import { errorsList } from '../../utility/Utils';

const defaultValues = {
    email: '',
    password: ''
}

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [resErrors, setResErrors] = useState(false)
    const [state, setState] = useState('initial')

    const {
        control,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues })

    /* submit */
    const onSubmit = data => {
        setState('submitting')
        console.log("submit")
        console.log(data)
        if (Object.values(data).every(field => field.length > 0)) {
            useJwt
                .login({ email: data.loginEmail, password: data.password })
                .then(res => {
                    setState('success')
                    const data = { ...res.data.user, accessToken: res.data.access_token.replace(/['"]+/g, ''), refreshToken: res.data.refresh_token.replace(/['"]+/g, '') }
                    dispatch(handleLogin(data))
                    navigate('/account')
                })
                .catch(err => {
                    if (err.response && err.response.data && err.response.data.errors) {
                        setResErrors([err.response.data.errors])
                    } else {
                        setResErrors(err.response.data.message)
                    }
                    setState('error')
                })
        } else {
            setState('error')
            for (const key in data) {
                if (data[key].length === 0) {
                    setError(key, {
                        type: 'manual'
                    })
                }
            }
        }
    }

    return (
        <Flex
            minH={'93vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    {resErrors &&
                        <Alert status='error' mb={3}>
                            <AlertIcon />
                            <AlertTitle>Failed to login:</AlertTitle>
                            <AlertDescription>
                                {errorsList(resErrors)}
                            </AlertDescription>
                        </Alert>
                    }
                    <Stack
                        spacing={4}
                        as={'form'}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Controller
                                id='email'
                                name='email'
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        autoFocus
                                        type="email"
                                        isInvalid={errors.email && true}
                                    />
                                )}
                            />
                            {errors.email && <Text color="red" fontSize={13}>Please fill out the email field.</Text>}
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Controller
                                id='password'
                                name='password'
                                control={control}
                                render={({ field }) => (
                                    <Input 
                                        {...field}
                                        type="password" 
                                        isInvalid={errors.password && true}
                                    />
                                )}
                            />
                            {errors.password && <Text color="red" fontSize={13}>Please fill out the password field.</Text>}
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
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}

export default Login