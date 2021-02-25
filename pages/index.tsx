import Head from "next/head"
import { Heading, Text } from "@chakra-ui/react"
import React from "react"
import { ToDoList } from "../components"
import { rootState } from "../redux"
import { useSelector } from "react-redux"

const Home = () => {
  const userInfo = useSelector((state: rootState) => state.user.userInfo)

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
