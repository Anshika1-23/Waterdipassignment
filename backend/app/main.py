# app/main.py
from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import engine, get_db

app = FastAPI()

# Create database tables
models.Base.metadata.create_all(bind=engine)

@app.post("/v1/tasks", response_model=schemas.TaskResponse, status_code=201)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    new_task = models.Task(title=task.title, is_completed=task.is_completed)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

@app.get("/v1/tasks", response_model=list[schemas.TaskResponse])
def list_tasks(db: Session = Depends(get_db)):
    tasks = db.query(models.Task).all()
    return tasks

@app.get("/v1/tasks/{id}", response_model=schemas.TaskResponse)
def get_task(id: int, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == id).first()
    if not task:
        raise HTTPException(status_code=404, detail="There is no task at that id")
    return task

@app.put("/v1/tasks/{id}", response_model=None, status_code=204)
def update_task(id: int, task: schemas.TaskUpdate, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="There is no task at that id")
    if task.title is not None:
        db_task.title = task.title
    if task.is_completed is not None:
        db_task.is_completed = task.is_completed
    db.commit()
    return None

@app.delete("/v1/tasks/{id}", response_model=None, status_code=204)
def delete_task(id: int, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == id).first()
    if task:
        db.delete(task)
        db.commit()
    return None
