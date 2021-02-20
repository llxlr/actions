#!/bin/bash
set -eu

if [[ ! -z "$INPUT_NAME" ]] && [[ ! -z "$INPUT_ARGS" ]]
then
  exit 1
fi

if [[ $INPUT_NAME == "mauveAligner" ]] || [[ $INPUT_NAME == "progressiveMauve" ]]
  sh -c "/$INPUT_NAME $INPUT_ARGS"
else
  echo 'The value of name is error.'
  exit 1
fi
