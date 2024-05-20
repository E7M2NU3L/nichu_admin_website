import { Client, Storage, ID } from "appwrite";
export class WebinarBucketService {
    client = new Client();
    bucket;

    constructor(){
        this.client.setEndpoint("https://cloud.appwrite.io/v1");
        this.client.setProject("65ec15ae94b048c5b098");

        this.bucket =  new Storage(this.client);
    }

    async CreateWebinarThumbnail(file){
        try {
            const promise = await this.bucket.createFile(
                "65ec1f75a350016f6f24",
                ID.unique(),
                file
            );
            console.log(promise);
           const Image = this.GetImage(promise.$id);
            console.log(Image);
        } catch (error) {
            console.log("Error creating file"+error.message);
            return false;
        }
    }

    async GetImage (file) {
        try {
            const promise = await this.bucket.getFile(file);
            console.log(promise);
        } catch (error) {
            console.log(
                "Error Occured: "+error.message
            );
            return false;
        }
    }

    async UpdateWebinarThumbnail(slug,file){
        try {
            const promise = await this.bucket.updateFile(
                "65ec1f75a350016f6f24",
                slug,
                file
            );
            // Construct the URL of the uploaded file
            const fileURL = `https://cloud.appwrite.io/v1/storage/buckets/65ec1f81c5d56c259bf7/files/${promise.$id}/view?project=65ec15ae94b048c5b098`;

            return fileURL;
        } catch (error) {
            console.log("Error updating file"+error.message);
            return false;
        }
    }

    async DeleteWebinarThumbnail(slug){
        try {
            const promise = await this.bucket.deleteFile(
                "65ec1f75a350016f6f24",
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
                "65ec1f75a350016f6f24",
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