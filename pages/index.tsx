import Head from "next/head"
import { Center, Stack, Heading, Link, Code, Text } from "@chakra-ui/react"
import useUser from "../zustand/useUser"

export default function Home() {
  const userInfo = useUser((state) => state.userInfo)

  return (
    <div>
      <Head>
        <title>organise | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading size="2xl" textAlign="center">
          Welcome!
        </Heading>
        <Text textAlign="center" fontSize="xl">
          {userInfo.id ? "You are logged in!" : "Login to begin!"}
        </Text>
      </main>
    </div>
  )
}
