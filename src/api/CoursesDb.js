import { Client, Databases, ID } from "appwrite";
import { configURL } from "../config/Conf";
import CourseBucket from "./CoursesBucket";

export class CourseDatabaseService {
    client = new Client();
    database;

    constructor(){
        this.client.setEndpoint(
            configURL.appwrite_connection_url
            ).setProject(
            configURL.appwrite_connection_id
        )
        this.database = new Databases(this.client);
    }

    async ListAllCourses(){
        try {
            const promise = await this.database.listDocuments(
                configURL.appwrite_db_ID,
                configURL.appwrite_courses_collection_id,
                []
            )

            return promise;
        } catch (error) {
            console.log("Error Occurred: ", error.message);
            return false;
        }
    }

    async ListCourse(slug){
        try {
            const promise = await this.database.getDocument(
                configURL.appwrite_db_ID,
                configURL.appwrite_courses_collection_id,
                slug
            )
            return promise;
        } catch (error) {
            console.log("Error Occurred: ", error.message);
            return false;
        }
    }

    async CreateCourse({
        Course_name, 
        Course_Duration,
        Description,
        Course_thumbnail,
        Course_Instructor,
        video
    }){
        try {
            const promise = await this.database.createDocument(
                configURL.appwrite_db_ID,
                configURL.appwrite_courses_collection_id,
                ID.unique(),
                {
                    Course_name, 
                    Course_Duration,
                    Description,
                    Course_thumbnail : CourseBucket.CreateCourseThumbnail(Course_thumbnail),
                    Course_Instructor,
                    Course_Video_URL: CourseBucket.CreateCourseVideos(video)
                }
            )

            return promise;
        } catch (error) {
            console.log(
                "Error Occured: ",error.nessage
            );
            return false;
        }
    }

    async UpdateCourse(slug, {
        Course_name, 
        Course_Duration,
        Description,
        Course_thumbnail,
        Course_Instructor,
        video
    }){
        try {
            const promise = await this.database.updateDocument(
                configURL.appwrite_db_ID,
                configURL.appwrite_courses_collection_id,
                slug,
                {
                    Course_name, 
                    Course_Duration,
                    Description,
                    Course_thumbnail : CourseBucket.UpdateCoutseThumbnail(Course_thumbnail),
                    Course_Instructor,
                    Course_Video_URL: CourseBucket.UpdateCourseVidee(video)
                }
            )
            return promise;
        } catch (error) {
            console.log("Error Occured: ",error.nessage);
            return false;
        }
    }

    async DeleteCourse(slug){
        try {
            await this.database.deleteDocument(
                configURL.appwrite_db_ID,
                configURL.appwrite_courses_collection_id,
                slug
            )
        } catch (error) {
            console.log("Error Occured: ", error.message);
            return false;
        }
    }

    async FilterCourse(query){
        try {
            const promise = await this.database.listDocuments(
                configURL.appwrite_db_ID,
                configURL.appwrite_courses_collection_id,
                query
            )
            return promise;
        } catch (error) {
            console.log("Error Occured: ", error.message);
            return false;
        }
    }
}

const courseDB = new CourseDatabaseService();

export default courseDB;