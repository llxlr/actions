#FROM alpine:latest
FROM busybox:latest
LABEL "maintainer"="llxlr <i@xhlr.top>"

COPY ./progressiveMauve /progressiveMauve

RUN chmod +x /progressiveMauve

ENTRYPOINT [ "/progressiveMauve" ]
