export type tagsDTO = {
  name: string;
  createdAt?: Date | string;
  tasks?: TaskCreateNestedManyWithoutTagsInput;
};
