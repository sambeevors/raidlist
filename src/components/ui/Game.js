import { useTwitchGame } from '~/hooks/useTwitch'
import Image from './Image'

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
      <div className="rounded-full overflow-hidden bg-purple-500">
        <Image
          src={box_art_url.replace('{width}', 25).replace('{height}', 25)}
          className="w-[25px] h-[25px]"
          alt=""
          width={25}
          height={25}
          loadWhileIdle
        />
      </div>
      <p className="font-bold leading-4">{name}</p>
    </div>
  ))
}

export default Game
