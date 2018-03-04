import { fetchRequest } from '../fetchUtil'

export const GENERATE_PASSWORD = 'GENERATE_PASSWORD'

export const generatePassword = () => ({
  types: GENERATE_PASSWORD,
  meta: {
    fetch: fetchRequest.bind(null, '/api/passwords'),
  },
})
