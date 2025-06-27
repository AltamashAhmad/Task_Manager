CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  password_hash TEXT,
  role TEXT
);


CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name TEXT,
  description TEXT,
  created_by INTEGER,
  created_at TIMESTAMP
)

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title TEXT,
  project_id INTEGER,
  assigned_to INTEGER,
  status TEXT,
  due_date DATE,
  priority TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP 
)


CREATE TABLE comments (
   id SERIAL PRIMARY KEY,
   task_id INTEGER;
   user_at INTEGER;
   comment_text TEXT,
   created_at TIMESTAMP
)

