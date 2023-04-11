get_todos();
get_user();
login();
signup();

function get_todos(){
    var request = new XMLHttpRequest();
    var requestURL = '/get_todos';
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function(){
        var todos = request.response;
        printTodos(todos);
    }
}

// function login()
// {
//     var password = document.getElementById("Password");
//     var username = document.getElementById("Username");
//     var form = document.getElementById("login_form");
//     var info = document.getElementById("info");
    
//     password.addEventListener("keypress", function(event) 
//     {
//         // If the user presses the "Enter" key on the keyboard
//         if (event.key === "Enter") 
//         {
//             form.submit();
//             // pass = password.value;
//             // user = username.value;
//             var request = new XMLHttpRequest();
//             var requestURL = '/verifyLogin'; 
//             request.open('GET', requestURL, true);
//             // request.responseType = 'json';
//             request.send();
//             request.onload = function(){
//                 var check = request.response;
//                  console.log("2" + check);
//                 if(check === "Invalid")
//                 {
//                     info.style.visibility = "visible";    
//                     username.value = "";
//                     password.value = "";
                               
//                 }
//                 else
//                 {
//                     info.style.visibility = "hidden";
//                 }
//             }
//             this.blur();  
            
//         }
//         else
//         {
//             username.addEventListener('click', function (e) 
//             {
                
//                 info.style.visibility = "hidden";
//             });
//         }
        
//     });
// }


function signup()
{
    
    var password = document.getElementById("Password");
    var username = document.getElementById("Username");
    var info = document.getElementById("info");
    
    password.addEventListener("keypress", function(event) 
    {
        var verify = true;
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") 
        {
            
            pass = password.value;
            user = username.value;
           
            var request = new XMLHttpRequest();
            var requestURL = '/get_users'; 
            request.open('GET', requestURL, true);
            request.responseType = 'json';
            request.send();
            request.onload = function(){
                var userArray = request.response;

                for(let x = 0; x < userArray.length;x++)
                {
                    if(userArray[x].user === user)
                    {
                        verify = false;
                    }
                }

                if(verify)
                {
                    var form = document.getElementById("sign_up_form");
                    form.submit();
                    info.innerHTML ="You are now Signed up! Click below to login.";
                    info.style.visibility = "visible";   
                    username.value = "";
                    password.value = "";
                }
                else
                {
                    info.innerHTML ="Invalid Username or Password.";
                    info.style.visibility = "visible";    
                    username.value = "";
                    password.value = "";
                }
            }
            this.blur();
        }
        else
        {
            username.addEventListener('click', function (e) 
            {
                info.style.visibility = "hidden";
            });
        }
        
    });
}

//Combine login and signin functions
function login()
{
    var password = document.getElementById("Password");
    var username = document.getElementById("Username");
    var info2 = document.getElementById("info2");
    
    password.addEventListener("keypress", function(event) 
    {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") 
        {
            var verify = false;
            pass = password.value;
            user = username.value;
           
            var request = new XMLHttpRequest();
            var requestURL = '/get_users'; 
            request.open('GET', requestURL, true);
            request.responseType = 'json';
            request.send();
            request.onload = function(){
                var userArray = request.response;

                for(let x = 0; x < userArray.length;x++)
                {
                    if(userArray[x].user === user && userArray[x].pass === pass)
                    {
                        verify = true;
                    }
                }

                if(verify)
                {
                    var form = document.getElementById("login_form");
                    form.submit();
                    
                    info2.style.visibility = "hidden";   
                    username.value = "";
                    password.value = "";
                }
                else
                {
                    info2.style.visibility = "visible";    
                    username.value = "";
                    password.value = "";
                }
            }
            this.blur();
        }
        else
        {
            username.addEventListener('click', function (e) 
            {
                info2.style.visibility = "hidden";
            });
        }
        
    });
}

function get_user(){
    var request = new XMLHttpRequest();
    var requestURL = '/get_user'; 
    request.open('GET', requestURL);
    console.log(request.open('GET', requestURL));
    request.responseType = 'json';
    request.send();
    request.onload = function(){
        var username = request.response;
        console.log(username[0]);
        if(username[0].user != null)
        {
            var str =  document.getElementById("heading");
            if(str != null)
            {
                str.prepend(username[0].user + "'s");
            }
        }
    }
}
 
function printTodos(todos){
        var table = document.getElementById("todo_table");
        
        for(var i in todos)
        {
            const todo_complete = todos[i].complete;
            const todo_id = todos[i].todo_id;
            const todo = todos[i].todo;
            
            var row = document.createElement("tr");
            var todo_cell = document.createElement("td");
            var todo_button = document.createElement("button");

    
            todo_button.innerHTML = todo;

            todo_cell.append(todo_button);
            row.append(todo_cell);
            table.append(row);

            todo_button.setAttribute("id", "completed"+ i);
          
            if(todo_complete === 1)
            {

                document.getElementById(todo_button.id).style.setProperty("text-decoration", "line-through");
               
    
             }

            if(todo_complete === 0)
            {
                console.log(todo_complete);
                document.getElementById(todo_button.id).style.removeProperty('text-decoration');
            }
            todo_button.setAttribute("onclick", "completeTodo("+ todo_id +", "+ todo_complete +")");
        }
    }

    function completeTodo(todo_id, todo_complete)
    {
        var form = document.getElementById("complete_todo_form");
        form.action = form.action + todo_id + "/" + todo_complete;
        form.submit();
    }
