import { Client, ID, Storage } from "appwrite";

class Introbucket{
    client;
    bucket;

    constructor(){
        this.client.setEndpoint("https://cloud.appwrite.io/v1");
        this.client.setProject("65ec15ae94b048c5b098");
        this.bucket = new Storage(this.client);
    }

    async CreateVideo(video) {
        try {
            const promise = await this.bucket.createFile(
                "65ec1f63377d0d0d79c3",
                ID.unique(),
                video
            );

            if(promise) {
                console.log(promise);
                const projectEndpoint = "https://cloud.appwrite.io/v1"
                const ProjectId = "65ec15ae94b048c5b098"
                const fileId = promise.$id
                const bucketId = "65ec1f63377d0d0d79c3"
                const fileURL = `${projectEndpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${ProjectId}&mode=admin`
                return fileURL;
            }
            else {
                return "No response";
            }
        } catch (error) {
            console.error(error.message);
            return false;
        }
    }
}

const intro_bucket = new Introbucket();
export default intro_bucket;