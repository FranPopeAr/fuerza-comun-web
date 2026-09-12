import { axes as fallbackAxes, defaultSettings, news as fallbackNews, type AxisContent, type NewsContent } from "@/content/site";
import { sanityFetch } from "./client";

type Settings = typeof defaultSettings;

export async function getSiteSettings(): Promise<Settings> {
  try {
    const data = await sanityFetch<Partial<Settings>>(`*[_type == "siteSettings"][0]{heroTitle,heroText,"heroImageUrl":heroImage.asset->url,instagram,facebook}`);
    return {
      heroTitle: data?.heroTitle || defaultSettings.heroTitle,
      heroText: data?.heroText || defaultSettings.heroText,
      heroImageUrl: data?.heroImageUrl || defaultSettings.heroImageUrl,
      instagram: data?.instagram || defaultSettings.instagram,
      facebook: data?.facebook || defaultSettings.facebook
    };
  } catch { return defaultSettings; }
}

export async function getAxes(): Promise<AxisContent[]> {
  try {
    const data = await sanityFetch<AxisContent[]>(`*[_type == "axis"] | order(order asc, title asc){title,"slug":slug.current,"text":summary,"index":coalesce(index,""),body,"imageUrl":image.asset->url}`);
    return Array.isArray(data) && data.length ? data.map((item, i) => ({ ...item, index: item.index || String(i + 1).padStart(2, "0") })) : fallbackAxes;
  } catch { return fallbackAxes; }
}

export async function getAxis(slug: string): Promise<AxisContent | null> {
  try {
    return await sanityFetch<AxisContent>(`*[_type == "axis" && slug.current == $slug][0]{title,"slug":slug.current,"text":summary,"index":coalesce(index,""),body,"imageUrl":image.asset->url}`, { slug }) || fallbackAxes.find((x)=>x.slug===slug) || null;
  } catch { return fallbackAxes.find((x)=>x.slug===slug) || null; }
}

export async function getNews(): Promise<NewsContent[]> {
  try {
    const data = await sanityFetch<NewsContent[]>(`*[_type == "news"] | order(coalesce(publishedAt,_createdAt) desc){title,"slug":slug.current,category,"text":summary,publishedAt,body,"imageUrl":image.asset->url}`);
    if (!Array.isArray(data) || !data.length) return fallbackNews;
    return data.map((item) => ({ ...item, image: item.imageUrl || "/images/actualidad.webp" }));
  } catch { return fallbackNews; }
}

export async function getNewsItem(slug: string): Promise<NewsContent | null> {
  try {
    const data = await sanityFetch<NewsContent>(`*[_type == "news" && slug.current == $slug][0]{title,"slug":slug.current,category,"text":summary,publishedAt,body,"imageUrl":image.asset->url}`, { slug });
    return data ? { ...data, image: data.imageUrl || "/images/actualidad.webp" } : fallbackNews.find((x)=>x.slug===slug) || null;
  } catch { return fallbackNews.find((x)=>x.slug===slug) || null; }
}

export type CmsPage = { title?: string; eyebrow?: string; intro?: string; body?: unknown[]; imageUrl?: string };
export async function getPageContent(slug: string): Promise<CmsPage | null> {
  try { return await sanityFetch<CmsPage>(`*[_type == "page" && slug.current == $slug][0]{title,eyebrow,intro,body,"imageUrl":image.asset->url}`, { slug }); }
  catch { return null; }
}
