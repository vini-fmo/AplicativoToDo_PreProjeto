export type TaskCreateInput = {
  name: string;
  completed?: boolean;
  deadline?: Date | string | null;
  priority?: number | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  users?: UserCreateNestedManyWithoutTasksInput;
  tags?: TagCreateNestedManyWithoutTasksInput;
};
