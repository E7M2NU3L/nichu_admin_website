import { Client, Databases, ID } from "appwrite";
import { configURL } from "../config/Conf";
import webinarBucket from "./WebinarsBucket";

export class WebinarDBService{
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

    async FetchAllWebinars(){
        try {
            const promise = this.databases.listDocuments(
                configURL.appwrite_db_ID,
                configURL.appwrite_webinar_collection_id,
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
            const promise = this.databases.getDocument(
                configURL.appwrite_db_ID,
                configURL.appwrite_webinar_collection_id,
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
        Webinar_Thumbnail
    }){
        try {
            const promise = await this.databases.createDocument(
                configURL.appwrite_db_ID,
                configURL.appwrite_webinar_collection_id,
                ID.unique(),
                {
                    Webinar_Name,
                    Duration,
                    Webinar_Date,
                    Webinar_Thumbnail: webinarBucket.CreateWebinarThumbnail(Webinar_Thumbnail)
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
        Webinar_Thumbnail
    }){
        try {
            const promise = await this.databases.updateDocument(
                configURL.appwrite_db_ID,
                configURL.appwrite_webinar_collection_id,
                slug,
                {
                    Webinar_Name,
                    Duration,
                    Webinar_Date,
                    Webinar_Thumbnail: webinarBucket.UpdateWebinarThumbnail(Webinar_Thumbnail)
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
            const promise = await this.databases.deleteDocument(
                configURL.appwrite_db_ID,
                configURL.appwrite_webinar_collection_id,
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