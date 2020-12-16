import React from "react";
import SignInSide from "../components/sign_in";
import SignUpSide from "../components/sign_up";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


export default function Routs(){
  function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  let isSessionEsist = false;
  window.addEventListener('load',()=>{
    fetch('/api/auth/verification',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
          token:getCookie('token')
      })
    }).then(data=>data.json().then(body=>{
       isSessionEsist = body.isSessionEsist;
      }));
    });
    console.log(isSessionEsist);
    return(
        <Router>
          <Switch>
            <Route exact path="/login">
                <SignInSide />
            </Route>
            <Route exact path="/register">
                <SignUpSide />
            </Route>
            <Route path="/">
            </Route>
          </Switch>
      </Router>
    )
} 