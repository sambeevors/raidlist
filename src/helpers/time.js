export const msToTime = (duration, showSeconds = false) => {
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

export const timeAgo = (started_at) => {
  const startDate = new Date(started_at)
  const currentDate = new Date()
  const timeAgo = currentDate - startDate

  return msToTime(timeAgo)
}
