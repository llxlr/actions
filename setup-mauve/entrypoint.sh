#!/bin/sh -l
if [[ ! -z "$INPUT_NAME" ]] && [[ ! -z "$INPUT_ARGS" ]];then exit 1;fi

if [ $INPUT_NAME == "mauveAligner" ]; then
  ./mauveAligner --version
elif [ $INPUT_NAME == "progressiveMauve" ]; then
  ./progressiveMauve --version
else
  echo 'The value of name is error.'
  exit 1
fi
