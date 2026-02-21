import { notFound } from 'next/navigation';
import { PostPage } from '@/app/_components/LayoutSections';
import { formatDateLongUS } from '@/lib/date';
import { renderMarkdownToReact } from '@/lib/markdown';
import { getAllPostParams, getPostByParams } from '@/lib/posts';

export async function generateStaticParams() {
  return getAllPostParams();
}

export async function generateMetadata({ params }) {
  const resolved = await params;
  const post = await getPostByParams(resolved);
  if (!post) {
    return { title: 'Post not found' };
  }

  return {
    title: post.title
  };
}

export default async function PostPermalinkPage({ params }) {
  const resolved = await params;
  const post = await getPostByParams(resolved);
  if (!post) {
    notFound();
  }
  const content = await renderMarkdownToReact(post.body);

  return (
    <PostPage
      title={post.title}
      dateText={formatDateLongUS(post.date)}
      footer={
        <section className="section">
          <div className="container post-meta-footer">
            <p>
              <strong>Tags:</strong>{' '}
              {post.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </p>
            <p>
              Written by {post.author} on {formatDateLongUS(post.date)}.
            </p>
          </div>
        </section>
      }
    >
      <article className="content">{content}</article>
    </PostPage>
  );
}
