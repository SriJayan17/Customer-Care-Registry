from db_handler import DBHandler
print("Inside test")
handler = DBHandler()
            
for row in handler.get_all_rows('users_table'):
    print(row)
