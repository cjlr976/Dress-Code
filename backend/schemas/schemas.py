#Defines data types of expected payload
#FastAPI checks shape of data payload
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional, Dict

class ClothesInput(BaseModel):
    title: str = ''
    id: Optional[int ] = None