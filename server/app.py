from flask import Flask, jsonify, request
from flask_cors import CORS
from db_handler import DBHandler

app = Flask("Customer care Registry")
cors = CORS(app)
app.config['CORS_HEADERS'] = 'application/json'

Database = DBHandler()

@app.route("/greet", methods=["GET"])
def greeting():
    print("Called")
    return jsonify({ "message": "Welcome to TNEB text prediction model" })

def isEmpty(field):
    if field == "":
        return True

    return False

def getUsers():
    rows = Database.get_all_rows("users_table")
    users = []
    for user in rows:
        users.append({"name":user["NAME"],"email":user["EMAIL"],"password":user["PASSWORD"],
                      "mno":user["MOBILE"]})
    
    return users

@app.route("/register", methods=["POST"])
def register():

    body = request.get_json()
    
    name = body["name"]
    email = body["email"]
    password = body["password"]
    mno = body["mno"]

    response = {
        "message": "",
        "error": {"name": "", "email": "", "password": "", "mno": ""} ,
        "status": 200
    }
    
    users = getUsers()

    if(isEmpty(name)):
        response["error"]["name"] = "Full Name is rqeuired"
        response["status"] = 501
    if(isEmpty(email)):
        response["error"]["email"] = "Email is rqeuired"
        response["status"] = 501
    if(isEmpty(password)):
        response["error"]["password"] = "Password is rqeuired"
        response["status"] = 501
    if(isEmpty(mno)):
        response["error"]["mno"] = "Mobile Number is rqeuired"
        response["status"] = 501

    if response["status"] == 501:
        return jsonify(response)

    contains = False
    for user in users:
        print(type(user))
        if user["email"] == email:
            contains = True
            break

    if contains:
        response["error"]["email"] = "Email already exist"
        response["status"] = 501
        return jsonify(response)

    if len(password) < 6:
        response["error"]["password"] = "Password must be atleast 6 characters long"
        response["status"] = 501
        return jsonify(response)

    inserted = Database.insert_row("users_table",{"NAME":name, "EMAIL":email, "PASSWORD":password, "MOBILE":mno,"STATUS":2})
    if inserted:
        response["message"] = "Account created successfully"
    else:
        response["status"] = 501
        response["error"]["email"] = "Something went wrong!"

    return jsonify(response)


@app.route("/login", methods=["POST"])
def login():
    body = request.get_json()
    email = body["email"]
    password = body["password"]
    
    response = {
        "error" : dict({"email": "", "password": ""}),
        "status" : 200
    }
    
    users = getUsers()

    if(isEmpty(email)):
        response["status"] = 501
        response["error"]["email"] = "E-mail is required"
    if(isEmpty(password)):
        response["status"] = 501
        response["error"]["password"] = "Password is required"
        
    if(not isEmpty(email) and not isEmpty(password)):
        contains = False
        for user in users:
            if user["email"]==email and user["password"]==password:
                contains = True
                break
        
        if not contains:
            response["status"] = 501
            response["error"]["password"] ="Password doesn't match"
        else:
            response["message"] = "Login Successful"
    
    
    return jsonify(response)


@app.route("/add-complaint", methods=["POST"])
def addComplaint():
    body = request.get_json()
    subject = body["subject"]
    message = body["message"]
    email = body["email"]
    response = {
        "status": 200,
        "error": dict({"subject": "", "message": ""})
    }
    
    if(isEmpty(subject)):
        response["status"] = 501
        response["error"]["subject"] = "Subject is required"
    if(isEmpty(message)):
        response["status"] = 501
        response["error"]["message"] = "Message is required"
    
    if(not isEmpty(subject) and not isEmpty(message)):
        userId = Database.get_column("complaints","USER_ID",{"email":email})
        inserted = Database.insert_row("complaints",{"":"","SUBJECT":subject, "CONTENT":message})
        if inserted:
            response["message"] = "Complaint added successfully"
        else:
            response["status"] = 501
            response["error"]["subject"] = "Something went wrong!"
    return jsonify(response)

app.run(port=9090)