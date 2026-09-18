'''
Author: Duanyt
Date: 2026-08-27 16:04:42
LastEditTime: 2026-09-14 11:23:23
LastEditors: Duanyt
Description: 
'''
from fastapi import FastAPI, Depends, HTTPException, Query, Path
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database import engine, get_db, Base
from models import User
from pydantic import BaseModel, Field
from typing import Annotated
from fastapi.responses import HTMLResponse, FileResponse

# ---------- 1. 定义 Pydantic 校验模型（相当于 DTO） ----------
class UserCreate(BaseModel):
    name: str = Field(max_length=5,default="无名")      # Field对请求体的字段进行限制
    email: str

class UserResponse(BaseModel):
    name: str
    email: str

# ---------- 2. 创建 FastAPI 实例 ----------
app = FastAPI(title="我的全栈小项目")

# 中间件是一个在每个请求被任何特定的路径操作处理之前，以及每个响应返回之前运行的函数。
@app.middleware('http')
async def middleware1(request, call_next):
    print('中间件1 start')
    response = await call_next(request)
    print('中间件1 end')
    return response
# 执行顺序： 自下而上
# response route->middleware1->middleware2
# request middleware2 -> middleware1 -> route
# 打印顺序
# 中间件2 start
# 中间件1 start
# 中间件1 end
# 中间件2 end
@app.middleware('http')
async def middleware2(request, call_next):
    print('中间件2 start')
    response = await call_next(request)
    print('中间件2 end')
    return response


# 依赖项，代码逻辑复用，减少代码量
# 1 创建依赖性
async def common_params(
        skip: int = Query(default=0, ge=0),
        limit: int = Query(default=10, le=60)
):
    return {"skip": skip, "limit": limit}
# 2.在路由上面使用Depends注入依赖性
@app.get("/users/list")
async def get_users_list(commons=Depends(common_params)):
    return commons

# 路径参数
# 路径参数不能设置默认值
@app.get("/users/{userId}")
def get_users_by_id(userId: int):
    return {'userId': userId}   

# 查询参数  路由中?后面拼接的参数，这个test后面加不加/都无所谓
# 有默认值的非路径参数不是必需的，设置参数为必需时，可以不用声明默认值， 默认值可以为None，
# 如果希望参数能接收None，但是是必需参数，可以这么定义 skip: int | None ,不设置默认值
@app.get('/users')
async def read_item(skip: int = 0, limit: int = 10):     # None表示非必须参数
    fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]
    # 从集合skip开始截取，到skip+limit结束
    return fake_items_db[skip : skip + limit]

# 请求体，前端传入json数据格式的参数时可用  
# 自定义返回格式
@app.post("/users", response_model=UserResponse)
async def create_user(user: UserCreate):
    return user 
    

# 对请求参数进行限制    
@app.get("/items/{item_id}")
async def read_items(item_id: Annotated[int | None, Path(description='对路径参数进行限制')], q: Annotated[str | None, Query(max_length=50)] = None):    # 对输入的q进行长度限制， Query查询参数进行限制、Path是对路径参数进行限制
    results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
    if q:
        results.update({"q": q})
    return results, item_id

# 返回html格式接口  
@app.get('/html', response_class=HTMLResponse)  # 这种方法接口只能返回html的格式
async def get_html():
    return '<h1>hello world</h1>'

# 返回文件格式接口
@app.get('/files')
async def get_file():
    path = './测试文档.txt'
    return FileResponse(path)   

# 异常响应处理
@app.get('/find')
async def find_id(id: int):
    ids = [1,2,3,5,6,8,9]
    if id not in ids:
        return HTTPException(status_code=404, detail="未找到id")
    return {"id" : id}