import { AppProps, ErrorBoundary, ErrorComponent, ErrorFallbackProps } from "@blitzjs/next"
import React from "react"
import { withBlitz } from "src/blitz-client"
import { createTheme, NextUIProvider } from "@nextui-org/react"

const theme = createTheme({
  type: "dark", // it could be "light" or "dark"
})

function RootErrorFallback({ error }: ErrorFallbackProps) {
  return (
    <ErrorComponent
      statusCode={(error as any)?.statusCode || 400}
      title={error.message || error.name}
    />
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <NextUIProvider theme={theme}>
      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        {getLayout(<Component {...pageProps} />)}
      </ErrorBoundary>
    </NextUIProvider>
  )
}

export default withBlitz(MyApp)
