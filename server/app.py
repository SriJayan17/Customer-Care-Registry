from flask import Flask, jsonify, request
from flask_cors import CORS
from db_handler import DBHandler
from datetime import date

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
        users.append({"userId":user["USER_ID"],"name":user["NAME"],"email":user["EMAIL"],"password":user["PASSWORD"],"mno":user["MOBILE"],"status":user["STATUS"]})
    
    return users

@app.route("/register", methods=["POST"])
def register():

    body = request.get_json()
    
    name = body["name"]
    email = body["email"]
    password = body["password"]
    mno = body["mno"]
    userType = body["type"]
    print(body)
    response = {
        "message": "",
        "error": {"name": "", "email": "", "password": "", "mno": ""} ,
        "status": 200
    }
    
    users = getUsers()

    if(isEmpty(name)):
        response["error"]["name"] = "Full Name is required"
        response["status"] = 501
    if(isEmpty(email)):
        response["error"]["email"] = "Email is required"
        response["status"] = 501
    if(isEmpty(password)):
        response["error"]["password"] = "Password is required"
        response["status"] = 501
    if(isEmpty(mno)):
        response["error"]["mno"] = "Mobile Number is required"
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

    inserted = Database.insert_row("users_table",{"NAME":name, "EMAIL":email, "PASSWORD":password, "MOBILE":mno,"STATUS":userType})

    if inserted:
        userId = Database.get_column("users_table","USER_ID",{"EMAIL":email})
        response["message"] = "Account created successfully"
        if userType==1:
            response["user"] = {"userId":userId}
        else:
            response["user"] = {"agentId":userId}
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
                if user["status"]==0:
                    response["user"] = {"adminId":user["userId"]}
                elif user["status"]==1:
                    response["user"] = {"userId":user["userId"]}
                else:
                    response["user"] = {"agentId":user["userId"]}
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
    message = body["content"]
    userId = body["userId"]
    response = {
        "status": 200,
        "error": dict({"subject": "", "message": ""})
    }
    
    if(isEmpty(subject)):
        response["status"] = 501
        response["error"]["subject"] = "Subject is required"
    if(isEmpty(message)):
        response["status"] = 501
        response["error"]["msg"] = "Message is required"
    
    if(not isEmpty(subject) and not isEmpty(message)):
        today = str(date.today())
        print(today," end ")
        inserted = Database.insert_row("complaints",{"USER_ID":userId,"SUBJECT":subject, "CONTENT":message,"DATE":today,"STATUS":False})
        if inserted:
            response["message"] = "Complaint added successfully"
        else:
            response["status"] = 501
            response["error"]["database"] = "Something went wrong!"
    return jsonify(response)

@app.route("/getcomplaints", methods=["POST"])
def getComplaints():
    body = request.get_json()
    userId = body["userId"]
    complaints = Database.get_all_rows("complaints")
    userComplaints = []

    for complaint in complaints:
        if complaint["USER_ID"]==userId:
            comp = {
                "subject":complaint["SUBJECT"],
                "content":complaint["CONTENT"],
                "date":complaint["DATE"],
                "agent":complaint["AGENT_ID"],
                "status":complaint["STATUS"],
                "feedback":complaint["AGENT_FEEDBACK"]
            }
            if complaint["AGENT_ID"]:
                comp["agentName"] = Database.get_column("users_table","NAME",{"USER_ID":complaint["AGENT_ID"]})
            userComplaints.append(comp)

    print(userComplaints)
    return jsonify(userComplaints)

@app.route("/getUnresolvedComplaints", methods=["GET"])
def getUnresolvedComplaints():
    complaints = Database.get_all_rows("complaints")
    userComplaints = []
    
    for complaint in complaints:
        if not complaint["STATUS"]:
            comp = {
                "id":complaint["COMP_ID"],
                "userName": Database.get_column("users_table","NAME",{"USER_ID":complaint["USER_ID"]}),
                "userId":complaint["USER_ID"],
                "subject":complaint["SUBJECT"],
                "content":complaint["CONTENT"],
                "agent":complaint["AGENT_ID"],
                "date":complaint["DATE"],
                "status":complaint["STATUS"],
                "feedback":complaint["AGENT_FEEDBACK"]
            }
            if complaint["AGENT_ID"]:
                comp["agentName"] = Database.get_column("users_table","NAME",{"USER_ID":complaint["AGENT_ID"]})
            userComplaints.append(comp)
            

    print(userComplaints)
    return jsonify(userComplaints)

@app.route("/getAgents", methods=["GET"])
def getAgents():
    users = Database.get_all_rows("users_table")
    agents = []
    for user in users:
        if user["STATUS"]==2:
            agents.append({"id":user["USER_ID"],"name":user["NAME"]})

    return jsonify(agents)

@app.route("/assignAgent", methods=["POST"])
def assignAgent():
    body = request.get_json()
    compId = body["compId"]
    agentId = body["agentId"]

    result = Database.update_column("complaints","AGENT_ID",agentId,{"COMP_ID":compId})
    print(result)
    response = {
        "status":200
    }

    if not result:
        response["status"]:500
    
    result = Database.insert_row("tasks",{"COMP_ID":compId,"AGENT_ID":agentId})

    if not result:
        response["status"]:500

    return jsonify(response)
    
@app.route("/getAssignedTask", methods=["POST"])
def getAssignedTask():
    print("inside")
    body = request.get_json()
    agentId = body["agentId"]
    tasks = Database.get_all_rows("tasks")
    
    complaintIds = []
    for task in tasks:
        if task["AGENT_ID"] == agentId:
            complaintIds.append(task["COMP_ID"])
    assignedComplaints = []
    complaints = Database.get_all_rows("complaints")
    for complaint in complaints:
        if complaint["COMP_ID"] in complaintIds:
            print(complaint)
            comp = {
                "id":complaint["COMP_ID"],
                "userName":Database.get_column("users_table","NAME",{"USER_ID":complaint["USER_ID"]}),
                "subject":complaint["SUBJECT"],
                "date":complaint["DATE"],
                "status":complaint["STATUS"],
                "content":complaint["CONTENT"]
            }
            assignedComplaints.append(comp)
    
    return jsonify(assignedComplaints)

@app.route("/toggleStatus", methods=["POST"])
def toggleStatus():
    body = request.get_json()
    agentId = body["agentId"]
    compId = body["compId"]
    print(body)
    response = {
        "status":200
    }

    result = Database.update_column("complaints","STATUS",True,{"COMP_ID":compId})
    r = Database.get_all_rows("complaints")
    print(r)
    if not result:
        response["status"] = 500

    return jsonify(response)

@app.route("/addFeedback",methods=["POST"])
def addFeedback():
    body = request.get_json()
    compId = body["compId"]
    feedback = body["feedback"]
    print(body)
    response = {
        "status":200
    }
    result = Database.update_column("complaints","AGENT_FEEDBACK",feedback,{"COMP_ID":compId})

    if not result:
        response["status"] = 500
    
    return jsonify(response)


app.run(port=9090)