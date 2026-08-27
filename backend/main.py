from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database import engine, get_db, Base
from models import User
from pydantic import BaseModel as PydanticBaseModel

# ---------- 1. 定义 Pydantic 校验模型（相当于 DTO） ----------
class UserCreate(PydanticBaseModel):
    name: str
    email: str

class UserResponse(PydanticBaseModel):
    id: int
    name: str
    email: str

# ---------- 2. 创建 FastAPI 实例 ----------
app = FastAPI(title="我的全栈小项目")

# ---------- 3. 启动时自动创建数据表（相当于 npm run build 生成数据库结构） ----------
@app.on_event("startup")
async def init_db():
    async with engine.begin() as conn:
        # 创建所有定义好的表
        await conn.run_sync(Base.metadata.create_all)

# ---------- 4. 写两个真实接口：创建用户 + 查询用户列表 ----------

# POST 接口：创建用户（类似于前端发起的注册请求）
@app.post("/users/", response_model=UserResponse)
async def create_user(user: UserCreate, db: AsyncSession = Depends(get_db)):
    # 检查邮箱是否已存在
    existing_user = await db.execute(select(User).where(User.email == user.email))
    if existing_user.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="邮箱已被注册")
    
    # 创建新用户
    new_user = User(name=user.name, email=user.email)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user

# GET 接口：获取所有用户列表
@app.get("/users/", response_model=list[UserResponse])
async def get_users(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User))
    users = result.scalars().all()
    return users