import { Client, ID, Storage } from "appwrite";

export class CourseBucketService {
    client = new Client();
    bucket;

    constructor(){
        this.client.setEndpoint("https://cloud.appwrite.io/v1");
        this.client.setProject("65ec15ae94b048c5b098");
        this.bucket =  new Storage(this.client);
    }

    async FileUpload(file) {
        try {
            const response = this.bucket.createFile(
                "65ec1f63377d0d0d79c3",
                ID.unique(),
                file
            )
            console.log(response);
            return response
        } catch (error) {
            console.log(
                "Error Occured: ",error.message
            );
            return false;
        }
    }

    async UpdateFileUpload({file, slug}) {
        try {
            const response = this.bucket.updateFile(
                "65ec1f63377d0d0d79c3",
                slug,
                file
            )
            console.log(response);
            return response;
        } catch (error) {
            console.log(
                "Error Occured: ", error.message
            )
            return false;
        }
    }

    async DeleteFileUpload({slug}) {
        try {
            await this.bucket.deleteFile(
                "65ec1f63377d0d0d79c3",
                slug,
            )
            return True
        } catch (error) {
            console.log(
                "Error Occured: ", error.message
            )
            return false;
        }
    }
}

const VideoBucketService = new CourseBucketService();
export default VideoBucketService;