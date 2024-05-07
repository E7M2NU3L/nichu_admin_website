import { Client, ID, Storage } from "appwrite";
import { configURL } from "../../config/Conf";

export class AuthBucketService {
    client = new Client();
    bucket;

    constructor(){
        this.client.setEndpoint("https://cloud.appwrite.io/v1");
        this.client.setProject("65ec15ae94b048c5b098");

        this.bucket =  new Storage(this.client);
    }

    async CreateUserImage(file){
        try {
            const promise = await this.bucket.createFile(
                configURL.appwrite_bucket_users_id,
                ID.unique(),
                file
            )
            return promise;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

    async DeleteUserImage(slug){
        try {
            const promise = await this.bucket.deleteFile(
                configURL.appwrite_bucket_users_id,
                slug
            )
            return promise;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

    async GetUserImage(slug){
        try {
            const promise = await this.bucket.getFile(
                configURL.appwrite_bucket_users_id,
                slug
            )
            return promise;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

    async UpdateUserImage(slug , file) {
        try {
            const promise = await this.bucket.updateFile(
                configURL.appwrite_bucket_users_id,
                slug,
                file
            )
            return promise;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }
}

const authBucket = new AuthBucketService();

export default authBucket;