import React from "react";
import type { PropsWithChildren } from "react";
import { Box, Container } from "@chakra-ui/react";

function Layout({ children }: PropsWithChildren<unknown>): JSX.Element {
  return (
    <Container maxWidth={{ base: "xl", md: "lg" }}>
      <Box mx="auto">{children}</Box>
    </Container>
  );
}

export default Layout;
