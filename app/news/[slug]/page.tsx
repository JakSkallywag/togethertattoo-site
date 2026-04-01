import Link from "next/link";
import Image from "next/image";

interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  content: string;
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`https://www.jakrapmund.com/api/news/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function NewsPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return (
      <>
        <nav className="fixed top-0 w-full bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-[#2e2e2e] z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-[#e8e4dc] font-semibold tracking-wide">Together Tattoo</Link>
          </div>
        </nav>
        <main className="min-h-screen bg-[#1a1a1a] text-[#e8e4dc] flex items-center justify-center pt-16">
          <p className="text-[#888888]">Post not found.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <nav className="fixed top-0 w-full bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-[#2e2e2e] z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/Branding/tt-logo.jpg"
              alt="Together Tattoo"
              width={28}
              height={28}
              className="invert mix-blend-screen h-7 w-auto"
            />
            <span className="text-[#e8e4dc] font-semibold tracking-wide">Together Tattoo</span>
          </Link>
          <Link href="/#book" className="border border-[#e8e4dc] px-4 py-1.5 text-xs tracking-widest uppercase text-[#e8e4dc] hover:bg-[#e8e4dc] hover:text-[#1a1a1a] transition-colors">
            Book
          </Link>
        </div>
      </nav>

      <main className="min-h-screen bg-[#1a1a1a] text-[#e8e4dc] pt-16">
        <article className="max-w-2xl mx-auto px-6 pt-12 pb-24">
          <Link href="/" className="text-[#888888] text-sm hover:text-[#e8e4dc] transition-colors mb-8 inline-block">
            ← Together Tattoo
          </Link>

          {post.image && (
            <div className="w-full aspect-[16/9] relative overflow-hidden mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.image.startsWith('/') ? `https://www.jakrapmund.com${post.image}` : post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <p className="text-[#666666] text-xs tracking-widest uppercase mb-4">{post.date}</p>
          <h1 className="font-serif text-3xl mb-4">{post.title}</h1>
          {post.description && (
            <p className="text-[#888888] text-lg mb-12 leading-relaxed">{post.description}</p>
          )}
          <div
            className="news-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  );
}
