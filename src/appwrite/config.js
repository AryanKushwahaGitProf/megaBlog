import conf from "../conf/conf";
import { Client, ID, TablesDB, Query, Storage } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }

    // ---------------- DATABASE ----------------

    async createPost({
        title,
        slug,
        content,
        feturedimage,
        status,
        userId
    }) {
        try {
            return await this.databases.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
                data: {
                    title,
                    content,
                    feturedimage,
                    status,
                    userID: userId
                }
            });
        } catch (error) {
            console.log(
                "Appwrite service :: createPost :: error",
                error
            );
        }
    }

    async updatePost(
        slug,
        { title, content, feturedimage, status }
    ) {
        try {
            return await this.databases.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
                data: {
                    title,
                    content,
                    feturedimage,
                    status
                }
            });
        } catch (error) {
            console.log(
                "Appwrite service :: updatePost :: error",
                error
            );
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug
            });

            return true;
        } catch (error) {
            console.log(
                "Appwrite service :: deletePost :: error",
                error
            );

            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug
            });
        } catch (error) {
            console.log(
                "Appwrite service :: getPost :: error",
                error
            );
        }
    }

    async getPosts(
        queries = [Query.equal("status", "active")]
    ) {
        try {
            return await this.databases.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                queries
            });
        } catch (error) {
            console.log(
                "Appwrite service :: getPosts :: error",
                error
            );
        }
    }

    // ---------------- STORAGE ----------------

    async uploadFile(file) {
        try {
            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file
            });
        } catch (error) {
            console.log(
                "Appwrite service :: uploadFile :: error",
                error
            );

            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId
            });

            return true;
        } catch (error) {
            console.log(
                "Appwrite service :: deleteFile :: error",
                error
            );

            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFileView({
            bucketId: conf.appwriteBucketId,
            fileId
        });
    }
}

const service = new Service();

export default service;