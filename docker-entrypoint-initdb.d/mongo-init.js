db.auth("invoice_generation_admin", "2b0YlZxL79D");
db = db.getSiblingDB("invoice_generation");
db.createUser({
  user: "invoice_generation_db_owner",
  pwd: "i5u3h1PHb61",
  roles: [
    {
      role: "dbOwner",
      db: "invoice_generation",
    },
  ],
});
db.createCollection("users");
