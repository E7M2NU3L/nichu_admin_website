import { Client, Databases, ID } from "appwrite";
import { configURL } from "../../config/Conf";
import CourseBucket from "../bucket/CoursesBucket";

export class CourseDatabaseService {
    client = new Client();
    database;

    constructor(){
        this.client.setEndpoint("https://cloud.appwrite.io/v1");
         this.client.setProject("65ec15ae94b048c5b098");
        this.database = new Databases(this.client);
    }

    async ListAllCourses(){
        try {
            const promise = await this.database.listDocuments(
                "65ec182e15ec8ffdec9d",
                "65ec18d41448ef512152",
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
                "65ec182e15ec8ffdec9d",
                "65ec18d41448ef512152",
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
                "65ec182e15ec8ffdec9d",
                "65ec18d41448ef512152",
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
                "65ec182e15ec8ffdec9d",
                "65ec18d41448ef512152",
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
                "65ec182e15ec8ffdec9d",
                "65ec18d41448ef512152",
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
                "65ec182e15ec8ffdec9d",
                "65ec18d41448ef512152",
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