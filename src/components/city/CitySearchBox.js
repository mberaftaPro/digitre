import React, { useEffect, useState, useCallback } from "react"
import { Autocomplete } from "@material-ui/lab"
import { TextField, Grid } from "@material-ui/core"
import useDebounce from "../../hooks/useDebounce"
import useApi from "../../hooks/useApi"
import { SEARCH_CITIES_URL } from "../../constants/cityApiUrls"

const CitySearchBox = ({ handleCitySelect }) => {
  const [currentCity, setCurrentCity] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [searchCityParams, setSearchCityParams] = useState({
    limit: 10,
    nom: "",
  })

  const debouncedSearchInput = useDebounce(searchInput, 300)
  const citiesApiResponse = useApi({
    url: SEARCH_CITIES_URL,
    params: searchCityParams,
  })

  const handleSearchInputChange = e => {
    setSearchInput(e.target.value)
  }

  const handleCurrentCityChange = (event, value) => {
    if (value != null) setCurrentCity(value)
  }

  useEffect(() => {
    handleCitySelect(currentCity)
  }, [currentCity])

  useEffect(() => {
    if (debouncedSearchInput != null) {
      setSearchCityParams(prevState => ({
        ...prevState,
        nom: debouncedSearchInput,
      }))
    }
  }, [debouncedSearchInput])

  return (
    <Grid container>
      <Grid item xs={12}>
        <Autocomplete
          id="city-search-box"
          value={currentCity}
          onChange={handleCurrentCityChange}
          options={(citiesApiResponse.data || []).map(city => city.nom)}
          renderInput={params => (
            <TextField
              {...params}
              label="Recherche d'une ville"
              margin="normal"
              onChange={handleSearchInputChange}
            />
          )}
        />
      </Grid>
    </Grid>
  )
}

export default CitySearchBox
