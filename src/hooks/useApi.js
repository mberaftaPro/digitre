import { useEffect, useState } from "react"

const toUrlParams = params => {
  const paramsKeys = Object.keys(params)
  const result = paramsKeys.reduce((acc, key) => {
    const conjunction = acc === "" ? "" : "&"
    return `${acc}${conjunction}${key}=${params[key]}`
  }, "")

  return result
}

const useApi = ({ url, method, data, params = {}, headers = {} }) => {
  const [response, setResponse] = useState({
    data: null,
    error: null,
  })

  useEffect(() => {
    const queryPart = params != {} ? `?${toUrlParams(params)}` : ""
    const completeUrl = `${url}${queryPart}`
    const asyncFetch = async () => {
      const apiResponse = await fetch(completeUrl, {
        method,
        headers: { "Content-Type": "application/json", ...headers },
        ...(method === "POST" && { body: JSON.stringify(data) }),
      }).catch(error => {
        setResponse(prevState => ({ ...prevState, error }))
      })

      if (apiResponse) {
        const jsonApiResponse = await apiResponse.json()
        setResponse(prevState => ({ ...prevState, data: jsonApiResponse }))
      }
    }

    asyncFetch()
  }, [params])

  return response
}

export default useApi
