import { useState } from "react";
import { checkPhoneRequest  } from "../services/api";

function useCheckPhone(){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const validarCelular = async (phone) => {
        if(!phone) return;

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await checkPhoneRequest(phone);
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    return {loading, error, success, validarCelular}
}

export default useCheckPhone;