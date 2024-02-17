export type usersDTO = {
  email: string;
  name?: string | null;
  password: string;
  tasks?: TaskCreateNestedManyWithoutUsersInput;
};
