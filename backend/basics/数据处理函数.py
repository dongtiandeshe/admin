'''
Author: Duanyt
Date: 2026-09-01 14:11:38
LastEditTime: 2026-09-01 16:38:27
LastEditors: Duanyt
Description: 
'''
# map 函数  
nums = [10,30,40,20]
            # 操作函数       可迭代函数
result = map(lambda x: x*2, nums)

print(result)   #并没有返回 [20,60,80,40]
print(list(result))
print(nums)     # nums并没有发生改变        

# 注意点：map不会立即计算，只有在需要结果的时候才会计算，返回的是迭代器对象，遍历完成后，就会被“耗尽”，可以用一个变量保存遍历的结果

# filter函数，注意点和map函数一样，可能会影响原来元素数量    
result1 = filter(lambda n: n>30, nums)
print(list(result1))    

# sorted函数 排序函数   
result2 = sorted(nums, key=None, reverse=True)
print(result2)

names = ['java', 'python', 'sql']
result3 = sorted(names, key=len)
print(result3)

# reduce函数，将一组数据不断“合并”，最终归并成一个结果，reduce(合并函数, 可迭代对象, 初始值)
from functools import reduce    
result4 = reduce(lambda a,b:a+b, nums)
print(result4)      


# 列表推导式    
# [表达式 for 变量 in 可迭代对象]

# 闭包  
def outer():
    num = 10
    print('num的地址是'+ hex(id(num)))
    def inner():
            nonlocal num        # 这里是修改外部作用域的num
            num += 1
            print(num)
    return inner

f = outer()
# f()

# outer函数中，被inner所使用的变量，会被封存在闭包单元中，
# 用 __closure__ 打印闭包单位
print(f.__closure__)

print(f.__closure__[0].cell_contents)

# 注意点：调用n次外层函数，就会得到n个不同的闭包，并且这些闭包之间互不影响。内层函数中使用的外层变量是可变对象，多个闭包之间仍然互补影响