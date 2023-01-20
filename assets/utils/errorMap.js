
export function errorsToString(errorBag) {
    const errors = []
    for (const key in errorBag) {
      if (errorBag.hasOwnProperty(key)) {
        errors.push(errorBag[key])
      }
    }
    console.log("-->",errors)
    return errors.join(', ')
  }
  
  export function errorsToStringWithKey(errorBag, limitOne=false) {
    const errors = []
    for (const key in errorBag) {
      if (errorBag.hasOwnProperty(key)) {
        errors.push(`${key} - ${errorBag[key]}`)
      }
    }
    if (limitOne) {
      return errors[0]
    }
    console.log("-->",errors)
    return errors.join(', ')
  }
  