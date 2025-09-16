import { getBlogBySlug } from "@/lib/contentstack";
import Link from "next/link";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetails({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return <p className="text-white p-6">Blog not found</p>;
  }

  return (
<article className="min-h-screen bg-black text-gray-200 p-8 w-full mx-auto">
  <h1 className="text-4xl font-extrabold mb-3 text-indigo-400 drop-shadow-lg">
    {blog.title}
  </h1>
  <p className="text-gray-400 mb-6">
    {blog.author} • {blog.published_date}
  </p>

  {blog.featured_image && (
    <img
      src={blog.featured_image.url}
      alt={blog.title}
      className="mb-6 w-full sm:w-3/4 md:w-2/3 h-auto object-cover rounded-md border border-gray-600 shadow-md mx-auto"
    />
  )}

  <div
    className="prose prose-invert max-w-none text-gray-200"
    dangerouslySetInnerHTML={{ __html: blog.body }}
  />

  <Link
    href="/blog"
    className="mt-8 inline-block text-indigo-500 font-bold hover:text-indigo-300 underline"
  >
    ← Back to Blog
  </Link>
</article>

  );
}
