export const fetchRequest = (url, options) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
      ...options,
    }).then((result) => {
      if (result.status !== 401 && (result.status < 200 || result.status >= 300)) {
        result.json().then(errorData => reject(errorData))
      } else {
        // successful!
        result.json().then((data) => {
          resolve(data)
        })
      }
    }).catch((error) => {
      reject(error)
    })
  })
}
