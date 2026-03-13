from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse, FileResponse

from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import uvicorn
import os

app = FastAPI(title="Simple Calculator API", description="A basic calculator API with a web UI.", version="1.0")

class CalcRequest(BaseModel):
	num1: float
	num2: float
	op: str

class CalcResponses(BaseModel):
	result: float
	expression: str
	success: bool
	error: str = None


@app.post("/api/calc")
async def calculate(data: CalcRequest):
	if data.op not in {"+", "-", "*", "/"}:
		raise HTTPException(status_code=400, detail="Invalid operator.")
	try:
		if data.op == "+":
			result = data.num1 + data.num2
		elif data.op == "-":
			result = data.num1 - data.num2
		elif data.op == "*":
			result = data.num1 * data.num2
		elif data.op == "/":
			if data.num2 == 0:
				raise HTTPException(status_code=400, detail="Division by zero.")
			result = data.num1 / data.num2
		return {"result": result}
	except Exception as e:
		raise HTTPException(status_code=400, detail=str(e))

# Serve static files (UI) - Mount last so it doesn't interfere with API routes
static_dir = os.path.join(os.path.dirname(__file__), "static")
app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")