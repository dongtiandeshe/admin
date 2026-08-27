'''
Author: Duanyt
Date: 2026-08-27 16:07:59
LastEditTime: 2026-08-27 16:12:15
LastEditors: Duanyt
Description: 
'''
import os
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import declarative_base

# 确保 data 文件夹存在
DATA_DIR = "data"
os.makedirs(DATA_DIR, exist_ok=True)

# 数据库连接串（指向 data 文件夹下的 db 文件）
SQLALCHEMY_DATABASE_URL = f"sqlite+aiosqlite:///{DATA_DIR}/data.db"

# 创建异步引擎（echo=True 能在终端打印 SQL，方便你调试）
engine = create_async_engine(
    SQLALCHEMY_DATABASE_URL,
    echo=True,
)

# 创建异步会话工厂
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

# 声明基类，用于 models.py 继承
Base = declarative_base()

# 依赖注入函数：在路由中获取数据库会话
async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()