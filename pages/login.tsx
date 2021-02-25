import {
  Box,
  Heading,
  Center,
  FormLabel,
  Input,
  FormControl,
  Button,
  useToast,
  Text,
} from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { rootState } from "../redux"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { Formik, Form } from "formik"
import Head from "next/head"
import Link from "next/link"
import React from "react"
import { loginUser } from "../redux/actions/userActions"

const Login = () => {
  const { userInfo, loading, error } = useSelector(
    (state: rootState) => state.user
  )
  const dispatch = useDispatch()
  const router = useRouter()

  const toast = useToast()

  useEffect(() => {
    if (userInfo.id) {
      router.replace("/")
    }
  }, [userInfo])

  useEffect(() => {
    if (error) {
      toast({
        title: error,
        description: "Please try again",
        status: "error",
        duration: 1000,
        isClosable: true,
      })
    }
  }, [error])

  const submitHandler = (data: { email: string; password: string }) => {
    dispatch(loginUser(data))
  }

  return (
    <Center>
      <Head>
        <title>organise | Login</title>
      </Head>

      <Box
        w={{ base: "90vw", md: "60vw" }}
        borderWidth="1px"
        borderRadius="lg"
        p={4}
      >
        <Heading py={4}>Log In</Heading>

        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(value) => submitHandler(value)}
        >
          {({ values, handleChange }) => (
            <Form>
              <FormControl id="email" my={2}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  required
                />
              </FormControl>

              <FormControl id="password" my={2}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <Button
                colorScheme="green"
                isLoading={loading}
                type="submit"
                my={4}
              >
                Log In
              </Button>

              <Text>
                New here?{" "}
                <Text as="span" color="green" cursor="pointer">
                  <Link href="/register">Click here to register.</Link>{" "}
                </Text>
              </Text>
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  )
}

export default React.memo(Login)
