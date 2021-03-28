import { useCurrentTwitchUser } from '~/hooks/useTwitch'
import TwitchProfile from './TwitchProfile'
import Modal from 'react-modal'
import { useState } from 'react'
import Close from '../icons/Close'

const YourChannel = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const { isLoading, error, data } = useCurrentTwitchUser()

  if (isLoading) return <p>Loading...</p>

  if (error)
    return <p>{error?.message || 'Something went wrong, please try again.'}</p>

  console.log(data)

  return (
    <>
      <TwitchProfile id={data?.id} />
      <button
        className="mt-4 text-white px-4 py-2 hover:nm-flat-purple-500 group rounded-full transition text-xs uppercase tracking-widest font-bold leading-5 border border-purple-400 focus:outline-white active:border-transparent hover:border-transparent active:nm-inset-purple-500-sm"
        onClick={() => setModalOpen(true)}
      >
        Open Twitch Chat
      </button>
      <Modal
        isOpen={modalOpen}
        contentLabel="Twitch Chat"
        className="w-auto max-w-full focus:outline-none relative"
        overlayClassName="bg-black bg-opacity-70 fixed left-0 top-0 right-0 bottom-0 p-4 flex justify-center items-center z-50"
      >
        <button
          className="absolute right-0 top-0 bg-purple-500 text-white rounded-full shadow-lg w-8 h-8 z-10 transform translate-x-1/2 -translate-y-1/2 flex justify-center items-center focus:outline-white"
          onClick={() => setModalOpen(false)}
        >
          <span className="sr-only">Close modal</span>
          <Close className="fill-current text-lg" />
        </button>
        <div className="relative w-[600px] xl:w-[800px] max-w-full rounded-lg overflow-hidden shadow-lg">
          <div className="aspect-w-3 aspect-h-4 lg:aspect-w-16 lg:aspect-h-9 bg-purple-600">
            <iframe
              src={`https://www.twitch.tv/embed/${data?.display_name}/chat?parent=${process.env.NEXT_PUBLIC_TWITCH_PARENT_URI}`}
              className="w-full h-full"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default YourChannel
