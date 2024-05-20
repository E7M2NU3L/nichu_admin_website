import { Client , Databases, ID } from "appwrite";
import InstructorService from "../bucket/InstructorBucket";

export class InstructorDBService{
    client = new Client();
    database;

    constructor(){
        this.client.setEndpoint("https://cloud.appwrite.io/v1");
         this.client.setProject("65ec15ae94b048c5b098");
        this.database = new Databases(this.client);
    }

    async createInstructor({
        Instructor_Name,
        Instructor_Description,
        Instructor_Portfolio,
        Instructor_Linked_in,
        Instructor_IG,
        Instructor_Photo,
    }) {
        try {
            console.log("From the api folder");
            console.log("Database ID and Collection ID:", "65ec182e15ec8ffdec9d", "65ec1c68a1be3cdfa452");
            console.log(
                "Instructor Details:",
                Instructor_Name,
                Instructor_Description,
                Instructor_Portfolio,
                Instructor_Linked_in,
                Instructor_IG,
                Instructor_Photo
            );
    
            // Ensure `databases` is properly initialized and available
            if (!this.database) {
                throw new Error("Databases object is not initialized");
            }
    
            // Create document
            const promise = await this.database.createDocument(
                "65ec182e15ec8ffdec9d", // Database ID
                "65ec1c68a1be3cdfa452", // Collection ID
                ID.unique(),
                {
                    Instructor_Name,
                    Instructor_Description,
                    Instructor_Portfolio,
                    Instructor_Linked_in,
                    Instructor_IG,
                    Instructor_Photo: Instructor_Photo,
                    Instructor_ID: ID.unique()
                }
            );
    
            console.log("Document created successfully:", promise);
            return promise;
        } catch (error) {
            console.log("Error Creating the Instructor:", error.message);
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
            const promise = await this.database.updateDocument(
                "65ec182e15ec8ffdec9d",
                "65ec1c68a1be3cdfa452",
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
            const promise = await this.database.listDocuments(
                "65ec182e15ec8ffdec9d",
                "65ec1c68a1be3cdfa452",
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
            const promise = await this.database.getDocument(
                "65ec182e15ec8ffdec9d",
                "65ec1c68a1be3cdfa452",
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
            console.log(slug);
            const promise = await this.database.deleteDocument(
                "65ec182e15ec8ffdec9d",
                "65ec1c68a1be3cdfa452",
                slug
            )
            return promise;
        } catch (error) {
            console.log(slug);
            console.error(
                "Error Deleting the Instructor: " + error.message
            );
            return false;
        }
    }

    async InstructorFilter(query){
        try {
            const promise = await this.database.listDocuments(
                "65ec182e15ec8ffdec9d",
                "65ec1c68a1be3cdfa452",
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