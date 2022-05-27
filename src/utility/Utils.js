import moment from "moment"

export const numFormatter = (num) => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + 'K' // convert to K for number from > 1000 < 1 million 
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(2) + 'M' // convert to M for number from > 1 million 
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + 'B' // convert to M for number from > 1 million 
  } else if (num < 900) {
    return num // if value < 1000, nothing to do
  }
}

export const formatDateTime = datetime => {
  return moment(datetime).format('MMM D YYYY, HH:mm')
}

export const errorsList = (resErrors) => {
  if (resErrors !== null) {
    if (isJson(resErrors)) {
      return (
        <ul className="mb-0">
          {Object.entries(resErrors).map(([item, value], i) => {
            if (value.length > 1) {
              return value.map((val, i) => {
                return <li key={value + i}>{val}</li>
              })
            } else {
              if (item !== null && item !== '') {
                return <li key={value + i}>{value[0]}</li>
              }
            }
          })}
        </ul>
      )
    } else {
      return (
        <ul className="mb-0">
          {resErrors}
        </ul>
      )
    }
  }
}

/**
** Check if is object
* @param {*} item 
* @returns {boolean}
*/
export const isJson = (item) => {
  item = typeof item !== "string" ? JSON.stringify(item) : item

  try {
    item = JSON.parse(item)
  } catch (e) {
    return false
  }

  if (typeof item === "object" && item !== null) {
    return true
  }

  return false
}