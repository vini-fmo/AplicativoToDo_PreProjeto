export type tasksDTO = {
    id?: number;
    name: string;
    completed?: boolean;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    tags?: string[];
}
