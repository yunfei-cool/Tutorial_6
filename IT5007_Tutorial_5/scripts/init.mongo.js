/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo issuetracker scripts/init.mongo.js
 * Atlas:
 *   mongo mongodb+srv://user:pwd@xxx.mongodb.net/issuetracker scripts/init.mongo.js
 * MLab:
 *   mongo mongodb://user:pwd@xxx.mlab.com:33533/issuetracker scripts/init.mongo.js
 */

db.issues.remove({});

const issuesDB = [
  {
    id: 1, name: 'mayunfei', phone:'10087',
    time: new Date('2019-01-15'),
  },
  {
    id: 2, name: 'mayun', phone:'10086',
    time: new Date('2019-01-15'),
  },
];

db.issues.insertMany(issuesDB);
const count = db.issues.count();
print('Inserted', count, 'issues');

db.counters.remove({ _id: 'issues' });
db.counters.insert({ _id: 'issues', current: count });

db.issues.createIndex({ id: 1 }, { unique: true });
db.issues.createIndex({ name: 1 });
db.issues.createIndex({ phone: 1 });
db.issues.createIndex({ time: 1 });
