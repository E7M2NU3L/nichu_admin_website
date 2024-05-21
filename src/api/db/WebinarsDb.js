import { Client, Databases, ID } from "appwrite";
import { v4 as uuidv4 } from 'uuid';

export class WebinarDBService{
    client = new Client();
    database;

    constructor(){
        this.client.setEndpoint("https://cloud.appwrite.io/v1");
         this.client.setProject("65ec15ae94b048c5b098");
        this.database = new Databases(this.client);
    }

    async FetchAllWebinars(){
        try {
            const promise = this.database.listDocuments(
                "65ec182e15ec8ffdec9d",
                "65ec18ca5a5ac7f2ab45",
                []
            )
            return promise;
        } catch (error) {
            console.log(
                "Error fetching all webinars: "+ error.message
            );
            return false;
        }
    }

    async FetchSingleWebinars(slug){
        try {
            console.log(slug);
            const promise = this.database.getDocument(
                "65ec182e15ec8ffdec9d",
                "65ec18ca5a5ac7f2ab45",
                slug
            )
            return promise;
        } catch (error) {
            console.log(
                "Error Fetching the Webinar: " + error.message
            );
            return false;
        }
    }

    async generateUniqueId() {
        try {
            return 'webinar_' + new Date().getTime() + '_' + Math.random().toString(36).substring(2);   
        } catch (error) {
            console.log("Error: "+ error.message);
        }
    }
    
    async UpdateWebinar(slug,{
        Webinar_Name,
        Duration,
        Webinar_Date,
        Webinar_Thumbnail,
        Webinar_URL,
        Webinar_Description
    }){
        try {
            const promise = await this.database.updateDocument(
                "65ec182e15ec8ffdec9d",
                "65ec18ca5a5ac7f2ab45",
                slug,
                {
                    Webinar_Name,
                    Duration,
                    Webinar_Date,
                    Webinar_Thumbnail,
                    Webinar_ID : ID.unique(),
                    Webinar_URL,
                    Webinar_Description
                }
            )
            return promise;
        } catch (error) {
            console.log(
                "Error creating the Webinar: " + error.message
            )
            return false;
        }
    }

    async DeleteDocument(slug) {
        try {
            const promise = await this.database.deleteDocument(
                "65ec182e15ec8ffdec9d",
                "65ec18ca5a5ac7f2ab45",
                slug
            )
            return promise;
        } catch (error) {
            console.log(
                "Error deleting the Webinar: " + error.message
            )
            return false;
        }
    }

    async CreateWebinar({
        Webinar_Name,
        Duration,
        Webinar_Date,
        Webinar_Thumbnail,
        Webinar_URL,
        Webinar_Description,
        Instructor_Id
    }) {
        let attempt = 0;
        const maxAttempts = 5;
    
        while (attempt < maxAttempts) {
            try {
                const uniqueId = ID.unique();
                console.log("Generated Unique ID: ", uniqueId);
    
                const promise = await this.database.createDocument(
                    "65ec182e15ec8ffdec9d",
                    "65ec18ca5a5ac7f2ab45",
                    uniqueId,
                    {
                        Webinar_Name,
                        Duration,
                        Webinar_Date,
                        Webinar_Thumbnail,
                        Webinar_ID: uniqueId, // Ensure uniqueness
                        Webinar_URL,
                        Webinar_Description,
                        instructor: Instructor_Id
                    }
                );
                return promise;
            } catch (error) {
                console.log(error.message);
                return false;
            }
        }
    
        console.log("Failed to create Webinar after multiple attempts.");
        return false;
    }
}

const webinarDB = new WebinarDBService();
export default webinarDB;