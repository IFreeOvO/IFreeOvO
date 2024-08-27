# shell脚本实现一键部署

## 在服务器上创建脚本

```bash
touch update-vue-music.sh   // 创建脚本
chmod +x update-vue-music.sh   // 赋予执行权限
vim update-vue-music.sh // 编辑脚本
```

## `update-vue-music.sh`添加如下脚本内容

```bash
echo "start updating..."
cd /projects/code/vue-music
echo "update source..."
git pull
echo "project building..."
npm run build
echo "project running..."
pm2 restart vue-music
echo "finish!"
```

## 执行脚本

```bash
./update-vue-music.sh
```
