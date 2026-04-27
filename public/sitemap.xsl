<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  exclude-result-prefixes="s">

  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"
    doctype-system="about:legacy-compat"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex"/>
        <title>XML Sitemap | The Benavente Group</title>
        <style>
          :root {
            --navy: #0B1F3A;
            --navy-light: #152D52;
            --gold: #B8935A;
            --gold-light: #CFA96E;
            --cream: #F8F4EE;
            --cream-deep: #F0EAE0;
            --slate: #5C6478;
            --slate-light: #8E97A8;
            --ivory: #FDFBF8;
            --border: rgba(11, 31, 58, 0.08);
          }
          * { box-sizing: border-box; }
          html, body { margin: 0; padding: 0; }
          body {
            background: var(--cream);
            color: var(--navy);
            font-family: 'DM Sans', system-ui, -apple-system, Segoe UI, sans-serif;
            font-size: 14px;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
          }
          a { color: var(--navy); text-decoration: none; transition: color .2s ease; }
          a:hover { color: var(--gold); }

          .hero {
            background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
            color: #fff;
            padding: 64px 6% 56px;
            position: relative;
            overflow: hidden;
          }
          .hero::after {
            content: "";
            position: absolute; right: -120px; top: -120px;
            width: 380px; height: 380px; border-radius: 50%;
            background: radial-gradient(circle, rgba(184,147,90,0.18), transparent 70%);
            pointer-events: none;
          }
          .hero-inner { max-width: 1180px; margin: 0 auto; position: relative; }
          .eyebrow {
            display: inline-flex; align-items: center; gap: 10px;
            font-size: 11px; font-weight: 500; letter-spacing: .25em;
            text-transform: uppercase; color: var(--gold-light); margin-bottom: 14px;
          }
          .eyebrow::before {
            content: ""; width: 22px; height: 1px; background: var(--gold-light);
          }
          h1 {
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-weight: 400;
            font-size: clamp(34px, 4.4vw, 52px);
            line-height: 1.08;
            margin: 0 0 14px;
          }
          h1 em { color: var(--gold-light); font-style: italic; }
          .hero p {
            color: rgba(255,255,255,0.62);
            max-width: 620px;
            font-size: 15px;
            line-height: 1.8;
            margin: 0;
          }
          .hero p a {
            color: #fff;
            border-bottom: 1px solid var(--gold);
            padding-bottom: 1px;
          }
          .hero p a:hover { color: var(--gold-light); border-color: var(--gold-light); }

          .wrap { max-width: 1180px; margin: 0 auto; padding: 40px 6% 80px; }

          .meta {
            background: #fff;
            border: 1px solid var(--border);
            padding: 16px 22px;
            border-radius: 2px;
            display: flex; justify-content: space-between; align-items: center;
            flex-wrap: wrap; gap: 12px;
            font-size: 13px; color: var(--slate);
            margin-bottom: 20px;
          }
          .meta strong { color: var(--navy); font-weight: 600; }
          .meta .pill {
            display: inline-block;
            font-size: 10.5px; letter-spacing: .22em; text-transform: uppercase;
            color: var(--gold); border: 1px solid var(--gold); padding: 4px 10px;
            border-radius: 999px;
          }

          table {
            width: 100%;
            background: #fff;
            border: 1px solid var(--border);
            border-collapse: separate; border-spacing: 0;
            border-radius: 2px;
            overflow: hidden;
          }
          thead th {
            text-align: left;
            font-size: 10.5px; letter-spacing: .22em; text-transform: uppercase;
            color: var(--slate-light); font-weight: 500;
            padding: 14px 22px;
            background: var(--ivory);
            border-bottom: 1px solid var(--border);
          }
          tbody td {
            padding: 14px 22px;
            border-bottom: 1px solid var(--border);
            font-size: 13.5px;
            vertical-align: middle;
          }
          tbody tr:last-child td { border-bottom: none; }
          tbody tr:hover { background: var(--ivory); }

          td.url a {
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: 16px;
            color: var(--navy);
            word-break: break-all;
          }
          td.url a:hover { color: var(--gold); }

          td.lastmod, td.freq, td.prio { white-space: nowrap; color: var(--slate); }
          td.lastmod { font-variant-numeric: tabular-nums; font-size: 12.5px; }

          .freq-badge {
            display: inline-block;
            font-size: 10.5px; letter-spacing: .18em; text-transform: uppercase;
            color: var(--navy); background: var(--cream-deep);
            padding: 4px 10px; border-radius: 2px;
          }

          .prio-badge {
            display: inline-flex; align-items: center; justify-content: center;
            min-width: 44px; height: 22px;
            font-size: 11.5px; font-weight: 600;
            color: #fff; background: var(--gold);
            border-radius: 999px; padding: 0 10px;
            font-variant-numeric: tabular-nums;
          }
          .prio-low  { background: var(--slate-light); }
          .prio-med  { background: var(--gold); }
          .prio-high { background: var(--navy); }

          .footer {
            text-align: center;
            color: var(--slate-light);
            font-size: 12px;
            margin-top: 40px;
            letter-spacing: .12em; text-transform: uppercase;
          }
          .footer a { color: var(--slate); border-bottom: 1px solid var(--border); }
          .footer a:hover { color: var(--gold); border-color: var(--gold); }

          @media (max-width: 720px) {
            thead .col-freq, tbody .freq { display: none; }
            td.url a { font-size: 14.5px; }
            .hero { padding: 48px 6% 44px; }
          }
        </style>
      </head>
      <body>
        <header class="hero">
          <div class="hero-inner">
            <div class="eyebrow">XML Sitemap</div>
            <h1>Search Engine <em>Index</em></h1>
            <p>
              This XML sitemap is generated by The Benavente Group. It is what
              search engines like Google use to crawl and re-crawl pages,
              articles, and portfolio entries on this website.
            </p>
          </div>
        </header>

        <main class="wrap">
          <div class="meta">
            <span>
              This sitemap contains
              <strong><xsl:value-of select="count(s:urlset/s:url)"/></strong>
              URLs.
            </span>
            <span class="pill">Auto-generated</span>
          </div>

          <table>
            <thead>
              <tr>
                <th class="col-url">URL</th>
                <th class="col-lastmod">Last Modified</th>
                <th class="col-freq">Change Frequency</th>
                <th class="col-prio">Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="s:urlset/s:url">
                <tr>
                  <td class="url">
                    <a href="{s:loc}">
                      <xsl:value-of select="s:loc"/>
                    </a>
                  </td>
                  <td class="lastmod">
                    <xsl:value-of select="substring(s:lastmod, 1, 10)"/>
                  </td>
                  <td class="freq">
                    <span class="freq-badge">
                      <xsl:value-of select="s:changefreq"/>
                    </span>
                  </td>
                  <td class="prio">
                    <xsl:variable name="p" select="number(s:priority)"/>
                    <span>
                      <xsl:attribute name="class">
                        <xsl:choose>
                          <xsl:when test="$p &gt;= 0.9">prio-badge prio-high</xsl:when>
                          <xsl:when test="$p &gt;= 0.6">prio-badge prio-med</xsl:when>
                          <xsl:otherwise>prio-badge prio-low</xsl:otherwise>
                        </xsl:choose>
                      </xsl:attribute>
                      <xsl:value-of select="s:priority"/>
                    </span>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>

          <p class="footer">
            The Benavente Group &#183; XML Sitemap View
          </p>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
