import { Box, Text, Stack, Flex, Spacer, Button } from "@chakra-ui/react"
import { useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"
import Link from "next/link"
import { useSelector, useDispatch } from "react-redux"
import { rootState } from "../redux"
import { logoutUser } from "../redux/slices/userSlice"

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const userInfo = useSelector((state: rootState) => state.user.userInfo)
  const dispatch = useDispatch()

  return (
    <Flex
      as="nav"
      align="center"
      width="100vw"
      py={4}
      wrap="wrap"
      px={8}
      bg="green.500"
      color="white"
      mb={8}
    >
      <Text fontSize="xl" fontWeight="bold">
        <Link href="/">organise</Link>
      </Text>
      <Spacer />

      <Box
        onClick={() => setIsOpen((prev) => !prev)}
        display={["block", "block", "none", "none"]}
        background="transparent"
      >
        {isOpen ? <FiX size={30} /> : <FiMenu size={30} />}
      </Box>

      <NavLinkContainer isOpen={isOpen}>
        {userInfo.id ? (
          <>
            <Text>Hello {userInfo.name.split(" ")[0]}!</Text>
            <Link href="/">Home</Link>
            <Button
              colorScheme="green"
              onClick={() => dispatch(logoutUser())}
              cursor="pointer"
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/register">Register</Link>
            <Link href="/login">
              <Button colorScheme="green" variant="solid">
                Log In
              </Button>
            </Link>
          </>
        )}
      </NavLinkContainer>
    </Flex>
  )
}

interface NavLinkContainerProps {
  children: React.ReactNode
  isOpen: boolean
}

const NavLinkContainer = ({ children, isOpen }: NavLinkContainerProps) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={{ base: "center", md: "flex-end" }}
        direction={{ base: "column", md: "row" }}
        pt={{ base: 4, md: 0 }}
      >
        {children}
      </Stack>
    </Box>
  )
}
