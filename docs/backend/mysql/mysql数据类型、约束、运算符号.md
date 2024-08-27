# mysql数据类型、约束、运算符号

## 数字类型

| 类型  |  大小  |  说明  |
|----|----|----|
| TINYINT   |  1byte  |  小整数  |
|  SMALLINT  |  2byte  |  普通整数  |
| MEDIUMINT | 3byte  |  普通整数  |
| INT   | 4byte |  较大整数  |
|  BIGINT  | 8byte | 大整数   |
|  FLOAT  | 4byte | 单精度浮点数，精度不高(因为10进制转2进制会丢数据)   |
|  DOUBLE  | 8byte |  双精度浮点数，精度不高  |
|  DECIMAL  |  | DECIMAL(10, 2)，其中10代表整数加小数位一共10,2代表小数位。 精度高  |

## 字符串类型

| 类型   | 大小   |  说明  |
|----|----|----|
| CHAR   |  1-255字符  |  固定长度字符串  |
|  VARCHAR  |  1-65535字符  | 不固定长度字符串(可以限制最大字符)   |
|  TEXT  |  1-65535字符  | 不确定长度字符串(无法限制最大字符，默认是最大字符)   |
| MEDIUMTEXT   | 1-1千6百万字符   |  不确定长度字符串  |
|  LONGTEXT  |  1-42亿字符  |  不确定长度字符串  |

## 日期类型

|  类型  |  大小  |  说明  |
|----|----|----|
|  DATE  |  3byte  |  日期 (只有日期没有时间) |
|  TIME  |  3byte  |  时间 (只有时间,24小时制) |
|  YEAR  |   1byte |  年份  |
|  DATETIME  |  8byte  |  日期时间 (有日期和时间) |
|  TIMESTAMP  | 4byte   |  时间戳 (只能是1970年1月1号之后) |

## 字段约束

| 约束名称  |  关键字  |  描述  |
|----|----|----|
|  主键约束  | PRIMARY KEY   |  字段值唯一，不能为NULL  |
|  非空约束  | NOT NULL   |  字段值不能为NULL  |
| 唯一约束   |  UNIQE  |  字段值唯一，且可以为NULL  |
|  外键约束  |  FOREIGN KEY  |  保持关联数据的逻辑性  |

## 四类运算符

|  序号  | 运算符  |
|----|----|
|  1  | 数学运算符。+,-,*,/,%   |
|  2 |  比较运算符。>,>=,<,<=,=,!=,IN,IS NULL,IS NOT NULL,BETWEEN xx AND xx(闭区间范围), LIKE(模糊查询),REGEXP(正则) |
|  3  | 逻辑运算符。AND,OR,NOT,XOR   |
|  4 | 按位运算符。&,\|,~,^,<<,>>   |

```bash
-- LIKE用法
SELECT * FROM people WHERE name LIKE "_en"
-- _占位表示这个位置符号不知道，比如这里表示第一位随意值，后两位为en的值

SELECT * FROM people WHERE name LIKE "%A%"
-- %标识任意个符号，比如这里是指中间包含A
```

## 关键字

AUTO_INCREMENT 自动增长
DEFAULT 默认值
UNSIGNED 无符号
INDEX 索引
