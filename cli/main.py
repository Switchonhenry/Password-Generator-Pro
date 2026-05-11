import random

letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
symbols = ['!', '#', '$', '%', '&', '(', ')', '*', '+']

# 初始字元池（只有字母與數字）
char_pool = letters + numbers

print("==============================")
print("    PASSWORD GENERATOR 2.0    ")
print("==============================")
print("Welcome to the PyPassword Generator Pro!")

nr_figures = int(input("How many figures would you like in your password?\n"))
want_symbols = input("Do you want to add symbols in your password? 'Y' for yes and 'N' for no.\n").upper()

# 如果使用者想要符號，就把符號清單合併到字元池中
if want_symbols == "Y":
    char_pool.extend(symbols)

password_list = []

if want_symbols == "Y":
    # 1. 先強迫保證至少有一個符號
    password_list.append(random.choice(symbols))
    # 2. 剩下的長度再從大池子裡抽
    remaining_length = nr_figures - 1
    for _ in range(remaining_length):
        password_list.append(random.choice(char_pool))
else:
    # 如果不要符號，就照舊
    for _ in range(nr_figures):
        password_list.append(random.choice(char_pool))

# 3. 最後一定要 shuffle，不然第一個字永遠是符號就太好猜了
random.shuffle(password_list)
final_password = "".join(password_list)