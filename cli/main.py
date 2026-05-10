import random
from random import shuffle

letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
symbols = ['!', '#', '$', '%', '&', '(', ')', '*', '+']

mix_letters_and_numbers = []
mix_letters_and_numbers.extend(letters)
mix_letters_and_numbers.extend(numbers)

print("Welcome to the PyPassword Generator!")
nr_figures = int(input("How many figures would you like in your password?\n"))
want_symbols = input("Do you want to add symbols in your password? 'Y' for yes and 'N' for no.\n").upper()

password = []
for figure in range(nr_figures):
    fi = random.randint(0, len(mix_letters_and_numbers) - 1)
    password.append(mix_letters_and_numbers[fi])
password_with_symbol = ""
password_without_symbol = ""
if want_symbols == "Y":
    nr_symbol = random.randint(1, 5)
    for i in range(nr_symbol):
        sym = random.randint(0, len(symbols) - 1)
        password.append(symbols[sym])
        random.shuffle(password)
    for e in password:
        password_with_symbol += e
    print(password_with_symbol)

else:
    for i in password:
        password_without_symbol += i
    print(password_without_symbol)
