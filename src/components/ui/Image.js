import 'intersection-observer'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { rIC, cIC } from 'idlize/idle-callback-polyfills.mjs'
import NoScript from '~/components/NoScript'

const Image = ({
  src,
  alt = '',
  width,
  height,
  style = {},
  loadWhileIdle = false,
  ...props
}) => {
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true
  })
  const [loadIdly, setLoadIdly] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (loadWhileIdle) {
      const handle = rIC(() => {
        setLoadIdly(true)
      })

      return () => {
        cIC(handle)
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        paddingTop: `${(height / width) * 100}%`,
        ...style
      }}
      {...props}
    >
      <motion.img
        src={inView || loadIdly ? src : undefined}
        alt={alt}
        className="absolute top-0 left-0 w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        onLoad={() => setIsLoaded(true)}
      />
      <NoScript>
        <img
          src={src}
          alt={alt}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </NoScript>
    </div>
  )
}

export default Image
