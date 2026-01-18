import { useState } from "react";
import { preSigninRequest } from "../services/api";
import { signinRequest } from "../services/api";

function useSignin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userExist, setUserExist] = useState(false);
  const [isAuthenticate, setAuthenticate] = useState(false);

  const verificaUsername = async (username) => {
    if (!username) return;

    setLoading(true);
    setError(null);

    try {
      const data = await preSigninRequest(username);
      if (data && data.userExist !== false) {
        setUserExist(true);
      } else {
        setError("Usuário não cadastrado no sistema.");
        setUserExist(false);
      }
    } catch (err) {
      setError(err.message);
      setUserExist(false);
    } finally {
      setLoading(false);
    }
  };

  const realizeSignin = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const data = await signinRequest(username, password);
      setAuthenticate(true);
      return data;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    userExist,
    isAuthenticate,
    verificaUsername,
    realizeSignin,
  };
}

export default useSignin;
