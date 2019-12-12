# @jzone/react-request-hook

> React hook for custom request，compatible with various lib, support redux

## Install

```bash
# npm
npm install @jzone/react-request-hook -D

# yarn
yarn add @jzone/react-request-hook -D
```


## Features

- Custom request support
- 0 dependency
- Coming soon to support TypeScript

## Usage

### Basic Usage

```jsx
import React, { useEffect } from 'react'
import useFetchData from '@jzone/react-request-hook'
import axios from '@/utils/axios'

export default function TestPages (props) {
  const [{ data, isLoading, error }, fetchData] = useFetchData(data => axios.get('/xxx', { params: data }))
  
  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (!data) {
    return !error ? <div>loading...</div> : <div>error</div>
  }

  return <div>
    <p>hello useFetchData</p>
    <span onClick={() => fetchData({ a: 3 })}>onClick</span>
  </div>
}
```

### Custom Hooks

```js
// hook/index.js
import React from 'react'
import useFetchData from '@jzone/react-request-hook'
import axios from 'axios'
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
```

### GET

```jsx
import React, { useEffect } from 'react'
import useFetchData from '@jzone/react-request-hook'
import axios from '@/utils/axios'
import { useFetchDataGet } from '@/hook'

export default function TestPages (props) {
  const [{ data, isLoading, error }, fetchData] = useFetchData(data => axios.get('/xxx', { params: data }))
  // or
  // const [{ data, isLoading, error }, fetchData] = useFetchDataGet('/xxx')
  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (!data) {
    return !error ? <div>loading...</div> : <div>error</div>
  }

  return <div>
    <p>hello useFetchData</p>
    <span onClick={() => fetchData({ a: 3 })}>onClick</span>
  </div>
}
```

### POST

```jsx
import React, { useEffect } from 'react'
import useFetchData from '@jzone/react-request-hook'
import axios from '@/utils/axios'
import { useFetchDataPost } from '@/hook'

export default function TestPages (props) {
  const [{ data, isLoading, error }, fetchData] = useFetchData(data => axios.post('/xxx', data))
  // or
  // const [{ data, isLoading, error }, fetchData] = useFetchDataPost('/xxx')
  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (!data) {
    return !error ? <div>loading...</div> : <div>error</div>
  }

  return <div>
    <p>hello useFetchDataGet</p>
    <span onClick={() => fetchData({ a: 3 })}>onClick</span>
  </div>
}
```

### Batch Request

```jsx
function BatchRequest () {
  const batchFetchData = (data) => Promise.all([request1(data), request2(data)])
  const [{ loading, error, data }, fetchData] = useFetchData(batchFetchData)

  useEffect(() => { fetchData() }, [fetchData])

  if (loading) return 'loading...'
  if (error) return 'error'

  const [res1, res2] = data

  return (
    <div>
      <div>{res1}</div>
      <div>{res2}</div>
      <button onClick={() => fetchData({ a: 3 })}>refetch batch</button>
    </div>
  )
}
```

## API

### Common API

参数 | 说明 | 类型 | 默认值
----- | ---- | --- | ---
state.data | 接口返回值 | any | {}
state.isLoading | 是否加载中 | Boolean or undefined | undefined
state.error | 接口请求错误 | any | null
fetch | 绑定state的请求方法，使用时fetch() 或者 fetch(data) | function(data?) |
initState | 初始/默认state, e.g: { isLoader: true } 初始为加载中 | Object |

### useFetchData

```js
const [state, fetch] = useFetchData(requestFn[, initState])
```

参数 | 说明 | 类型 | 默认值
----- | ---- | --- | ---
requestFn | 自定义请求方法 | function(data?) |

```js
requestFn e.g:

(data) => fetch('/xxx', { method: 'POST', body: data })
(data) => axios.get('/xxx', {params: data})
(data) => axios.post('/xxx', {params: data})
(data) => Promise(req1(data), req2(data))
...
```

### useFetchDataGet

```js
const [state, fetch] = useFetchDataGet(url[, initState])
```

参数 | 说明 | 类型 | 默认值
----- | ---- | --- | ---
url | 请求地址 | String |

### useFetchDataPost

```js
const [state, fetch] = useFetchDataPost(url[, initState])
```

参数 | 说明 | 类型 | 默认值
----- | ---- | --- | ---
url | 请求地址 | String |
