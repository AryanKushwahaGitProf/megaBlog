import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create({
                userID: ID.unique(),
                email,
                password,
                name
            });

            if (userAccount) {
                return this.login({ email, password });
            }

            return userAccount;
        } catch (error) {
            throw error;
        }
    }

async login({ email, password }) {
    try {
        const session = await this.account.createEmailPasswordSession({
            email,
            password
        });

        console.log("🔥 LOGIN SUCCESS:", session);

        const user = await this.account.get();

        console.log("🔥 CURRENT USER:", user);

        return session;
    } catch (error) {
        console.log("🔥 LOGIN ERROR:", error);
        throw error;
    }
}

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("appwrite service :: getCurrentUser :: error", error);
            return null;
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("appwrite service :: logout :: error", error);
            return null;
        }
    }
}

const authService = new AuthService();

export default authService;
