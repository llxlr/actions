FROM alpine:latest
LABEL "maintainer"="llxlr <i@xhlr.top>"

COPY ./mauveAligner /mauveAligner

RUN chmod +x /mauveAligner

ENTRYPOINT [ "/mauveAligner" ]