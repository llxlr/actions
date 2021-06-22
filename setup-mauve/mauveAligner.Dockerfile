#FROM alpine:latest
FROM busybox:latest
LABEL "maintainer"="llxlr <i@xhlr.top>"

COPY ./mauveAligner /mauveAligner

RUN chmod +x /mauveAligner

ENTRYPOINT [ "/mauveAligner" ]