FROM ubuntu
RUN apt-get update 
COPY ./client /client
COPY ./server /server
RUN pip install -r ./server/requirements.txt
RUN python ./server/app.py
WORKDIR /client
RUN npm install
RUN npm start
EXPOSE 3000