import { Client, Databases, ID } from "appwrite";
import VideoBucketService from "../bucket/VideoBucket";

export class VideoService {
    client = new Client();
    database;

    constructor(){
        this.client.setEndpoint("https://cloud.appwrite.io/v1");
        this.client.setProject("65ec15ae94b048c5b098");
        this.database = new Databases(this.client);
    }

    async PostCourseVid({Video_Title, Description, file}) {
        try {
            if(file) {
                const response = await VideoBucketService.FileUpload(file);
                console.log(response);

                const promise = this.database.createDocument(
                    "65ec182e15ec8ffdec9d",
                    "6634f0c8001a642a4c0d",
                    ID.unique(),
                    {
                        Video_URL: response,
                        Description: Description,
                        Video_Title: Video_Title
                    }
                )

                console.log(promise);
                return promise;
            }
        } catch (error) {
            console.log(
                "Error.message: ", error.message
            )
        }
    }

    async UpdateCourseVid({
        file,
        slug
    }) {
        try {
            const response = await VideoBucketService.UpdateFileUpload({
                file, slug
            })
            console.log(response);
            return response;
        } catch (error) {
            console.log("Error Occured: ", error.message);
            return false;
        }
    }

    async DeleteCourseVid({slug}) {
        try {
            const response = await VideoBucketService.DeleteFileUpload({
                slug
            })
            console.log(response);
            return response;
        } catch (error) {
            console.log("Error Occured: ", error.message);
            return false;
        }
    }
}