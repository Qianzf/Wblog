$ mkdir learngit //创建一个learngit的空白目录
$ cd learngit  //进入learngi目录
$ pwd  //查看当前所在目录
$ ls -ah  //可以查看目录下的隐藏文件
$ cat readme.txt //打开readme.txt文件，查看文件内容
$ rm test.txt //删除test.txt文件

$ git init  //把当前目录变成git可以管理的仓库
$ git add readme.txt  //把readme.txt文件添加到仓库
$ git add -A //把所有修改的内容添加到仓库
$ git commit -m "wblog" //把文件提交到仓库，-m 后面输入的为本次提交的说明
$ git push -u origin main //第一次将本地仓库main分支的所有内容提交到远程仓库
$ git push origin main //之后提交无需加-u

$ git status 查看仓库当前状态
$ git diff readme.txt //查看readme.txt文件哪些地方被修改了

$ git log //查看从最近到最远的提交日志
$ git log --pretty=oneline //添加参数简化输出日志
$ git reflog //查看每一次的操作命令

$ git checkout -- readme.txt //丢弃工作区的修改，让文件回到最近一次git commit或git add时的状态
$ git reset HEAD readme.txt //把暂存区的修改撤销掉
$ git reset --hard HEAD^ //回退到上一版本HEAD^，回退到倒数第2个版本就是HEAD^^,回退到倒数第3个及以上版本用HEAD~3
$ git reset --hard 版本号 //返回到指定版本号的版本

$ git rm test.txt //从版本库删除文件，并且需要 git commit -m""
$ git push origin master  //推送最新修改至远程库

$ git remote -v  //查看远程库信息
$ git remote rm origin  //解除了本地和远程库的绑定

配置用户名和邮箱
$ git config user.name "xxx"
$ git config user.email "xxxx@126.com"

配置全局的用户名和邮箱(个人比较喜欢用这个)
$ git config --global user.name "xxx"
$ git config --global user.email "xxxx@163.com"

创建SSH Key
$ ssh-keygen -t rsa -C "youremail@example.com" //修改自己的邮箱，用户主目录下会生成.ssh目录，里面有有id_rsa和id_rsa.pub这两个文件

$ git remote add origin git@github.com:5sdy/Wblog.git //关联远程库
$ git branch -M main
$ git push -u origin main //将所有分支内容推送到远程库

test.txt
教程地址：https://www.liaoxuefeng.com/wiki/896043488029600
