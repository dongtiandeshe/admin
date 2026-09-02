'''
Author: Duanyt
Date: 2026-09-01 16:44:16
LastEditTime: 2026-09-02 09:00:30
LastEditors: Duanyt
Description: 
'''
# 装饰器
# 装饰器是一种可调用对象，通常是函数，它能接收一个函数作为参数，并且返回一个新函数
# 装饰器可以在不修改原函数代码的前提下，增强或改变原函数的功能

# 在不改变add函数前提下，给add函数增加打印欢迎词功能  

def say_hello(msg):
    def outer(func):
        def wrapper(*args, **kwargs):
            print(f'你好啊，我要开始{msg}计算了')
            res = func(*args, **kwargs)
            return res
        return wrapper 
    return outer 


@say_hello('加法')      # 语法糖装饰器
def add(x, y):
    res = x + y
    # print(res)
    return res
@say_hello('减法')      # 语法糖装饰器
def sub(x, y):
    return x - y
# add_pro = say_hello(add)
# print(add_pro(52, 12))
print(add(12,14))
print(sub(7, 2))
