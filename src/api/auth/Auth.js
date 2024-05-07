import {Account, Client, Databases, ID} from 'appwrite';
import authDB from '../db/AuthDb';
import { configURL } from '../../config/Conf';
import { AuthConfig } from '../../config/AuthConf';

export class AuthService {
    client = new Client();
    account;
    database;

    constructor(){
        this.client.setEndpoint("https://cloud.appwrite.io/v1");
        this.client.setProject("65ec15ae94b048c5b098");
        this.account = new Account(this.client);
        this.database = new Databases(this.client);
    }

    async signup({username, email, password}){
        try {

            // return promise
            const promise = await this.account.create(
                ID.unique(),
                email,
                password,
                username
            )

            if (promise) {
                const creation = await authDB.CreateUserInfo({
                    email,
                    username,
                    password
                });
                console.log(creation);
                return [promise, creation]
            }
            else {
                return false
            }
        } catch (error) {
            console.log("Error Occured: ", error.message);
            return false;
        }
    }

    async Login({email, password}){
        try {
            
            // handle empty details
            if (!email && !password) {
                console.log("The input fields are not filled in properly")
            }

            console.log("Email: ",email);
            console.log("password: ", password);
            
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
            const response = await this.account.deleteSessions();
            return response;
        } catch (error) {
            console.log("Error Occured: ", error.message);
            return false;
        }
    }
}

const authService = new AuthService();

export default authService;