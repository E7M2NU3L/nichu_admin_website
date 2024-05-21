import { Client, Databases, ID, Account} from "appwrite";

export class BlogDbService {
    client = new Client();
    database;
    users;

    constructor(){
        this.client.setEndpoint("https://cloud.appwrite.io/v1");
        this.client.setProject("65ec15ae94b048c5b098");
        this.database = new Databases(this.client);
        this.users = new Account(this.client);
    }

    async createBlog ({Title ,Description, Image}) {
        try {
            const promise = await this.database.createDocument(
                "65ec182e15ec8ffdec9d",
                "664881b900085cca30ad",
                ID.unique(),
                {
                    Title,
                    Description,
                    Image
                }
            )
    
            if(promise) {
                console.log(promise);
                return promise;
            }
            else {
                return "No response";
            }
        } catch (error) {
            console.error(error.message);
            return false;
        }
    }

    async updateBlog(slug, {Title ,Description, Image}){
        try {
            console.log("Data from the frontend: ");
            console.log(slug, {Title ,Description, Image})
            const promise = await this.database.updateDocument( "65ec182e15ec8ffdec9d",
            "664881b900085cca30ad",slug, {
                Title,
                Description,
                Image
            });
            if(promise) {
                console.log(promise);
                return promise;
            }
            else {
                return "No response";
            }
        } catch (error) {
            console.error("Error: "+ error.message);
            return false;
        }
    }

    async DeleteBlog (slug) {
        try {
            const promise = await this.database.deleteDocument( "65ec182e15ec8ffdec9d",
            "664881b900085cca30ad",slug);
            if(promise) {
                console.log(promise);
                return promise;
            }
            else {
                return "No response";
            }
        } catch (error) {
            console.error("Error: "+ error.message);
            return false;
        }
    }

    async FetchAllBlogs () {
        try {
            const promise = await this.database.listDocuments("65ec182e15ec8ffdec9d",
            "664881b900085cca30ad");
            if(promise) {
                console.log(promise);
                return promise;
            }
            else {
                return "No response";
            }
        } catch (error) {
            console.error(error.message);
            return false;
        }
    }

    async fetchSingleBlog(slug) {
        try {
            const promise = await this.database.getDocument("65ec182e15ec8ffdec9d",
            "664881b900085cca30ad", slug);
            if(promise) {
                console.log(promise);
                return promise;
            }
            else {
                return "No response";
            }
        } catch (error) {
            console.error(error.message);
            return false;
        }
    }

}

const blogs_db = new BlogDbService();
export default blogs_db;