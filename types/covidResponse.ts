
export interface CovidDataResponse {
    country: string;
    code: string;
    comfirmed: number;
    recovered: number;
    critical: number;
    deaths: number;
    latitude: number;
    longitude: number;
    lastChange: Date;
    lastUpdate: Date;
}