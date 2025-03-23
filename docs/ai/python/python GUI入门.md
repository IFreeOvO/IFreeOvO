# python GUI入门

## 安装PyQt

```bash
pip install pyQt6

# 安装QtDesigner
pip install pyside6

# pycharm ce配置external tools
路径: /Users/username/anaconda3/envs/3.10/lib/python3.10/site-packages/PySide6/Designer.app
```

## 执行程序的入口

```python
from qttest import Ui_MainWindow
import sys
from PyQt6.QtWidgets import QMainWindow, QApplication

class CamShow(QMainWindow, Ui_MainWindow):
    def __init__(self, parent=None):
        super(CamShow,self).__init__(parent)
        self.setupUi(self)

if __name__ == '__main__':
    app = QApplication(sys.argv)
    ui = CamShow()
    ui.show()
    sys.exit(app.exec())

```
