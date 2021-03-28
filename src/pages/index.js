import { Alfa, Bravo } from '~/components/headings'
import { Col, Row } from '~/components/layout'
import ReccomendedStreamsOrGames from '~/components/ui/ReccomendedStreamsOrGames'
import SearchChannel from '~/components/ui/SearchChannel'
import YourChannel from '~/components/ui/YourChannel'
import YourFollowing from '~/components/ui/YourFollowing'
import content from '~/content/home.yaml'
import { useAuth } from '~/context/authContext'
import { useCurrentTwitchUser } from '~/hooks/useTwitch'
const { heading } = content

const Home = () => {
  const { token } = useAuth()
  const { data: user } = useCurrentTwitchUser()

  if (!token) return <p>Please log in to continue...</p>
  if (!user) return <p>Loading...</p>

  return (
    <Row>
      <Col className="w-full lg:w-8/12 xl:w-9/12 lg:order-last">
        <Alfa className="mb-2 text-center">Search for channel</Alfa>
        <SearchChannel />
        <ReccomendedStreamsOrGames id={user?.id} />
      </Col>
      <Col className="w-full lg:w-4/12 xl:w-3/12">
        <Row className="mt-8 lg:mt-0">
          <Col className="w-full md:w-1/2 lg:w-full mb-8 md:mb-0 lg:mb-8">
            <Bravo className="mb-2">Your Channel</Bravo>
            <YourChannel />
          </Col>
          <Col className="w-full md:w-1/2 lg:w-full">
            <Bravo className="mb-2">Recently Followed</Bravo>
            <YourFollowing id={user?.id} />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Home
