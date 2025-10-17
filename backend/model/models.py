from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from db.database import SessionLocal

class Clothing():
    __type__ = "type"

    #Piece of data storing each individual clothing piece
    id=Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    nodes = relationship("ClothingNode", back_populates="clothes")

    def __repr__(self):
        return f'Clothing(id={self.id}, title = {self.title})'