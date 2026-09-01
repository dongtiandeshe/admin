'''
Author: Duanyt
Date: 2026-08-28 16:26:13
LastEditTime: 2026-08-31 09:59:34
LastEditors: Duanyt
Description: 
'''
s1 = {10,50,42,62,8,4,3,5}
# 集合的改使用remove+add方法来进行  

# 用成员运算符来判断元素是否存在
isExit = 10 in s1
print(isExit)   

# 集合A.difference(集合B)方法，返回集合A中，不同与集合B中的元素，返回新集合  

# 集合A.differenec_update(集合B)方法，从集合A中，删除集合B中存在的元素

# 集合A.union(集合B)方法，合并两个集合，返回一个新的集合    

# 集合A.issubset(集合B)方法，判断集合A是否为集合B的子集 

# 集合A.issuperset(集合B)方法，判断集合A是否为集合B的超集 

# 集合A.isdisjoint(集合B)方法，判断集合A和集合B是否没有交集 

'''
集合的数学运算  
并集    s1 | s2 
交集    s1 & s2 
差集    s1 - s2
对称差集    s1 ^ s2     相当于 s1和s2的并集减去 s1和s2 的交集    
'''     


# 字典，相当于js的对象  
dict1 = {
    '张三': 100,
    '李四': 99,
    '王五': 88,         # key不能重复，重复的话后面的值会覆盖前面的值
}

# 查询  
score = dict1['张三']
score1 = dict1.get('奥特曼')            # 安全取值，key不存在会返回默认值，没有默认会返回None   

# 修改  
dict1.update({'李四':60,'王五': 100})

# 删除  
del dict1['张三']
value1 = dict1.pop('李四')      # 会返回这个key所对应的值，也可以设置默认值，保证key不存在的时候出现报错        

# keys方法，用于获取字典中所有的键
keys = dict1.keys()

# 返回的值不是list类型，而是dict_keys类型，该类型可以被遍历，不能通过下标访问元素   

# values方法，用于返回字典中所有的值，返回的是dict_values类型，特点和dict_keys一样  

# items方法，获取字典中所有的键值对，每组键值对用元组返回
