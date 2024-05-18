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
                const creation = await this.Login({
                    email,
                    password
                });
                console.log(creation);
                return creation;
            }
            else {
                const promise = await authDB.CreateUserInfo({                    
                    email,
                    password,
                    username
                });
                console.log(promise);
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

    async getCurrentUser() {
        try {
            const promise = await this.account.get('current');
            return promise;          
        } catch (error) {
            console.log(
                "Error Occured: "+ error.message
            )
            return false;
        }
    }

    async updateUserInfo({username, phoneNumber, file}, slug) {
        try {
            const response = await this.account.updateEmail()
        } catch (error) {
            console.log(
                "Error Occured: "+ error.message
            )
            return false;
        }
    }
}

const authService = new AuthService();

export default authService;