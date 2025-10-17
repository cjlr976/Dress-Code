#Defines data types of expected payload
#FastAPI checks shape of data payload
from pydantic import BaseModel

class ClothesInput(BaseModel):
    title: str = ''
    note_body: str = ''