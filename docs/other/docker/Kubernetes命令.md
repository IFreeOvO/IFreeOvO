# Kubernetes命令

* 创建deployment

```bash
kubectl create deployment mydep --image=nginx --replicas=3

```

* 查看创建状态

```bash
kubectl get deployment
```

* 从yaml文件创建deployment

```bash
kubectl apply -f nginx.yaml
```

* 查看pod

```bash
kubectl get pod
```

* 查看pvc

```bash
kubectl get pvc
```

* 查看service

```bash
kubectl get service
```

* 创建namespace

```bash
kubectl create namespace new-namespace
```

* 查看namespace

```bash
kubectl get namespace
```

* 删除namespace

```bash
kubectl delete namespace new-namespace
```

* 查看资源对象信息

```bash
kubectl describe deployment mydep
```

* 查看所有对象

```bash
kubectl get all
```

* 查看指定namespace的对象

```bash
kubectl get all -n kube-system
```
