import { useState } from "react";
import { preSigninRequest, signinRequest } from "../services/api";

function useSignin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userExist, setUserExist] = useState(false);
  const [isAuthenticate, setAuthenticate] = useState(false);

  const verificaUsername = async (username: string) => {
    if (!username) return;

    setLoading(true);
    setError(null);

    try {
      const data = await preSigninRequest(username);
      if (data && data.username) {
        setUserExist(true);
      } else {
        setError("Usuário não cadastrado no sistema.");
        setUserExist(false);
      }
    } catch (err: any) {
      setError(err.message);
      setUserExist(false);
    } finally {
      setLoading(false);
    }
  };

  const realizeSignin = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await signinRequest(username, password);
      setAuthenticate(true);
      return data;
    } catch (err: any) {
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
