export const getHealth = () => ({
    status: 'OK',
    message: 'O software está saudável!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'   
});