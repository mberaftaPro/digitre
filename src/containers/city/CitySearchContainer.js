import React, { useEffect, useState } from "react"
import { Grid } from "@material-ui/core"
import CitySearchBox from "../../components/city/CitySearchBox"
import CityMap from "../../components/city/CityMap"
import { SEARCH_ADDRESS_URL } from "../../constants/addressApiUrls"
import useApi from "../../hooks/useApi"

const SearchCityContainer = () => {
  const [state, setState] = useState({
    currentCityInformations: {
      position: [43.610769, 3.876716],
      name: "Montpellier",
    },
    searchAddressParams: {
      limit: 3,
      type: "municipality",
      q: "",
    },
  })

  const apiResponse = useApi({
    url: SEARCH_ADDRESS_URL,
    params: state.searchAddressParams,
  })

  useEffect(() => {
    if (apiResponse && apiResponse.data) {
      const {
        data: { features },
      } = apiResponse

      const { geometry, properties } = features[0]

      setState(prevState => ({
        ...prevState,
        currentCityInformations: {
          ...prevState.currentCityInformations,
          position: [...geometry.coordinates].reverse(),
          name: `Bienvenue à ${properties.label}!`,
        },
      }))
    }
  }, [apiResponse])

  const handleCitySelect = newCity => {
    setState(prevState => ({
      ...prevState,
      searchAddressParams: {
        ...prevState.searchAddressParams,
        q: newCity,
      },
    }))
  }

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justify="center"
      spacing={3}
    >
      <Grid item xs={8}>
        <CitySearchBox {...{ handleCitySelect }} />
      </Grid>
      {state.currentCityInformations.position.length > 0 && (
        <Grid item xs={8} style={{ marginTop: "2rem" }}>
          <Grid container alignItems="center" justify="center">
            <CityMap {...state.currentCityInformations} />
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default SearchCityContainer
