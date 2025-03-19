export const testWalletConnection = async () => {
    console.log('Testing MetaMask connection...');

    // Test 1: Check if MetaMask is installed
    if (!window.ethereum) {
        console.error('❌ MetaMask not detected');
        return false;
    }
    console.log('✅ MetaMask detected');

    // Test 2: Check if MetaMask is unlocked
    try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        console.log('Current connected accounts:', accounts);
        if (accounts.length === 0) {
            console.log('❌ No accounts connected');
        } else {
            console.log('✅ Account connected:', accounts[0]);
        }
    } catch (error) {
        console.error('❌ Error checking accounts:', error);
    }

    // Test 3: Check network
    try {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        console.log('✅ Current network chainId:', chainId);
    } catch (error) {
        console.error('❌ Error checking network:', error);
    }

    return true;
};
