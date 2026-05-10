# PyPassword Generator

A simple command-line password generator written in Python. Users can specify the length and choose whether to include symbols.

## Run & Operate

- `python3 cli/main.py` — run the password generator

## Stack

- Python 3.11
- Standard library only (`random`)

## Where things live

- `cli/main.py` — main password generator script
- `cli/requirements.txt` — dependencies (none required currently)

## Product

A CLI tool that generates random passwords. The user chooses:
1. How many characters the password should have
2. Whether to include symbols (`!`, `#`, `$`, etc.)

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Script is interactive: requires user input at runtime, so it must be run in a console (not a web server).
