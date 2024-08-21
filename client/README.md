```sh
# Build the image
docker build -t animechan-frontend:latest --target client .

# Run the image
docker run -it -p 3000:3000 animechan-frontend:latest
```
