import { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { Navbar } from "../components/Navbar"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <header>
        <Navbar />
      </header>

      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
