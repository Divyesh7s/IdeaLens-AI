from fastapi import FastAPI,Depends,HTTPException
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from database import SessionLocal,engine
import models
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from dotenv import load_dotenv
import os


load_dotenv();
app = FastAPI()
models.Base.metadata.create_all(bind=engine)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # your React dev URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(
    api_key=os.environ.get("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1",
)

class Idea(BaseModel):
    idea: str

class SignupRequest(BaseModel):
    name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/analyze")
def analyze(data: Idea):
    try:
        prompt = f"""
You are a startup investor.

Analyze this startup idea:

{data.idea}

Provide:
Idea Score (1-10)
Market Size
Competition Level
Monetization Model
Suggested Improvements
"""
        response = client.chat.completions.create( 
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        return {"analysis": response.choices[0].message.content}  

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/signup")
def signup(user: SignupRequest, db: Session = Depends(get_db)):

    existing_user = db.query(models.User).filter(models.User.email == user.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = pwd_context.hash(user.password)

    new_user = models.User(
        name=user.name,
        email=user.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created successfully"}

@app.post("/login")
def login(user: LoginRequest, db: Session = Depends(get_db)):
    user_db = db.query(models.User).filter(models.User.email == user.email).first()

    if not user_db:
        raise HTTPException(status_code=400, detail="Invalid email")

    if not pwd_context.verify(user.password, user_db.password):
        raise HTTPException(status_code=400, detail="Invalid password")

    return {
        "name": user_db.name,
        "email": user_db.email
    }