import axios from "axios";
import { getConnection, Repository } from "typeorm";
import { Country } from "../../cache/countries";
import prepareConnection from "../../orm/CovidCountryData";
import CovidCountryData from "../../orm/CovidCountryData";
import { CovidDataResponse } from "../../types/covidResponse";

export default async function (
  countriesArray: Country[],
  pageSize: number,
  repo: Repository<CovidCountryData>
) {
  let dataArray = Array<CovidCountryData>();

  //cycle through countries array and fetch and build COVID data for every country
  countriesArray.forEach(async (kasa) => {
    const headers = {
      "x-rapidapi-key": "fe4cafdc2cmsh7ce5327aa38775dp15b3c1jsn62eb4a8d6f0c",
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
      useQueryString: true,
    };

    const query = {
      name: `${kasa.name}`,
    };

    const searchParams = new URLSearchParams(query);
    let payload: Array<CovidDataResponse>;
    const covidCountryData = new CovidCountryData();
    const covidCountriesData = new Array<CovidCountryData>();
    const apiUrl = `https://covid-19-data.p.rapidapi.com/country?${searchParams}`;

    try {
      const response = await axios({ url: apiUrl, headers });
      console.log(
        "call to covid api made in getCovidDataForCountries successfully"
      );
      if (response.status === 200) payload = response.data;
      //build CovidCountryData and save.
      console.log("Is payload an array? :", Array.isArray(payload));
      if (payload.length === 1) {
        payload.forEach((x) => {
          covidCountryData.code = x.code;
          covidCountryData.confirmed = x.comfirmed;
          covidCountryData.country = x.country;
          covidCountryData.critical = x.critical;
          covidCountryData.deaths = x.deaths;
          covidCountryData.flag = kasa.flag;
          covidCountryData.lastChange = x.lastChange;
          covidCountryData.lastUpdate = x.lastUpdate;
          covidCountryData.latitude = x.latitude;
          covidCountryData.longitude = x.longitude;
          covidCountryData.recovered = x.recovered;
        });
      }

      if (payload.length > 1) {
        //if there is more than one then just take the first one.
        payload.forEach((x) => {
          setInterval(() => {
            covidCountryData.code = x.code;
            covidCountryData.confirmed = x.comfirmed;
            covidCountryData.country = x.country;
            covidCountryData.critical = x.critical;
            covidCountryData.deaths = x.deaths;
            covidCountryData.flag = kasa.flag;
            covidCountryData.lastChange = x.lastChange;
            covidCountryData.lastUpdate = x.lastUpdate;
            covidCountryData.latitude = x.latitude;
            covidCountryData.longitude = x.longitude;
            covidCountryData.recovered = x.recovered;

            covidCountriesData.push(covidCountryData);
          }, 0);
        });
      }
    } catch (error) {
      console.log(error);
    }
    //save information to sqlite database
    try {
      if (
        covidCountryData.deaths !== 0 &&
        covidCountryData.country.length > 0
      ) {
        await repo.save(covidCountryData);
      } else {
        await repo.save(covidCountriesData);
      }
      dataArray = await repo.find({
        skip: (pageSize - 1) * pageSize,
        take: pageSize,
      });
    } catch (error) {
      console.log(error);
    }
  });
  return dataArray;
}
