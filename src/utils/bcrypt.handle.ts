import { AppDataSource } from '../app.config';
import { type Auth } from '../interfaces/auth.interface';
import { type User } from '../interfaces/user.interface';
import { NumdocumentDB } from '../models/n_documento';
import { TipoDocumentoDB } from '../models/tipo_documento';
import { UserDB } from '../models/user';
import { encrypt, verified } from '../utils/bcrypt.handle';
import { generateToken } from '../utils/jwt.handle';

class AuthService {
	private static instance: AuthService;
	public static getInstance(): AuthService {
		if (!AuthService.instance) {
			this.instance = new AuthService();
		}

		return this.instance;
	}

	registerNewUser = async ({
		NumDoc,
		password,
		name,
		lastname,
		date_birth,
		document,
	}: User) => {
		try {
			const checksIs = await AppDataSource.getRepository(NumdocumentDB).findOneBy({
				NumDoc,
			});
			if (checksIs) throw new Error('ALREADY_REGISTERED');

			const documentObj = await AppDataSource.getRepository(TipoDocumentoDB).findOne({
				where: {
					tipoDocId: document,
				},
			});

			if (!documentObj) throw new Error('DOCUMENT_NOT_FOUND');

			const newUser = new UserDB();
			newUser.name = name;
			newUser.lastname = lastname;
			newUser.date_birth = date_birth;

			const passHash = await encrypt(password);
			newUser.password = passHash;

			await AppDataSource.getRepository(UserDB).save(newUser);

			const newNumDocument = new NumdocumentDB();
			newNumDocument.numDocument = NumDoc;
			newNumDocument.tipoDocumento = documentObj;
			newNumDocument.user = newUser;

			const responseInsert =
				await AppDataSource.getRepository(NumdocumentDB).save(newNumDocument);
			return responseInsert;
		} catch (e: any) {
			throw new Error(e.message);
		}
	};

	loginUser = async ({ NumDoc, password }: Auth) => {
		try {
			const user = await AppDataSource.getRepository(NumdocumentDB).findOne({
				where: {
					NumDoc,
				},
				relations: {
					user: true,
				},
				select: {
					user: {
						name: true,
						lastname: true,
						password: true,
					},
				},
			});
			if (!user) throw new Error('USER_NOT_FOUND');

			const passwordHash = user.user.password;
			const isCorrect = await verified(password, passwordHash);

			if (!isCorrect) throw new Error('PASSWORD_INCORRECT');

			const data = {
				user: user.NumDoc,
				username: user.user.name,
				userlastname: user.user.lastname,
			};

			const token = generateToken(JSON.stringify(data));

			return token;
		} catch (e: any) {
			throw new Error(e.message);
		}
	};
}

export const authService = AuthService.getInstance();