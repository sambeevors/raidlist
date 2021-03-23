import 'flickity/dist/flickity.min.css'
import { useEffect } from 'react'
import { useContext, useState } from 'react'
import Flickity from 'react-flickity-component'
import Cancel from '~/components/icons/Cancel'
import Eye from '~/components/icons/Eye'
import content from '~/content/home.yaml'
import { AuthContext } from '~/context/authContext'
import {
  useTopTwitchGames,
  useTwitchChannel,
  useTwitchSearchChannel,
  useTwitchFollowers,
  useTwitchUser,
  useTwitchGame
} from '~/hooks/useTwitch'
const { heading } = content

const msToTime = (duration, showSeconds = false) => {
  let milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  let arr = []
  if (hours) arr.push(`${hours} hours`)
  if (minutes) arr.push(`${minutes} minutes`)
  if (seconds && showSeconds) arr.push(`${seconds} seconds`)
  const str = arr.join(', ')
  return str
}

const timeAgo = (started_at) => {
  const startDate = new Date(started_at)
  const currentDate = new Date()
  const timeAgo = currentDate - startDate

  return msToTime(timeAgo)
}

const ChannelDetails = ({ broadcaster_id }) => {
  const { isLoading, error, data } = useTwitchChannel(broadcaster_id)

  if (isLoading) return <p>Loading...</p>

  if (error)
    return <p>{error?.message || 'Something went wrong, please try again.'}</p>

  return (
    <ul className="flex flex-col space-y-4 w-full max-w-sm mx-auto">
      {data.map(({ broadcaster_name, title, game_name }) => (
        <li className="block rounded-lg nm-flat-gray-100 p-6 w-full">
          <h2 className="text-xl font-bold text-gray-900 leading-5">
            {broadcaster_name}
          </h2>
          {title && <p className="text-gray-900 leading-5">{title}</p>}
          {game_name && (
            <p className="text-sm italic text-gray-700 leading-5 mt-2">
              Playing: {game_name}
            </p>
          )}
        </li>
      ))}
    </ul>
  )
}

const TopTwitchGames = () => {
  const { isLoading, error, data } = useTopTwitchGames()

  if (isLoading) return <p>Loading...</p>

  if (error)
    return <p>{error?.message || 'Something went wrong, please try again.'}</p>

  return (
    <Flickity
      className="w-full flickity-enabled is-draggable mb-8"
      options={{
        wrapAround: true,
        cellAlign: 'left',
        prevNextButtons: false,
        pageDots: false,
        autoPlay: true
      }}
    >
      {data.map(({ box_art_url, id, name }, i) => (
        <div className="block rounded-lg w-[138px] px-1" key={i}>
          <img
            src={box_art_url.replace('{width}', 138).replace('{height}', 190)}
            className="w-[138px] h-[190px] object-cover object-center"
            alt={name}
          />
          <h3 className="text-xs text-center font-bold text-gray-600 mt-2 leading-3">
            {name}
          </h3>
        </div>
      ))}
    </Flickity>
  )
}

const ChannelSearchResults = ({ query }) => {
  const { isLoading, error, data } = useTwitchSearchChannel(query)

  if (isLoading) return <p>Loading...</p>

  if (error)
    return <p>{error?.message || 'Something went wrong, please try again.'}</p>

  return (
    <ul className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
      {data.map(
        ({ display_name, is_live, thumbnail_url, started_at, game_id }) => (
          <li className="flex space-x-4 items-center">
            <div className="relative flex-shrink-0">
              <img
                src={thumbnail_url}
                alt=""
                className="w-[75px] md:w-[100px] rounded-full"
              />
              {is_live && (
                <div className="py-1 px-2 text-xs rounded-full bg-red-500 text-white font-bold tracking-wide uppercase absolute left-[50%] bottom-0 transform -translate-x-1/2 translate-y-1/2 shadow">
                  Live
                </div>
              )}
            </div>
            <div className="text-white text-xs">
              <h2 className="text-xl font-bold text-white leading-5 mb-1 break-all">
                {display_name}
              </h2>
              <p className="font-medium">
                {is_live ? `Went live ${timeAgo(started_at)} ago` : 'Offline'}
              </p>
              <Game id={game_id} />
            </div>
          </li>
        )
      )}
    </ul>
  )
}

const Game = ({ id }) => {
  const { isLoading, error, data } = useTwitchGame(id)

  if (isLoading) return <p>Loading...</p>

  if (error)
    return <p>{error?.message || 'Something went wrong, please try again.'}</p>

  return data.map(({ box_art_url, id, name }, i) => (
    <div
      className="inline-flex items-center space-x-2 mt-4 rounded-full bg-purple-600 p-1 pr-3"
      key={i}
    >
      <img
        src={box_art_url.replace('{width}', 25).replace('{height}', 25)}
        className="w-[25px] h-[25px] object-cover object-center rounded-full"
        alt={name}
      />
      <p className="font-bold leading-4">{name}</p>
    </div>
  ))
}

const YourFollowing = ({ id }) => {
  const { isLoading, error, data } = useTwitchFollowers(id)
  const [lowerLimit, upperLimit] = [4, 10]
  const [limit, setLimit] = useState(lowerLimit)

  if (isLoading) return <p>Loading...</p>

  if (error)
    return <p>{error?.message || 'Something went wrong, please try again.'}</p>

  return (
    <div>
      <ul className="flex flex-col space-y-2 mb-4">
        {data.map(
          ({ to_id }, i) =>
            i < limit && (
              <li>
                <TwitchProfile id={to_id} />
              </li>
            )
        )}
      </ul>
      <button
        className="text-white px-4 py-2 nm-convex-purple-500 rounded-full transition text-xs uppercase tracking-widest font-bold leading-5"
        onClick={() => setLimit(limit === lowerLimit ? upperLimit : lowerLimit)}
      >
        Show {limit === lowerLimit ? 'more' : 'less'}
      </button>
    </div>
  )
}

const TwitchProfile = ({ id }) => {
  const { isLoading, error, data } = useTwitchUser(id)

  if (isLoading) return <p>Loading...</p>

  if (error)
    return <p>{error?.message || 'Something went wrong, please try again.'}</p>

  return data.map(({ display_name, profile_image_url, view_count }) => (
    <div className="flex space-x-4 items-center">
      <div className="relative">
        <img src={profile_image_url} alt="" className="w-[50px] rounded-full" />
      </div>
      <div className="text-white text-xs">
        <h2 className="text-xl font-bold text-white leading-5 mb-1">
          {display_name}
        </h2>
        <p className="font-medium flex items-center space-x-1">
          <Eye className="text-white fill-current text-opacity-75" />
          <span>{view_count}</span>
        </p>
      </div>
    </div>
  ))
}

const Home = () => {
  const access_token = useContext(AuthContext)
  const [channelQuery, setChannelQuery] = useState('')
  const [user, setUser] = useState()
  const { data } = useTwitchUser()

  useEffect(() => {
    if (data) setUser(data[0])
  }, [data])

  if (!access_token) return <p>Please log in to continue...</p>
  if (!user) return <p>Loading...</p>

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full">
        <h2 className="text-white text-center font-bold uppercase tracking-widest mb-2">
          Search for channel
        </h2>
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              name="broadcaster_id"
              onChange={(e) => setChannelQuery(e.target.value)}
              value={channelQuery}
              className="p-6 px-12 rounded-full nm-inset-purple-500 text-white w-full border-2 border-transparent focus:border-white transition focus:outline-none block text-lg text-center"
            />
            <div className="right-0 top-[50%] transform -translate-y-1/2 absolute px-8">
              <button
                className={`focus:outline-none block transition ${
                  channelQuery ? 'opacity-100' : 'opacity-0'
                } hover:opacity-75`}
                onClick={() => setChannelQuery('')}
              >
                <Cancel className="fill-current text-white text-xl" />
              </button>
            </div>
          </div>
          {channelQuery && (
            <div className="absolute z-10 left-0 right-0 bottom-[-16px] max-h-[400px] transform translate-y-full overflow-auto p-8 bg-purple-500 shadow-xl border border-purple-400 rounded-xl">
              <ChannelSearchResults query={channelQuery} />
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <h2 className="font-bold text-white mb-2 tracking-widest uppercase">
              Following
            </h2>
            <YourFollowing id={user?.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
