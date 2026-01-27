import isDocker from '../utils/is-docker.js'
import logger from '../utils/logger.js'

const API_URL = process.env.API_URL || 'http://localhost:5000/'

if (!API_URL.endsWith('/')) {
  throw new Error('API_URL environment variable must end with a /')
}

const buildUrl = (path, qs = {}) => {
  if (path.startsWith('/')) {
    path = path.substring(1)
  }

  const baseUrl = path.startsWith('http') ? path : API_URL + path
  const url = new URL(baseUrl)

  Object.entries(qs).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value)
    }
  })

  return url.toString()
}

const fetchJson = async ({ method = 'GET', uri }) => {
  const response = await fetch(uri, { method })

  if (!response.ok) {
    const error = new Error(`HTTP ${response.status}`)
    error.statusCode = response.status
    throw error
  }

  // Some DELETE endpoints may return no body
  if (response.status === 204) {
    return null
  }

  return response.json()
}

const readUsersFromEnvironment = async (userCallback, userType = 'USER') => {
  logger.debug('Loading users from environment')

  let i = 0
  let found = true

  while (found && ++i) {
    const username = process.env[`RCR_${userType}${i}_USERNAME`]
    const password = process.env[`RCR_${userType}${i}_PASSWORD`]
    found = Boolean(username && password)

    if (found) {
      const user = {
        username: username.trim(),
        password: password.trim(),
        contactId: null
      }

      await userCallback(user)
    }
  }
}

const resolveDockerHostLink = link => {
  const dockerHostPattern = /^http:\/\/host\.docker\.internal:\d+\/?/

  if (link.includes('host.docker.internal') && !isDocker()) {
    return link.replace(dockerHostPattern, API_URL)
  }

  return link
}

const api = {
  users: [],
  admins: [],

  async initialise () {
    await readUsersFromEnvironment(async user => {
      user.contactId = await api.getContactId(user)
      api.users.push(user)
    }, 'USER')

    await readUsersFromEnvironment(async user => {
      api.admins.push(user)
    }, 'ADMIN')
  },

  getUser (userNumber) {
    if (userNumber < 1 || userNumber > api.users.length) {
      throw new Error(`Unable to find user with number ${userNumber}`)
    }
    return api.users[userNumber - 1]
  },

  getAdmin (adminNumber) {
    if (adminNumber < 1 || adminNumber > api.admins.length) {
      throw new Error(`Unable to find user with number ${adminNumber}`)
    }
    return api.admins[adminNumber - 1]
  },

  async deleteAllUserSubmissions () {
    const year = new Date().getFullYear()

    for (const user of api.users) {
      await Promise.all([
        api.deleteSubmission(user, year),
        api.deleteSubmission(user, year - 1)
      ])
    }
  },

  async deleteSubmission (user, season) {
    logger.debug(`Clearing existing ${season} submission data for ${user.username}`)

    const sub = await api.getSubmission(user, season)

    if (sub && sub._links?.self?.href) {
      const deleteUrl = resolveDockerHostLink(sub._links.self.href)

      try {
        await fetchJson({
          method: 'DELETE',
          uri: deleteUrl
        })
        return true
      } catch (error) {
        logger.error(
          `Error deleting ${season} submission for username=${user.username}`
        )
        throw error
      }
    }
  },

  async getSubmission (user, season) {
    const uri = buildUrl(
      '/api/submissions/search/getByContactIdAndSeason',
      {
        contact_id: user.contactId,
        season
      }
    )

    try {
      return await fetchJson({ uri })
    } catch (error) {
      if (error.statusCode === 404) {
        return null
      }

      logger.error(
        `Error finding submissions for contact id ${user.contactId}`,
        error
      )
    }
  },

  async getContactId (user) {
    const uri = buildUrl(
      `/api/licence/${user.username}`,
      { verification: user.password }
    )

    try {
      const result = await fetchJson({ uri })
      return result.contact.id
    } catch (error) {
      logger.error(
        `Error fetching contact detail for username=${user.username}`,
        error
      )
    }
  },

  async deleteAllGrilseProbabilities () {
    try {
      const response = await api.getAllGrilseProbabilities()
      const grilseProbabilities = response._embedded.grilseProbabilities

      logger.debug(`Deleting ${grilseProbabilities.length} grilse probabilities`)

      await Promise.all(
        grilseProbabilities.map(item => {
          const deleteUrl = resolveDockerHostLink(item._links.self.href)
          logger.debug(`Deleting grilse probability at: ${deleteUrl}`)
          return fetchJson({
            method: 'DELETE',
            uri: deleteUrl
          })
        })
      )

      logger.debug('Successfully deleted all grilse probabilities')
      return true
    } catch (error) {
      logger.error('Failed to delete grilse probabilities', error)
      throw error
    }
  },

  async getAllGrilseProbabilities () {
    const uri = buildUrl('/api/grilseProbabilities')
    return fetchJson({ uri })
  }
}

export default api
