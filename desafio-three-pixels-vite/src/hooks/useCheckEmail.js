import { useState } from "react";
import { checkEmailRequest } from '../services/api'

function useCheckEmail(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const validarEmail = async (email) => {
        if(!email) return;

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await checkEmailRequest(email);
            setSuccess(true);
        } catch (err){
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return {loading, error, success, validarEmail}
}

export default useCheckEmail;