from fastapi import FastAPI
from logic_manual import run_basic_logic
from logic_torch import run_torch_manual
from logic_train import run_trained_model
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/manual")
def manual():
    return run_basic_logic()

@app.get("/torch-threshold")
def torch_threshold():
    return run_torch_manual()

@app.get("/torch-trained")
def torch_trained():
    return run_trained_model()
