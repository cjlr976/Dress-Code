import uvicorn

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware #Dealsm with CORS error

from db.database import SessionLocal
from model import models

from schemas.schemas import ClothesInput

from core.config import settings

#Used to delete clothes
from sqlalchemy.orm.exc import UnmappedInstanceError

#Builds API
app = FastAPI()

origins = [
    "http://localhost:5173", #Specific for React
    "localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS, #Specifies client side domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

#Add API Route
@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Closet organizer"}


#API route that query and fetch all the clothes in the database
@app.get("/clothes")
def read_clothess():
    db = SessionLocal()
    try:
        clothes = db.query(models.Clothes).all()
    finally:
        db.close()
    return clothes

#API route that adds piece of clothes
@app.post("/clothes")
def add_clothes(clothes: ClothesInput):
    db = SessionLocal()
    try:
        if len(clothes.title) == 0 and len(clothes.clothes_image) == 0:
            raise HTTPException(
                status_code=400, detail={
                    "status": "Error 400 - Bad Request",
                    "msg": "Both 'title' and 'clothes_body' are empty. These are optional attributes but at least one must be provided."
                })
        new_clothes = models.Clothes(
            title=clothes.title, cImage=clothes.clothes_image
        )
        db.add(new_clothes)
        db.commit()
        db.refresh(new_clothes)
    finally:
        db.close()
    return new_clothes

#Updates a piece of clothing
@app.put("/clothes/{clothes_id}")
def update_clothes(clothes_id: int, updated_clothes: ClothesInput):
    if len(updated_clothes.title) == 0 and len(updated_clothes.clothes_body) == 0:
        raise HTTPException(status_code=400, detail={
            "status": "Error 400 - Bad Request",
            "msg": "The clothes's `title` and `clothes_body` can't be both empty"
        })
    db = SessionLocal()
    try:
        clothes = db.query(models.Clothes).filter(models.Clothes.id == clothes_id).first()
        clothes.title = updated_clothes.title
        clothes.clothes_body = updated_clothes.clothes_body
        db.commit()
        db.refresh(clothes)
    finally:
        db.close()
    return clothes

#Route that deletes a piece of clothing
@app.delete("/clothes/{clothes_id}")
def delete_clothes(clothes_id: int):
    db = SessionLocal()
    try:
        clothes = db.query(models.Clothes).filter(models.Clothes.id == clothes_id).first()
        db.delete(clothes)
        db.commit()
    except UnmappedInstanceError:
        raise HTTPException(status_code=400, detail={
            "status": "Error 400 - Bad Request",
            "msg": f"Clothes with `id`: `{clothes_id}` doesn't exist."
        })
    finally:
        db.close()
    return {
        "status": "200",
        "msg": "Clothes deleted successfully"
    }

if __name__ == "__main__":
    uvicorn.run("app.api:app", host="0.0.0.0", port=8000, reload=True)