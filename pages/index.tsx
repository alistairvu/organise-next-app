import Head from "next/head"
import { Center, Stack, Heading, Link, Code, Text } from "@chakra-ui/react"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Center h="100vh" w="100vw">
          <Stack>
            <Heading size="4xl" as="h1" textAlign="center">
              Welcome to{" "}
              <Link href="https://nextjs.org" isExternal color="blue">
                Next.js!
              </Link>
            </Heading>

            <Text textAlign="center" style={{ fontSize: 30 }}>
              Get started by editing{" "}
              <Code colorScheme="red" style={{ fontSize: 30 }}>
                pages/index.tsx
              </Code>
            </Text>
          </Stack>
        </Center>
      </main>
    </div>
  )
}
