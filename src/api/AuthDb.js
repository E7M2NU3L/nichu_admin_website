import { Client, Databases, ID } from "appwrite";
import { configURL } from "../config/Conf";
import authBucket from "./AuthBucket";

export class AuthDBService {
    client = new Client();
    database;

    constructor(){
        this.client.setEndpoint(
            configURL.appwrite_connection_url
        ).setProject(
            configURL.appwrite_connection_id
        )

        this.database = new Databases(this.client);
    }

    async CreateUserInfo({
        user_email,
        password,
        username
    }){
        try {
            const promise = await this.database.createDocument(
                configURL.appwrite_db_ID,
                configURL.appwrite_users_collection_id,
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