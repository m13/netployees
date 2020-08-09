const neo4j = require('neo4j-driver').v1;

const uri = 'bolt://localhost';
const user = 'neo4j';
const password = 'v7FCkcWtyuXxUAat9VPywYRM';


class Database {

  constructor() {
    this.drive = neo4j.driver(uri, neo4j.auth.basic(user, password));
  }

  async add(name) {
    const session = this.drive.session();
    const result = await session.run(
      'CREATE (a:Person {name: $name}) RETURN a',
      {name: name}
    );
    session.close();

    const singleRecord = result.records[0];
    const node = singleRecord.get(0);
    console.log(node);
  }

  close(){
    this.driver.close();
  }
}

module.exports = Database;
