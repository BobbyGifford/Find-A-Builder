import { db } from "../db";
import { builderPostsTable } from "../db/schema/builderPosting.ts";

interface BuilderPostCreate {
    user_id: number,
    email: string,
    name: string,
    website: string,
    phone?: string,
    description: string,
    profession: string,
}

export const createPost = async (creationData: BuilderPostCreate) => {
    const { user_id, email, name, website, phone, profession, description } = creationData;
    return db.insert(builderPostsTable).values({
        user_id,
        email,
        name,
        website,
        description,
        phone,
        profession
    }).returning({ id: builderPostsTable.id });
};

export const getPosts = async () => {
    return db.select().from(builderPostsTable)
}
