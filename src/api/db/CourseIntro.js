import { Client, Databases, ID } from "appwrite";

class CourseIntroService {
    client;
    database;

    constructor() {
        this.client = new Client().setEndpoint().setProject();
        this.database = new Databases(this.client);
    }

    async createIntroVideo({
        Title,
        Description,
        Video
    }) {
        try {
            const promise = await this.database.createDocument(
                "65ec182e15ec8ffdec9d",
                "664cb792000ecc2bce5d",
                ID.unique(),
                {
                    Title,
                    Description,
                    Video
                }
            )

            if (promise.$id) {
                console.log("from the api");
                console.log(promise);
            }
            else {
                return false;
            }
        } catch (error) {
            console.error(error.message);
            return false;
        }
    }

    async deleteCourseIntro(slug) {
        try {
            await this.database.deleteDocument(
                "65ec182e15ec8ffdec9d",
                "664cb792000ecc2bce5d",
                slug
            )
        } catch (error) {
            console.error(error.message);
            return false;
        }
    }

    async UpdateCourseIntro(slug, {
        Title, 
        Description,
        Video
    }){
        try {
            const promise = await this.database.updateDocument(
                "65ec182e15ec8ffdec9d",
                "664cb792000ecc2bce5d",
                slug,
                {
                    Title,
                    Description,
                    Video
                }
            )

            if (promise.$id) {
                console.log("from the api");
                console.log(promise);
            }
            else {
                return false;
            }
        } catch (error) {
            console.error(error.message);
            return false;
        }
    }

    async ListCourseIntro() {
        try {
            const promise = await this.database.listDocuments();

            if (promise.documents) {
                console.log(promise);
                return promise.documents;
            }
            else {
                return "No response";
            }
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }
}

const IntroDb = new CourseIntroService();
export default IntroDb;