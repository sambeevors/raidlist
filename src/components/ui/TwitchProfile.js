import { useTwitchStreams, useTwitchUser } from '~/hooks/useTwitch'
import Eye from '../icons/Eye'
import Image from './Image'

const ImagePlaceholder = () => (
  <div className="relative rounded-full overflow-hidden bg-purple-400 w-[50px] h-[50px]" />
)

const Placeholder = ({ as: Node = 'div' }) => (
  <Node className="flex space-x-4 items-center" aria-hidden>
    <ImagePlaceholder />
    <div className="opacity-20">
      <div className="w-[100px] h-5 bg-purple-100 mb-1" />
      <div className="w-[150px] h-4 bg-purple-100" />
    </div>
  </Node>
)

const TwitchProfile = ({ id, liveOnly = false, as: Node = 'div' }) => {
  const { isLoading, error, data } = useTwitchStreams({ user_id: id })

  if (isLoading) return <Placeholder as={Node} />

  if (error)
    return <p>{error?.message || 'Something went wrong, please try again.'}</p>

  return data.length ? (
    data.map(({ user_name, thumbnail_url, game_name, viewer_count }, i) => (
      <Node className="flex space-x-4 items-center" key={i}>
        <div className="relative rounded-full overflow-hidden bg-purple-400">
          <ProfilePicture id={id} />
        </div>
        <div className="text-white text-xs">
          <h2 className="text-xl font-bold text-white leading-5 mb-1">
            {user_name}
          </h2>
          {game_name && (
            <p className="font-medium text-white leading-3 mb-1">{game_name}</p>
          )}
          <p className="font-medium inline-flex items-center space-x-1 bg-red-500 text-white leading-3 px-2 rounded-full py-1 text-xs">
            <Eye className="text-white fill-current text-opacity-75" />
            <span>{viewer_count}</span>
          </p>
        </div>
      </Node>
    ))
  ) : !liveOnly ? (
    <OfflineProfile id={id} as={Node} />
  ) : (
    <></>
  )
}

const OfflineProfile = ({ id, as: Node = 'div' }) => {
  const { isLoading, error, data } = useTwitchUser(id)

  if (isLoading) return <Placeholder as={Node} />

  if (error)
    return <p>{error?.message || 'Something went wrong, please try again.'}</p>

  return data.map(({ display_name, profile_image_url }, i) => (
    <Node className="flex space-x-4 items-center opacity-50" key={i}>
      <div className="relative rounded-full overflow-hidden bg-purple-400">
        <Image
          src={profile_image_url}
          className="w-[50px]"
          alt=""
          width={50}
          height={50}
          loadWhileIdle
        />
      </div>
      <div className="text-white text-xs">
        <h2 className="text-xl font-bold text-white leading-5 mb-1">
          {display_name}
        </h2>
        <p className="font-medium flex items-center space-x-1">Offline</p>
      </div>
    </Node>
  ))
}

const ProfilePicture = ({ id }) => {
  const { isLoading, error, data } = useTwitchUser(id)

  if (isLoading || error) return <ImagePlaceholder />

  return data.map(({ profile_image_url }, i) => (
    <Image
      src={profile_image_url}
      className="w-[50px]"
      alt=""
      width={50}
      height={50}
      loadWhileIdle
      key={i}
    />
  ))
}

export default TwitchProfile
