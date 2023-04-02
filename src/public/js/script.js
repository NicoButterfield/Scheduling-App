get_user();
get_todos();

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

function get_user(){
    var request = new XMLHttpRequest();
    var requestURL = '/get_user'; 
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function(){
        var username = request.response;
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
  


