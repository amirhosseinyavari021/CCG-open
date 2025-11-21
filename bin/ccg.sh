#!/usr/bin/env bash

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

if [[ "$OSTYPE" == "linux"* ]]; then
  "$ROOT_DIR/bin/ccg-linux" "$@"
elif [[ "$OSTYPE" == "darwin"* ]]; then
  "$ROOT_DIR/bin/ccg-macos" "$@"
else
  echo "Unsupported OS."
  exit 1
fi
