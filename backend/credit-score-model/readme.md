# Build

```
sudo docker build . -t ml-model-api
```

# Run in loop

```
sudo docker run -d -t --name ml-model-container -p 8080:8080 ml-model-api
```

# See container list

```
sudo docker ps
```

# Watch logs

```
docker logs -f ml-model-container
```

# Kill container

```
docker kill ml-model-container
```
