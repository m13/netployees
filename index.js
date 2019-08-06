const neo4j = require('neo4j-driver').v1;

const uri = 'bolt://localhost';
const user = 'neo4j';
const password = 'v7FCkcWtyuXxUAat9VPywYRM';

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session();

session.run(
  'CREATE (a:Person {name: $name}) RETURN a',
  {name: 'Bob'}
)
  .then(result => {
    session.close();

    const singleRecord = result.records[0];
    const node = singleRecord.get(0);

    console.log(node);

    // on application exit:
    driver.close();
  });
