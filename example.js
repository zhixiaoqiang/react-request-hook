import React from 'react'
import axios from 'axios'
import useFetchData from './index'
/**
 * @param {*} url url
 * @param {*} initState setInit state, defaultValue: undefined
 * @return {array} [state, memoizedFetchDateApi] state: { data, isLoading, error, ... }
 */
export const useFetchDataGet = (url, initState) => {
  const [state, memoizedFetchDateApi] = useFetchData(data => axios.get(url, { params: data }), initState)

  return [state, memoizedFetchDateApi]
}

/**
 * @param {*} url url
 * @param {*} initState setInit state, defaultValue: undefined
 * @return {array} [state, memoizedFetchDateApi] state: { data, isLoading, error, ... }
 */
export const useFetchDataPost = (url, initState) => {
  const [state, memoizedFetchDateApi] = useFetchData(data => axios.post(url, data), initState)

  return [state, memoizedFetchDateApi]
}