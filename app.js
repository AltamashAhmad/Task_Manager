const express=require("express");
const authenticate =require('./middleware/auth');
const authorization =require('./middleware/role');

const app=express();
app.get(express.json());

app.post('/projects', authenticate, authorization['Admin', 'Manager'], async (req,res)=>{

  const {name,description}=req.body;
  const created_by=req.user.id;

  try{
    const result= await pool.query(
      `INSERT INTO projects (name,description,created_b,created_at) VALUES ($1,$2,$3,NOW())`
      ,([name,description,created_by])
    )
    res.status(201).send("Project Created");
  }
  catch(err){
    console.log(err);
    res.status(500).send("Failed to create project");
  }
})

app.post('/tasks',authenticate, authorization['Admin', 'Manager'], async (req,res)=>{
   // get the role 
   const {title,project_id,ssigned_to,status,due_date,priority}=req.body;
   try{
    const result= await pool.query(
      `INSERT INTO tasks (title,project_id,ssigned_to,status,due_date,priority,created_at) VAlUES ($1,$2,$3,$4,$5,NOW())`
      ,([title,project_id,ssigned_to,status,due_date,priority])
    )
    res.status(201).send("task created ");
   }
   catch(err){
    console.log(err);
    res.status(500).send("Failed to create task");
   }
})

app.put('/tasks/:id/status',authenticate, async (req,res)=>{
 
  const{status}=req.body;
  const taskId=req.params.id;
  const role=req.user.role;
  if(role=="Admin")
  try{
    const result=await pool.query(
      `UPDATE tasks SET status=$1, updated_at=NOW() Where id=$2`,
      ([status,taskId])
    );
     res.status(201).send("task update");
  }
  catch(err){
    console.log(err);
    res.status(500).send("Failed to update task");
   };
})

app.get('/tasks',authenticate, async (req,res)=>{

  try{
    const result= await pool.query(
      `Select * from tasks`
    )
    res.status(200).json(result);
  }
  catch(err){
    console.log(err);
    res.status(500).send("Failed to get tasks");
   };
})

app.post('/tasks/:id/comments',authenticate,async (res,req)=>{
 
  const taskId=req.params.id;
  const {user_id,comment_text}=req.body;

  try{
    const result= await pool.query(
      `INSERT into comments (task_id, user_id, comment_text,created_at) Values ($1,$2,$3,NOW())`,
      ([taskId,user_id,comment_text])
    );
    res.status(201).send("comment added ");
  }
  catch(err){
    console.log(err);
    res.status(500).send("Failed to add comment");
   };
})


app.listen(3000,()=>{
  console.log("server is running ");
})