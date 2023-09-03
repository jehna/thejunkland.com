#!/bin/bash

docker run --rm \
           -v "$(pwd):/work" \
           -w /work \
           jdkato/vale content/blog
