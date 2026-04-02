import { useState } from "react";
import { checkEmailRequest } from '../services/api'

interface useCheckEmailReturn {
    loading: boolean;
    error: string | null;
    success: boolean;
    validarEmail: (email: string) => Promise<void>
}

function useCheckEmail(): useCheckEmailReturn {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const validarEmail = async (email: string): Promise<void> => {
        if(!email) return;

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await checkEmailRequest(email);
            setSuccess(true);
        } catch (err){
            setError(err instanceof Error ? err.message : "Erro inesperado");
        } finally {
            setLoading(false);
        }
    }

    return {loading, error, success, validarEmail}
}

export default useCheckEmail;