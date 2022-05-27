import { ReactElement } from 'react';
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from '@chakra-ui/react';
import { FcAssistant, FcCommandLine, FcDonate, FcGenealogy, FcInTransit, FcLink } from 'react-icons/fc';

const Feature = ({ title, text, icon }) => {
    return (
        <Stack>
            <Flex
                w={16}
                h={16}
                align={'center'}
                justify={'center'}
                color={'white'}
                rounded={'full'}
                bg={'gray.100'}
                mb={1}>
                {icon}
            </Flex>
            <Text fontWeight={600}>{title}</Text>
            <Text color={'gray.600'}>{text}</Text>
        </Stack>
    );
};

export default function FeaturesBox() {
    return (
        <Box p={4}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                <Feature
                    icon={<Icon as={FcGenealogy} w={10} h={10} />}
                    title={'The Gateway'}
                    text={
                        'Tap into our gateway that offers you multiple different notification channels!'
                    }
                />
                <Feature
                    icon={<Icon as={FcLink} w={10} h={10} />}
                    title={'Webhook'}
                    text={
                        'Add your own webhook address where you want us to send data to.'
                    }
                />
                <Feature
                    icon={<Icon as={FcCommandLine} w={10} h={10} />}
                    title={'Integrations'}
                    text={
                        'Use our API to connect with us and create new alerts via your application.'
                    }
                />
            </SimpleGrid>
        </Box>
    );
}