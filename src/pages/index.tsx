import MainLayout from "src/core/layouts/MainLayout"
import { BlitzPage } from "@blitzjs/next"
import createPersistedState from "use-persisted-state"
import { useState } from "react"
import ListView from "src/core/components/list"

const Home: BlitzPage = () => {
  return (
    <MainLayout title="Home">
      <ListView />
    </MainLayout>
  )
}

export default Home
