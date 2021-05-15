import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import { Countries } from "../../cache/countries";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await axios({
            url: 'https://restcountries.eu/rest/v2/all?fields=name;latlng;flag;capital'
        });
        response.data.map(country => Countries.push(country))
        return res.status(200).json(Countries);
    } catch (error) {
        console.log(error);
    }    
}