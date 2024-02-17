export type UserCreateInput = {
  email: string;
  name?: string | null;
  password: string;
  tasks?: TaskCreateNestedManyWithoutUsersInput;
};
