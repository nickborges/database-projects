conn = new Mongo();
db = conn.getDB("test");
var a = {"nome" : "Guilherme"};
db.collectionTest.save(a);