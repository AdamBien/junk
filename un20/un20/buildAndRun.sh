#!/bin/sh
mvn clean package && docker build -t com.airhacks/un20 .
docker rm -f un20 || true && docker run -d -p 8080:8080 -p 4848:4848 --name un20 com.airhacks/un20 
