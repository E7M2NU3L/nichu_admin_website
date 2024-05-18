import { Client, Databases, ID } from "appwrite";

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

    async CreateWebinar({
        Webinar_Name,
        Duration,
        Webinar_Date,
        Webinar_Thumbnail,
        Webinar_URL,
        Webinar_Description
    }){
        try {
            const promise = await this.database.createDocument(
                "65ec182e15ec8ffdec9d",
                "65ec18ca5a5ac7f2ab45",
                ID.unique(),
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
}

const webinarDB = new WebinarDBService();
export default webinarDB;