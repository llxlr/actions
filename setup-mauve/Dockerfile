FROM alpine:latest
LABEL "maintainer"="jamesyang <i@xhlr.top>"

COPY . /

RUN chmod +x /entrypoint.sh && \
  chmod +x /mauveAligner && \
  chmod +x /progressiveMauve

ENTRYPOINT ["/entrypoint.sh"]