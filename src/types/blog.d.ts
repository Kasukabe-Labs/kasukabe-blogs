interface Tags {
  name: string;
  slug: string;
}

export interface IBlog extends Document {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
  slug: string;
  author: mongoose.Types.ObjectId;
  tags: Tags[];
  isPublished: boolean;
  publishedAt?: Date;
  isDraft: boolean;
}
