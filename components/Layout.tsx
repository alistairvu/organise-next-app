import { Navbar } from "./Navbar"

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>{children}</main>
    </>
  )
}
