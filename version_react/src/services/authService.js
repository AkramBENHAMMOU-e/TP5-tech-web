const API_URL = 'http://localhost:5000';

export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/users?email=${credentials.email}`);
        const users = await response.json();

        const user = users.find(u => u.email === credentials.email && u.password === credentials.password);

        if (!user) {
            throw new Error('Email ou mot de passe incorrect');
        }

        // Ne pas renvoyer le mot de passe au client
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    } catch (error) {
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        // Vérifier si l'email existe déjà
        const checkUser = await fetch(`${API_URL}/users?email=${userData.email}`);
        const existingUsers = await checkUser.json();

        if (existingUsers.length > 0) {
            throw new Error('Cet email est déjà utilisé');
        }

        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Erreur lors de l\'inscription');
        }

        const newUser = await response.json();
        // Ne pas renvoyer le mot de passe
        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    } catch (error) {
        throw error;
    }
};