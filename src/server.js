const path = require("path");
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
let currentUser = "Temp";
let currentPassword = "Temp";
let loggedIn = false;



const conn = getConnection();

 function getConnection()
 {
     return mysql.createConnection({
         host: "localhost",
         port: "3306",
         user: "root",
         password: "Iceice8080!",
         database: "todo" // or, Use Todo; Select FROM todos
     });
 }

 const middlewares = [
    // layout(),
    express.static(path.join(__dirname, 'public')),
    bodyParser.urlencoded({extended: false}) //Why so important? Paring through html file to append things?
];
app.use(middlewares);


 //Query Database
app.get('/get_todos', (req, res) => {/*complete = '0' AND*/
    const queryString = "SELECT * FROM todos WHERE user = '" + currentUser + "'";
    conn.query(queryString, (err, rows, fields) =>{
        if(err){
            console.log("Failed to query @ /get_todo: " + err);
        }
        console.log("Getting data from database @ /get_todos");
        
        res.json(rows);
    });
});

app.post('/add_todo', (req, res) =>{
    const todo = req.body.add_todo_input; //getting the body of the url?
    if(todo != '' && todo != ' ' && todo != null)
    {
        const queryString = "INSERT INTO todos (user,todo) VALUES (?,?)";/*currentuser,*/

        conn.query(queryString, [currentUser,todo], (err, rows, fields) =>{
            if(err){
                console.log("Failed to insert@ /add_todo: " + todo + " "+ err);
            }
            console.log("@ /add_todo : " + todo + "added.");
            res.redirect('/');
        });
    }
});

app.post('/complete_todo/:id/:comp', (req, res) =>{
    const todo_id = req.params.id;
    const complete= req.params.comp;
    console.log(complete === '1');
    if(complete === '1')
    {
        console.log("comp = 1");
        const queryString = "UPDATE todos SET complete = '0' WHERE todo_id = ?";
        conn.query(queryString, [todo_id], (err, rows, fields) => {
            if(err)
            {
                console.log("Failed to complete todo @ /complete_todo: " + todo_id);
            }
            console.log("@/Complete_todo/ completeing todo with id" + todo_id);
        });
    }
    else if (complete === '0')
    {
        const queryString2 = "UPDATE todos SET complete = '1' WHERE todo_id = ?"; //AND user = currentUser
        conn.query(queryString2, [todo_id], (err, rows, fields) => {
            if(err)
            {
                console.log("Failed to complete todo @ /complete_todo: " + todo_id);
            }
            console.log("@/Complete_todo/ completeing todo with id" + todo_id);
        }); 
    }
    res.redirect('/');
});


app.post('/login_user', (req, res) =>{
    const user = req.body.username;
    const pass = req.body.password;
    const queryString = "SELECT * FROM Users WHERE user = '" + user + "'  AND pass = '" + pass + "'"
        conn.query(queryString,[user, pass], (err, rows, fields) =>{
            if(err){
                console.log("Invalid username or password");
            }
            else if(rows.length > 0)
            {
                currentUser = user;
                currentPassword = pass;

                app.get('/get_user', (req, res) =>{
                    const queryString = "SELECT * FROM Users WHERE user = '" + currentUser + "'  AND pass = '" + currentPassword + "'";
                        conn.query(queryString, (err, rows, fields) =>{
                            if(err){
                                
                            }
                            else 
                            {
                                res.json(rows);
                            }
                               
                        });
                });
                console.log("Logged In.");
                loggedIn = true;
                res.redirect('/');
            }
            else
            {
                console.log( "Login: Invalid username or password");
                res.redirect('/');
            }
        })

       
})


app.post('/Sign_Up', (req, res) =>{
    const user = req.body.username;
    const pass = req.body.password;
    const queryString = "SELECT * FROM Users WHERE user = '" + user + "'"
        conn.query(queryString,[user], (err, rows, fields) =>{
            if(err){
                console.log("Invalid username or password.")
            }
            else if(rows.length > 0)
            {
                console.log( "Invalid username or password.");//User already exists
                res.redirect('/');
            }
            else
            {
                const queryString = "INSERT INTO Users (user, pass) VALUES (?,?)"
                conn.query(queryString,[user,pass], (err, rows, fields) =>{
                    if(err){
                        console.log( "Invalid Synax.")
                    }
                    else 
                    {
                        console.log(currentUser + " signed up.");//Account created
                        res.redirect('/');
                    }
                       
                })
            }
        })

       
})


app.post('/sign_out', (req, res) =>{
        console.log("Signed Out");
        loggedIn = false;
        res.redirect('/');
})


app.get('/', function(req, res) 
{
    if(loggedIn === true)
    {
        res.sendFile(path.join(__dirname, '/public/html/index.html'));
    }
    else
    {
        res.sendFile(path.join(__dirname, '/public/html/login.html'));
    }
})

app.post('/delete_todo', (req, res) =>{
    const queryString = "DELETE FROM todos WHERE user = '"+ currentUser +"' && complete= '1'"; //AND user = currentUser
    conn.query(queryString, (err, rows, fields) => {
        if(err)
        {
            console.log("Failed to delete todo");
        }
        console.log("Deleted todo successfully");
    });

    res.redirect('/');
});


app.listen(8080, () =>{
    console.log('App running at http://localhost8080');
})



    

