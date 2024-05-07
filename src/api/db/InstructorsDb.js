import { Client , Databases, ID } from "appwrite";
import { configURL } from "../../config/Conf";
import InstructorService from "../bucket/InstructorBucket";

export class InstructorDBService{
    client = new Client();
    databases;

    constructor(){
        this.client.setEndpoint(
            configURL.appwrite_connection_url
        ).setProject(
            configURL.appwrite_connection_id
        )

        this.databases = new Databases(this.client);
    }

    async createInstructor({
        Instructor_Name,
        Instructor_Description,
        Instructor_Portfolio,
        Instructor_Linked_in,
        Instructor_IG,
        Instructor_Photo
    }){
        try {
            const promise = await this.databases.createDocument(
                configURL.appwrite_db_ID,
                configURL.appwrite_instructor_collection_id,
                ID.unique(),
                {
                    Instructor_Name, 
                    Instructor_Description,
                    Instructor_Portfolio,
                    Instructor_Linked_in,
                    Instructor_IG,
                    Instructor_Photo: InstructorService.CreateInstructorImage(
                        Instructor_Photo
                    )
                }
            )
            return promise;
        } catch (error) {
            console.log(
                "Error Creating the Instructor: ", error.message
            );
            return false;
        }
    }

    async updateInstructor(slug, {
        Instructor_Name,
        Instructor_Description,
        Instructor_Portfolio,
        Instructor_Linked_in,
        Instructor_IG,
        Instructor_Photo
    }){
        try {
            const promise = await this.databases.updateDocument(
                configURL.appwrite_db_ID,
                configURL.appwrite_instructor_collection_id,
                slug,
                {
                    Instructor_Name, 
                    Instructor_Description,
                    Instructor_Portfolio,
                    Instructor_Linked_in,
                    Instructor_IG,
                    Instructor_Photo: InstructorService.UpdateInstructorImage(
                        Instructor_Photo
                    )
                }
            )
            return promise;
        } catch (error) {
            console.log(
                "Error Updating the Instructor: " + error.message
            );
            return false;
        }
    }

    async FetchAllInstructors(){
        try {
            const promise = await this.databases.listDocuments(
                configURL.appwrite_db_ID,
                configURL.appwrite_instructor_collection_id
            )
            return promise;
        } catch (error) {
            console.log(
                "Error Fetching the Instructors: " + error.message
            );
            return false;
        }
    }

    async FetchSingleInstructor(slug){
        try {
            const promise = await this.databases.getDocument(
                configURL.appwrite_db_ID,
                configURL.appwrite_instructor_collection_id,
                slug
            )
            return promise;
        } catch (error) {
            console.log(
                "Error Fetching the Instructor: " + error.message
            );
            return false;
        }
    }

    async DeleteInstructor(slug){
        try {
            const promise = await this.databases.deleteDocument(
                configURL.appwrite_db_ID,
                configURL.appwrite_instructor_collection_id,
                slug
            )
            return promise;
        } catch (error) {
            console.log(
                "Error Deleting the Instructor: " + error.message
            );
            return false;
        }
    }

    async InstructorFilter(query){
        try {
            const promise = await this.databases.listDocuments(
                configURL.appwrite_db_ID,
                configURL.appwrite_instructor_collection_id,
                query
            )
            return promise;
        } catch (error) {
            console.log(
                "Error Filtering the Instructor: " + error.message
            )
            return false;
        }
    }
}

const instructorDB = new InstructorDBService();
export default instructorDB;