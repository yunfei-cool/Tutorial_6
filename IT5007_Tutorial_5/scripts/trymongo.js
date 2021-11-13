const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/issuetracker';

// Atlas URL  - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb+srv://UUU:PPP@cluster0-XXX.mongodb.net/issuetracker?retryWrites=true';

// mLab URL - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb://UUU:PPP@XXX.mlab.com:33533/issuetracker';

async function testWithAsync() {
  console.log('\n--- testWithAsync ---');
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db();
    const collection = db.collection('waitlist');

    const employee1 = { id: 1, name: 'A. Async', phone: '10087', time:'2021-11-01' };
    const employee2 = { id: 2, name: 'B. Async', phone: '10086', time:'2021-10-01' };
    const employee3 = { id: 3, name: 'C. Async', phone: '10088', time:'2021-10-03' };
    const result = await collection.insertMany([employee1,employee2, employee3]);

    const result1 = await collection.find().toArray();
    console.log('Result of insert:\n', result1);

    const update_1 = await collection.updateOne({id : 2}, {$set:{name: 'dafei'} });
    
    const update_2 = await collection.updateMany({}, { $set: { organization: 'V&H Education' } });
    const docsh = await collection.find().toArray();
    console.log('Result of update:\n', docsh);

    const replace_1 = await collection.replaceOne({id:1}, {
      id:1,
      name:'lahma',
      phone: '19992022'
    });

    const docs2 = await collection.find({ id:1 })
      .toArray();
    console.log('Result of repalce:\n', docs2);

    const delete1 = await collection.deleteOne({id:2});

    const aggregate_1 = await collection.aggregate([{$group:{_id:null, count:{$sum:1}}}]).toArray();
    console.log('The number of customer:\n', aggregate_1);

    const docs3 = await collection.find().toArray();
    console.log('Result of delete:\n', docs3);

  } catch(err) {
    console.log(err);
  } finally {
    client.close();
  }
}

testWithAsync();

