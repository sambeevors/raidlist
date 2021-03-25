import 'flickity/dist/flickity.min.css'
import Flickity from 'flickity'
import { useTopTwitchGames } from '~/hooks/useTwitch'

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

export default TopTwitchGames
