# pytest用法

```python
# 直接运行文件夹内符合规则的所有用例
pytest folder_name

# 执行某个 Python 文件中的用例
pytest test_file.py

# 执行某个 Python 文件内的某个函数
pytest test_file.py::test_func

# 执行某个 Python 文件内某个测试类的某个方法
pytest test_file.py::TestClass::test_method

# 在根目录执行pytest,会自动查找测试文件执行
# -v启用详细模式
# -s 允许在测试运行时直接打印标准输出（如 print 语句）的内容
pytest -v -s
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

## 测试用例的编写需要遵循以下规则

* 测试文件以 test_开头或_test 结尾；
* 测试类以 Test 开头，并且不能带有 init 方法；
* 测试函数以 test_ 开头；
* 断言使用基本的 assert 即可；

## fixture

`fixture`是一种用于为测试函数提供预设数据或设置测试环境的机制。简单来说，可以使用`fixture`来为测试提供预设数据和设置测试环境的功能。

`fixture`通常写在`conftest.py`文件中，并且对应的目录及子目录都可以使用 `conftest.py`提供的`fixture`，如果存在嵌套`conftest.py`文件，则使用的是最接近的`fixture`。定义好`fixture`后，在测试函数中，可以使用同名的参数直接使用，`Pytest`会自动注入。

定义示例：

```python
# test/conftest.py

import pytest

from app.server.app import app


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

```

使用示例:

```python
# test/internal/handler/test_app_handler.py
import pytest

from pkg.response import HttpCode


class TestAppHandler:
    def test_completion(self, client):
        r = client.post("/app/completion", json={"query": "你好,你是?"})
        assert r.status_code == 200
        assert r.json.get("code") == HttpCode.SUCCESS

```

## 参数化测试

在`Pytest`中可以使用`@pytest.mark.parametrize`装饰测试函数，实现使用不同的参数值多次测试运行相同的代码，以覆盖多种测试场景，可以传递 2 个参数，分别是参数名和参数值：

1. 参数名：query 为单个参数，email, password 为 2 个参数；
2. 参数值：[None, "你好，你是?"] 为单个参数对应的参数列表，[("admin@imooc.com", "123456"), ("hi@imooc.com", "123456")] 为多个参数对应的元组参数列表；

```python
# 测试文件
import pytest

from pkg.response import HttpCode


class TestAppHandler:
    @pytest.mark.parametrize("query", [None, "你好，你是?"])
    def test_completion(self, query, client):
        r = client.post("/app/completion", json={"query": query})
        assert r.statuc_code == 200
        if query is None:
            assert r.json.get("code") == HttpCode.VALIDATE_ERROR
        else:
            assert r.json.get("code") == HttpCode.SUCCESS

```

上面这段代码会重复测试两次，第 1 次传递的`query`值为`None`，并执行代码；第 2 次测试时传递的`query`值为 `你好，你是?`，通过对参数的不同判断测试结果，以检测代码是否正常运行。
