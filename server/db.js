import mongod from "mongod";

const DB_PORT = process.env.DB_PORT || 27018;

function startDBServer(retries) {
  const db = new mongod({
    port: DB_PORT,
    dbpath: '/tmp',
  });

  db.open((err) => {
    if (err) {
      if (retries <= 0) {
        throw err;
      }

      setTimeout(function () {
        startDBServer(retries-1);
      }, 1000);
    } else {
      console.log('DB Server listening on port ' + DB_PORT);
    }
  });
}

startDBServer(5);
