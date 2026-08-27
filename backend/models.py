'''
Author: Duanyt
Date: 2026-08-27 16:08:10
LastEditTime: 2026-08-27 16:12:29
LastEditors: Duanyt
Description: 
'''
from sqlalchemy import Column, Integer, String
from database import Base

# 定义 User 数据表
class User(Base):
    __tablename__ = "users"  # 表名

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)