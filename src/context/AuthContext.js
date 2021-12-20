import React, { createContext, useEffect, useState } from "react";

import { loginUser } from "api";
import { setJWT, getUserInfoFromJWT, cleanLocalStorage } from "utils/storage";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  // async function login(data) {
  //   return loginUser(data)
  //   .then(async (res) => {
  //     await console.log(res);
  //     await setJWT(res?.data.token);
  //     setCurrentUser(await getUserInfoFromJWT()(res.data.token));

  //   })
  //   .catch((error) => console.log(error));
  //   };
  // }

  const login = (data) => {
    return loginUser(data)
      .then(async (response) => {
        if (response.data?.status === true) {
          setLoading(true);
          await console.log(response);

          await setJWT(response?.data?.data?.token);

          setCurrentUser(getUserInfoFromJWT(response.data?.data?.token));
          setLoading(false);
          history.push("/dashboard");
        } else {
          console.log("INVALID Login Details ");
        }
        return response;
      })
      .catch((error) => console.log(error));
  };

  function logout() {
    cleanLocalStorage();
    setCurrentUser(null);
    toast.success("Logged out Successfully");
  }

  useEffect(() => {
    (async () => {
      setCurrentUser(await getUserInfoFromJWT()());
      setLoading(false);
    })();
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
