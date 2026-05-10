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

# 直接根據使用者要求的總長度 nr_figures 進行抽樣
for _ in range(nr_figures):
    # 使用 random.choice 直接從池子裡選一個字元，比 randint index 更直觀
    char = random.choice(char_pool)
    password_list.append(char)

# 雖然隨機抽取已經很亂了，但為了保險（或滿足 Pro 感）可以再打亂一次
random.shuffle(password_list)

# 使用 "".join() 將清單轉換為字串，這比用迴圈一個一個 += 更有效率
final_password = "".join(password_list)

print(f"Your password is: {final_password}")