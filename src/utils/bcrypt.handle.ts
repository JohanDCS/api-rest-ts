import { hash, compare } from 'bcryptjs';

const encrypt = async (pass: string): Promise<string> => {
    try {
        const passwordHash = await hash(pass, 10); // Ajusta el número de rounds según tus necesidades
        return passwordHash;
    } catch (error: any) {
        console.error('Error al cifrar la contraseña:', error.message);
        throw new Error('Error al cifrar la contraseña');
    }
};

const verified = async (pass: string, passHash: string): Promise<boolean> => {
    try {
        const isCorrect = await compare(pass, passHash);
        return isCorrect;
    } catch (error: any) {
        console.error('Error al verificar la contraseña:', error.message);
        throw new Error('Error al verificar la contraseña');
    }
};

export { encrypt, verified };
