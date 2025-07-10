// https://restcountries.com/v3.1/all
// https://restcountries.com/v3.1/name/finland

const countriesConfig = {
  baseURL: 'https://restcountries.com/v3.1/',
  headers: {
    'Accept': 'application/json',
  }

};

export const fetchCountries = async ({query} : {query:string}) => {
  const endpoint = query && query.trim() !== ''
  ? `${countriesConfig.baseURL}name/${encodeURIComponent(query)}`
  : `${countriesConfig.baseURL}all`;

  const res = await fetch(endpoint);

  const data = await res.json();
  return data
}