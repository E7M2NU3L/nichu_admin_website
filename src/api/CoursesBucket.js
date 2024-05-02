import { Client, ID, Storage } from "appwrite";
import { configURL } from "../config/Conf";

export class CourseBucketService {
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

    async CreateCourseThumbnail(file){
        try {
            const promise = await this.bucket.createFile(
                configURL.appwrite_bucket_courses_id,
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
                configURL.appwrite_bucket_courses_id,
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
                configURL.appwrite_bucket_courses_id,
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
                configURL.appwrite_bucket_courses_id,
                slug
            )
            return promise;
        } catch (error) {
            console.log("Error creating thumbnail: ", error.message);
            return false;
        }
    }

    async GetCourseVideos(slug){
        try {
            const promise = await this.bucket.getFile(
                configURL.appwrite_bucket_courses_id,
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
                configURL.appwrite_bucket_courses_id,
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
                configURL.appwrite_bucket_courses_id,
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
                configURL.appwrite_bucket_courses_id,
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
                configURL.appwrite_bucket_courses_id,
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