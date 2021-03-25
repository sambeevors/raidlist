import { useTwitchChannel } from '~/hooks/useTwitch'

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

export default ChannelDetails
