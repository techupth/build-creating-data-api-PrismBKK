import express from "express";
import ConnectionPool from "./utils/db.mjs"

const app = express();
const port = 4001;

app.use(express.json());

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

app.post("/assignments",async(req, res)=>{
  const newAssignment={
    ...req.body,
        created_at: new Date(),
        updated_at: new Date(),
        published_at: new Date(),
  }
  console.log(newAssignment)

  try{
    await ConnectionPool.query(
      `insert into assignments(user_id,title,content,category,length,created_at,updated_at,published_at,status)
      values ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [
          1,
          newAssignment.title,
          newAssignment.content,
          newAssignment.category,
          newAssignment.length,
          newAssignment.created_at,
          newAssignment.updated_at,
          newAssignment.published_at,
          newAssignment.status
      ]
      
    );
    }
    catch{
      console.group(res.status);
      return res.status(500).json({ message : "Server could not create assignment because database connection" });
    }
  return res.status(201).json({messeage:"Created assignment sucessfully"});
})

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
