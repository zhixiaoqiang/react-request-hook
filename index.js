import React, { useReducer, useCallback } from 'react'

const FETCH_REQUEST = 'FETCH_REQUEST'
const FETCH_SUCCESS = 'FETCH_SUCCESS'
const FETCH_FAILURE = 'FETCH_FAILURE'

const fetchDataReducer = (initState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        data: null,
        ...initState,
        isLoading: true,
        error: null,
      }
    case FETCH_SUCCESS:
      return {
        ...initState,
        isLoading: false,
        error: null,
        data: action.payload,
      }
    case FETCH_FAILURE:
      return {
        ...initState,
        isLoading: false,
        error: action.error,
      }
    default:
      throw new Error()
  }
}

/**
 * @param {*} requestFn custom fetch function, e.g: (data) => axios('/xxx', data)
 * @param {*} initState setInit state, defaultValue: undefined
 * @return {array} [state, memoizedFetchDateApi] state: { data, isLoading, error, ... }
 */
export default useFetchData = (requestFn, initState) => {
  const [state, dispatch] = useReducer(fetchDataReducer, initState)

  const fetchData = async (params) => {
    dispatch({ type: FETCH_REQUEST })
    try {
      const result = await requestFn(params)
      dispatch({ type: FETCH_SUCCESS, payload: result })
    } catch (error) {
      dispatch({ type: FETCH_FAILURE, error })
    }
  }

  const memoizedFetchDateApi = useCallback(fetchData, [])
  return [state || {}, memoizedFetchDateApi]
}

