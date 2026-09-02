'''
Author: Duanyt
Date: 2026-09-01 16:44:16
LastEditTime: 2026-09-02 09:29:08
LastEditors: Duanyt
Description: 
'''
# 装饰器
# 装饰器是一种可调用对象，通常是函数，它能接收一个函数作为参数，并且返回一个新函数
# 装饰器可以在不修改原函数代码的前提下，增强或改变原函数的功能

# 在不改变add函数前提下，给add函数增加打印欢迎词功能  
# 类装饰器
def say_hello(msg):
    def outer(func):
        def wrapper(*args, **kwargs):
            print(f'你好啊，我要开始{msg}计算了')
            res = func(*args, **kwargs)
            return res
        return wrapper 
    return outer 

# 类装饰器，包含__cal__ 方法的类，就是类装饰器，像调用函数一样，去调用类装饰器的实例对象，就会触发__call__方法的调用
class SayHello:
    def __call__(self, func):
        def wrapper(*args, **kwargs):
            print('我是类装饰器')
            return func(*args, **kwargs)
        return wrapper

@say_hello('加法')      # 语法糖装饰器
@SayHello()
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



def test1(func):
    def wrapper(*args, **kwargs):
        print('test1追加逻辑')
        return func(*args, **kwargs)
    return wrapper


def test2(func):
    def wrapper(*args, **kwargs):
        print('test2追加逻辑')
        return func(*args, **kwargs)
    return wrapper

@test1
@test2
def add_test(x, y):
    return x+y

print(add_test(2,8))

