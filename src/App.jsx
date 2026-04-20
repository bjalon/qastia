import { useEffect, useRef, useState } from 'react';
import { findBlogPost, findReference, siteData } from './siteData';

function normalizePath(path) {
  if (!path || path === '/') {
    return '/';
  }

  return path.endsWith('/') ? path.slice(0, -1) : path;
}

function resolvePage(path) {
  if (path === '/') {
    return {
      kind: 'home',
      title: siteData.home.title,
    };
  }

  if (path === '/coworking') {
    return {
      kind: 'coworking',
      title: siteData.coworking.title,
    };
  }

  if (path === '/references') {
    return {
      kind: 'references',
      title: siteData.references.title,
    };
  }

  if (path.startsWith('/reference-list/')) {
    const slug = path.replace('/reference-list/', '');
    const reference = findReference(slug);

    if (reference) {
      return {
        kind: 'reference-detail',
        title: reference.title,
        reference,
      };
    }
  }

  if (path === '/blog') {
    return {
      kind: 'blog',
      title: siteData.blog.title,
    };
  }

  if (path.startsWith('/blog/')) {
    const slug = path.replace('/blog/', '');
    const article = findBlogPost(slug);

    if (article) {
      return {
        kind: 'blog-detail',
        title: article.title,
        article,
      };
    }
  }

  if (path === '/merci') {
    return {
      kind: 'thank-you',
      title: siteData.thankYou.title,
    };
  }

  return {
    kind: 'not-found',
    title: 'Page introuvable',
  };
}

function documentTitle(page) {
  return page.kind === 'home' ? 'Qastia' : `${page.title} | Qastia`;
}

function scrollToHash(hash) {
  const target = document.querySelector(hash);

  if (!target) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  target.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

function SmartLink({ href, navigate, className, children }) {
  const isExternal = /^(https?:\/\/|mailto:|tel:)/.test(href);

  return (
    <a
      className={className}
      href={href}
      onClick={(event) => {
        if (
          isExternal ||
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }

        event.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </a>
  );
}

function HeroVisual({ src, variant = 'default' }) {
  return (
    <div className={`hero-media hero-media-${variant}`} aria-hidden="true">
      <div className="hero-media-orb hero-media-orb-primary" />
      <div className="hero-media-orb hero-media-orb-secondary" />
      <div className="hero-media-frame">
        <img className="hero-media-image" src={src} alt="" loading="eager" decoding="async" />
      </div>
    </div>
  );
}

function LogoBadge({ src, alt, size = 'card' }) {
  return (
    <div className={`logo-badge logo-badge-${size}`}>
      <img className="logo-badge-image" src={src} alt={alt} loading="lazy" decoding="async" />
    </div>
  );
}

function ReferenceCard({ item, navigate, titleTag = 'h3', showLocation = false, ctaLabel = 'En savoir plus', ctaClassName = 'text-link' }) {
  const TitleTag = titleTag;

  return (
    <article className="panel reference-card">
      <div className="reference-card-media">
        <LogoBadge src={item.image} alt={`Logo ${item.title}`} />
      </div>

      <div className="reference-card-body">
        <TitleTag>{item.title}</TitleTag>
        <p className="card-meta reference-card-role">{item.position}</p>
        {showLocation ? <p className="card-meta reference-card-location">{item.location}</p> : null}
        {item.summary ? <p className="reference-card-summary">{item.summary}</p> : null}
        <SmartLink href={`/reference-list/${item.slug}`} navigate={navigate} className={ctaClassName}>
          {ctaLabel}
        </SmartLink>
      </div>
    </article>
  );
}

function Header({ currentPath, navigate }) {
  return (
    <header className="site-header">
      <div className="header-shell">
        <SmartLink href="/" navigate={navigate} className="brand">
          <div>
            <strong>{siteData.brand.name}</strong>
            <span>{siteData.brand.description}</span>
          </div>
        </SmartLink>

        <nav className="main-nav" aria-label="Navigation principale">
          {siteData.navigation.map((item) => (
            <SmartLink
              key={item.href}
              href={item.href}
              navigate={navigate}
              className={navClassName(currentPath, item.href)}
            >
              {item.label}
            </SmartLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

function navClassName(currentPath, href) {
  const basePath = href.startsWith('#') ? currentPath : normalizePath(href.split('#')[0]);
  const isActive = href === '#contact'
    ? false
    : basePath === currentPath || (href === '/' && currentPath === '/');

  return isActive ? 'nav-link is-active' : 'nav-link';
}

function PageHero({ eyebrow, title, description, image, compact, visualVariant = 'default' }) {
  return (
    <section className={`hero hero-${visualVariant} ${compact ? 'hero-compact' : ''}`.trim()}>
      <div className="hero-copy">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {description ? <p className="hero-description">{description}</p> : null}
      </div>
      {image ? <HeroVisual src={image} variant={visualVariant} /> : null}
    </section>
  );
}

function RichText({ html, className = '' }) {
  return <div className={`rich-text ${className}`.trim()} dangerouslySetInnerHTML={{ __html: html }} />;
}

function HomePage({ navigate }) {
  return (
    <>
      <PageHero
        title={siteData.home.title}
        description="Conseil en production logicielle, structuration d’équipes et accompagnement de projets à forte valeur métier."
        image={siteData.home.heroImage}
        visualVariant="home"
      />

      <section className="section-grid">
        <article className="panel panel-large">
          <div className="section-heading">
            <p className="eyebrow">Accompagnement</p>
            <h2>Pour la réussite de vos équipes et de vos projets</h2>
          </div>
          <RichText html={siteData.home.introHtml} className="content-prose" />
        </article>

        <aside className="panel panel-accent">
          <p className="eyebrow">Qastia</p>
          <h2>Expertise transverse</h2>
          <p>
            Production logicielle, innovation, intelligence artificielle et structuration
            d&apos;équipes techniques dans des contextes métier exigeants.
          </p>
          <div className="stats-grid">
            <div>
              <strong>10+ ans</strong>
              <span>d&apos;expérience</span>
            </div>
            <div>
              <strong>Multi-domaines</strong>
              <span>énergie, défense, média, assurance</span>
            </div>
            <div>
              <strong>Transmission</strong>
              <span>montée en compétence des équipes internes</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="section-stack">
        <div className="section-heading">
          <p className="eyebrow">Services</p>
          <h2>Interventions ciblées sur les sujets qui bloquent vraiment</h2>
        </div>

        <div className="card-grid">
          {siteData.services.map((service) => (
            <article key={service.title} className="panel service-card">
              <h3>{service.title}</h3>
              <RichText html={service.html} />
            </article>
          ))}
        </div>
      </section>

      <section className="section-stack">
        <div className="section-heading section-heading-row">
          <div>
            <p className="eyebrow">Références</p>
            <h2>Quelques missions menées par Qastia</h2>
          </div>
          <SmartLink href="/references" navigate={navigate} className="secondary-link">
            Voir toutes les références
          </SmartLink>
        </div>

        <div className="card-grid">
          {siteData.references.items.map((item) => (
            <ReferenceCard key={item.slug} item={item} navigate={navigate} />
          ))}
        </div>
      </section>
    </>
  );
}

function CoworkingPage() {
  return (
    <>
      <PageHero
        title={siteData.coworking.title}
        description="Un espace de travail partagé à Preuilly-sur-Claise, pensé pour les métiers du numérique, le travail à distance et les échanges entre indépendants."
        image={siteData.coworking.heroImage}
        visualVariant="home"
      />

      <section className="section-grid">
        <article className="panel panel-large">
          <RichText html={siteData.coworking.introHtml} className="content-prose" />
        </article>

        <aside className="panel panel-accent">
          <p className="eyebrow">Le lieu</p>
          <h2>Un espace conçu pour le travail digital</h2>
          <ul className="feature-list">
            <li>Bureaux dédiés dans un espace partagé</li>
            <li>Salle de réunion, accueil et détente</li>
            <li>Internet, impression, scanner et salle serveur</li>
            <li>Capacité actuelle de 7 coworkers</li>
          </ul>
        </aside>
      </section>
    </>
  );
}

function ReferencesPage({ navigate }) {
  return (
    <>
      <PageHero
        title={siteData.references.title}
        description="Une sélection de missions menées par Qastia, du cadrage métier à la mise en production, dans des contextes techniques et organisationnels exigeants."
        image={siteData.references.heroImage}
        visualVariant="home"
      />

      <section className="section-stack">
        <div className="card-grid">
          {siteData.references.items.map((item) => (
            <ReferenceCard
              key={item.slug}
              item={item}
              navigate={navigate}
              titleTag="h2"
              showLocation
              ctaLabel="Lire la référence"
              ctaClassName="cta-link"
            />
          ))}
        </div>
      </section>
    </>
  );
}

function ReferenceDetailPage({ reference, navigate }) {
  return (
    <>
      <PageHero
        title={reference.title}
        description={`${reference.position} · ${reference.location}`}
        compact
      />

      <section className="detail-layout">
        <aside className="panel detail-sidebar">
          <LogoBadge src={reference.image} alt={`Logo ${reference.title}`} size="detail" />
          <p className="detail-label">Localisation</p>
          <p>{reference.location}</p>
          <SmartLink href="/references" navigate={navigate} className="secondary-link">
            Retour aux références
          </SmartLink>
        </aside>

        <article className="panel panel-large">
          <RichText html={reference.html} className="article-prose" />
        </article>
      </section>
    </>
  );
}

function BlogPage({ navigate }) {
  return (
    <>
      <PageHero
        title={siteData.blog.title}
        description="Articles, retours d’expérience et archives techniques publiés par Qastia."
        compact
      />

      <section className="section-stack">
        <div className="card-grid">
          {siteData.blog.items.map((article) => (
            <article key={article.slug} className="panel blog-card">
              <p className="card-meta">{article.dateLabel}</p>
              <h2>{article.title}</h2>
              <p>{article.summary}</p>
              <SmartLink href={`/blog/${article.slug}`} navigate={navigate} className="text-link">
                Lire l&apos;article
              </SmartLink>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function BlogDetailPage({ article, navigate }) {
  return (
    <>
      <PageHero
        title={article.title}
        description={article.dateLabel ? `Archive publiée le ${article.dateLabel}.` : 'Archive du blog Qastia.'}
        compact
      />

      <section className="detail-layout">
        <aside className="panel detail-sidebar">
          <p className="detail-label">Archive</p>
          <p>Billet publié sur le site historique Qastia.</p>
          {article.canonical ? (
            <a className="secondary-link" href={article.canonical} target="_blank" rel="noreferrer">
              URL d&apos;origine
            </a>
          ) : null}
          <SmartLink href="/blog" navigate={navigate} className="secondary-link">
            Retour au blog
          </SmartLink>
        </aside>

        <article className="panel panel-large">
          <RichText html={article.html} className="article-prose" />
        </article>
      </section>
    </>
  );
}

function ThankYouPage({ navigate }) {
  return (
    <>
      <PageHero
        title={siteData.thankYou.title}
        description="Votre message a bien été transmis. Nous reviendrons vers vous rapidement."
        compact
      />

      <section className="section-stack">
        <article className="panel panel-large narrow-panel">
          <RichText html={siteData.thankYou.html} className="content-prose" />
          <SmartLink href="/" navigate={navigate} className="cta-link">
            Revenir à l&apos;accueil
          </SmartLink>
        </article>
      </section>
    </>
  );
}

function NotFoundPage({ navigate }) {
  return (
    <>
      <PageHero
        title="Page introuvable"
        description="Le contenu demandé n’existe pas ou plus à cette adresse."
        compact
      />

      <section className="section-stack">
        <article className="panel panel-large narrow-panel">
          <p>Vous pouvez revenir à l’accueil ou consulter les références disponibles.</p>
          <div className="action-row">
            <SmartLink href="/" navigate={navigate} className="cta-link">
              Accueil
            </SmartLink>
            <SmartLink href="/references" navigate={navigate} className="secondary-link">
              Références
            </SmartLink>
          </div>
        </article>
      </section>
    </>
  );
}

function ContactSection() {
  const nextUrl = `${window.location.origin}/merci`;

  return (
    <section className="contact-section" id="contact">
      <div className="contact-shell">
        <div className="contact-copy">
          <p className="eyebrow">Contact</p>
          <h2>{siteData.contact.title}</h2>
          <p>
            Parlez-nous de votre besoin, qu&apos;il concerne une mission de consulting,
            un projet digital ou le coworking à Preuilly-sur-Claise.
          </p>
        </div>

        <form className="contact-form panel" action={siteData.contact.action} method="POST">
          {siteData.contact.hiddenFields.map((field) => (
            <input
              key={field.name}
              type="hidden"
              name={field.name}
              value={
                field.name === '_next'
                  ? nextUrl
                  : field.name === 'page'
                    ? window.location.pathname
                    : field.value ?? ''
              }
            />
          ))}

          <label>
            <span>{siteData.contact.fields.name.text}</span>
            <input type="text" name="name" required />
          </label>

          <label>
            <span>{siteData.contact.fields.phone.text}</span>
            <input type="tel" name="phone" required />
          </label>

          <label>
            <span>{siteData.contact.fields.message.text}</span>
            <textarea name="message" rows="6" required />
          </label>

          <button type="submit" className="cta-button">
            {siteData.contact.buttonLabel}
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="panel footer-panel">
          <RichText html={siteData.footer.html} className="footer-prose" />
        </div>

        <div className="panel footer-panel">
          <p className="eyebrow">Navigation</p>
          <div className="footer-links">
            {siteData.navigation.map((item) => (
              <SmartLink key={item.href} href={item.href} navigate={navigate} className="text-link">
                {item.label}
              </SmartLink>
            ))}
            <SmartLink href="/blog" navigate={navigate} className="text-link">
              Blog
            </SmartLink>
          </div>
        </div>

        <div className="panel footer-panel">
          <p className="eyebrow">Liens utiles</p>
          <div className="footer-links">
            {siteData.footerLinks.map((item) => (
              <a key={item.url} href={item.url} className="text-link" target="_blank" rel="noreferrer">
                {item.name}
              </a>
            ))}
          </div>

          <p className="eyebrow footer-eyebrow">Réseaux</p>
          <div className="footer-links">
            {siteData.socialLinks.map((item) => (
              <a key={item.href} href={item.href} className="text-link" target="_blank" rel="noreferrer">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(normalizePath(window.location.pathname));
  const pendingHashRef = useRef(window.location.hash);

  const page = resolvePage(currentPath);

  useEffect(() => {
    document.title = documentTitle(page);
  }, [page]);

  useEffect(() => {
    const handlePopState = () => {
      pendingHashRef.current = window.location.hash;
      setCurrentPath(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (pendingHashRef.current) {
      const hash = pendingHashRef.current;
      pendingHashRef.current = '';
      requestAnimationFrame(() => scrollToHash(hash));
      return;
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [currentPath]);

  function navigate(href) {
    const url = new URL(href, window.location.href);
    const nextPath = normalizePath(url.pathname);
    const nextHash = url.hash;
    const nextLocation = `${nextPath}${nextHash}`;
    const currentLocation = `${currentPath}${window.location.hash}`;

    if (nextLocation === currentLocation) {
      if (nextHash) {
        scrollToHash(nextHash);
      }
      return;
    }

    pendingHashRef.current = nextHash;
    window.history.pushState({}, '', nextLocation);
    setCurrentPath(nextPath);
  }

  return (
    <div className="page-shell">
      <div className="page-background" />
      <Header currentPath={currentPath} navigate={navigate} />

      <main className="page-content">
        {page.kind === 'home' ? <HomePage navigate={navigate} /> : null}
        {page.kind === 'coworking' ? <CoworkingPage /> : null}
        {page.kind === 'references' ? <ReferencesPage navigate={navigate} /> : null}
        {page.kind === 'reference-detail' ? (
          <ReferenceDetailPage reference={page.reference} navigate={navigate} />
        ) : null}
        {page.kind === 'blog' ? <BlogPage navigate={navigate} /> : null}
        {page.kind === 'blog-detail' ? (
          <BlogDetailPage article={page.article} navigate={navigate} />
        ) : null}
        {page.kind === 'thank-you' ? <ThankYouPage navigate={navigate} /> : null}
        {page.kind === 'not-found' ? <NotFoundPage navigate={navigate} /> : null}
      </main>

      <ContactSection />
      <Footer navigate={navigate} />
    </div>
  );
}
