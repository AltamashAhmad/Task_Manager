const {Pool} = requrie("pg")

const pool =new Pool({
 connectionString: process.env.DATABASE_URL
});

pool.connect()
  .then(()=> console.log("connected database"))
  .catch(err => console.log(err));

  
module.exports =pool;