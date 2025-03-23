# python表格、绘图、视频处理

## 表格

* 读取表格

```python
import pandas as pd
path = r'./resources/yolov5s.csv'
data = pd.read_csv(path)
print(data)

path1 = r'./resources/yolov5s.xlsx'
data1 = pd.read_excel(path)
print(data1)
print(data1.describe()) # 统计表格数据
print(data1.head(2)) # 输出前2行数据。默认5行
print(data1.tail(4)) # 输出后4行数据。默认5行

# 读取第一行的值
row_1 = data1.loc[0]

# 读取'大类编码'列的全部值
column_1 = data1.loc[ : ,'大类编码'] # 冒号左边代表行，右边代表列

# 读取第一行，'大类编码'列的值
column_2 = data1.loc[1,'大类编码']

# 读取'销售数量'列大于10的值
data3 = data1.loc[data1['销售数量']>10]

# 读取'销售数量'列大于10的值,保留'小类编码','小类名称'列
data3 = data1.loc[data1['销售数量']>10, ['小类编码','小类名称']]

## 分组和排序
newData =  data1.group('商品类型')['销售金额'].sum()
newData = data.reset_index()

newData.to_csv('test.csv', encoding='gbk',index=False) # index=False是指不保存index那一列
newData.to_excel('test.xlsx', encoding='gbk',index=False)
```

## 图像

* 折线图

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib import font_manager

fontList = font_manager.get_font_names()
print(fontList) # 查看系统字体
plt.rcParams['font.sans-serif'] = ['Heiti TC'] # macos全局修改字体
# plt.rcParams['font.sans-serif'] = ['SimHei'] # windows全局修改字体

x = np.arange(-2 * np.pi, 2 * np.pi, 0.01) # 创建x值的数组，从-2π到2π，步长为0.01
y= np.sin(x) # 计算x对应y值

plt.figure() # 创建图像窗口
plt.plot(x,y) # 绘制折线图
plt.title('测试例子') # 设置图像标题
plt.xlabel('x坐标') # 设置x轴标签
plt.ylabel('y坐标')
plt.grid(True) # 显示网购
plt.show() # 显示图像
```

* 散点图

```python
import numpy as np
import matplotlib.pyplot as plt

num_points = 100
x = np.random.rand(num_points)
y = np.random.rand(num_points)
colors = np.random.rand(num_points) # 点的颜色
size = 1000 * np.random.rand(num_points) # 点的大小
alphas = np.random.rand(num_points) # 点的透明度

plt.scatter(x, y, c=colors,s=size, alpha=alphas, cmap='viridis') # 创建散点图
plt.colorbar() # 显示颜色条
plt.show()
```

* 柱状图

```python
import matplotlib.pyplot as plt
import numpy as np

# 数据
labels = ['A', 'B', 'C', 'D', 'E']
values = [3, 7, 2, 5, 8]

# 设置标签的位置
x = np.arange(len(labels))

# 绘制柱状图
plt.bar(x, values, color='blue', align='center', alpha=0.7)

# 设置图表的标题和轴标签
plt.title('Simple Bar Chart')
plt.xlabel('Labels')
plt.ylabel('Values')

# 设置x轴的标签
plt.xticks(x, labels)

# 显示图像
plt.show()

```

* 饼图

```python
import matplotlib.pyplot as plt

# 数据
sizes = [15, 30, 45, 10]  # 各部分的大小
labels = ['A', 'B', 'C', 'D']  # 各部分的标签
colors = ['gold', 'yellowgreen', 'lightcoral', 'lightskyblue']  # 各部分的颜色
explode = (0.1, 0, 0, 0)  # 突出显示第一个部分

# 绘制扇形图
plt.pie(sizes, explode=explode, labels=labels, colors=colors, autopct='%1.1f%%', shadow=True, startangle=140)

# 设置为等比例，这样扇形图就是一个圆
plt.axis('equal')

# 显示图像
plt.show()
```

## opencv影像处理

* 读取图片

```python
import cv2
img_path = r'resources/food.png'

# 以彩色模式读取图片
image_color = cv2.imread(img_path)
# 以灰度模式读取图片
image_gray = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)


# 显示图片
cv2.imshow('Color Image', image_color)
cv2.imshow('Grayscale Image', image_gray)

# 等待用户按键，然后关闭窗口
cv2.waitKey(0)
cv2.destroyAllWindows()

```

* 缩放图片

```python
import cv2

# 读取图片
image = cv2.imread('resources/food.png')

# 检查图片是否正确加载
if image is None:
    print("Error: Could not load image.")
    exit()

print(image.shape)

# 获取图片的原始尺寸
original_height, original_width = image.shape[:2]
#
# 计算新的尺寸
new_width = int(original_width / 2)
new_height = int(original_height / 2)
#
# 使用cv2.resize进行图片缩放
resized_image = cv2.resize(image, (new_width, new_height), interpolation=cv2.INTER_AREA) # interpolation=cv2.INTER_AREA使用插值算法
#
# 显示原始图片和缩放后的图片
cv2.imshow('Original Image', image)
cv2.imshow('Resized Image', resized_image)
#
# 等待用户按键，然后关闭窗口
cv2.waitKey(0)
cv2.destroyAllWindows()

```

* 图像旋转

```python
import cv2

# 读取图片
image = cv2.imread('resources/food.png')

# 使用cv2.rotate()函数旋转图片
rotated_90 = cv2.rotate(image, cv2.ROTATE_90_CLOCKWISE)  # 顺时针旋转90度
rotated_180 = cv2.rotate(image, cv2.ROTATE_180)  # 顺时针旋转180度
rotated_270 = cv2.rotate(image, cv2.ROTATE_90_COUNTERCLOCKWISE)  # 顺时针旋转270度

cv2.imshow('original', image)
cv2.imshow('90 degree', rotated_90)
cv2.imshow('180 degree', rotated_180)
cv2.imshow('270 degree', rotated_270)
cv2.waitKey(0)
```

* 图像保存

```python
import cv2

# 读取图像
image = cv2.imread('resources/food.png')

# 如果图像不为空，则保存图像
if image is not None:
    cv2.imwrite('output_image.png', image)
else:
    print("无法读取图像")
```

* 读取摄像头

```python
import cv2

# 创建一个 VideoCapture 对象，参数 0 表示使用默认的摄像头, 也可以传入一个视频文件的路径
# cap = cv2.VideoCapture(0) # 使用摄像头
cap = cv2.VideoCapture("resources/piano.mp4")   # resources/piano.mp4

while True:
    # 读取一帧
    ret, frame = cap.read()

    # 如果读取成功，显示这一帧
    if ret:
        cv2.imshow('Frame', frame)

    # 按 'q' 键退出循环
    if cv2.waitKey(15) & 0xFF == ord('q'):
        break

# 释放资源并关闭窗口
cap.release()
cv2.destroyAllWindows()
```

* 保存视频

```python
import cv2

# 定义视频捕获对象
cap = cv2.VideoCapture(0)

# 检查是否成功打开摄像头
if not cap.isOpened():
    print("Error: Could not open camera.")
    exit()

# 获取摄像头的帧宽度和帧高度
frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

# 定义视频编码器和输出文件
fourcc = cv2.VideoWriter_fourcc(*'mp4v')  # 或者使用 'XVID'
out = cv2.VideoWriter('output.mp4', fourcc, 20.0, (frame_width, frame_height))

while True:
    ret, frame = cap.read()
    if not ret:
        print("Failed to grab frame.")
        break

    # 将当前帧写入输出视频文件
    out.write(frame)

    # 显示当前帧
    cv2.imshow('frame', frame)

    # 按'q'键退出循环
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# 释放资源
cap.release()
out.release()
cv2.destroyAllWindows()

```

## pickle

* 保存与加载数据

```python
import pickle

# # 示例数据
data = {
    'name': 'John',
    'age': 30,
    'is_student': False,
    'grades': [85, 90, 78, 92]
}

# 使用 pickle 保存数据
with open('data.pkl', 'wb') as file:
    pickle.dump(data, file)

# 使用 pickle 加载数据
with open('data.pkl', 'rb') as file:
    loaded_data = pickle.load(file)

print(loaded_data)
```
