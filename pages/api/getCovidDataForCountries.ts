import axios from "axios";
import { getConnection } from "typeorm";
import { Country } from "../../cache/countries";
import prepareConnection from "../../helpers/ormprepare";
import CovidCountryData from "../../orm/CovidCountryData";
import { CovidDataResponse } from "../../types/covidResponse";

export default async function (countriesArray: Country[], pageSize: number) {
  //save information to sqlite database
  await prepareConnection();
  const dbConn = getConnection();
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
    const apiUrl = `https://covid-19-data.p.rapidapi.com/country?${searchParams}`;
    const response = await axios({ url: apiUrl, headers });
    if (response.status === 200) payload = response.data;
    //build CovidCountryData and save.
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
      covidCountryData.code = payload[0].code;
      covidCountryData.confirmed = payload[0].comfirmed;
      covidCountryData.country = payload[0].country;
      covidCountryData.critical = payload[0].critical;
      covidCountryData.deaths = payload[0].deaths;
      covidCountryData.flag = kasa.flag;
      covidCountryData.lastChange = payload[0].lastChange;
      covidCountryData.lastUpdate = payload[0].lastUpdate;
      covidCountryData.latitude = payload[0].latitude;
      covidCountryData.longitude = payload[0].longitude;
      covidCountryData.recovered = payload[0].recovered;
    }

    const covidCountryRepo =
      dbConn.getRepository<CovidCountryData>("CovidCountryData");

    await covidCountryRepo.save(covidCountryData);
    dataArray = await covidCountryRepo.find({
      skip: (pageSize - 1) * pageSize,
      take: pageSize,
    });
  });
  return dataArray;
}
