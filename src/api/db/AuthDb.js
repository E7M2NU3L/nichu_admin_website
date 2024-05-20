import { Client, Databases, ID, Account} from "appwrite";
import { configURL } from "../../config/Conf";
import authBucket from "../bucket/AuthBucket";

export class AuthDBService {
    client = new Client();
    database;
    users;

    constructor(){
        this.client.setEndpoint("https://cloud.appwrite.io/v1");
        this.client.setProject("65ec15ae94b048c5b098");
        this.database = new Databases(this.client);
        this.users = new Account(this.client);
    }

    async GetUserInfo(userId) {
        try {
            const promise = await this.users.get();
        } catch (error) {
            console.log("Error Message"+ error.message);
        }
    }

    async CreateUserInfo({
        user_email,
        password,
        username
    }){
        try {
            const promise = await this.database.createDocument(
                "65ec182e15ec8ffdec9d",
                "65ec184a65550085f404",
                ID.unique(),
                {
                    user_email,
                    password,
                    username
                }
            )

            return promise;
        } catch (error) {
            console.log(
                "Error Occured: ", error.message
            )
            return false;
        }
    }

    async UpdateUserInfo(slug,{
        username,
        Users_Image
    }){
        try {
            const promise = await this.database.updateDocument(
                configURL.appwrite_db_ID,
                configURL.appwrite_users_collection_id,
                slug,
                {
                    username,
                    Users_Image: authBucket.updateDocument(Users_Image)
                }
            )
            return promise;
        } catch (error) {
            console.log("Error Occured: ", error.message);
            return false;
        }
    }
}

const authDB = new AuthDBService();
export default authDB;