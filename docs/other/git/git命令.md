# git命令

* `git log`查看最近提交的日志

> 可以加上参数  --pretty=oneline，只会显示版本号和> 提交时的备注信息,
 --oneline一行展示一个commit

<br/>

* `git reflog`查看所有分支的所有操作记录，并且方便查看版本hash
<br/>
* `git config --global --list` 查看全局配置

> **补充:**
> `git config --global user.name [名称]`全局配置名称
> `git config --global user.email [邮箱]`全局配置邮箱

<br/>

* `git commit -m "[注释]"` 提交版本并备注

<br/>

* `git reset --hard [想要回退到的版本hash]` 版本回退

> **补充:**
> `git reset --hard head^` 回退上一次提交。
> --hard 指强制操作。
> git reset会清空暂存区

<br/>

* `git reset HEAD [含有后缀的文件名]` 取消具体文件的暂存

<br/>

* `git branch [分支名]` 创建分支

> **补充：**
> `git checkout -b [分支名]` 创建并切换到该分支

<br/>

* `git branch -D [分支名]` 删除分支

<br/>

* `git checkout [分支名]` 切换分支

<br/>

* `git status` 查看仓库状态

<br/>

* `git stash` 缓存到工作区

<br/>

* `git stash apply` 应用工作区缓存

> **补充:**
> `git stash pop` 是使用最近的一个工作区缓存

<br/>

* `git stash clear` 清空工作区缓存

<br/>

* `git stash list` 查看工作区缓存

<br/>

* `git stash --help` 查看git stash 用法

<br/>

* `git diff` 查看文件做了哪些具体的更改（精确到代码行）

<br/>

* `git remote -v` 查看远程分支

<br/>

* `git pull [远程仓库别名] [分支]` 拉取远程仓库代码，如果和本地代码冲突了会进行提示

> **补充:**
> `git pull`相当于`git fetch [远程仓库别名] [分支]`加`git merge FETCH_HEAD`。`git fetch`不会把'远程更新'合并到本地分支，而是暂时放到FETCH_HEAD里

<br/>

* `git fetch [远程仓库别名] [远程某个分支]:[本地的某个分支]` 拉取远程某个分支到本地的某个分支

> **补充:**
> 如果本地分支不存在会自动帮你创建

<br/>

* `git tag` 给当前提交打标签

<br/>

* `git tag -d [标签名]` 删除标签

> **补充:**
> `git push [远程仓库别名] :refs/tags/[标签名]` 删除远程标签

* `git push [远程仓库别名] [分支] --tags` 带标签提交

<br/>

* `git push [远程仓库别名] :[分支]`删除远程分支

<br/>

* `git rm --cached -r .` 删除缓存

* `git commit --amend --no-edit`修改上次的commit内容，即追加提交

* 先 `git commit --amend` 再 `git push --force origin master` 重新修改远程已提交commit信息

* `git commit --amend`

* `git rebase -i HEAD~x`(x代表最近几条commit)变基操作

* `git cherry-pick commitId` 将某次commit复制到当前分支

* `git revert commitId`回滚中间的某次提交

* `git checkout -b dev/1.1.1 origin/dev/1.1.1`将远程dev分支拉到本地dev

* `git fetch origin pull/91/head:test`拉取远程pr到本地,  pull/91是pr界面地址栏上的参数，test是本地分支名

* `git revert -m 1 提交hash`回滚merge提交

* 设置代理

```bash
git config --global http.proxy  http://127.0.0.1:7890/
git config --global https.proxy  http://127.0.0.1:7890/
```

* 清除代理

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

* 查看全局配置

```bash
git config --global --list
```
