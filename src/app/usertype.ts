export type Post = {
  title?: string;
  content?: string;
  likes?: number;
};

export type UserType = {
  email: string;
  userName: string;
  password: string;
  posts: Post[] | [];
  hobbies: string[];
};
