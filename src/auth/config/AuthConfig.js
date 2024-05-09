export function useAuthConfig() {
    const authConfig = (token) => ({
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const paymentConfig = (token, sessionId) => ({
        headers: {
            Authorization: `Bearer ${token}`,
            'X-Stripe-Session-Id': sessionId
        }
    });

    return {
        authConfig,
        paymentConfig
    };
}