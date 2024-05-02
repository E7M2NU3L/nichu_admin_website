import { Client, ID, Storage } from "appwrite";
import { configURL } from "../config/Conf";

export class InstructorBucketService {
    client = new Client();
    bucket;

    constructor(){
        this.client.setEndpoint(
            configURL.appwrite_connection_url
        ).setProject(
            configURL.appwrite_connection_id
        )

        this.bucket =  new Storage(this.client);
    }

    async CreateInstructorImage(file){
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

    async DeleteInstructorImage(slug){
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

    async GetInstructorImage(slug){
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

    async UpdateInstructorImage(slug , file) {
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

const InstructorService = new InstructorBucketService();

export default InstructorService;