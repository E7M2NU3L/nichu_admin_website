import {Account, Client, Databases, ID} from 'appwrite';
import { configURL } from '../config/Conf';
import { AuthConfig } from '../config/AuthConf';
import authDB from './AuthDb';

export class AuthService {
    client = new Client();
    account;
    database;

    constructor(){
        this.client.setEndpoint(configURL.appwrite_connection_url);
        this.client.setProject(configURL.appwrite_connection_id);
        this.account = new Account(this.client);
        this.database = new Databases(this.client);
    }

    async signup({username, email, password}){
        try {

            // checking if the user is admin
            const userIchu = AuthConfig.username
            const emailNichu = AuthConfig.email
            const passwordNichu = AuthConfig.password
            if(username !== userIchu && passwordNichu !== password && emailNichu !== email){
                return false;
            }

            // return promise
            const promise = await this.account.create(
                ID.unique(),
                email,
                password,
                username
            )

            if (promise) {
                return this.Login({
                    email, password
                })
            }
            else {
                return authDB.CreateUserInfo({
                    email,
                    username,
                    password
                });
            }
        } catch (error) {
            console.log("Error Occured: ", error.message);
            return false;
        }
    }

    async Login({email, password}){
        try {
             // checking if the user is admin
             const emailNichu = AuthConfig.email
             const passwordNichu = AuthConfig.password
             if(passwordNichu !== password && emailNichu !== email){
                 return false;
             }

             // get the promise
            const promise = await this.account.createEmailPasswordSession(email, password);
            return promise;
        } catch (error) {
            console.log("Error Occured: ", error.message);
            return false;
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Error Occured: ", error.message);
            return false;
        }
    }
}

const authService = new AuthService();

export default authService;