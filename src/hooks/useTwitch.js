import axios from 'axios'
import { useContext } from 'react'
import { useQuery } from 'react-query'
import { AuthContext, useAuth } from '~/context/authContext'

export const useTwitchChannel = (broadcaster_id) => {
  if (!broadcaster_id)
    return {
      idLoading: false,
      error: {
        message: 'Missing broadcaster ID'
      },
      data: null
    }

  const access_token = useContext(AuthContext)
  if (!access_token)
    return { isLoading: false, error: 'No access token', data: null }
  const { removeToken } = useAuth()

  const { isLoading, error, data } = useQuery(
    `channels?broadcaster_id=${broadcaster_id}`,
    () =>
      axios.get('https://api.twitch.tv/helix/channels', {
        params: {
          broadcaster_id
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Client-Id': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID
        }
      }),
    {
      onError: (error) => {
        if (error && error?.response?.status === 401) {
          removeToken()
        }
      }
    }
  )

  return { isLoading, error, data: data?.data?.data }
}

export const useTopTwitchGames = () => {
  const access_token = useContext(AuthContext)
  if (!access_token)
    return { isLoading: false, error: 'No access token', data: null }
  const { removeToken } = useAuth()

  const { isLoading, error, data } = useQuery(
    'games/top',
    () =>
      axios.get('https://api.twitch.tv/helix/games/top', {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Client-Id': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID
        }
      }),
    {
      onError: (error) => {
        if (error && error?.response?.status === 401) {
          removeToken()
        }
      }
    }
  )

  return { isLoading, error, data: data?.data?.data }
}

export const useTwitchSearchChannel = (query) => {
  if (!query)
    return {
      idLoading: false,
      data: []
    }

  const access_token = useContext(AuthContext)
  if (!access_token)
    return { isLoading: false, error: 'No access token', data: null }
  const { removeToken } = useAuth()

  const { isLoading, error, data } = useQuery(
    `channels?query=${query}`,
    () =>
      axios.get('https://api.twitch.tv/helix/search/channels', {
        params: {
          query
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Client-Id': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID
        }
      }),
    {
      onError: (error) => {
        if (error && error?.response?.status === 401) {
          removeToken()
        }
      }
    }
  )

  return { isLoading, error, data: data?.data?.data }
}

export const useTwitchFollowers = (from_id) => {
  if (!from_id)
    return {
      idLoading: false,
      error: {
        message: 'Missing from_id'
      },
      data: null
    }

  const access_token = useContext(AuthContext)
  if (!access_token)
    return { isLoading: false, error: 'No access token', data: null }
  const { removeToken } = useAuth()

  const { isLoading, error, data } = useQuery(
    `users/follows?from_id=${from_id}`,
    () =>
      axios.get('https://api.twitch.tv/helix/users/follows', {
        params: {
          from_id
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Client-Id': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID
        }
      }),
    {
      onError: (error) => {
        if (error && error?.response?.status === 401) {
          removeToken()
        }
      }
    }
  )

  return { isLoading, error, data: data?.data?.data }
}

export const useTwitchUser = (id) => {
  const access_token = useContext(AuthContext)
  if (!access_token)
    return { isLoading: false, error: 'No access token', data: null }
  const { removeToken } = useAuth()

  const { isLoading, error, data } = useQuery(
    `users?id=${id}`,
    () =>
      axios.get('https://api.twitch.tv/helix/users', {
        params: {
          id
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Client-Id': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID
        }
      }),
    {
      onError: (error) => {
        if (error && error?.response?.status === 401) {
          removeToken()
        }
      }
    }
  )

  return { isLoading, error, data: data?.data?.data }
}

export const useTwitchGame = (id) => {
  const access_token = useContext(AuthContext)
  if (!access_token)
    return { isLoading: false, error: 'No access token', data: null }
  const { removeToken } = useAuth()

  const { isLoading, error, data } = useQuery(
    `games?id=${id}`,
    () =>
      axios.get('https://api.twitch.tv/helix/games', {
        params: {
          id
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Client-Id': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID
        }
      }),
    {
      onError: (error) => {
        if (error && error?.response?.status === 401) {
          removeToken()
        }
      }
    }
  )

  return { isLoading, error, data: data?.data?.data }
}
