# sos_reporter

## api documentation

PUSH requests :

- Login
  
  - request URL
    
    ```
    /login
    ```
  
  - parameters
    
    ```js
    finame, faname, login, password
    ```
  
  - response
    
    ```js
    // valid
    {
        message: 'gg',
        result: 'ok',
        id: Int
    }
    
    // !valid
    {
     message: 'wrong creds bro',
     result: 'error'
    }
    
    ```


- Signup
  
  - request URL
    
    ```
    /signup
    ```
  
  - parameters
    
    ```js
    login, password
    ```
  
  - response
    
    ```js
    // valid
    {    
        message: 'ur signed up bro',
        result: 'ok',
        id: Int
    }
    
    // !valid
    { 
        message: 'signup error',
        result: 'error'
    }
    ```


- Get all the alerts of a user
  
  - request URL
    
    ```
    /listalerts
    ```
  
  - parameters
    
    ```js
    id
    ```
  
  - response
    
    ```js
    // ok
    {    
        message: 'here ur alerts',
        result: 'ok',
        alerts: [
        	{
            	id: Number, // alert id
            	date: 31-10-1337, // date of the alerte
                lat: xxx, // latitude
                lng; yyy, // longitude
            },
            ...
        ]
    }
    
    // !valid
    { 
        message: 'signup error',
        result: 'error'
    }
    ```

- Ajouter une alerte
  
  - request URL
    
    ```
    /newalert
    ```
  
  - parameters
    
    ```js
    id (de l'utilisateur), latitude, longitude 
    ```
  
  - response
    
    ```js
    // valid
    {
        message: 'ok i added ur alert',
        result: 'ok'
    }
    
    // !valid
    {
     message: 'sry i fuckd adding ur new alert in da db',
     result: 'error'
    }
    
    ```
