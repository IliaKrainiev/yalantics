### yalantics


#Count quanity of users on page.
#Logging errors into db and to console.

__Web-server on Node.js with Express usage
API tests with Jest using supertest.
MongoDB as storage.__

##API

    `"/"` - _main route_

    `"/logs"` - _logs_

    `"/distinct-by-ip"` - _returns quanity of unique users by ip_
    
 
 ##HOW TO RUN PROJECT
 
  Please, download project using `git clone https://github.com/IliaKrainiev/yalantics.git`.
  
  Run  `npm install`.
  
  If you dont have local Mongo Db, then please install it using official documentation `https://docs.mongodb.com/manual/installation/`.
  
  Then create databases with name `yalantics`, and `yalantics-test` with two collections inside - users_on_site(ip (String) column), request_logs (ip (String), error (String)) (TODO: add migration script)
  
  Then you can run `npm start` and it will works for you!


