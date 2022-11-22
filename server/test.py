from db_handler import DBHandler
print("Inside test")
handler = DBHandler()

# print(handler.get_column("users_table","EMAIL",{"PASSWORD":"test"}))
for row in handler.get_all_rows('tasks'):
    print(row)
