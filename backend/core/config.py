#Take env variables into python object to reference

from typing import List

#Check if this is correct
from pydantic_settings import BaseSettings
from pydantic import field_validator

#Declare each type for .env variable
class Settings(BaseSettings):
    DATABASE_URL: str
    API_PREFIX: str = "/api"
    DEBUG: bool = False
    ALLOWED_ORIGINS: str = ""

    #Converts origns to a list
    @field_validator("ALLOWED_ORIGINS")
    def parse_allowed_origins(cls, v:str)->List[str]:
        return v.split(",") if v else[]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True

settings = Settings()
