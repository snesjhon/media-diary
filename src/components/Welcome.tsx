import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { setCookie } from "nookies";
import React, { useState } from "react";
import fuego from "../fuego/fuego";
import LogoIcon from "./icons/LogoIcon";
import Layout from "./layouts/Layout";

function Welcome(): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Box as="header" bg="white" width="full">
        <Container maxWidth={{ base: "xl", md: "lg" }}>
          <Flex w="100%" h="100%" py={2} align="center" justify="space-between">
            <Flex align="center">
              <LogoIcon boxSize={5} mr={1} />
              <Link href="/" passHref>
                <Text fontSize="md" color="purple.700" fontWeight="medium">
                  mediaDiary
                </Text>
              </Link>
            </Flex>

            <Flex maxW="720px" align="center">
              <Button
                size="sm"
                colorScheme="purple"
                variant="outline"
                onClick={() => setShowModal(true)}
              >
                Sign In
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Box>
      <Layout>
        <Box mt={10}>
          <Grid gridTemplateColumns="1fr 0.6fr" gridGap="7rem">
            <Flex flexDir="column" justifyContent="center">
              <Heading>Keep track of your favorite Media</Heading>
              <Text fontSize="xl" my={3}>
                MediaDiary is a media logging platform that helps you keep track
                of when you watched or listened to your favorite media.
              </Text>
              <Box>
                <Button
                  colorScheme="purple"
                  mt="24px"
                  onClick={() => setShowModal(true)}
                >
                  Sign Up
                </Button>
              </Box>
            </Flex>
            <Box>
              <Image src="https://via.placeholder.com/400x500" />
            </Box>
          </Grid>
        </Box>
      </Layout>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay>
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader textAlign="center">
              <LogoIcon boxSize={5} />
            </ModalHeader>
            <ModalBody>
              <Heading size="md" mb={4}>
                Signin
              </Heading>
              <VStack align="stretch" spacing={4}>
                <Button onClick={login}>Sign In with Google</Button>
                <Button>Sign In with Twitter</Button>
              </VStack>
              <br />
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );

  function login() {
    const provider = new fuego.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    fuego
      .auth()
      .setPersistence(fuego.auth.Auth.Persistence.LOCAL)
      .then(() => {
        setCookie(null, "fuegoPending", "true", {});
        fuego.auth().signInWithRedirect(provider);
      });
  }
}
export default Welcome;
