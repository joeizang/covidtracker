import { createConnection, getConnection } from "typeorm";
import Country from "../orm/CovidCountryData";

let connectionReadyPromise: Promise<void> | null = null;

export default function prepareConnection() {
  if (!connectionReadyPromise) {
    connectionReadyPromise = (async () => {
      // clean up old connection that references outdated hot-reload classes
      try {
        const staleConnection = getConnection();
        await staleConnection.close();
      } catch (error) {
        // no stale connection to clean up
      }

      // wait for new default connection
      await createConnection({
        // connection options go here
        name: "default",
        type: "better-sqlite3",
        database: "./appdb.db",
        entities: [Country],
        synchronize: true,
        logging: true,
      });
    })();
  }

  return connectionReadyPromise;
}
