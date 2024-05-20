import { Client, ID, Storage } from "appwrite";

export class InstructorBucketService {
    client = new Client();
    bucket;

    constructor(){
        this.client.setEndpoint("https://cloud.appwrite.io/v1");
        this.client.setProject("65ec15ae94b048c5b098");

        this.bucket =  new Storage(this.client);
    }

    async CreateInstructorImage(file){
        console.log("From Storage APi")
        console.log(file)
        try {
            const promise = await this.bucket.createFile(
                "65ec1f81c5d56c259bf7",
                ID.unique(),
                file
            )
            console.log(promise.$id);
            // Construct the URL of the uploaded file
            return promise.$id;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

    async DeleteInstructorImage(slug){
        try {
            const promise = await this.bucket.deleteFile(
                "65ec1f81c5d56c259bf7",
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
                "65ec1f81c5d56c259bf7",
                slug
            )
            const projectEndpoint = "https://cloud.appwrite.io/v1"
            const ProjectId = "65ec15ae94b048c5b098"
            const bucketId = "65ec1f81c5d56c259bf7"
            const fileId = promise.$id
            const fileURL = `${projectEndpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${ProjectId}&mode=admin`
            return fileURL;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

    async UpdateInstructorImage(slug , file) {
        try {
            const promise = await this.bucket.updateFile(
                "65ec1f81c5d56c259bf7",
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