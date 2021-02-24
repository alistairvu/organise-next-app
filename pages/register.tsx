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
import useUser from "../zustand/useUser"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Formik, Form } from "formik"
import Head from "next/head"
import Link from "next/link"
import React from "react"

const Register = () => {
  const [isFirst, setIsFirst] = useState(true)
  const [
    userInfo,
    registerUser,
    loading,
    error,
    resetError,
  ] = useUser((state) => [
    state.userInfo,
    state.registerUser,
    state.loading,
    state.error,
    state.resetError,
  ])
  const router = useRouter()

  const toast = useToast()

  useEffect(() => {
    resetError()
  }, [])

  useEffect(() => {
    if (userInfo.id) {
      router.replace("/")
    }
  }, [userInfo])

  useEffect(() => {
    if (error) {
      if (isFirst) {
        setIsFirst(false)
      } else {
        toast({
          title: error,
          description: "Please try again",
          status: "error",
          duration: 1000,
          isClosable: true,
        })
      }
    }
  }, [error])

  const submitHandler = ({ name, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please try again",
        status: "error",
        duration: 1000,
        isClosable: true,
      })
      return
    }
    registerUser(name, email, password)
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
        <Heading py={4}>Register</Heading>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(value) => submitHandler(value)}
        >
          {({ values, handleChange }) => (
            <Form>
              <FormControl id="name" my={2}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  name="name"
                  placeholder="Name"
                  value={values.name}
                  onChange={handleChange}
                  required
                />
              </FormControl>

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

              <FormControl id="confirmPassword" my={2}>
                <FormLabel htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <Input
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                  value={values.confirmPassword}
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
                Register
              </Button>

              <Text>
                Already has an account?{" "}
                <Text as="span" color="green" cursor="pointer">
                  <Link href="/login">Click here to log in.</Link>{" "}
                </Text>
              </Text>
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  )
}

export default React.memo(Register)
