from db_handler import DBHandler
print("Inside test")
handler = DBHandler()

print(handler.get_column("users_table","email",{"password":"test"}))
for row in handler.get_all_rows('users_table'):
    print(row)
