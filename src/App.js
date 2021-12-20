import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router";

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

import { useSelector, useDispatch } from "react-redux";
import { fetchUserAction } from "redux/actions/authActions";
import Register from "./views/auth/Register";
export default function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    dispatch(fetchUserAction());
  }, []);

  return (
    <div>
      {/* add routes with layouts */}
      {!currentUser || currentUser === null || currentUser === undefined ? (
        <Switch>
          <Route path="/" component={Auth} />
          <Redirect exact from="*" to="/404" component={Register} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/admin" component={Admin} />
          <Redirect from="/" to="/admin" />
        </Switch>
      )}

      {/* add routes without layouts */}
    </div>
  );
}
