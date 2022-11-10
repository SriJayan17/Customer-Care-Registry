from flask import Flask, jsonify, request
# from flask_restful import Api, Resource
from flask_cors import CORS

app = Flask("Customer care Registry")
cors = CORS(app)
app.config['CORS_HEADERS'] = 'application/json'

users = [
    {
        "name": "Sri Jayan",
        "email": "sjayan@gmail.com",
        "password": "sj2002",
        "mno": "1234567890"
    },
    {
        "name": "Rajesh",
        "email": "rajesh@gmail.com",
        "password": "rj2002",
        "mno": "1234567890"
    },
]

@app.route("/greet", methods=["GET"])
def greeting():
    print("Called")
    return jsonify({ "message": "Welcome to TNEB text prediction model" })

def isEmpty(field):
    if field == "":
        return True

    return False

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

    users.append({"name":name, "email":email, "password":password, "mno":mno})
    response["message"] = "Account created successfully"
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



app.run(port=9090)