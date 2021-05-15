import React, { Fragment } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { CovidDataResponse } from '../types/covidResponse';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkullCrossbones, faMapMarkedAlt, faBiohazard, faVirusSlash, faCalendarWeek, faCalendarDay, faBarcode, } from "@fortawesome/free-solid-svg-icons";

export default function DataCard({ covidData }) {

    const { country, code, lastChange, lastUpdate, recovered, critical, deaths, latitude, longitude } = covidData;
    return (
        <Fragment>
            <Card className="shadow" style={{ width: "30rem" }}>
                <Card.Header className="d-flex justify-content-center align-items-center"><b>{ country }</b></Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item><FontAwesomeIcon size="2x" icon={faBarcode}></FontAwesomeIcon><b className="ml-2">{code} - Country Code</b></ListGroup.Item>
                    <ListGroup.Item><FontAwesomeIcon size="2x" icon={faCalendarDay}></FontAwesomeIcon><b className=" ml-2">{lastChange} - Data Changed On</b></ListGroup.Item>
                    <ListGroup.Item><FontAwesomeIcon size="2x" icon={faCalendarWeek}></FontAwesomeIcon><b className="ml-2">{lastUpdate} - Data Updated Last</b></ListGroup.Item>
                    <ListGroup.Item><FontAwesomeIcon size="2x" icon={faVirusSlash}></FontAwesomeIcon><b className="text-success ml-2">{recovered} - In Recovery</b></ListGroup.Item>
                    <ListGroup.Item><FontAwesomeIcon size="2x" icon={faBiohazard}></FontAwesomeIcon><b className="text-warning ml-2">{critical} - In Critical Condition</b></ListGroup.Item>
                    <ListGroup.Item><FontAwesomeIcon size="2x" icon={faSkullCrossbones}></FontAwesomeIcon><b className="text-danger ml-2">{deaths} - Fatalities</b></ListGroup.Item>
                    <ListGroup.Item><FontAwesomeIcon size="2x" icon={faMapMarkedAlt}></FontAwesomeIcon><b className="text-info ml-2">{latitude} - Long</b></ListGroup.Item>
                    <ListGroup.Item><FontAwesomeIcon size="2x" icon={faMapMarkedAlt}></FontAwesomeIcon><b className="text-info ml-2">{longitude} - Lat</b></ListGroup.Item>
                </ListGroup>
            </Card>
        </Fragment>
    )
}