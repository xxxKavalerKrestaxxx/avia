export function formatTime(dateTimeString) {
  const date = new Date(dateTimeString)
  const hours = date.getUTCHours()
  const minutes = date.getUTCMinutes()
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  return formattedTime
}
export function getDate(dateTimeString, duration) {
  const date = new Date(dateTimeString)
  const hours = date.getUTCHours() + Math.floor(duration / 60)
  const minutes = date.getUTCMinutes() + (duration % 60)

  let adjustedHours = hours
  let adjustedMinutes = minutes

  if (adjustedMinutes >= 60) {
    adjustedHours += 1
    adjustedMinutes -= 60
  }

  if (adjustedHours >= 24) {
    adjustedHours -= 24
  }

  const formattedTime = `${adjustedHours.toString().padStart(2, '0')}:${adjustedMinutes.toString().padStart(2, '0')}`
  return formattedTime
}
