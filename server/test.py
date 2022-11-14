# import ibm_db

# dsn_hostname = "125f9f61-9715-46f9-9399-c8177b21803b.c1ogj3sd0tgtu0lqde00.databases.appdomain.cloud" # e.g.: "54a2f15b-5c0f-46df-8954-7e38e612c2bd.c1ogj3sd0tgtu0lqde00.databases.appdomain.cloud"
# dsn_uid = "ypp79133"        # e.g. "abc12345"
# dsn_pwd = "kBmzEPu5OWzeHXLH"      # e.g. "7dBZ3wWt9XN6$o0J"

# dsn_driver = "{IBM DB2 ODBC DRIVER}"
# dsn_database = "BLUDB"            # e.g. "BLUDB"
# dsn_port = "30426"                # e.g. "32733" 
# dsn_protocol = "TCPIP"            # i.e. "TCPIP"
# dsn_security = "SSL"              #i.e. "SSL"

# dsn = (
#     "DRIVER={0};"
#     "DATABASE={1};"
#     "HOSTNAME={2};"
#     "PORT={3};"
#     "PROTOCOL={4};"
#     "UID={5};"
#     "PWD={6};"
#     "SECURITY={7};").format(dsn_driver, dsn_database, dsn_hostname, dsn_port, dsn_protocol, dsn_uid, dsn_pwd,dsn_security)

# try:
#     conn = ibm_db.connect(dsn, "", "")
#     print ("Connected to database: ", dsn_database, "as user: ", dsn_uid, "on host: ", dsn_hostname)

# except:
#     print ("Unable to connect: ", ibm_db.conn_errormsg() )
# # conn = ibm_db.connect("bludb","ypp79133","kBmzEPu5OWzeHXLH")

# # stmt = ibm_db.exec_immediate(conn, "insert into users_table(name,email,mobile,status) values('Jones','filmy@test.com','1223456789',2)")
# # #commit the transaction explicitly as autocommit is off
# # rc = ibm_db.commit(conn)
# sql_stmt = ibm_db.exec_immediate(conn, "select * from users_table")
# row = ibm_db.fetch_assoc(sql_stmt)
# while row:
#     print(row)
#     row = ibm_db.fetch_assoc(sql_stmt)

# ibm_db.close(conn)
# # test = ''
# # if test is None:
# #     print('It is indeed none!')
# # else:
# #     print('Not what you think!')
from db_handler import DBHandler
handler = DBHandler()
handler.insert_row('users_table',
                    {
                        'name':'Ben 10',
                        'email':'alien@gmail.com',
                        'mobile':'123456',
                        'status':2
                    }
                )
for row in handler.get_all_rows('users_table'):
    print(row)

# test = ['name',3]
# print(','.join(map(str,test)))

# if isinstance("Hello",str):
#     print('It is!')
# if isinstance(2,str):
#     print('It is not!')