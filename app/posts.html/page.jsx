import Link from 'next/link';
import { StandardPage } from '@/app/_components/LayoutSections';
import { getAllPosts } from '@/lib/posts';
import { formatDateLongUS } from '@/lib/date';

export const metadata = {
  title: 'Posts'
};

export default async function PostsHtmlPage() {
  const posts = await getAllPosts();

  return (
    <StandardPage
      currentPath="/posts.html"
      title="Posts"
      subtitle="Things I&apos;ve written on various topics"
      narrow
    >
      <div className="posts-index">
        {posts.map((post) => (
          <article key={post.url}>
            <p className="meta">
              {formatDateLongUS(post.date)} - {post.readMinutes} minute read
            </p>
            <h3>
              <Link href={post.url}>{post.title}</Link>
            </h3>
          </article>
        ))}
      </div>
    </StandardPage>
  );
}
