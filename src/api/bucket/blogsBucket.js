import { Client, ID, Storage } from "appwrite";

class BlogsbucketService {
    client = new Client();
    bucket;

    constructor() {
        this.client.setEndpoint("https://cloud.appwrite.io/v1");
        this.client.setProject("65ec15ae94b048c5b098");

        this.bucket =  new Storage(this.client);
    }

    async GetImagePreview(fileId) {
        try {
            const promise = this.bucket.getFilePreview(
                "65ec1f75a350016f6f24",
                fileId,
                500,
                500
            )
            if(promise) {
                console.log(promise);
                return true;
            }
            else {
                return "No response";
            }
        } catch (error) {
            console.error("Error : "+ error.message);
            return false;
        }
    }

    async UploadImage (file) {
        try {
            const promise = this.bucket.createFile(
                "65ec1f75a350016f6f24",
                ID.unique(),
                file
            );
            if(promise) {
                console.log(promise);
                return promise;
            }
            else {
                return "No response";
            }
        } catch (error) {
            console.error("Error : "+ error.message);
            return false;
        }
    }

    async DeleteImage (fileID) {
        try {
            const promise = await this.bucket.deleteFile(
                "65ec1f75a350016f6f24",
                fileID
            );
            if(promise) {
                console.log(promise);
                return true;
            }
            else {
                return "No response";
            }
        } catch (error) {
            console.error("Error : "+ error.message);
            return false;
        }
    }

    async GetImage (fileID) {
        try {
            const promise = await this.bucket.getFile(
                "65ec1f75a350016f6f24",
                fileID
            );
            if(promise) {
                console.log(promise);
                const projectEndpoint = "https://cloud.appwrite.io/v1"
                const ProjectId = "65ec15ae94b048c5b098"
                const fileId = promise.$id
                const bucketId = "65ec1f75a350016f6f24"
                const fileURL = `${projectEndpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${ProjectId}&mode=admin`
                return fileURL;
            }
            else {
                return "No response";
            }
        } catch (error) {
            console.error("Error : "+ error.message);
            return false;
        }
    }

    async UpdateImage ({fileID, file}) {
        try {
            const promise = await this.bucket.updateFile(
                "65ec1f75a350016f6f24",
                fileID,
                file
            );
            if(promise) {
                console.log(promise);
                return true;
            }
            else {
                return "No response";
            }
        } catch (error) {
            console.error("Error : "+ error.message);
            return false;
        }
    }
}

const blog_bucket = new BlogsbucketService();
export default blog_bucket;