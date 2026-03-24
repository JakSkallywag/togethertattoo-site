interface NewsPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  image?: string;
}

async function getNews(): Promise<NewsPost[]> {
  try {
    const res = await fetch("https://www.jakrapmund.com/api/news", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function NewsSection() {
  const news = await getNews();
  if (news.length === 0) return null;

  return (
    <section className="py-12 border-t border-[#2e2e2e]">
      <div className="max-w-6xl mx-auto px-6 mb-4">
        <h2 className="font-serif text-lg text-[#e8e4dc]">News</h2>
      </div>
      <div className="flex gap-6 overflow-x-auto px-6 pb-4" style={{ scrollbarWidth: "none" }}>
        {news.map(post => (
          <a
            key={post.slug}
            href={`/news/${post.slug}`}
            className="group flex-shrink-0 w-56"
          >
            <div className="w-56 h-40 bg-[#222222] overflow-hidden mb-3">
              {post.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                />
              ) : (
                <div className="w-full h-full bg-[#2a2a2a]" />
              )}
            </div>
            <p className="font-serif font-bold text-sm text-[#e8e4dc] mb-1 group-hover:text-white transition-colors leading-snug">
              {post.title}
            </p>
            {post.description && (
              <p className="text-[#888888] text-xs italic leading-relaxed">{post.description}</p>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
