# uv基础用法

## 安装uv

```zsh
pip install uv
```

## 指令

* 初始化项目

  ```zsh
  uv init <项目名>
  ```

* 同步依赖

    ```zsh
    uv sync
    ```

* 临时运行脚本

  ```zsh
  uv run xxx.py
  ```

* 切换python版本(没有时会自动创建)

  ```zsh
  uv venv --python 3.10
  ```

* 生成最小依赖文件

  ```zsh
  uv pip freeze --exclude-editable > requirements.txt
  ```
