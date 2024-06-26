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
            if(response) {
                console.log(response);
                const projectEndpoint = "https://cloud.appwrite.io/v1"
                const ProjectId = "65ec15ae94b048c5b098"
                const fileId = response.$id
                const bucketId = "65ec1f63377d0d0d79c3"
                const fileURL = `${projectEndpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${ProjectId}&mode=admin`
                return fileURL;
            }
            else {
                return "No response";
            }
        } catch (error) {
            console.log(
                "Error Occured: ",error.message
            );
            return false;
        }
    }
}

const VideoBucketService = new CourseBucketService();
export default VideoBucketService;