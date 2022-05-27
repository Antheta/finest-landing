import { useState } from "react"
import { Alert, Box, Button, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react"
import Metamask from "./wallets/metamask"

import { useEthers, useEtherBalance } from "@usedapp/core"
import { CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons"

const ModalOverlayBlur = () => (
    <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'
    />
)

const WalletModal = ({isOpen, handleModal}) => {
    const {activateBrowserWallet, account } = useEthers();
    const etherBalance = useEtherBalance(account);

    const [loading, setLoading] = useState(false)
    const [selectedWallet, setSelectedWallet] = useState("")

    function handleConnectWallet() {
        activateBrowserWallet();
    }

    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={handleModal}>
                <ModalOverlayBlur />
                <ModalContent>
                    <ModalHeader>{account ? 'Account' : 'Connect a wallet'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody mb={0} mt={2}>
                        {account ? (
                            <Box border={'1px solid'} borderColor="gray" p={3} borderRadius={5}>
                                <Text fontSize="sm">
                                    Connected to {account}
                                </Text>
                                <Link href="" target="_blank" fontSize={12} mr={3}>
                                    Copy Address
                                    <CopyIcon ml={1} mb={1} />
                                </Link>
                                <Link href={`https://etherscan.io/address/${account}`} target="_blank" fontSize={12}>
                                    View on Explorer
                                    <ExternalLinkIcon ml={1} mb={1} />
                                </Link>
                            </Box>
                        ) : (
                            <Button 
                                style={selectedWallet === "METAMASK" && loading ? null : { justifyContent: 'space-between' }} 
                                w={'full'} 
                                textAlign='left' 
                                variant="outline" 
                                colorScheme={'orange'} 
                                rightIcon={<Metamask size={20} />}
                                isLoading={selectedWallet === "METAMASK" && loading ? true : false}
                                onClick={() => {
                                    setSelectedWallet("METAMASK")
                                    handleConnectWallet()
                                    setLoading(true)
                                }}
                            >
                                <Text textAlign={'left'}>
                                    Metamask
                                </Text>
                            </Button>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        {!account ? (
                            <Alert colorScheme={'gray'} fontSize={12} mt={3} borderRadius={5}>
                                By connecting a wallet, you agree to Finest Terms of Service and acknowledge that you have read and understand the Finest Protocol Disclaimer.
                            </Alert>
                        ) : null}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default WalletModal