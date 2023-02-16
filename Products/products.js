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
const fileName = "product.csv";
var arrayToInsert = [];
csvtojson()
  .fromFile(fileName)
  .then((source) => {
    // Fetching the all data from each row
    for (var i = 0; i < source.length; i++) {
      var oneRow = {
        id: source[i]["id"],
        name: source[i]["name"],
        slogan: source[i]["slogan"],
        description: source[i]["description"],
        category: source[i]["category"],
        default_price: source[i]["default_price"],
      };
      arrayToInsert.push(oneRow);
    }
    //inserting into the table "employees"
    console.log("done sorting");
    var collectionName = "products";
    var collection = dbConn.collection(collectionName);
    collection.insertMany(arrayToInsert, (err, result) => {
      if (err) console.log(err);
      if (result) {
        console.log("Import CSV into database successfully.");
      }
    });
  });
