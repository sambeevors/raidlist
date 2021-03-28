import { useTwitchUser } from '~/hooks/useTwitch'
import Image from './Image'

const sizeClassName = {
  thumbnail: 'w-[50px] h-[50px]',
  large: 'w-[100px] h-[100px]'
}

const ImagePlaceholder = ({ size }) => (
  <div
    className={`relative rounded-full overflow-hidden bg-purple-400 ${sizeClassName[size]}`}
  />
)

const ProfilePicture = ({ id, size = 'thumbnail' }) => {
  const { isLoading, error, data } = useTwitchUser(id)

  if (isLoading || error) return <ImagePlaceholder size={size} />

  return data.map(({ profile_image_url }, i) => (
    <Image
      src={profile_image_url}
      className={sizeClassName[size]}
      alt=""
      width={50}
      height={50}
      loadWhileIdle
      key={i}
    />
  ))
}

export default ProfilePicture
