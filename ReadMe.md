# AUTH APP ROUTES

### *app/signup*
Request :   
(Header Content)   
content-type: application/json   
Values required for keys `email` & `password`.

Response :   
content-type: application/json   
On Success: 
```
{
    "success": "New App has been registered",
    "email": "myApp@myDomain.com",
    "api_key": "**********"
}
```
api_key: 10 digit alpha-numeric string.

### *user/signup*
Request :   
(Header Content)   
content-type: application/json   
app_key: "Your 10 digit alpha-numeric app_key"   
(Body-content)   
Values required for keys `email` & `password`.   
(Email and password for your app's user)

Response :   
content-type: application/json   
On Success: 
```
{
    "success": "New user has been created",
    "email": "test@google.com"
}
```
### user/signin   
Request :   
(Header Content)   
content-type: application/json   
app_key: "Your 10 digit alpha-numeric app_key"   
(Body-content)   
Values required for keys `email` & `password`.   
(Email and password for your app's user)

Response :   
content-type: application/json   
On Success: 
```
{
    "success": "Welcome to the JWT Auth",
    "token": "Your JWT token"
}
```  
JWT Token generated (Access Token) validity is for 2Hours. Support for flexible expiry is to be added.

### user/verify 

Request :   
(Header Content)   
content-type: application/json   
(Body-content)   
Values required for keys `accessToken`.   

Response :   
content-type: application/json   
On Success:   
```
{
    "email": "userEmail@google.com",
    "_id": "user_id",
    "iat": 1526111340,
    "exp": 1526118540
}
```
`email` : Gets a users email registered for a specific application.   
`_id` : User ID for the identified user.   
`iat`: Token creation time i.e "issued at"   
`exp` : Your jwt access token expiry time.   
Note : For example in JS to convert JWT to current date time   
you can use `new Date(iat*1000);` . Multiplication by thousand as Date takes time in milliseconds (`iat` & `exp` contains time in seconds).
