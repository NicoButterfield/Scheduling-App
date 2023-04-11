function login()
{
    var input = document.getElementById("Password");
    var input2 = document.getElementById("Username");
    var info = document.getElementById("info");
     
    info.style.visibility = "visible";
                 
    console.log("happ");
    input.value = "";
    input2.value = "";
    this.blur();
    console.log("PLEASEEEE");
}
// exports.login = login;
// function success(url)
// {
//     var request = new XMLHttpRequest();
//     var requestURL = url; 
//     console.log(request.open('GET', requestURL));
//     request.responseType = "";
//     request.send();
//     request.onload = function(){
//         var logged = request.response;

//         var input = document.getElementById("Password");
//         var input2 = document.getElementById("Username");
//         var info = document.getElementById("info");
//         if(input != null && logged === "invalid")
//         {
//             input.addEventListener('keypress', function (e) {
//                 if(e.key === 'Enter')
//                 {

//                     info.style.visibility = "visible";
//                     // var info = document.createElement("p");
//                     // info.setAttribute("id", "invalid");
//                     // info.innerHTML = "Invalid username or password";
//                     // input.append(info.innerHTML);
//                     console.log(logged);
//                     input.value = "";
//                     input2.value = "";
//                     this.blur();
//                 }
//                 else
//                 {
//                     var x = e.key;
//                     input2.addEventListener('click', function (e) 
//                     {
                    
//                             info.style.visibility = "hidden";
//                     });
//                 }
//             });

            
//         }
//     }

// }