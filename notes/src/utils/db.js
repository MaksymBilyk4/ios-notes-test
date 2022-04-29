import Dexie from "dexie";

export const db = new Dexie("noteDB");
db.version(1).stores({
    note: "++id, title, date, text",
});

db.open().catch(error => {
    console.error("DB error => ", error)
})