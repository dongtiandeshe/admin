'''
Author: Duanyt
Date: 2026-08-31 10:06:05
LastEditTime: 2026-08-31 15:58:44
LastEditors: Duanyt
Description: 
'''
# 面向对象高级  

# 封装  python中没有真正的私有化机制
# 定义一个车的类    
from abc import ABC, abstractmethod


class Car:
    # 类属性，类属性可以通过类访问，也可以通过实例访问，类属性通常用与保存公共数据
    max_person = 7
    # 初始化方法，给当前正在创建的实例对象添加属性
    # self：当前正在创建的实例对象
    def __init__(self, color, brand, name, model, engine):
        self.color = color
        self.brand = brand
        self.name = name
        self._model = model     # 受保护的属性，当前类中、子类中，才可以访问
        self.__engine = engine      #前面加两个下划线表示私有制，python通过重命名属性名实现，__engine重命名为_Car.__engine，但是python没有真正的私有制，可以通过   _类名.__私有变量   来访问

    # 实例方法，定义在类中，供实例使用，可以被类调用，但是不推荐，因为需要传入实例作为self的值
    def start(self):
        print(f"{self.brand} {self.name} 正在启动......")

    def stop(self):
        print(f"{self.brand} {self.name} 停止暂停")
    
    def charge(self):
        print(f"{self.brand} {self.model} 正在补充燃料")

    # 注册engine属性的getter方法，方便将私有属性让外部访问  
    # 装饰器property，将方法改为属性，可以直接通过Car.engine访问返回值
    @property
    def engine(self):
        return self.__engine

    # 注册engine属性的setter方法，当修改Car实例的engine属性，会调用此方法
    @engine.setter
    def engine(self, value):
        self.__engine = value

    # 装饰器classmethod，装饰类方法，接收到的参数，当前类本身（cls）、自定义参数，类方法中可以访问类属性，
    # 类方法保存在类身上，需要类调用
    @classmethod
    def test(cls):
        print('测试类方法')

    # 工厂模式，不通过Car()的方法来创建实例，通过Person.create方法创建实例，car_info的格式是 color-brand-name-model-engine
    @classmethod
    def create(cls, car_info):
        color, brand, name, model, engine = car_info.split('-')
        return cls(color,brand,name,model,engine)       # 返回实例

    # 静态方法， 不会收到self、cls参数，接收到的参数都是自定义参数，通常定义与类相关的工具方法  
    @staticmethod   
    def print_method():    
        # 内部不会访问类或实例中的属性或方法
        print('我是静态方法')


# 继承  
class FuelCar(Car):     # 油车类  在括号内添加父类表示继承  油车类为车类的子类
    # 如果重写的时候需要调用父类的方法，可以使用  父类.方法名(self)/super().方法名()  
    def charge(self):
        super().charge()
        print(f"{self.brand} {self.model} 正在加油")
        

class ElectricCar(Car):   # 电车类
    # 重写父类方法
    def charge(self):
        print(f"{self.brand} {self.model} 正在充电")


# isinsatance(instance, Class) 判断某个对象是否为指定类或其子类的实例   
# issubclass(Class1,Class2) 判断某个类是否为某个类的子类


# 多继承   一个子类可以有多个父类
class HuaweiDriving():
    def __init__(self, control):
        self.charge = control
class Wenjie(Car, HuaweiDriving):             # 混动车
    # 重写初始化方法，多继承调用父类方法，推荐使用父类.方法()
    def __init__(self, color, brand, name, model, engine, control):
        super().__init__(color, brand, name, model, engine)
        HuaweiDriving.__init__(self, control)

# 这种写法不行，因为FuelCar的父类是Car， 继承图必须是有向无环图且保持单调性 
#      Car    
#     |    \
#     |     \
#     |    FuelCar
#     |        /
#     |       /
#   FuelAndElectricCar   

# class FuelAndElectricCar(Car, FuelCar, ElectricCar):
#     pass



# 多态   同一个方法，在不同的对象上调用，具有不同的表现形式
def handle_charge(car: Car):        # 这里的类型和ts不同，只是为了代码的可读性，并不强制执行
    car.charge()


# 抽象类，不能直接实例化，作为规范，让子类继承，并实现其中定义的抽象方法    
class MustRun(ABC):
    # 抽象方法    
    @abstractmethod
    def run(self):
        pass


if __name__ == '__main__':  
    car1 = FuelCar('黑色','宝马','BWM','x5','四缸')
    car1.charge()
    print(car1.color)
    # print(car1.__engine)  # 访问报错

    car2 = Wenjie('白色', '特斯拉' , '小段', 'x系列', '电发动机', '智驾')         # MRO   --   默认执行顺序，这里执行的方法按父类填入的顺序查找，子类没有重写的话，默认执行第一个父类的初始化方法
    # 实例.__dict__ 方法可以查看实例身上的所有属性
    print(car2.__dict__)    

    handle_charge(FuelCar('黑色','宝马','BWM','x5','四缸'))
    handle_charge(ElectricCar('白色','特斯拉','TSL','运动','电机')) 


    # 魔法方法，以__xxx__命名的特殊方法，会被自动调用