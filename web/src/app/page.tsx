import { defineQuery, type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";

const POSTS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current)] | order(_createdAt desc){ _id, title, slug }`
);

export default async function Home() {
  const posts = await client.fetch<SanityDocument[]>(
    POSTS_QUERY,
    {},
    { next: { revalidate: 30 } }
  );

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            district23
          </h1>
          {posts.length === 0 ? (
            <p className="text-zinc-500">No posts yet. Add content in the Studio.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {posts.map((post) => (
                <li key={post._id}>
                  <a
                    href={`/posts/${(post.slug as { current?: string })?.current}`}
                    className="font-medium text-zinc-950 underline dark:text-zinc-50"
                  >
                    {post.title as string}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <span className="text-sm text-zinc-400">Powered by Sanity</span>
        </div>
      </main>
    </div>
  );
}
