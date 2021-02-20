#!/bin/sh -l
if [[ ! -z ${INPUT_NAME} ]] && [[ ! -z ${INPUT_ARGS} ]];then exit 1;fi

if [ ${INPUT_NAME} == "mauveAligner" ]; then
  ./mauveAligner ${INPUT_ARGS}
elif [ ${INPUT_NAME} == "progressiveMauve" ]; then
  ./progressiveMauve ${INPUT_ARGS}
else
  echo 'The value of name is error.'
  exit 1
fi
