export const checkOAuthAuth = async (walletAddress) => {
    try {
        const response = await fetch('/api/auth/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ walletAddress }),
        });
        return response.ok;
    } catch (error) {
        console.error('Auth verification failed:', error);
        return false;
    }
}
