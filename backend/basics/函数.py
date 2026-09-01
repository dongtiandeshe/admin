'''
Author: Duanyt
Date: 2026-08-28 16:00:10
LastEditTime: 2026-09-01 14:03:25
LastEditors: Duanyt
Description: 
'''
def greet(name, age, gender, height):
    print(f'我的名字是{name}, 我的年纪是{age}，我的性别是{gender}，我的身高是{height}')

# 传入位置参数  
greet('小猪佩奇',5,'男','60cm')     # 参数位置不可随意交换  

# 传入关键字参数    
greet(height='161cm', gender='女', name='大美女', age=18)       

# 位置参数和关键字参数可以混用，不过位置参数必须在关键字参数前面    

# 限制传参的方式， / 前面只能用位置参数， * 后面只能用关键字参数    
def hello(name, /, age, *, habits):    
    '''打招呼'''
    print(f'hello{name},age{age},habits{habits}')   

hello('snake', 18, habits='看书')
# hello(name='小王', age=15, habits='运动')   这是不行的    

# 可变参数 *args 位置参数，传入的是列表    **kwargs  关键字参数，传入的是元组   
# 列表
# 元组  -- 相当于不可变更的列表，已括号包裹数据 

list = [1,2,3,5,86,45]
tuple = ('你好','北京')

# 打包接收参数
def test(*args):
    print(f'{args},{type(args)}')

def test1(**kwargs):
    print(f'{kwargs},{type(kwargs)}')

# 解包传递参数
test(*list)
test(*tuple)    


# python中的集合类似与js的map，但是用{}包裹         



# 高阶函数：接收的参数是函数或者返回的值是函数      
def info(msg):
    return '[提示]：' + msg

def warn(msg):
    return '[警告]：' + msg

def log(func, text):
    print(func(text))

log(info, '文件保存成功')       


# 匿名函数  使用场景：当一个函数只用一次，做一点点小事，使用匿名函数会更简洁
# lambda:关键字，定义匿名函数，text参数，'我是'+text表达式
printInfo = lambda text: '我是'+text
print(printInfo('段'))