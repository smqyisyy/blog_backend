# Python介绍

## python起源

**Python的创始人为荷兰人 吉多 范罗苏姆（Gudio van Rossum）**

![img](01.python基础知识/timg)

1.1989年的圣诞节期间，吉多·范罗苏姆为了在阿姆斯特丹打发时间，决心开发一个新的**解释程序**，作为ABC语言的一种继承。

2.ABC是由吉多参加设计的一种教学语言，就吉多本人看来，ABC这种语言非常优美和强大，是**专门为非专业程序员设计的**。但是ABC语言并没有成功，究其原因，吉多认为是**非开发**造成的。吉多决心在Python中避免这一错误，并获取了非常好的效果。

3.之所以选中Python（蟒蛇）作为程序的名字，是因为他是BBC电视剧--蒙提·派森的飞行马戏团（Monty Python’s Flying Circus）的爱好者。

4.1991年，第一个Python**解释器**诞生，它是用C语言实现的，并能够调用C语言的库文件。

###  **python的设计目标**

1. 一门**简单直观的语言**并与主要竞争者一样强大
2. **开源**，以便任何人都可以为它做贡献　　　
3. 代码**像纯英语那样容易理解**
4. 适用于**短期**开发的日常任务

### python设计哲学

![image-20201114134732301](01.python基础知识/image-20201114134732301.png)

1. Python开发者的哲学是：**用一种方法，最好是只有一种方法来做一件事**
2. 如果面临多种选择，Python开发者一般会拒绝花俏的语法，而选择**明确没有或很少有歧义的语法**

### 为什么使用python

吉多有一句名言：Life is short, I need python（人生苦短，我用python！）

同一样问题，用不同的语言解决，代码量差距还是很多的，一般情况下Python是Java的**1/5**，所以说**人生苦短，我用Python。**

# 安装python

## 下载python

- 打开官网：https://www.python.org/downloads/

- 找到对应的版本，这里选择版本3.9

![image-20201112143422692](01.python基础知识/image-20201112143422692.png)



- 打开安装包，添加环境变量，可以选择默认安装或者自定义安装（一般自定义安装主要是修改安装路径）

![image-20201112152715996](01.python基础知识/image-20201112152715996.png)



## python编辑器

### vim编辑器

略

### Sublim Text

Sublime Text 是一个代码编辑器（Sublime Text 2是收费软件，但可以无限期试用）

Sublime Text是由程序员Jon Skinner于2008年1月份所开发出来，它最初被设计为一个具有丰富扩展功能的Vim。

Sublime Text具有漂亮的用户界面和强大的功能，例如代码缩略图，Python的插件，代码段等。

还可自定义键绑定，菜单和工具栏。Sublime Text 的主要功能包括：拼写检查，书签，完整的 Python API ， Goto 功能，即时项目切换，多选择，多窗口等等。

Sublime Text 是一个跨平台的编辑器，同时支持Windows、Linux、Mac OS X等操作系统。

下载地址：http://www.sublimetext.com/3

![image-20201113095957538](01.python基础知识/image-20201113095957538.png)

![image-20201113101038383](01.python基础知识/image-20201113101038383.png)

### IDLE编辑器

最大的优点是可以及时验证比较简单的代码

![image-20201113163430912](01.python基础知识/image-20201113163430912.png)

### pycharm编辑器

下载地址：http://www.jetbrains.com/pycharm/download/#section=windows

因为社区版可能会缺少部分功能，所以直接选择专业版

Create Desktop Shortcut：创建桌面快捷方式图标，建议勾选64-bit launcher；

Update context menu：是否将从文件夹打开项目添加至鼠标右键，根据需要勾选；

Create Associations：关联文件格式，不推荐勾选，一般都是使用如Sublime Text、EditPlus等轻量级文本编辑器打开；

 Update PATH variable (restart needed)：是否将IDEA启动目录添加到环境变量中，即可以从命令行中启动IDEA，根据需要勾选：



激活

1. 下载补丁包
2. 打开pycharm，首先选择免费使用
3. 将补丁包拖进pycharm，然后选择restart
4. 然后输入指定的安装参数
5. 查看help-->register

![image-20201113213703020](01.python基础知识/image-20201113213703020.png)

# 运行python代码

在硬盘创建文件 t1.py，并且使用 PyCharm 打开，输入以下代码

```python
print('Hello World!')
```

然后右键运行
 ![img](01.python基础知识/3459300728.png) 
运行结果

```python
C:\Users\Aaron\AppData\Local\Programs\Python\Python35\python.exe C:/Users/Aaron/Desktop/py/t1.py
Hello World!

Process finished with exit code 0
```

# 注释

单行注释：# 被注释内容
多行注释：''' 被注释内容 '''，或者 """ 被注释内容 """

# 变量

变量是什么？   变量：把程序运行的中间结果临时的存在内存里，以便后续的代码调用。

变量就是用来存储数据的地址的名称

## 声明变量

```python
a = "Hello World!"
print(a)
```

## 变量定义的规则

- 变量名只能是 字母、数字或下划线的任意组合
- 变量名的第一个字符不能是数字
- 以下关键字不能声明为变量名
- ['and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'exec', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'not', 'or', 'pass', 'print', 'raise', 'return', 'try', 'while', 'with', 'yield']
- 变量的定义要具有可描述性，见名知意。

## 变量命名方法

参考博客

https://blog.csdn.net/fcauto2012/article/details/69950863

## 变量的赋值

将某个数据赋值给某个变量存储

```python
a = "变量1"
b = "变量2"
```

 ![img](01.python基础知识/1140672815.png) 

```python
a = "变量1"
b = a
```

 ![img](01.python基础知识/4238420988.png) 

**常量**

常量即指不变的量，如 pai 3.141592653..., 或在程序运行过程中不会改变的量。

# 程序交互

## 输入

```python
name = input("请输入姓名：")
print(name)
```

执行脚本就会发现，程序会等待你输入姓名后再往下继续走。

```python
请输入姓名：Aaron
Aaron
```

## 格式化输出

```python
name = input("姓名：")
age = input("年龄：")
job = input("工作：")
info = '''
----------- info of %s -----------
姓名：%s
年龄：%s
工作：%s
''' % (name,name,age,job)
print(info)
```

运行结果

```python
姓名：Aaron
年龄：18
工作：Teacher
----------- info of Aaron -----------
姓名：Aaron
年龄：18
工作：Teacher
```

占位符

- *s，获取传入对象的__str__方法的返回值，并将其格式化到指定位置*
- *r，获取传入对象的__repr__方法的返回值，并将其格式化到指定位置*
- *c，整数：将数字转换成其unicode对应的值，10进制范围为 0 <= i <= 1114111（py27则只支持0-255）；字符：将字符添加到指定位置*
- *o，将整数转换成 八  进制表示，并将其格式化到指定位置*
- *x，将整数转换成十六进制表示，并将其格式化到指定位置*
- *d，将整数、浮点数转换成 十 进制表示，并将其格式化到指定位置*
- *e，将整数、浮点数转换成科学计数法，并将其格式化到指定位置（小写e）*
- *E，将整数、浮点数转换成科学计数法，并将其格式化到指定位置（大写E）*
- *f， 将整数、浮点数转换成浮点数表示，并将其格式化到指定位置（默认保留小数点后6位）*
- *F，同上*
- *g，自动调整将整数、浮点数转换成 浮点型或科学计数法表示（超过6位数用科学计数法），并将其格式化到指定位置（如果是科学计数则是e；）*
- *G，自动调整将整数、浮点数转换成 浮点型或科学计数法表示（超过6位数用科学计数法），并将其格式化到指定位置（如果是科学计数则是E；）*
- *%，当字符串中存在格式化标志时，需要用 %%表示一个百分号*

# 基础数据类型

## 整数型（int）

在 32 位机器上，整数的位数为 32 位，取值范围为 -2\*\*31～2\*\*31-1，即 -2147483648～2147483647

在 64 位系统上，整数的位数为 64 位，取值范围为 -2\*\*63～2\*\*63-1，即 -9223372036854775808～9223372036854775807

<font color=red>注意：在 Python3 里不再有 long 类型了，全都是 int</font>

```python
a = 2**64
print(type(a))    #type()是查看数据类型的方法

b = 2**60
print(type(b))
```

运行结果

```python
<class 'int'>
<class 'int'>
```

## 布尔值（True, False)

布尔类型很简单，就两个值 ，一个 True(真)，一个 False(假), 主要用记逻辑判断

```python
a = 3
b = 5
print(a < b, a > b , a != b)
```

运行结果

```python
True False True
```

## 字符串 str

在 Python 中, 加了引号的字符都被认为是字符串！

```python
a = "Eagle's Lab"
b = '''
欢迎大家来到英格科技!
今天我们学习python!'''

print(a,b)
```

运行结果

```python
Eagle's Lab 
欢迎大家来到英格科技!
今天我们学习python!
```

字符串拼接

```python
a = 'eagle '
b = 'welcome '
print(b + a,'*' * 3,a * 3)
```

运行结果

```python
welcome eagle  *** eagle eagle eagle
```



### 字符串的索引与切片

```python
a = 'ABCDEFGHIJK'

print(a[0], a[-11])
print(a[3])
print(a[5])
print(a[7])

a = 'ABCDEFGHIJK'
print(a[0:3])
print(a[2:5])
print(a[0:]) #默认到最后
print(a[0:-1]) # -1 是列表中最后一个元素的索引，但是要满足顾头不顾腚的原则，所以取不到K元素
print(a[0:5:2]) #加步长
print(a[5:0:-2]) #反向加步长
```

运行结果

```python
A
D
F
H
ABC
CDE
ABCDEFGHIJK
ABCDEFGHIJ
ACE
FDB
```

### 字符串常用方法

```python
words = "beautiful is better than ugly."
print(words.capitalize())   #首字母大写
print(words.swapcase())     #大小写翻转
print(words.title())        #每个单词的首字母大写



# 内容居中，总长度，空白处填充
a = "test"
ret = a.center(20,"*")
print(ret)


# 统计字符串中的元素出现的个数
ret = words.count("e",0,30)
print(ret)

# startswith 判断是否以...开头
# endswith 判断是否以...结尾
a = "aisdjioadoiqwd12313assdj"
print(a.startswith("a"))
print(a.endswith("j"))
print(a.startswith('sdj',2,5))
print(a.endswith('ado',7,10))


# 寻找字符串中的元素是否存在
print(a.find('sdj',1,10))   # 返回的找到的元素的索引，如果找不到返回-1
print(a.index('sdj',1,10))  # 返回的找到的元素的索引，找不到报错。


# split 以什么分割，最终形成一个列表此列表不含有这个分割的元素。
ret = words.split(' ')
print(ret)
ret = words.rsplit(' ',2) # 加数字指定分割次数
print(ret)


# format的三种玩法 格式化输出
print('{} {} {}'.format('aaron',18,'teacher'))
print('{1} {0} {1}'.format('aaron',18,'teacher'))
print('{name} {age} {job}'.format(job='teacher',name='aaron',age=18))


# strip
a = '****asdasdasd********'
print(a.strip('*'))
print(a.lstrip('*'))
print(a.rstrip('*'))


# replace
print(words.replace('e','a',2)) # 字符串从左向右开始，把e替换成a，一共替换两次
print(words.isalnum()) #字符串由字母或数字组成
print(words.isalpha()) #字符串只由字母组成
print(words.isdigit()) #字符串只由数字组成
```

# 基本运算符

算数运算

| 运算符 | 描述             | 示例           |
| ------ | ---------------- | -------------- |
| +      | 两个对象进行相加 | 10 + 10结果20  |
| -      | 两个对象进行相减 | 20 - 10结果10  |
| *      | 两个数相乘       | 10 * 10结果100 |
| /      | 两个数相除       | 100 / 10结果10 |
| %      | 返回除法后的余数 | 9 % 2结果1     |
| **     | 返回幂次方       | 2**4结果16     |
| //     | 取整             | 9 // 2结果4    |


比较运算

| 运算符 | 描述                               | 示例               |
| ------ | ---------------------------------- | ------------------ |
| ==     | 判断两个对象是否相等               | 10 == 10结果True   |
| !=     | 判断两个对象是否不相等             | 10 != 20结果True   |
| <>     | 判断两个对象是否不相等             | 10 <> 20结果True   |
| >      | 判断两个对象是否大于               | 10 > 20结果为False |
| <      | 判断两个对象是否小于               | 10 < 20结果为False |
| <=或>= | 判断两个对象是否小于等于或大于等于 | 10 <= 10结果为True |

赋值运算

| 运算符 | 描述       | 示例                  |
| ------ | ---------- | --------------------- |
| =      | 简单的赋值 | c = 10                |
| +=     | 加等于     | c += 10等同于c = c+10 |
| -=     | 同上       | 同上                  |
| *=     | 同上       | 同上                  |
| /=     | 同上       | 同上                  |
| **=    | 同上       | 同上                  |
| //=    | 同上       | 同上                  |


逻辑运算

| 运算符 | 描述                                             | 示例                                                     |
| ------ | ------------------------------------------------ | -------------------------------------------------------- |
| and    | “与”运算，两边同为真则为真，否则为假             | 10 > 5 and 6 == 6结果为True，10 < 20 and 20 < 3结果False |
| or     | “或”运算，两边只要出现真则为真，两边全部假则为假 | 10 > 5 or 6 == 7结果为True，10 > 20 or 20 < 3结果False   |
| not    | “非”运算，将原来的值取反，真的变为假，假的变为真 | not 10 >5结果False，not 10 > 20结果为真                  |


在没有 () 的情况下 not 优先级高于  and，and 优先级高于 or，即优先级关系**为()>not>and>or**，同一优先级从左往右计算。

x or y , x 为真，值就是 x，x 为假，值是 y； x and y, x 为真，值是 y,x 为假，值是 x。

成员运算
 ![img](01.python基础知识/2608607566.png) 

```python
print('a' in 'abcd')
print('y' not in 'xyzasd')
```

运行结果

```python
True
False
```

**Python 运算符优先级**
以下表格列出了从最高到最低优先级的所有运算符：

| 运算符                   | 描述                                                   |
| ------------------------ | ------------------------------------------------------ |
| **                       | 指数 (最高优先级)                                      |
| ~ + -                    | 按位翻转, 一元加号和减号 (最后两个的方法名为 +@ 和 -@) |
| * / % //                 | 乘，除，取模和取整除                                   |
| + -                      | 加法减法                                               |
| >> <<                    | 右移，左移运算符                                       |
| &                        | 位 'AND'                                               |
| ^                        | 位运算符                                               |
| <= < > >=                | 比较运算符                                             |
| <> == !=                 | 等于运算符                                             |
| = %= /= //= -= += *= **= | 赋值运算符                                             |
| is is not                | 身份运算符                                             |
| in not in                | 成员运算符                                             |
| not and or               | 逻辑运算符                                             |

# python数据类型

## 元祖 tuple

元组被称为只读列表，即数据可以被查询，但不能被修改。

tuple其实不可变的是地址空间，如果地址空间里存的是可变的数据类型的话，比如列表就是可变的

参考博客

https://blog.csdn.net/machi1/article/details/86601119

## 列表 list

列表相比于字符串，不仅可以储存不同的数据类型，而且可以储存大量数据，32 位 python 的限制是 536870912 个元素,64 位 python 的限制是 1152921504606846975 个元素。而且列表是有序的，有索引值，可切片，方便取值。

### 增

```python
li = [1,'a',2,'d',4]
li.insert(0,22)     # 按照索引去增加
print(li)
li.append('ddd')    # 增加到最后
print(li)
li.extend(['q,a,w'])    # 迭代的去增
print(li)
li.extend(['q,a,w','das'])    # 迭代的去增
print(li)
```

运行结果

```python
[22, 1, 'a', 2, 'd', 4]
[22, 1, 'a', 2, 'd', 4, 'ddd']
[22, 1, 'a', 2, 'd', 4, 'ddd', 'q,a,w']
[22, 1, 'a', 2, 'd', 4, 'ddd', 'q,a,w', 'q,a,w', 'das']
```

### 删

```python
li = [1,'a',2,'d',4,5,'f']
a = li.pop(1)  # 按照位置去删除，有返回值
print(a)
del li[1:3]     # 按照位置去删除，也可切片删除没有返回值。
print(li)
li.remove('f')
print(li)
li.clear()
print(li)
```

运行结果

```python
a
[1, 4, 5, 'f']
[1, 4, 5]
[]
```

### 改

```python
li = [1,'a',2,'d',4,5,'f']
li[1] = 'aaa'
print(li)
li[2:3] = [3,'e']
print (li)
```

运行结果

```python
[1, 'aaa', 2, 'd', 4, 5, 'f']
[1, 'aaa', 3, 'e', 'd', 4, 5, 'f']
```

### 查

切片去查，或者循环去查。

### 其他操作

```python
li = [1,2,4,5,4,2,4]
print (li.count(4))     # 统计某个元素在列表中出现的次数
print (li.index(2))     # 用于从列表中找出某个值第一个匹配项的索引位置
li.sort()               # 用于在原位置对列表进行排序
print (li)
li.reverse()            # 将列表中的元素反向存放
print (li)
```

运行结果

```python
3
1
[1, 2, 2, 4, 4, 4, 5]
[5, 4, 4, 4, 2, 2, 1]
```

## 字典dict

字典是python中唯一的映射类型，采用键值对（key-value）的形式存储数据。python对key进行哈希函数运算，根据计算的结果决定value的存储地址，所以字典是无序存储的，且key必须是可哈希的。可哈希表示key必须是不可变类型，如：数字、字符串、元组。

从python3.6以后字典就是有顺序的了

参考博客

https://www.cnblogs.com/xieqiankun/p/python_dict.html



![img](01.python基础知识/@_]ZKGM2PF2F1R]U]SBTOC.png)

### 增

```python
dic = {"age":18, "name":"aaron"}

dic['li'] = ["a","b","c"]
print(dic)

dic.setdefault('k','v')
# 在字典中添加键值对时，如果指定的键已经存在则不做任何操作,如果原字典中不存在指定的键值对，则会添加。
print(dic)

dic.setdefault('k','v1')
print(dic)
```

### 删

```python
dic = {"age":18, "name":"aaron"}

dic_pop = dic.pop('age')
# pop根据key删除键值对，并返回对应的值，如果没有key则返回默认返回值
print(dic_pop)

dic_pop = dic.pop('sex','查无此项')
print(dic_pop)

dic['age'] = 18
print(dic)


del dic['name']
print(dic)

dic['name'] = 'demo'
dic_pop = dic.popitem()
# 删除字典中的某个键值对，将删除的键值对以元祖的形式返回
print(dic_pop)

dic_clear = dic.clear()
# 清空字典
print(dic,dic_clear)
```

### 改

```python
dic = {"age":18, "name":"aaron", 'sex':'male'}
dic2 = {"age":30, "name":'demo'}

dic2.update(dic)
# 将dic所有的键值对覆盖添加（相同的覆盖，没有的添加）到dic2中
print(dic2)

dic2['age'] = 30
print(dic2)
```

### 查

```python
dic = {"age":18, "name":"aaron", 'sex':'male'}

value = dic['name']
# 没有会报错
print(value)

value = dic.get('abc','查无此项')
print(value)
```

### 其他操作

```python
dic = {"age":18, "name":"aaron", 'sex':'male'}

for i in dic.items():
    # 将键和值作为元祖列出
    print(i)

for key,value in dic.items():
    print(key,value)

for i in dic:
    # 只是迭代键
    print(i)

keys = dic.keys()
print(keys,type(keys))

value = dic.values()
print(value,type(value))
```

## 集合set

集合是**无序**的，**不重复**，**确定性**的数据集合，它里面的元素是可哈希的(不可变类型)，但是集合本身是不可哈希（所以集合做不了字典的键）的。以下是集合最重要的两点：

- 去重，把一个列表变成集合，就自动去重了。
- 关系测试，测试两组数据之前的交集、差集、并集等关系。

### 创建集合

```python
set1 = set({1,2,'barry'})
set2 = {1,2,'barry'}

print(set1,set2)
```

### 集合的增

```python
set1 = {'abc','def',123,'asdas'}

# add()函数的参数只能接收可哈希数据类型，即不可变数据类型，
比如整型、浮点型、元组、字符串
set1.add('qwer')
print(set1)

# 我们使用update()向集合中添加元素时，update接收的参数应该是可迭代的数据类型，比如字符串、元组、列表、集合、字典。这些都可以向集合中添加元素，但是整型、浮点型不可以。
set1.update('A')
#update：迭代着增加
print(set1)

set1.update('哈哈哈')
print(set1)

set1.update([1,2,3])
print(set1)
```

### 集合的删

```python
set1 = {'abc','def',123,'asdas'}

set1.remove('abc')
print(set1)

set1.pop()
# 随机删除一个数
print(set1)

set1.clear()
# 清空合集
print(set1)

del set1
# 删除合集
print(set1)
```

### 集合的其他操作

#### 交集（&  或者 intersection）

取出两个集合共有的元素

```python
set1 = {1,2,3,4,5}
set2 = {3,4,5,6,7}

print(set1 & set2)

print(set1.intersection(set2))

# 列出两个集合中共同拥有的项
```

#### 并集（| 或者 union）

合并两个集合的所有元素

```python
set1 = {1,2,3,4,5}
set2 = {3,4,5,6,7}

print(set1 | set2)

print(set2.union(set1))

# 列出两个集合中所有的项
```

#### 差集（- 或者 difference）

第一个集合去除二者共有的元素

```python
set1 = {1,2,3,4,5}
set2 = {3,4,5,6,7}

print(set1 - set2)

print(set1.difference(set2))

# 在set1中删除set2中有的项
```

#### 反交集 （^ 或者 symmetric_difference）

先合并，再去除共有元素

```python
set1 = {1,2,3,4,5}
set2 = {3,4,5,6,7}

print(set1 ^ set2)

print(set1.symmetric_difference(set2))

# 显示set1和set2不共存的项
```

#### 子集与超集

当一个集合的所有元素都在另一个集合里，则称这个集合是另一个集合的子集，另一个集合是这个集合的超集

```python
set1 = {1,2,3}
set2 = {1,2,3,4,5,6}

print(set1 < set2)
print(set1.issubset(set2))  # 这两个相同，都是说明set1是set2子集。

print(set2 > set1)
print(set2.issuperset(set1))  # 这两个相同，都是说明set2是set1超集
```

#### frozenset不可变集合，让集合变成不可变类型

```python
set1 = {1,2,3,4,5,6}

s = frozenset(set1)
print(s,type(s))

s.add(7) # 不可以修改,会报错
```

# 数据类型的总结

## 按存储空间的占用分（从低到高）

1. 整型
2. 字符串
3. 集合：无序，即无序存索引相关信息
4. 元组：有序，需要存索引相关信息，不可变
5. 列表：有序，需要存索引相关信息，可变，需要处理数据的增删改
6. 字典：有序，需要存key与value映射的相关信息，可变，需要处理数据的增删改

## 按存值个数区分

| 标量／原子类型 | 数字，字符串     |
| :------------- | :--------------- |
| 容器类型       | 列表，元组，字典 |

## 按可变不可变区分

| 可变   | 列表，字典                 |
| :----- | :------------------------- |
| 不可变 | 数字，字符串，元组，布尔值 |
| 可变   | 列表、字典、集合           |

## 按访问顺序区分

| 直接访问              | 数字                     |
| :-------------------- | :----------------------- |
| 顺序访问（序列类型）  | 字符串，列表，元组，字典 |
| key值访问（映射类型） | 集合                     |

# 流程控制之 --if

![image-20210116222343135](01.python基础知识/image-20210116222343135.png)

单分支

```python
if 条件:
    满足条件后要执行的代码
```

双分支

```python
"""
if 条件:
    满足条件执行代码
else:
    if条件不满足就走这段
"""
age = 48

if age > 50 :
    print("尚能饭否")
else:
    print("廉颇老矣")
```

运行结果

```python
廉颇老矣
```

if...else ... 可以有多个分支条件

```python
if 条件:
    满足条件执行代码
elif 条件:
    上面的条件不满足就走这个
elif 条件:
    上面的条件不满足就走这个
elif 条件:
    上面的条件不满足就走这个    
else:
    上面所有的条件不满足就走这段
```

```
# 例3：if语句多个条件
 
num = 9
if num >= 0 and num <= 10:    # 判断值是否在0~10之间
    print 'hello'
# 输出结果: hello
 
num = 10
if num < 0 or num > 10:    # 判断值是否在小于0或大于10
    print 'hello'
else:
    print 'undefine'
# 输出结果: undefine
 
num = 8
# 判断值是否在0~5或者10~15之间
if (num >= 0 and num <= 5) or (num >= 10 and num <= 15):    
    print 'hello'
else:
    print 'undefine'
# 输出结果: undefine
```

# 流程控制之 --while

基本循环

```python
while 条件:
     循环体
```

如果条件为真，那么循环体则执行 
如果条件为假，那么循环体不执行



```python
print('猜数字游戏开始')
num = 54
while True:
    guess = int(input("您猜数字是什么？(输入0-100的数字)"))
    if guess < num:
        print("您猜小了")
        continue
    elif guess > num:
        print("您猜大了")
        continue
    break

print("您猜对了！")
```

运行结果

```python
猜数字游戏开始
您猜数字是什么？(输入0-100的数字)50
您猜小了
您猜数字是什么？(输入0-100的数字)60
您猜大了
您猜数字是什么？(输入0-100的数字)54
您猜对了！
```

## 循环中止语句

### break 

用于完全结束一个循环，跳出循环体执行循环后面的语句 

### continue 

和 break 有点类似，区别在于 continue 只是终止本次循环，接着还执行后面的循环，break 则完全终止循环

while ... else ..

while 后面的 else 作用是指，当 while 循环正常执行完，中间没有被 break 中止的话，就会执行 else 后面的语句

# 其他（for，enumerate，range）

for循环：用户按照顺序循环可迭代对象的内容。

```python
s = '先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。'

for i in s:
    print(i)

li = ['甲','乙','丙','丁']
for i in li:
    print(i)

dic = {'a':1,'b':2,'c':3}
for k,v in dic.items():
    print(k,v)
```

enumerate：枚举，对于一个可迭代的（iterable）/可遍历的对象（如列表、字符串），enumerate将其组成一个索引序列，利用它可以同时获得索引和值。

```python
li = ['甲','乙','丙','丁']
for i in li:
    print(i)

for i in enumerate(li):
    print(i)

for index,value in enumerate(li):
    print(index,value)

for index,value in enumerate(li,100): #从哪个数字开始索引
    print(index,value)
```

range：指定范围，生成指定数字。

```python
for i in range(1,10):
    print(i)

for i in range(1,10,2):  # 步长
    print(i)

for i in range(10,1,-2): # 反向步长
    print(i)
```
