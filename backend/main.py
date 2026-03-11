from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from dotenv import load_dotenv
import os
load_dotenv();
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
        return {"error": str(e)}

