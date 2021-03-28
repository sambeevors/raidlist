import Link from 'next/link'
import { useState } from 'react'
import { useTwitchFollowers } from '~/hooks/useTwitch'
import TwitchProfile from './TwitchProfile'

const YourFollowing = ({ id }) => {
  const { isLoading, error, data } = useTwitchFollowers(id)
  const [liveOnly, setLiveOnly] = useState(true)

  if (isLoading) return <p>Loading...</p>

  if (error)
    return <p>{error?.message || 'Something went wrong, please try again.'}</p>

  return (
    <div>
      <div className="inline-flex space-x-2 items-baseline -mt-1 mb-4 bg-purple-600 px-2 py-1 rounded-full">
        <input
          type="checkbox"
          onChange={() => setLiveOnly(!liveOnly)}
          checked={liveOnly}
          name="only-live"
          id="only-live"
        />
        <label
          htmlFor="only-live"
          className="text-xs font-bold tracking-wide uppercase leading-3 pr-1"
        >
          Only show live?
        </label>
      </div>
      <ul className="flex flex-col space-y-2 mb-4">
        {data.map(({ to_id }, i) => (
          <TwitchProfile id={to_id} key={i} as={'li'} liveOnly={liveOnly} />
        ))}
      </ul>
      <Link href="/">
        <a className="text-white px-4 py-2 hover:nm-flat-purple-500 group rounded-full transition text-xs uppercase tracking-widest font-bold leading-5 border border-purple-400 focus:outline-white active:border-transparent hover:border-transparent active:nm-inset-purple-500-sm">
          Show all
        </a>
      </Link>
    </div>
  )
}

export default YourFollowing
