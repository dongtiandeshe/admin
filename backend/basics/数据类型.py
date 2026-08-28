'''
Author: Duanyt
Date: 2026-08-28 11:09:41
LastEditTime: 2026-08-28 14:16:49
LastEditors: Duanyt
Description: 
'''
# type方法类似与js的typeof，返回数据类型
print(type({}))

# 整数可以用下划线作分组，方便阅读
salary = 320_000_000

print(salary)       # 打印出来并没有下划线  

# 浮点数的科学计数法    
speed = 3e+2        # 300   

# 字符串格式化输出
name='snake'
gender='女'
# 占位符
info = '我叫 %s , 我是 %s生' %(name, gender)
print(info)
# f-string
print(f'这是浮点数{speed}')     

# 占位符的精度控制  
# 在百分号和字母中间可以加入  m.n  数字，     m控制可以显示的最小长度，n控制可以显示的最大长度  

print('我的月工资是 %.2s' %(salary))        #最长可以显示2位数字，优先判断n再进行m判断  
