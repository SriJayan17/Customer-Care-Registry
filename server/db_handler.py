import ibm_db

class DBHandler:
    dsn_hostname = "125f9f61-9715-46f9-9399-c8177b21803b.c1ogj3sd0tgtu0lqde00.databases.appdomain.cloud" 
    dsn_uid = "ypp79133"       
    dsn_pwd = "kBmzEPu5OWzeHXLH"      

    dsn_driver = "{IBM DB2 ODBC DRIVER}"
    dsn_database = "BLUDB"          
    dsn_port = "30426"                
    dsn_protocol = "TCPIP"           
    dsn_security = "SSL"             

    dsn = (
        f"DRIVER={dsn_driver};"
        f"DATABASE={dsn_database};"
        f"HOSTNAME={dsn_hostname};"
        f"PORT={dsn_port};"
        f"PROTOCOL={dsn_protocol};"
        f"UID={dsn_uid};"
        f"PWD={dsn_pwd};"
        f"SECURITY={dsn_security};"
    )

    def __init__(self):
        try:
            self.conn = ibm_db.connect(self.dsn, "", "")
            print ("Connected to database: ", self.dsn_database, "as user: ", self.dsn_uid, "on host: ", self.dsn_hostname)
        except:
            print ("Unable to connect: ", ibm_db.conn_errormsg() )
    
    def insert_row(self,table_name,data_tray):
        if not table_name or len(table_name) == 0:
            print('Enter a table name!')
            return
        if not data_tray or len(data_tray) == 0:
            print('There must be some content in the data tray!')
            return
        col_names = list(data_tray.keys())
        values = list(data_tray.values())
        
        for i in range(len(values)):
            if isinstance(values[i],str):
                values[i] = f"'{values[i]}'"
            else:
                values[i] = str(values[i])

        stmt = ibm_db.exec_immediate(self.conn, f"insert into {table_name} ({','.join(col_names)}) values({','.join(values)})")
        result = ibm_db.commit(self.conn)
        return result
    
    def get_all_rows(self,table_name):
        
        if not table_name or len(table_name) == 0:
            print('Enter a table name!')
            return []

        sql_stmt = ibm_db.exec_immediate(self.conn, f"select * from {table_name}")
        row = ibm_db.fetch_assoc(sql_stmt)
        result = []
        while row:
            result.append(row)
            row = ibm_db.fetch_assoc(sql_stmt)
        return result
    
    def get_column(self, table_name, column_name,condition):

        if not table_name or len(table_name) == 0:
            print('Enter a table name!')
            return None

        condition_statement = ""
        for key in condition:
            condition_statement += f"{key} = {condition[key]} AND"
        condition_statement = condition_statement[:-3]

        sql_stmt = ibm_db.exec_immediate(self.conn, f"select {column_name} from {table_name} where {condition_statement}")

        return ibm_db.fetch_assoc(sql_stmt)
        