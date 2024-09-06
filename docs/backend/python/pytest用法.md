# pytest用法

```python
# 在根目录执行pytest,会自动查找测试文件执行
pytest -v -s

# -v启用详细模式
# -s 允许在测试运行时直接打印标准输出（如 print 语句）的内容
```

## pytest.ini配置文件

```bash
[pytest]
# 设置测试缓存文件位置
cache_dir = tmp/.pytest_cache

# 设置默认的命令行选项
addopts = -v -s

# 指定pytest在哪些文件查找测试函数
python_files = test_*.py *_test.py

# 指定pytest在哪些类中查找测试方法
python_classes = Test*

# 指定pytest在哪些函数中查找测试用例
python_functions = test_*
```
