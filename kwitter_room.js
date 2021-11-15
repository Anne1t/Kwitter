var firebaseConfig = {
      apiKey: "AIzaSyBDmRVt4iQyV8thOI3ebxgFYNjN-3XS0mc",
      authDomain: "kwitter-d5b3e.firebaseapp.com",
      databaseURL: "https://kwitter-d5b3e-default-rtdb.firebaseio.com",
      projectId: "kwitter-d5b3e",
      storageBucket: "kwitter-d5b3e.appspot.com",
      messagingSenderId: "197858250690",
      appId: "1:197858250690:web:74b3ed86214fd05ab2505b",
      measurementId: "G-61Y7MSVF9G"
    };

firebase.initializeApp(firebaseConfig);
user_name=localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML="Welcome, "+user_name;

function getData() {
      firebase.database().ref("/").on('value', function(snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function(childSnapshot) {
                  childKey  = childSnapshot.key;
       Room_names = childKey;
      console.log("Roomname - "+Room_names);
row = "<div class='room_name' id = "+Room_names+"onclick='redirectToRoomName(this.id)' >#"+Room_names+"</div><hr>";
document.getElementById("output").innerHTML=row;
      });});}
getData();

function redirectToRoomName(name){
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location="kwitter_page.html";
}

function addRoom(){
      room_name=document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose : "adding room name"
      });
      localStorage.setItem("room_name",room_name);
      window.location="kwitter_page.html";
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}