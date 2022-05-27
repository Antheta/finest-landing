import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    IconButton,
    Button,
    Stack,
    Flex,
} from '@chakra-ui/react';

import { BsThreeDotsVertical, BsEye, BsBell } from 'react-icons/bs';

const CurrencyTableButton = () => {
    return (
        <Flex justifyContent="center">
            <Popover placement="bottom" isLazy>
                <PopoverTrigger>
                    <IconButton
                        aria-label="Options"
                        icon={<BsThreeDotsVertical />}
                        variant="solid"
                        colorScheme={'blue'}
                        w="fit-content"
                        size='xs'
                    />
                </PopoverTrigger>
                <PopoverContent w="fit-content" _focus={{ boxShadow: 'none' }}>
                    <PopoverArrow />
                    <PopoverBody>
                        <Stack>
                            <Button
                                w="194px"
                                variant="ghost"
                                rightIcon={<BsEye />}
                                justifyContent="space-between"
                                fontWeight="normal"
                                fontSize="sm">
                                    Watch
                            </Button>
                            <Button
                                w="194px"
                                variant="ghost"
                                rightIcon={<BsBell />}
                                justifyContent="space-between"
                                fontWeight="normal"
                                colorScheme="green"
                                fontSize="sm">
                                    New Alert
                            </Button>
                        </Stack>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Flex>
    )
}

export default CurrencyTableButton