import { useTwitchStreams } from '~/hooks/useTwitch'
import { Bravo } from '../headings'
import Eye from '../icons/Eye'
import { Col, Row } from '../layout'
import ProfilePicture from './ProfilePicture'
import TopTwitchGames from './TopTwitchGames'

const ReccomendedStreamsOrGames = ({ id }) => {
  const { isLoading, error, data } = useTwitchStreams({ user_id: id })

  if (isLoading) return 'Loading...'

  if (error)
    return <p>{error?.message || 'Something went wrong, please try again.'}</p>

  return data.length ? (
    <ReccomendStreams game_id={data[0]?.game_id} />
  ) : (
    <TopTwitchGames />
  )
}

const ReccomendStreams = ({ game_id }) => {
  const { isLoading, error, data } = useTwitchStreams({ game_id })

  if (isLoading) return 'Loading...'

  if (error)
    return <p>{error?.message || 'Something went wrong, please try again.'}</p>

  return (
    <Row className="mt-8">
      <Col className="w-full">
        <Bravo className="mb-4">Reccomended streams</Bravo>
      </Col>
      {data.map(({ user_name, user_id, game_name, viewer_count }, i) => (
        <Col className="w-1/3 mb-4">
          <div className="flex space-x-4 items-center" key={i}>
            <div className="relative rounded-full overflow-hidden bg-purple-400">
              <ProfilePicture id={user_id} size="large" />
            </div>
            <div className="text-white text-xs">
              <h2 className="text-xl font-bold text-white leading-5 mb-1">
                {user_name}
              </h2>
              {game_name && (
                <p className="font-medium text-white leading-3 mb-1">
                  {game_name}
                </p>
              )}
              <p className="font-medium inline-flex items-center space-x-1 bg-red-500 text-white leading-3 px-2 rounded-full py-1 text-xs">
                <Eye className="text-white fill-current text-opacity-75" />
                <span>{viewer_count}</span>
              </p>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  )
}

export default ReccomendedStreamsOrGames
