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
const fileName = "styles.csv";
var arrayToInsert = [];
csvtojson()
  .fromFile(fileName)
  .then((source) => {
    // Fetching the all data from each row
    for (var i = 0; i < source.length; i++) {
      var oneRow = {
        id: source[i]["id"],
        productId: source[i]["productId"],
        name: source[i]["name"],
        sale_price: source[i]["sale_price"],
        original_price: source[i]["original_price"],
        default_style: source[i]["default_style"],
      };
      arrayToInsert.push(oneRow);
    }
    //inserting into the table "employees"
    console.log("done sorting");
    var collectionName = "styles";
    var collection = dbConn.collection(collectionName);
    collection.insertMany(arrayToInsert, (err, result) => {
      if (err) console.log(err);
      if (result) {
        console.log("Import CSV into database successfully.");
      }
    });
  });
