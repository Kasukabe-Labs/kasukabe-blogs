export interface Blog {
  _id: string;
  title: string;
  slug: string;
  author: string;
  publishedAt: string;
}

export interface FetchBlogsResponse {
  message: string;
  blogs: Blog[];
}
