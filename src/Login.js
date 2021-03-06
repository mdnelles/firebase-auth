import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./base.js";
import { AuthContext } from "./Auth.js";

import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

const Login = ({ history }) => {
   const [email, setEmail] = useState("admin@domain.ooo"),
      [password, setPassword] = useState("s9Q7BN,7PhQg&q?3"),
      [severity, setSeverity] = useState("info"),
      [msg, setMsg] = useState("Enter email and password");

   const handleLogIn = useCallback(
      async (event) => {
         event.preventDefault();
         setSeverity("info");
         setMsg(<CircularProgress style={{ height: 25, width: 25 }} />);
         try {
            console.log("email " + email);
            await app.auth().signInWithEmailAndPassword(email, password);
            history.push("/");
         } catch (error) {
            console.log(error);
            setMsg(error.message);
            setSeverity("error");
         }
      },
      [history, email, password]
   );

   const handleSignUp = () => {
      history.push("/signup");
   };

   const { currentUser } = useContext(AuthContext);

   if (currentUser) {
      return <Redirect to="/" />;
   }

   return (
      <div className="vertical-center center-outer">
         <div className="center-inner">
            <Paper style={{ maxWidth: 500, margin: 10 }} className="center">
               <div className="padding1">
                  <img src="./favw.png" alt="Overlya Analytics" />
                  <h3>Login</h3>
                  <Alert severity={severity}>{msg}</Alert>
                  <br />
                  <TextField
                     style={{ minWidth: "75%" }}
                     required
                     label="Email"
                     defaultValue={email}
                     onChange={(event) => setEmail(event.target.value)}
                  />
                  <TextField
                     style={{ minWidth: "75%" }}
                     required
                     label="Password"
                     type="password"
                     defaultValue={password}
                     onChange={(event) => setPassword(event.target.value)}
                  />
                  <br />
                  <br />
                  <Button
                     variant="contained"
                     color="primary"
                     onClick={handleLogIn}
                  >
                     Log In
                  </Button>
                  &nbsp;
                  <Button
                     variant="outlined"
                     color="primary"
                     onClick={handleSignUp}
                  >
                     Sign Up
                  </Button>
               </div>
            </Paper>
         </div>
      </div>
   );
};

export default withRouter(Login);
