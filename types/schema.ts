import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

const UserInformationTable = sqliteTable("user_information", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text(),
    email: text(),
});

const APIKeyTable = sqliteTable("api_key", {
    id: int().primaryKey({ autoIncrement: true }),
    base_url: text().unique(),
    api_key: text(),
});

export { APIKeyTable, UserInformationTable };
