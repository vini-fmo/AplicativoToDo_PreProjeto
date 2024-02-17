export type TagCreateInput = {
  name: string;
  createdAt?: Date | string;
  tasks?: TaskCreateNestedManyWithoutTagsInput;
};
