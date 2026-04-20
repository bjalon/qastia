import parseToml from '@iarna/toml/parse-string.js';
import { marked } from 'marked';

import configRaw from '../config.toml?raw';

import homeIndexRaw from '../content/_index/index.md?raw';
import homeHeroRaw from '../content/_index/hero.md?raw';
import homeIntroRaw from '../content/_index/intro.md?raw';

import coworkingIndexRaw from '../content/coworking/_index/index.md?raw';
import coworkingHeroRaw from '../content/coworking/_index/hero.md?raw';
import coworkingIntroRaw from '../content/coworking/_index/intro.md?raw';

import referencesIndexRaw from '../content/references/index.md?raw';
import referencesMembersIndexRaw from '../content/references/members/index.md?raw';
import enedisMemberRaw from '../content/references/members/enedis.md?raw';
import sgMemberRaw from '../content/references/members/societe-generale.md?raw';
import rdpMemberRaw from '../content/references/members/13-rdp.md?raw';

import enedisIndexRaw from '../content/reference-list/enedis/index.md?raw';
import enedisContentRaw from '../content/reference-list/enedis/content.md?raw';
import sgIndexRaw from '../content/reference-list/societe-generale/index.md?raw';
import sgContentRaw from '../content/reference-list/societe-generale/content.md?raw';
import rdpIndexRaw from '../content/reference-list/13-rdp/index.md?raw';
import rdpContentRaw from '../content/reference-list/13-rdp/content.md?raw';

import contactRaw from '../content/_global/contact.md?raw';
import footerRaw from '../content/_global/footer.md?raw';
import thankYouIndexRaw from '../content/merci/index.md?raw';
import thankYouContentRaw from '../content/merci/content.md?raw';
import servicesRaw from '../content/services/index.md?raw';
import blogIndexRaw from '../content/blog/_index.md?raw';

marked.setOptions({
  gfm: true,
  breaks: true,
});

function normalizePath(path) {
  if (!path) {
    return '/';
  }

  if (path === '/') {
    return '/';
  }

  return path.endsWith('/') ? path.slice(0, -1) : path;
}

function parseFrontMatter(raw) {
  if (!raw.startsWith('+++')) {
    return {
      data: {},
      body: raw.trim(),
    };
  }

  const match = raw.match(/^\+\+\+\n([\s\S]*?)\n\+\+\+\n?/);

  if (!match) {
    return {
      data: {},
      body: raw.trim(),
    };
  }

  return {
    data: parseToml(match[1]),
    body: raw.slice(match[0].length).trim(),
  };
}

function assetPath(value) {
  if (!value) {
    return '';
  }

  if (value.startsWith('http') || value.startsWith('/images/') || value.startsWith('/favicon')) {
    return value;
  }

  if (value.startsWith('/logos/')) {
    return `/images${value}`;
  }

  if (value.startsWith('/')) {
    return value;
  }

  return `/images/${value}`;
}

function renderMarkdown(markdown) {
  return marked.parse(markdown ?? '');
}

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function excerpt(markdown, maxLength = 180) {
  const text = stripHtml(renderMarkdown(markdown));

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim()}…`;
}

function parseMarkdownFile(raw) {
  const { data, body } = parseFrontMatter(raw);

  return {
    data,
    body,
    html: renderMarkdown(body),
  };
}

function extractFirstLink(markdown) {
  const match = markdown.match(/\[[^\]]+\]\(([^)]+)\)/);
  return match ? match[1] : null;
}

function parseDate(value) {
  if (!value) {
    return null;
  }

  const normalized = String(value).trim();
  const asIso = /^\d{4}-\d{2}-\d{2}$/.test(normalized) ? normalized : null;

  if (asIso) {
    const date = new Date(`${asIso}T00:00:00`);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const reversed = normalized.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (reversed) {
    const date = new Date(`${reversed[1]}-${reversed[2]}-${reversed[3]}T00:00:00`);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const direct = new Date(normalized);
  return Number.isNaN(direct.getTime()) ? null : direct;
}

function formatDate(value) {
  const date = value instanceof Date ? value : parseDate(value);

  if (!date) {
    return '';
  }

  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function parseServiceBlocks(raw) {
  return raw
    .split(/^# /m)
    .map((section) => section.trim())
    .filter(Boolean)
    .map((section) => {
      const [titleLine, ...contentLines] = section.split('\n');
      const description = contentLines.join('\n').trim();

      return {
        title: titleLine.trim(),
        description,
        html: renderMarkdown(description),
      };
    });
}

function buildLegacyBlogPost(path, raw) {
  const parsed = parseFrontMatter(raw);
  let title = parsed.data.title ?? '';
  let canonical = '';
  let body = parsed.body;

  const lines = body.split('\n');

  while (lines[0] && !lines[0].trim()) {
    lines.shift();
  }

  if (lines[0] && /^(https?:\/\/|\/)/.test(lines[0].trim())) {
    canonical = lines.shift().trim();
  }

  while (lines[0] && !lines[0].trim()) {
    lines.shift();
  }

  if (!title && lines[0]) {
    title = lines.shift().trim();
  }

  while (lines[0] && !lines[0].trim()) {
    lines.shift();
  }

  body = lines.join('\n').trim();

  const slugFromCanonical = canonical
    ? canonical.replace(/\/$/, '').split('/').filter(Boolean).pop()
    : null;

  const slugFromPath = path
    .replace('../content/blog/', '')
    .replace('/index.md', '')
    .replace('.md', '');

  const slug = slugFromCanonical || slugFromPath;
  const urlDateMatch = canonical.match(/\/(\d{4})\/(\d{2})\/(\d{2})\//);
  const derivedDate = urlDateMatch
    ? new Date(`${urlDateMatch[1]}-${urlDateMatch[2]}-${urlDateMatch[3]}T00:00:00`)
    : parseDate(parsed.data.date);

  const canonicalUrl = canonical
    ? canonical.startsWith('/')
      ? `https://qastia.com${canonical}`
      : canonical
    : '';

  return {
    slug,
    title: title || 'Article',
    body,
    html: renderMarkdown(body),
    date: derivedDate,
    dateLabel: formatDate(derivedDate),
    summary: parsed.data.summary?.trim() || excerpt(body),
    canonical: canonicalUrl,
  };
}

const siteConfig = parseToml(configRaw);

const homeIndex = parseFrontMatter(homeIndexRaw);
const homeHero = parseFrontMatter(homeHeroRaw);
const homeIntro = parseMarkdownFile(homeIntroRaw);

const coworkingIndex = parseFrontMatter(coworkingIndexRaw);
const coworkingHero = parseFrontMatter(coworkingHeroRaw);
const coworkingIntro = parseMarkdownFile(coworkingIntroRaw);

const referencesIndex = parseMarkdownFile(referencesIndexRaw);
const referencesMembersIndex = parseFrontMatter(referencesMembersIndexRaw);

const referenceMemberFiles = [
  parseMarkdownFile(sgMemberRaw),
  parseMarkdownFile(enedisMemberRaw),
  parseMarkdownFile(rdpMemberRaw),
];

const referenceDetails = [
  {
    meta: parseFrontMatter(sgIndexRaw).data,
    content: parseMarkdownFile(sgContentRaw),
  },
  {
    meta: parseFrontMatter(enedisIndexRaw).data,
    content: parseMarkdownFile(enedisContentRaw),
  },
  {
    meta: parseFrontMatter(rdpIndexRaw).data,
    content: parseMarkdownFile(rdpContentRaw),
  },
].map((entry) => ({
  slug: normalizePath(`/reference-list/${entry.meta.title.toLowerCase()}`)
    .replace('/reference-list/société générale', '/reference-list/societe-generale')
    .replace('/reference-list/13ème rdp', '/reference-list/13-rdp')
    .replace('/reference-list/enedis', '/reference-list/enedis')
    .replace('/reference-list/', ''),
  title: entry.meta.title,
  body: entry.content.body,
  html: entry.content.html,
}));

const references = referenceMemberFiles
  .map((item) => {
    const link = extractFirstLink(item.body);
    const slug = normalizePath(link ?? '').replace('/reference-list/', '');

    return {
      slug,
      title: item.data.title,
      weight: item.data.weight,
      position: item.data.position,
      location: item.data.lives_in,
      image: assetPath(item.data.asset?.image),
      summary: excerpt(item.body),
      link,
    };
  })
  .sort((left, right) => (left.weight ?? 0) - (right.weight ?? 0));

const referencePages = references.map((item) => {
  const detail = referenceDetails.find((entry) => entry.slug === item.slug);
  const detailSummary = detail?.body
    ? excerpt(
        detail.body
          .replace(/<img[^>]*>/g, ' ')
          .replace(/___/g, ' '),
        180,
      )
    : '';

  return {
    ...item,
    summary: detailSummary || item.summary,
    html: detail?.html ?? '',
  };
});

const contactContent = parseFrontMatter(contactRaw).data;
const footerContent = parseMarkdownFile(footerRaw);
const thankYouContent = {
  meta: parseFrontMatter(thankYouIndexRaw).data,
  content: parseMarkdownFile(thankYouContentRaw),
};

const blogModules = import.meta.glob('../content/blog/**/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
});

const blogPosts = Object.entries(blogModules)
  .filter(([path]) => path !== '../content/blog/_index.md')
  .filter(([path]) => !path.includes('/_index/') && !path.includes('/_global/'))
  .map(([path, raw]) => buildLegacyBlogPost(path, raw))
  .sort((left, right) => {
    if (!left.date && !right.date) {
      return left.title.localeCompare(right.title, 'fr');
    }

    if (!left.date) {
      return 1;
    }

    if (!right.date) {
      return -1;
    }

    return right.date - left.date;
  });

export const siteData = {
  brand: {
    name: siteConfig.params.name,
    description: siteConfig.params.description,
  },
  navigation: (siteConfig.menu.main ?? []).map((item) => ({
    label: item.name,
    href: item.url === '/#contact' ? '#contact' : item.url,
  })),
  footerLinks: siteConfig.menu.footer ?? [],
  socialLinks: (siteConfig.menu.footer_social ?? []).map((item) => ({
    label: item.name === 'linkedind' ? 'LinkedIn' : item.name,
    href: item.url,
  })),
  home: {
    title: homeIndex.data.title,
    description: homeIndex.data.description,
    heroImage: assetPath(homeHero.data.header?.image),
    introHtml: homeIntro.html,
  },
  coworking: {
    title: coworkingIndex.data.title,
    description: coworkingIndex.data.description,
    heroImage: assetPath(coworkingHero.data.header?.image),
    introHtml: coworkingIntro.html,
  },
  services: parseServiceBlocks(servicesRaw),
  references: {
    title: referencesMembersIndex.data.title,
    heroImage: '/images/hero-reference.jpg',
    introHtml: referencesIndex.html,
    items: referencePages,
  },
  contact: {
    title: contactContent.title,
    action: contactContent.post_url,
    buttonLabel: contactContent.button,
    hiddenFields: contactContent.fields.hidden ?? [],
    fields: {
      name: contactContent.fields.name,
      phone: contactContent.fields.phone,
      message: contactContent.fields.message,
    },
  },
  footer: {
    html: footerContent.html,
  },
  thankYou: {
    title: thankYouContent.meta.title,
    html: thankYouContent.content.html,
  },
  blog: {
    title: parseFrontMatter(blogIndexRaw).data.title,
    items: blogPosts,
  },
};

export function findReference(slug) {
  return siteData.references.items.find((item) => item.slug === slug) ?? null;
}

export function findBlogPost(slug) {
  return siteData.blog.items.find((item) => item.slug === slug) ?? null;
}
