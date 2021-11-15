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
room_name = localStorage.getItem("room_name");

function getData() {
      firebase.database().ref("/"+room_name).on('value', function(snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function(childSnapshot) {
                  childKey  = childSnapshot.key;
                  childData=childSnapshot.val();
                  if(childKey!="purpose"){
                        firebase_message_id=childKey;
                        message_data=childData;
                        console.log(firebase_message_id); console.log(message_data);
                        name = message_data['name']; message = message_data['message'];
                        like = message_data['like']; 
                        name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'>"; 
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>"; 
                        like_button ="<button class='btn btn-primary' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>"; 
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>&nbsp;Like: "+ like +"</span></button><hr>"; 
                        row = name_with_tag + message_with_tag +like_button + span_with_tag; 
                        document.getElementById("output").innerHTML += row;
                  } }); }); }
getData();

function updateLike(message_id){
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes)+1;
firebase.database().ref(room_name).child(message_id).update({
      like: updated_likes
});
}

function send(){
msg=document.getElementById("msg").value;
firebase.database().ref(room_name).push({
      name: user_name,
      message: msg,
      like: 0
});
document.getElementById("msg").value="";
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}