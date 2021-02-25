import { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { Navbar } from "../components/Navbar"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "../redux"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider>
          <header>
            <Navbar />
          </header>

          <Component {...pageProps} />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
