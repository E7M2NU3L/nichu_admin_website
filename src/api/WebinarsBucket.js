import { Client, Storage, ID } from "appwrite";
import { configURL } from "../config/Conf";

export class WebinarBucketService {
    client = new Client();
    bucket;

    constructor(){
        this.client.setEndpoint(
            configURL.appwrite_connection_url
        ).setProject(
            configURL.appwrite_connection_id
        );

        this.bucket = new Storage(this.client);
    }

    async CreateWebinarThumbnail(file){
        try {
            const promise = await this.bucket.createFile(
                configURL.appwrite_bucket_webinar_id,
                ID.unique(),
                file
            );
            return promise;
        } catch (error) {
            console.log("Error creating file"+error.message);
            return false;
        }
    }

    async UpdateWebinarThumbnail(slug,file){
        try {
            const promise = await this.bucket.updateFile(
                configURL.appwrite_bucket_webinar_id,
                slug,
                file
            );
            return promise;
        } catch (error) {
            console.log("Error updating file"+error.message);
            return false;
        }
    }

    async DeleteWebinarThumbnail(slug){
        try {
            const promise = await this.bucket.deleteFile(
                configURL.appwrite_bucket_webinar_id,
                slug
            );
            return promise;
        } catch (error) {
            console.log("Error deleting file"+error.message);
            return false;
        }
    }

    async GetWebinarImagePreview(slug){
        try {
            const promise = await this.bucket.getFilePreview(
                configURL.appwrite_bucket_webinar_id,
                slug
            );
            return promise;
        } catch (error) {
            console.log("Error getting file"+error.message);
            return false;
        }
    }
}

const webinarBucket = new WebinarBucketService();
export default webinarBucket;