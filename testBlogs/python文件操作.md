---
blogAuthor: "smqy"
category: "python"
releaseDate: "2023-01-13"
imgUrl: "https://img.picgo.net/2024/04/07/u5152795993638645922fm253fmtautoapp138fJPEGcb2de7b27eb4a3c0.webp"
tags: ["python"]
---
# 文件操作基本流程

## 文本文件和二进制文件

- 文本文件：可以使用文本编辑器查看；
- 二进制文件：保存的内容不是直接给人查看的，而是使用专用软件查看的，例如图片文件、视频文件；

## 操作文件的套路

1. 打开文件；
2. 读写文件；

   1. 读文件：将文件内容读入内存；
   2. 写文件：将内存内容写入文件；

1. 关闭文件；

## 操作文件中的函数/方法

| 序号 | 函数/方法 | 说明                           |
| ---- | --------- | ------------------------------ |
| 01   | open      | 打开文件，并且返回文件操作对象 |
| 02   | read      | 将文件内容读取到内存           |
| 03   | write     | 将指定内容写入文件             |
| 04   | close     | 关闭文件                       |

- `open` 函数负责打开文件，并且返回文件对象
- `read`/`write`/`close` 三个方法都需要通过 **文件对象** 来调用

1. open函数：

1. 1. 第一个参数是文件名（文件名区分大小写），第二个参数是打开方式；
   2. 如果文件存在返回文件操作对象；
   3. 如果文件不存在抛出异常

1. read方法：可以一次性读入并返回文件的所有内容；
2. close方法：负责关闭文件；



```
# 1. 打开 - 文件名需要注意大小写
file = open("README")

# 2. 读取
text = file.read()
print(text)

# 3. 关闭
file.close()


file = open("README","w")

file.write("hello everyone")

file.close()
```

## 文件打开方式



```
f = open("文件名", "访问方式")
```



| 访问方式 | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| r        | 以**只读**方式打开文件。文件的指针将会放在文件的开头，这是**默认模式**。如果文件不存在，抛出异常 |
| w        | 以**只写**方式打开文件。如果文件存在会被覆盖。如果文件不存在，创建新文件 |
| a        | 以**追加**方式打开文件。如果该文件已存在，文件指针将会放在文件的结尾。如果文件不存在，创建新文件进行写入 |
| r+       | 以**读写**方式打开文件。文件的指针将会放在文件的开头。如果文件不存在，抛出异常 |
| w+       | 以**读写**方式打开文件。如果文件存在会被覆盖。如果文件不存在，创建新文件 |
| a+       | 以**读写**方式打开文件。如果该文件已存在，文件指针将会放在文件的结尾。如果文件不存在，创建新文件进行写入 |

以bytes类型操作的读写，写读，写读模式

| r+b  | 读写【可读，可写】 |
| :--- | :----------------- |
| w+b  | 写读【可写，可读】 |
| a+b  | 写读【可写，可读】 |

对于非文本文件，我们只能使用b模式，"b"表示以字节的方式操作（而所有文件也都是以字节的形式存储的，使用这种模式无需考虑文本文件的字符编码、图片文件的jgp格式、视频文件的avi格式）

rb
wb
ab

<font color=red>注：以b方式打开时，读取到的内容是字节类型，写入时也需要提供字节类型，不能指定编码</font>

- 频繁的移动文件指针，会影响文件的读写效率，开发中更多的时候会以 只读、只写 的方式来操作文件.

## 按行读取文件内容

- read方法默认会把文件的所有内容一次性读取到内存
- readline方法可以一次读取一行内容；
- 方法执行后，文件指针移动到下一行，准备再次读取；

```python
# 方式一、通过循环按行读取文件所有内容
file1 = open("README.txt")
i = 1
while True:
    text1 = file1.readline().strip()
    if text1:
        print("这是第%s行内容" % i)
        i += 1
        print(text1)
    else:
        break

file1.close()

file2 = open("README.txt")

# 通过for遍历按行读取文件所有内容
for i in file2.readlines():
    print(i.strip())

file2.close()
```

## with结构

把上面按行读取文件内容的代码使用with重新组织一下

```python
with open("README.txt") as file1:
    while True:
        text1 = file1.readline().strip()
        if text1:
            print("这是第%s行内容" % i)
            i += 1
            print(text1)
        else:
            break
```



close()在操作完毕文件后，一定要记住`f.close()`,推荐操作方式：使用with关键字来帮我们管理上下文

```python
with open('a.txt','r') as read_f,open('b.txt','w') as write_f:
    data=read_f.read()
    write_f.write(data)
```

# 文件编码

f=open(...)是由操作系统打开文件，那么如果我们没有为open指定编码，那么打开文件的默认编码很明显是操作系统说了算了，操作系统会用自己的默认编码去打开文件，在windows下是gbk，在linux下是utf-8。

```python
f=open('a.txt','r',encoding='utf-8')
```

# 文件操作方法

## 常用操作方法

read（3）：

1. 文件打开方式为文本模式时，代表读取3个字符

2. 文件打开方式为b模式时，代表读取3个字节

其余的文件内光标移动都是以字节为单位的如：seek，tell，truncate

注意：

1. seek有三种移动方式0，1，2，其中1和2必须在b模式下进行，但无论哪种模式，都是以bytes为单位移动的

2. truncate是截断文件，所以文件的打开方式必须可写，但是不能用w或w+等方式打开，因为那样直接清空文件了，所以truncate要在r+或a或a+等模式下测试效果。

## 所有的操作方法

```python
def close(self, *args, **kwargs): # real signature unknown
        关闭文件
        pass

def fileno(self, *args, **kwargs): # real signature unknown
    文件描述符  
    pass

def flush(self, *args, **kwargs): # real signature unknown
    刷新文件内部缓冲区
    pass

def isatty(self, *args, **kwargs): # real signature unknown
    判断文件是否是同意tty设备
    pass

def read(self, *args, **kwargs): # real signature unknown
    读取指定字节数据
    pass

def readable(self, *args, **kwargs): # real signature unknown
    是否可读
    pass

def readline(self, *args, **kwargs): # real signature unknown
    仅读取一行数据
    pass

def seek(self, *args, **kwargs): # real signature unknown
    指定文件中指针位置
    pass

def seekable(self, *args, **kwargs): # real signature unknown
    指针是否可操作
    pass

def tell(self, *args, **kwargs): # real signature unknown
    获取指针位置
    pass

def truncate(self, *args, **kwargs): # real signature unknown
    截断数据，仅保留指定之前数据
    pass

def writable(self, *args, **kwargs): # real signature unknown
    是否可写
    pass

def write(self, *args, **kwargs): # real signature unknown
    写内容
    pass

def __getstate__(self, *args, **kwargs): # real signature unknown
    pass

def __init__(self, *args, **kwargs): # real signature unknown
    pass

@staticmethod # known case of __new__
def __new__(*args, **kwargs): # real signature unknown
    """ Create and return a new object.  See help(type) for accurate signature. """
    pass

def __next__(self, *args, **kwargs): # real signature unknown
    """ Implement next(self). """
    pass

def __repr__(self, *args, **kwargs): # real signature unknown
    """ Return repr(self). """
    pass
```

# 案例一、文件的修改

文件的数据是存放于硬盘上的，因而只存在覆盖、不存在修改这么一说，我们平时看到的修改文件，都是模拟出来的效果，具体的说有两种实现方式：

方式一：将硬盘存放的该文件的内容全部加载到内存，在内存中是可以修改的，修改完毕后，再由内存覆盖到硬盘（word，vim，nodpad++等编辑器）

```python
import os

with open('a.txt') as read_f,open('a.txt.new','w') as write_f:
    data = read_f.read()
    data = data.replace('Hello','nihao')

    write_f.write(data)

os.remove('a.txt')
os.rename('a.txt.new','a.txt')
```

方式二：将硬盘存放的该文件的内容一行一行地读入内存，修改完毕就写入新文件，最后用新文件覆盖源文件

```python
import os

with open('a.txt') as read_f,open('a.txt.new','w') as write_f:
    for line in read_f:
        line = line.replace('nihao','Hello')
        write_f.write(line)

os.remove('a.txt')
os.rename('a.txt.new','a.txt')
```

# 案例二、完成文件的复制



```python
file = open("README")

while True:
    text = file.readline()
    print(text)
    if not text:
        break

file.close()
# -------------------------------------------------------------------------------------
# 小文件复制
file1 = open("README", "r")
file2 = open("README[复件]", "w")

text = file1.read()
file2.write(text)

file1.close()
file2.close()

# -------------------------------------------------------------------------------------
# 大文件复制
file3 = open("README", "r")
file4 = open("README[大文件复制]", "w")

while True:
    text = file3.readline()
    if not text:
        break
    file4.write(text)

file3.close()
file4.close()
```



#  案例三、计算总价

 文件a.txt内容：每一行内容分别为商品名字，价钱，个数。

```
apple 10 3
tesla 100000 1
mac 3000 2
lenovo 30000 3
chicken 10 3
```

通过代码，将其构建成这种数据类型：[{'name':'apple','price':10,'amount':3},{'name':'tesla','price':1000000,'amount':1}......] 并计算出总价钱。

```python
list = []
with open('a.txt','r',encoding='utf-8') as file:
    for line in file:
        list2 = line.strip().split()
        if list2:
            dic = {'name':list2[0],'price':list2[1],'amount':list2[2]}
            list.append(dic)

print(list)
price = 0
for i in list:
    price += int(i['price']) * int(i['amount'])

print(price)
```

# 案例四、注册登录

模拟一下用户注册登陆
用户的信息需要保存在文件db.txt中
菜单:
供用户选择时注册还是登陆
注册:
由用户输入用户名和密码
如果用户已经存在返回“用户已存在”
密码必须由字母和数字组成，长度不得小于8位
密码需要输入两次，并且判断密码是否相等，如果不相等注册失败
注册成功的话需要将用户信息写入db.txt中
登陆:
由用户输入用户名和密码
用户名不存在时返回“用户不存在”
用户名存在，密码错误时返回“密码错误"
登陆成功时返回“欢迎登陆成功!” 

```python
while True:
    list1 = []  # 存储用户的信息
    # 读取所有用户信息
    with open("db.txt", "r") as read_file:
        for line in read_file.readlines():
            user_temp = line.strip().split(":")[0]
            user_password_temp = line.strip().split(":")[1]
            dict1 = {"username": user_temp, "password": user_password_temp}
            list1.append(dict1)
    print("欢迎来到彩虹洗脚城".center(40, "*"))
    user_select = input("请输入您的选择序号: 1注册，2登陆 \n")
    if user_select == "1":
        print("进入注册界面 ")
        user_name = input("请输入您的用户名 \n")
        if user_name == "":
            print("用户名不能为空！！！")
            continue
        flag1 = False
        # 确保用户名未被注册
        for dict2 in list1:
            if dict2["username"] == user_name:
                flag1 = True
        if flag1:
            print("用户已存在！")
            continue
        while True:
            # 确保用户密码没问题
            user_password = input("请输入您的密码：\n")
            if len(user_password) < 8:
                print("密码不得少于8位！")
                continue
            elif user_password.isdigit() | user_password.isalpha():
                print("用户密码必须由数字和字母共同组成！")
                continue
            elif user_password.isalnum():
                print("密码合法！！！")
            user_password2 = input("请再次输入您的密码：\n")
            if user_password != user_password2:
                print("两次密码输入不一致！")
                continue
            break
        with open("db.txt", "a", encoding="utf-8") as write_file:
            user_info = user_name + ":" + user_password + "\n"
            write_file.write(user_info)
            print("注册成功")
    elif user_select == "2":
        print("进入登录界面")
        while True:
            # 确保用户名存在
            user_name = input("请输入登录用户名: \n")
            flag1 = False
            for dict3 in list1:
                if dict3 in list1:
                    if dict3["username"] == user_name:
                        flag1 = True
            if not flag1:
                print("用户名不存在")
                continue
            else:
                break
        while True:
            # 确保用户密码正确
            user_password = input("请输入登录密码；\n")
            flag2 = False
            for dict4 in list1:
                if dict4["username"] == user_name and dict4["password"] == user_password:
                    flag2 = True
            if flag2:
                print("登录成功！！！"+'\n'+"欢迎进入vip界面！")
                break
            else:
                print("密码输入错误，请重试！")
    else:
        print("输入序号有误，请重新输入！\n")
```

