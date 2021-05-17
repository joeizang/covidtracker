This small project is based on [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Here you will be greeted with a bunch of cards showing each countries stats during the fight against COVID-19. This project is beset by hard limits set by the free api used to power this site. So the data will be a few days behind but will get the latest data every other day.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/getCountries](http://localhost:3000/api/getCountries) and at [http://localhost:3000/api/getCovidDataForCountries](http://localhost:3000/api/getCovidDataForCountries). These endpoints can be edited in `pages/api/*.ts`.
