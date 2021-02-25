import Head from "next/head"
import { Heading, Text } from "@chakra-ui/react"
import useUser from "../zustand/useUser"
import React from "react"
import { ToDoList } from "../components"

const Home = () => {
  const userInfo = useUser((state) => state.userInfo)

  return (
    <div>
      <Head>
        <title>organise | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {userInfo.id ? (
          <ToDoList />
        ) : (
          <>
            <Heading size="2xl" textAlign="center">
              Welcome!
            </Heading>
            <Text textAlign="center" fontSize="xl">
              Login to begin!
            </Text>
          </>
        )}
      </main>
    </div>
  )
}

export default React.memo(Home)
