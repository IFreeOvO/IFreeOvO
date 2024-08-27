# mysql函数

* IFNULL(列名|值,默认值)

如果值为NULL，就给个默认值

```bash
select * from people where 10+IFNULL(null, 0)
-- 10+IFNULL(null, 0)相当于10 + 0
```

* DATEDIFF(最近的日期1,最远的日期2)
计算两个日期差多少天

* NOW()
获取当前日期

* LENGTH(列名)
求字符串长度

* ROUND(值)
四舍五入数字

* FLOOR(值)
向下取整

* CEIL(值)
向上取整

## 数字函数

| 函数   |  功能  |  用例  |
|----|----|----|
| ABS   |  绝对值  | ABS(-100)   |
|  ROUND  |   四舍五入 |  ROUND(4.1)  |
|  FLOOR  |  向下取整  |  FLOOR(9.1)  |
|  CEIL  |  向上取整  |  CEIL(1.9)  |
|  POWER  |  幂函数  |  POWER(2,3)  |
|  LOG  |  对数函数  |  POWER(7,3)  |
|  LN  |  对数函数  |  LN(7,3)  |
|  SQRT  |  开平方  |  SQRT(9)  |
|  PI  |  圆周率  |  PI()  |
|  SIN  | 三角函数   |  SIN(1)  |
|  COS  | 三角函数   |  COS(1)  |
|  TAN  |  三角函数  | TAN(1)   |
|  COT  |  三角函数  | COT(1)   |
|  RADIANS  | 角度转换弧度   |  RADIANS(30)  |
| DEGREES   | 弧度转换角度   |  DEGREES(1)  |

## 日期函数

* NOW()获取系统日期和时间，格式yyyy-MM-dd hh:mm:ss

* CURDATE()获取当前系统日期，格式yyyy-MM-dd

* CURTIME()获取当前系统时间，格式hh:mm:ss

* DATE_FORMAT()格式化日期，返回指定格式

```bash
-- 用法
DATE_FORMAT(日期，表达式)

-- 例子: 提取日期里的年份
DATE_FORMAT(DATE, '%Y')
```

|  占位符  | 作用   |
|----|----|
| %Y   |  年份  |
|  %d  |   日期 |
|  %W  |  星期(名称)  |
| %U   |  本年第几周  |
|  %h  |  小时(12)  |
|  %s    |   秒   |
|   %T   |   时间(24)   |
|   %m   |  月份    |
|    %w  |   星期(数字)   |
|   %j   | 本年第几天     |
|   %H   |   小时(24)   |
|  %i    |   分钟   |
|   %r   |   时间(12)   |

* DATE_ADD()实现日期的偏移计算，而且时间单位很灵活

```bash
-- 用法
DATE_ADD(日期，INTERVAL 偏移量 时间单位)

-- 例子: 加15天
DATE_ADD(NOW()，INTERVAL 15 DAY)

-- 例子: 300分钟前
DATE_ADD(NOW()，INTERVAL -300 MINUTE)
```

* DATEDIFF计算两个日期差多少天,用法DATEDIFF(最近的日期1,最远的日期2)

## 字符函数

|  函数  | 功能   | 用例  |
|----|----|----|
| LOWER   |  转小写 |  LOWER(str)  |
| UPPER   |  转大写  |  UPPER(str)  |
|  LENGTH  |  获取字符数量  | LENGTH(str)   |
|  CONCAT  |  连接字符串  | CONCAT(sal, '$')   |
|  INSTR  |  字符出现位置  |  INSTR(str, 'a')  |
|  INSERT  |  插入/替换字符  |  INSERT('你好',1,0,'先生') ,类似js里的splice |
|  REPLACE  |  替换字符  | REPLACE('你好先生','先生','女士')   |
| SUBSTR   | 截取字符串   |  SUBSTR('你好世界', 3, 2)  |
|  SUBSTRING  |  截取字符串  |  SUBSTRING('你好世界', 3, 2)  |
|  LPAD  |  左侧填充字符  | LPAD('Hello', 10, '*')  |
|  RPAD  |  右侧填充字符  |  RPAD('Hello', 10, '*')  |
| TRIM   | 去除首尾空格   | TRIM(' 你好先生')   |

## 条件函数

* IFNULL(表达式,值)。判断表达式是否为NULL，NULL的话就给个默认值

* IF(表达式,值1,值2)。判断表达式是否为true,true的话返回第一个值，反之返回第二个值

* 条件语句

```bash
CASE
    WHEN 表达式 THEN 值1
    WHEN 表达式 THEN 值2
    ...ELSE 值N
END
```
