import { Client, ID, Storage } from "appwrite";
import { configURL } from "../../config/Conf";

export class CourseBucketService {
    client = new Client();
    bucket;

    constructor(){
        this.client.setEndpoint("https://cloud.appwrite.io/v1");
        this.client.setProject("65ec15ae94b048c5b098");

        this.bucket =  new Storage(this.client);
    }

    async CreateCourseThumbnail(file){
        try {
            const promise = await this.bucket.createFile(
                "65ec1f63377d0d0d79c3",
                ID.unique(),
                file
            )
            return promise;
        } catch (error) {
            console.log("Error creating thumbnail: ", error.message);
            return false;
        }
    }

    async CreateCourseVideos(video){
        try {
            const promise = await this.bucket.createFile(
                "65ec1f63377d0d0d79c3",
                ID.unique(),
                video
            )
            return promise;
        } catch (error) {
            console.log("Error creating video: ", error.message);
            return false;
        }
    }

    async GetCourseThumbnailPreview(slug){
        try {
            const promise = await this.bucket.getFilePreview(
                "65ec1f63377d0d0d79c3",
                slug
            )
            return promise;
        } catch (error) {
            console.log("Error creating thumbnail preview: ", error.message);
            return false;
        }        
    }

    async GetCourseThumbnail(slug){
        try {
            const promise = await this.bucket.getFile(
                "65ec1f63377d0d0d79c3",
                slug
            )
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
            console.log("Error creating thumbnail: ", error.message);
            return false;
        }
    }

    async GetCourseVideos(slug){
        try {
            const promise = await this.bucket.getFile(
                "65ec1f63377d0d0d79c3",
                slug
            )
            return promise;
        } catch (error) {
            console.log("Error creating video: ", error.message);
            return false;
        }
    }

    async UpdateCoutseThumbnail(slug, file) {
        try {
            const promise = await this.bucket.updateFile(
                "65ec1f63377d0d0d79c3",
                slug,
                file
            )
            return promise;
        } catch (error) {
            console.log("Error updating video: ", error.message);
            return false;
        }
    }

    async UpdateCourseVidee(slug, videoa){
        try {
            const promise = await this.bucketupdateFile(
                "65ec1f63377d0d0d79c3",
                slug,
                [videoa]
            )
            return promise;
        } catch (error) {
            console.log("Error updating video: ", error.message);
            return false;
        }
    }

    async DeleteCourseThumbnail(slug){
        try {
            const promise = await this.bucket.deleteFile(
                "65ec1f63377d0d0d79c3",
                slug
            )
            return promise;
        } catch (error) {
            console.log("Error deleting thumbnail: ", error.message);
            return false;
        }
    }

    async DeleteCourseVideo(slug){
        try {
            const promise = await this.bucket.deleteFile(
                "65ec1f63377d0d0d79c3",
                slug
            )
            return promise;
        } catch (error) {
            console.log("Error deleting video: ", error.message);
            return false;
        }
    }
}

const CourseBucket = new CourseBucketService();
export default CourseBucket;