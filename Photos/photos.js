const csvtojson = require("csvtojson");
const mongodb = require("mongodb");

var url = "mongodb://localhost:27017/Products";

var dbConn;
mongodb.MongoClient.connect(url, {
  useUnifiedTopology: true,
})
  .then((client) => {
    console.log("DB Connected!");
    dbConn = client.db();
  })
  .catch((err) => {
    console.log("DB Connection Error: ${err.message}");
  });

// CSV file name
const fileName = "photos.csv";
var arrayToInsert = [];
csvtojson()
  .fromFile(fileName)
  .then((source) => {
    // Fetching the all data from each row
    for (var i = 0; i < source.length; i++) {
      var oneRow = {
        id: source[i]["id"],
        styleId: source[i]["styleId"],
        url: source[i]["url"],
        thumbnail_url: source[i]["thumbnail_url"],
      };
      arrayToInsert.push(oneRow);
    }
    //inserting into the table "employees"
    console.log("done sorting");
    var collectionName = "photos";
    var collection = dbConn.collection(collectionName);
    collection.insertMany(arrayToInsert, (err, result) => {
      if (err) console.log(err);
      if (result) {
        console.log("Import CSV into database successfully.");
      }
    });
  });
