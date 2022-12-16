import React from 'react'
import { VStack, HStack, Text, Box, Center, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, useDisclosure, Image, Heading, Button, Select, Flex } from '@chakra-ui/react'
import { MdStarRate } from 'react-icons/md'
import { BsBagPlusFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const SmallCard = ({ id, name, description, brand, size, images: [imageOne, imageTwo], price, strikeOfPrice, ratings: { rating, count } }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const imgRef = React.useRef()

    let stars = new Array(5);
    for (let i = 0; i < 5; i++) {
        if (i < rating - 1) stars[i] = 1;
        else stars[i] = 0;
    }

    const parcentage = () => {
        return Math.abs((100 * (price - strikeOfPrice)) / strikeOfPrice).toFixed(2)
    }

    return (
        <>

            <Flex className='Small-card'>
                <Box bgImage={`url(${imageOne})`}>
                    <Center onClick={onOpen}>Quick View</Center>
                </Box>
                <Link to={`/products/products/${id}`}>
                    <Text>Limited Time sell</Text>
                    <Text>{brand}</Text>
                    <Text>(Up to {parcentage()}% off select items)</Text>
                </Link>
            </Flex>


            <Modal isOpen={isOpen} onClose={onClose} size="2xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex flexDirection={["column", "row"]} alignItems="flex-start" p="50px 20px 20px 20px" gap="10px">
                            <VStack width="50%">
                                <Image src={imageOne} ref={imgRef} />
                                <Center gap="15px">
                                    <Button variant="outline" onClick={() => imgRef.current.src = imageOne}>&lt;</Button>
                                    <Button variant="outline" onClick={() => imgRef.current.src = imageTwo}>&gt;</Button>
                                </Center>
                            </VStack>
                            <VStack width="45%" gap="15px" alignItems="flex-start">
                                <Flex gap="0px">
                                    {stars?.map((e, i) => <MdStarRate key={i} color={e === 0 ? "#c3c3c3" : "black"} />)}<Text>({count})</Text>
                                </Flex>
                                <Heading fontSize="25px">{name}</Heading>
                                <Text fontSize="17px">{brand}</Text>
                                <Text>{description}</Text>
                                <HStack>
                                    <Text color="green.600">Price: ₹{price}</Text>
                                    <Text color="red.600">({parcentage()}% off)</Text>
                                </HStack>
                                <Text as='s'>INR {strikeOfPrice}</Text>
                                <Text color="red.600">{rating === 5 ? "Limited Time sell!" : "Don't Lose this Opportunity!"}</Text>

                                <Select placeholder='Choose Size' size='md' variant='flushed' focusBorderColor="black" disabled={size === 1} >
                                    <option value={size}>{size}</option>
                                    <option value={size + 1}>{size + 1}</option>
                                    <option value={size + 2}>{size + 2}</option>
                                </Select>

                                <Button borderRadius="none" variant="outline" colorScheme="black" display="flex" alignItems="center" gap="8px"> <BsBagPlusFill /> Add To Cart</Button>
                            </VStack>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default SmallCard