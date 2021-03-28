import { useTopTwitchGames } from '~/hooks/useTwitch'
import { Bravo, Charlie } from '../headings'
import { Col, Row } from '../layout'
import Image from './Image'

const TopTwitchGames = () => {
  const { isLoading, error, data } = useTopTwitchGames()

  if (isLoading) return <p>Loading...</p>

  if (error)
    return <p>{error?.message || 'Something went wrong, please try again.'}</p>

  return (
    <Row className="justify-between mt-8">
      <Col className="w-full">
        <Bravo className="mb-4">Popular Categories</Bravo>
      </Col>
      {data.map(({ box_art_url, name }, i) => (
        <Col className="mb-2 lg:mb-4 xl:mb-8 w-1/2 md:w-1/3 xl:w-1/4" key={i}>
          <div className="flex flex-col justify-between items-center min-w-[170px] h-full p-4 xl:pt-6 xl:pb-7 border border-purple-400 rounded-xl">
            <Charlie className="text-sm text-center mb-2 xl:mb-4 leading-4 tracking-wide">
              {name}
            </Charlie>
            <div className="w-[138px] h-[190px] bg-purple-400">
              <Image
                src={box_art_url
                  .replace('{width}', 138)
                  .replace('{height}', 190)}
                alt={name}
                width={138}
                height={190}
                loadWhileIdle
              />
            </div>
          </div>
        </Col>
      ))}
    </Row>
  )
}

export default TopTwitchGames
