import { axes as fallbackAxes, defaultSettings, news as fallbackNews, type AxisContent, type NewsContent } from "@/content/site";
import { getSanityClient } from "./client";

type Settings = typeof defaultSettings;

const fetchOptions = { next: { revalidate: 60 } } as const;

export async function getSiteSettings(): Promise<Settings> {
  const client = getSanityClient();
  if (!client) return defaultSettings;
  try {
    const data = await client.fetch(
      `*[_type == "siteSettings"][0]{heroTitle,heroText,"heroImageUrl":heroImage.asset->url,instagram,facebook}`,
      {},
      fetchOptions
    );
    return {
      heroTitle: data?.heroTitle || defaultSettings.heroTitle,
      heroText: data?.heroText || defaultSettings.heroText,
      heroImageUrl: data?.heroImageUrl || defaultSettings.heroImageUrl,
      instagram: data?.instagram || defaultSettings.instagram,
      facebook: data?.facebook || defaultSettings.facebook
    };
  } catch {
    return defaultSettings;
  }
}

export async function getAxes(): Promise<AxisContent[]> {
  const client = getSanityClient();
  if (!client) return fallbackAxes;
  try {
    const data = await client.fetch(
      `*[_type == "axis"] | order(order asc, title asc){
        title,"slug":slug.current,"text":summary,"index":coalesce(index,""),body,"imageUrl":image.asset->url
      }`,
      {},
      fetchOptions
    );
    return Array.isArray(data) && data.length ? data.map((item, i) => ({ ...item, index: item.index || String(i + 1).padStart(2, "0") })) : fallbackAxes;
  } catch {
    return fallbackAxes;
  }
}

export async function getAxis(slug: string): Promise<AxisContent | null> {
  const client = getSanityClient();
  if (!client) return fallbackAxes.find((item) => item.slug === slug) || null;
  try {
    const data = await client.fetch(
      `*[_type == "axis" && slug.current == $slug][0]{title,"slug":slug.current,"text":summary,"index":coalesce(index,""),body,"imageUrl":image.asset->url}`,
      { slug },
      fetchOptions
    );
    return data || fallbackAxes.find((item) => item.slug === slug) || null;
  } catch {
    return fallbackAxes.find((item) => item.slug === slug) || null;
  }
}

export async function getNews(): Promise<NewsContent[]> {
  const client = getSanityClient();
  if (!client) return fallbackNews;
  try {
    const data = await client.fetch(
      `*[_type == "news"] | order(coalesce(publishedAt,_createdAt) desc){
        title,"slug":slug.current,category,"text":summary,publishedAt,body,"imageUrl":image.asset->url
      }`,
      {},
      fetchOptions
    );
    if (!Array.isArray(data) || !data.length) return fallbackNews;
    return data.map((item) => ({ ...item, image: item.imageUrl || "/images/actualidad.webp" }));
  } catch {
    return fallbackNews;
  }
}

export async function getNewsItem(slug: string): Promise<NewsContent | null> {
  const client = getSanityClient();
  if (!client) return fallbackNews.find((item) => item.slug === slug) || null;
  try {
    const data = await client.fetch(
      `*[_type == "news" && slug.current == $slug][0]{title,"slug":slug.current,category,"text":summary,publishedAt,body,"imageUrl":image.asset->url}`,
      { slug },
      fetchOptions
    );
    if (data) return { ...data, image: data.imageUrl || "/images/actualidad.webp" };
    return fallbackNews.find((item) => item.slug === slug) || null;
  } catch {
    return fallbackNews.find((item) => item.slug === slug) || null;
  }
}

export type CmsPage = {
  title?: string;
  eyebrow?: string;
  intro?: string;
  body?: unknown[];
  imageUrl?: string;
};

export async function getPageContent(slug: string): Promise<CmsPage | null> {
  const client = getSanityClient();
  if (!client) return null;
  try {
    return await client.fetch(
      `*[_type == "page" && slug.current == $slug][0]{title,eyebrow,intro,body,"imageUrl":image.asset->url}`,
      { slug },
      fetchOptions
    );
  } catch {
    return null;
  }
}
