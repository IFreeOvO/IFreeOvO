# redis排序指令

1. sort可以对列表排序
2. sort可以对有序集合排序。排序时忽略元素的分数，只针对 自身的值进行排序
3. 可以对非数字进行排序
4. 句子尾部加DESC可以从大到小排序，还可以加limit参数。例如`sort list desc limit 0 2`
5. 通过BY来根据时间排序。BY可以对散列表排序
例如
`hmset post:1 title xxx times 100`
`hmset post:2 title xxx times 150`
`hmset post:3 title xxx times 200`
`hmset post:4 title xxx times 120`
`lpush post:list 1 2 3 4`
`sort post:list BY post:*->time`
结果为1 4 2 3。
相当于列表post:list用post:1 post:2 post:4 post:4(元素值取代*的位置)的time字段值进行排序。

还可以加GET参数获取你想要的值
例如
`sort post:list BY post:*->time GET post:*->title`
结果为xxx xxx xxx xxx
