import { useState } from 'react'
import Cancel from '~/components/icons/Cancel'
import { timeAgo } from '~/helpers/time'
import { useTwitchSearchChannel } from '~/hooks/useTwitch'
import Game from './Game'
import Image from './Image'

const ChannelPlaceholder = () => (
  <li className="flex space-x-4 items-center">
    <div className="relative flex-shrink-0">
      <div className="w-[75px] md:w-[100px] h-[75px] md:h-[100px] rounded-full bg-purple-400" />
    </div>
    <div className="text-white text-xs">
      <div className="w-[150px] h-5 bg-purple-400 mb-1" />
      <div className="w-[200px] h-4 bg-purple-400" />
    </div>
  </li>
)

const ResultsPlaceholder = () => {
  return (
    <ul className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
      <ChannelPlaceholder />
      <ChannelPlaceholder />
      <ChannelPlaceholder />
      <ChannelPlaceholder />
      <ChannelPlaceholder />
      <ChannelPlaceholder />
    </ul>
  )
}

const SearchChannel = () => {
  const [channelQuery, setChannelQuery] = useState('')

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          name="broadcaster_id"
          onChange={(e) => setChannelQuery(e.target.value)}
          value={channelQuery}
          className="p-6 px-12 rounded-full nm-inset-purple-500-lg text-white w-full border-2 border-transparent focus:border-white transition focus:outline-none block text-lg text-center"
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
  )
}

const ChannelSearchResults = ({ query }) => {
  const { isLoading, error, data } = useTwitchSearchChannel(query)

  if (isLoading) return <ResultsPlaceholder />

  if (error)
    return <p>{error?.message || 'Something went wrong, please try again.'}</p>

  return (
    <ul className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
      {data.map(
        ({ display_name, is_live, thumbnail_url, started_at, game_id }) => (
          <li className="flex space-x-4 items-center">
            <div className="relative flex-shrink-0">
              <div className="rounded-full overflow-hidden bg-purple-400">
                <Image
                  src={thumbnail_url}
                  className="w-[75px] md:w-[100px]"
                  alt=""
                  width={100}
                  height={100}
                  loadWhileIdle
                />
              </div>
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

export default SearchChannel
