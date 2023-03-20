import { CommonReactType } from "../CommonReactType"
import Head from "next/head"
import { Container, Spacer } from "@nextui-org/react"
import { BlitzLayout } from "@blitzjs/next"

const MainLayout: BlitzLayout<CommonReactType> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || "Interview Task"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container xl>
        <Spacer y={1} />
        <Container>
          <Spacer y={1} />
          {children}
        </Container>
      </Container>
    </>
  )
}
export default MainLayout
