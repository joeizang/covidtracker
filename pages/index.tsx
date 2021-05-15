import axios from "axios";
import { URLSearchParams } from 'url';
import React from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import DataCard from "../components/DataCard";
import { CovidDataResponse } from "../types/covidResponse";
import DataList from "../components/DataList";
import SearchBox from "../components/SearchBox";
import arrayFetcher from "../helpers/arrayFetcher";
import lodash from 'lodash';

interface StaticProps {
  serverData: Array<CovidDataResponse>;
}

export default function Home({serverData}: StaticProps) {
  // console.log()
  //console.log(serverData);
  return (
    <Container fluid>
      <Row>
        <Col sm={12}>Header</Col>
      </Row>
      <Row>
        <Col sm={4} style={{ border: "1px solid #ccc"}}>
          SideBar
        </Col>
        <Col sm={8} className="p-3" style={{ border: "1px solid #ccc"}}>
          {serverData !== null ? serverData.map((data, index) => (
            <DataCard covidData={data} key={index}/>
          )) : <p className="h3">No Data to show!</p>}
        </Col>
      </Row>
      <Row>
        <Col>
          <SearchBox />
        </Col>
      </Row>
      <Row>
        <DataList countryList={serverData}/>
      </Row>
    </Container>
  )
}

export async function getStaticProps() {
  const headers = {
    "x-rapidapi-key": "fe4cafdc2cmsh7ce5327aa38775dp15b3c1jsn62eb4a8d6f0c",
    "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
    "useQueryString": true
  };
  
  const query = {
    "name": "nigeria"
  };
  
  const searchParams = new URLSearchParams(query);
  let payload: Array<CovidDataResponse>;
  let countriesPayload = []
  const apiUrl = `https://covid-19-data.p.rapidapi.com/country?${searchParams}`;

  try {
    const response = await axios({
      url: apiUrl,
      headers
    });
    const countriesResponse = await axios({ url: 'http://localhost:3000/api/getCountries' });
    if (response.status == 200) {
      //console.log(response.data);
      payload = response.data;
    }
    if (countriesResponse.status == 200) {
      countriesPayload = countriesResponse.data;
    }
    const result = lodash.chunk(countriesPayload, 50);
    console.log('Result from arrayFetcher utility :', result.length);
    
    const getResult = await axios({ url: 'http://localhost:3000/api/getCovidDataForCountries' })
    if (getResult.status === 200) {
      console.log(`Database data is good ${getResult.data.length}`);
    } else {
      console.log(getResult.statusText);
    }
  } catch (err) {
    console.log(err);
  }


  return {
    props: {
      serverData: payload,
      countries: countriesPayload
  }};
}
