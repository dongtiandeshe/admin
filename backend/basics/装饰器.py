'''
Author: Duanyt
Date: 2026-09-01 16:44:16
LastEditTime: 2026-09-01 16:59:31
LastEditors: Duanyt
Description: 
'''
# 装饰器
# 装饰器是一种可调用对象，通常是函数，它能接收一个函数作为参数，并且返回一个新函数
# 装饰器可以在不修改原函数代码的前提下，增强或改变原函数的功能

# 在不改变add函数前提下，给add函数增加打印欢迎词功能  

def say_hello(func):
    def wrapper(*args, **kwargs):
        print('你好啊，我要开始计算了')
        res = func(*args, **kwargs)
        return res
    return wrapper  


@say_hello      # 语法糖
def add(x, y):
    res = x + y
    # print(res)
    return res




# add_pro = say_hello(add)
# print(add_pro(52, 12))
print(add(12,14))
