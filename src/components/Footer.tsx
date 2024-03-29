import { Box, Flex, Heading } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box py={4}>
      <Flex
        maxW="container.lg"
        mx="auto"
        align="center"
        justify="space-between"
      >
        <Heading as="h1" size="lg">
          Footer
        </Heading>
        {/* Add your navigation links or other content here */}
      </Flex>
    </Box>
  );
};
