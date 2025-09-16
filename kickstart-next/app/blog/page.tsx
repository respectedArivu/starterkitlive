import { getBlogEntries } from "@/lib/contentstack";
import Link from "next/link";

export default async function BlogPage() {
  const blogs = await getBlogEntries();

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-extrabold mb-6 text-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400">
        Blog
      </h1>
      <ul className="space-y-6">
        {blogs.map((blog: any) => (
          <li
            key={blog.uid}
            className="bg-gray-900 border border-gray-800 p-6 rounded-none shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2 text-indigo-400 hover:text-indigo-300">
              {blog.title}
            </h2>
            <p className="text-gray-400 mb-4">
              {blog.author} • {blog.published_date}
            </p>
            <Link
              href={`/blog/${blog.slug}`}
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-none font-bold hover:bg-indigo-700 transition-colors"
            >
              Read More →
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
