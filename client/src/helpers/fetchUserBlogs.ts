import { FetchBlogsResponse } from "@/types/blogs";
import axios from "axios";
import { toast } from "sonner";

const API_ENDPOINT = `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/allUserBlogs`;

export async function fetchUserBlogs(): Promise<
  FetchBlogsResponse | undefined
> {
  try {
    const response = await axios.get<FetchBlogsResponse>(API_ENDPOINT, {
      withCredentials: true,
    });

    if (response.data.blogs.length === 0) {
      toast.warning("You don't have any blogs!");
      return;
    }

    return response.data;
  } catch (error) {
    toast.error("Internal server error. Please be patient");
    console.error(error);
    return;
  }
}
