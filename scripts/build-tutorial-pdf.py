#!/usr/bin/env python3
"""
Build the Quick-Start Tutorial PDF for KNB Detailing.

Uses reportlab's Platypus layout engine to produce a multi-page, branded
PDF the owners can print or read on-screen.

Usage:
    source ~/.openclaw/doc-tools-env/bin/activate
    python3 scripts/build-tutorial-pdf.py
"""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT


# ── Paths ─────────────────────────────────────────────────────────────────
PROJECT_ROOT = Path(__file__).resolve().parents[1]
PUBLIC = PROJECT_ROOT / "public"
HANDOFF = PROJECT_ROOT / "handoff"
OUTPUT = HANDOFF / "Quick-Start-Tutorial.pdf"

KNB_LOGO = PUBLIC / "photos" / "logo.jpg"
BEACONSHIRE_LOGO = PUBLIC / "beaconshire-logo.png"

# ── Brand colors ──────────────────────────────────────────────────────────
WAWASEE = colors.HexColor("#0e4d7f")        # Deep brand navy (used in site)
CYAN = colors.HexColor("#29abe0")           # KNB logo cyan
GRAPHITE = colors.HexColor("#1a1d21")
MUTED = colors.HexColor("#5b6573")
PAPER = colors.HexColor("#fafbfc")
SOFT = colors.HexColor("#eef2f6")
GOLD = colors.HexColor("#b89856")           # Beaconshire gold accent
DANGER = colors.HexColor("#b91c1c")

PAGE_W, PAGE_H = LETTER
MARGIN = 0.75 * inch


# ── Style sheet ───────────────────────────────────────────────────────────
def build_styles() -> dict:
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "Title", parent=base["Title"],
            fontName="Helvetica-Bold", fontSize=32, leading=38,
            textColor=GRAPHITE, alignment=TA_CENTER, spaceAfter=8,
        ),
        "subtitle": ParagraphStyle(
            "Subtitle", parent=base["Normal"],
            fontName="Helvetica", fontSize=14, leading=20,
            textColor=MUTED, alignment=TA_CENTER, spaceAfter=18,
        ),
        "coverPrep": ParagraphStyle(
            "CoverPrep", parent=base["Normal"],
            fontName="Helvetica", fontSize=11, leading=16,
            textColor=MUTED, alignment=TA_CENTER, spaceAfter=4,
        ),
        "coverBy": ParagraphStyle(
            "CoverBy", parent=base["Normal"],
            fontName="Helvetica-Bold", fontSize=13, leading=18,
            textColor=WAWASEE, alignment=TA_CENTER, spaceAfter=24,
        ),
        "coverDescription": ParagraphStyle(
            "CoverDescription", parent=base["Normal"],
            fontName="Helvetica-Oblique", fontSize=11, leading=16,
            textColor=MUTED, alignment=TA_CENTER, spaceAfter=24,
        ),
        "h1": ParagraphStyle(
            "H1", parent=base["Heading1"],
            fontName="Helvetica-Bold", fontSize=22, leading=28,
            textColor=WAWASEE, spaceBefore=16, spaceAfter=10,
        ),
        "h2": ParagraphStyle(
            "H2", parent=base["Heading2"],
            fontName="Helvetica-Bold", fontSize=15, leading=20,
            textColor=GRAPHITE, spaceBefore=14, spaceAfter=6,
        ),
        "h3": ParagraphStyle(
            "H3", parent=base["Heading3"],
            fontName="Helvetica-Bold", fontSize=12, leading=16,
            textColor=WAWASEE, spaceBefore=10, spaceAfter=4,
        ),
        "body": ParagraphStyle(
            "Body", parent=base["BodyText"],
            fontName="Helvetica", fontSize=10.5, leading=15,
            textColor=GRAPHITE, alignment=TA_LEFT, spaceAfter=6,
        ),
        "li": ParagraphStyle(
            "Li", parent=base["BodyText"],
            fontName="Helvetica", fontSize=10.5, leading=15,
            textColor=GRAPHITE, alignment=TA_LEFT,
            leftIndent=18, bulletIndent=4, spaceAfter=3,
        ),
        "olItem": ParagraphStyle(
            "OlItem", parent=base["BodyText"],
            fontName="Helvetica", fontSize=10.5, leading=16,
            textColor=GRAPHITE, alignment=TA_LEFT,
            leftIndent=22, spaceAfter=5,
        ),
        "code": ParagraphStyle(
            "Code", parent=base["BodyText"],
            fontName="Courier", fontSize=10, leading=14,
            textColor=GRAPHITE, alignment=TA_LEFT,
            leftIndent=12, rightIndent=12, spaceBefore=4, spaceAfter=8,
            backColor=SOFT, borderPadding=8, borderRadius=4,
        ),
        "callout": ParagraphStyle(
            "Callout", parent=base["BodyText"],
            fontName="Helvetica", fontSize=10, leading=14,
            textColor=GRAPHITE, alignment=TA_LEFT,
            leftIndent=12, rightIndent=12, spaceBefore=8, spaceAfter=10,
            backColor=SOFT, borderPadding=10, borderRadius=4,
        ),
        "warn": ParagraphStyle(
            "Warn", parent=base["BodyText"],
            fontName="Helvetica", fontSize=10, leading=14,
            textColor=GRAPHITE, alignment=TA_LEFT,
            leftIndent=12, rightIndent=12, spaceBefore=8, spaceAfter=10,
            backColor=colors.HexColor("#fff7e6"),
            borderPadding=10, borderRadius=4,
        ),
        "small": ParagraphStyle(
            "Small", parent=base["Normal"],
            fontName="Helvetica", fontSize=9, leading=12,
            textColor=MUTED,
        ),
        "footerLeft": ParagraphStyle(
            "FootLeft", parent=base["Normal"],
            fontName="Helvetica", fontSize=8, leading=10,
            textColor=MUTED, alignment=TA_LEFT,
        ),
        "footerRight": ParagraphStyle(
            "FootRight", parent=base["Normal"],
            fontName="Helvetica", fontSize=8, leading=10,
            textColor=MUTED, alignment=2,  # TA_RIGHT
        ),
    }


S = build_styles()


# ── Helpers ───────────────────────────────────────────────────────────────
def p(text: str, style="body"):
    """Convenience: paragraph in a named style."""
    return Paragraph(text, S[style])


def bullets(items):
    """Unordered list — each item becomes its own Paragraph with a '•' bullet."""
    return [Paragraph(f"<bullet>&bull;</bullet>&nbsp;{i}", S["li"]) for i in items]


def numbered(items):
    """Numbered steps. `items` is a list of str OR list-of-flowables."""
    out = []
    for n, item in enumerate(items, start=1):
        if isinstance(item, list):
            # Multi-flowable step: first paragraph prefixed, rest indented
            first = item[0]
            wrapped = [
                Paragraph(
                    f"<font color='#0e4d7f'><b>{n}.</b></font>&nbsp;&nbsp;{first}",
                    S["olItem"],
                )
            ] + item[1:]
            out.append(KeepTogether(wrapped))
        else:
            out.append(
                Paragraph(
                    f"<font color='#0e4d7f'><b>{n}.</b></font>&nbsp;&nbsp;{item}",
                    S["olItem"],
                )
            )
    return out


def callout(text: str, kind="callout"):
    return Paragraph(text, S[kind])


def section_divider():
    """Thin colored rule between sections (used inside content)."""
    t = Table([[""]], colWidths=[PAGE_W - 2 * MARGIN], rowHeights=[1])
    t.setStyle(TableStyle([("LINEABOVE", (0, 0), (-1, -1), 0.6, CYAN)]))
    return t


def kv_table(rows, col_widths=None, header=False):
    """Two-column table used for 'what works / what doesn't' style content."""
    col_widths = col_widths or [(PAGE_W - 2 * MARGIN) / 2] * 2
    styled_rows = []
    for r in rows:
        styled_rows.append([Paragraph(c, S["body"]) for c in r])
    style = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, -2), 0.3, SOFT),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]
    if header:
        style += [
            ("BACKGROUND", (0, 0), (-1, 0), WAWASEE),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ]
    t = Table(styled_rows, colWidths=col_widths)
    t.setStyle(TableStyle(style))
    return t


# ── Page templates ────────────────────────────────────────────────────────
def draw_page_chrome(canvas, doc):
    """Top rule + footer with page number, brand mark, and date."""
    canvas.saveState()

    # Top hairline rule in brand cyan
    canvas.setStrokeColor(CYAN)
    canvas.setLineWidth(2)
    canvas.line(MARGIN, PAGE_H - 0.5 * inch, PAGE_W - MARGIN, PAGE_H - 0.5 * inch)

    # Section label upper-left
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(MARGIN, PAGE_H - 0.35 * inch, "KNB Detailing  ·  Quick-Start Tutorial")
    canvas.drawRightString(
        PAGE_W - MARGIN, PAGE_H - 0.35 * inch,
        "Beaconshire Advisory",
    )

    # Footer: page number centered, brand mark left, "you own this" right
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8)
    canvas.drawString(MARGIN, 0.4 * inch, "Built by Beaconshire Advisory")
    canvas.drawCentredString(PAGE_W / 2.0, 0.4 * inch, f"Page {doc.page}")
    canvas.drawRightString(PAGE_W - MARGIN, 0.4 * inch, "Owned by you")

    canvas.restoreState()


def build_doc(filename):
    doc = BaseDocTemplate(
        filename,
        pagesize=LETTER,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=MARGIN,
        bottomMargin=MARGIN,
        title="KNB Detailing — Quick-Start Tutorial",
        author="Beaconshire Advisory",
        subject="How to access, preview, and deploy the KNB Detailing website",
        creator="Beaconshire Advisory",
    )

    frame = Frame(
        doc.leftMargin, doc.bottomMargin,
        doc.width, doc.height,
        id="normal", showBoundary=0,
        leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0,
    )

    # Cover page has no top rule / footer; content pages do.
    cover_template = PageTemplate(id="cover", frames=[frame])
    content_template = PageTemplate(id="content", frames=[frame], onPage=draw_page_chrome)
    doc.addPageTemplates([cover_template, content_template])
    return doc


# ── Content builders ─────────────────────────────────────────────────────
def cover_page():
    items = [Spacer(1, 0.6 * inch)]
    if KNB_LOGO.exists():
        items.append(Image(str(KNB_LOGO), width=3.4 * inch, height=1.55 * inch))
    items.append(Spacer(1, 0.4 * inch))
    items.append(Paragraph("Your KNB Detailing<br/>Website", S["title"]))
    items.append(Paragraph("Quick-Start Tutorial", S["subtitle"]))
    items.append(Spacer(1, 0.25 * inch))
    items.append(
        Paragraph(
            "How to access the website on GitHub, get your own copy, preview it, "
            "and deploy it to Vercel — on a Mac or PC.",
            S["coverDescription"],
        )
    )
    items.append(Spacer(1, 1.0 * inch))
    items.append(Paragraph("Prepared for", S["coverPrep"]))
    items.append(Paragraph("Krista &amp; Benjamin Hohman", S["coverBy"]))
    items.append(Paragraph("Delivered by", S["coverPrep"]))
    items.append(Paragraph("Beaconshire Advisory", S["coverBy"]))
    items.append(Spacer(1, 0.4 * inch))
    if BEACONSHIRE_LOGO.exists():
        items.append(Image(str(BEACONSHIRE_LOGO), width=0.55 * inch, height=0.55 * inch))
    items.append(Spacer(1, 0.15 * inch))
    items.append(
        Paragraph(
            "Written for total beginners. About 30 minutes of clicking, no technical experience required.",
            S["small"],
        )
    )
    return items


def before_you_start():
    out = [
        PageBreak(),
        p("Before you start", "h1"),
        section_divider(),
        p("What you'll need", "h2"),
        *bullets([
            "A computer — Mac or PC, doesn't matter which.",
            "A web browser. Any of Chrome, Safari, Edge, or Firefox is fine.",
            "An email address you'll use for business signups. Your existing Gmail is fine, or a fresh one.",
            "About <b>30 minutes</b> for this tutorial. (Plus another 90 minutes later if you decide to fully launch — covered in a separate guide.)",
        ]),
        p("What this guide covers", "h2"),
        p("By the end of this tutorial, you will have:", "body"),
        *bullets([
            "Looked at the live preview of your website",
            "Created a GitHub account",
            "Saved a copy of the website code into your own GitHub account",
            "Created a Vercel account",
            "Deployed your website to Vercel",
            "Opened your live <font face='Courier'>*.vercel.app</font> URL in a browser",
        ]),
        p("You will <b>not</b> yet have:", "body"),
        *bullets([
            "A custom domain like <font face='Courier'>knbdetailing.com</font>",
            "Real payment processing",
            "A working email or text-message system",
        ]),
        callout(
            "<b>Those come later in the full Setup Walkthrough.</b> Today is just about "
            "getting the site visible and working at a temporary URL so you can decide whether to keep going."
        ),
        p("PC vs Mac differences", "h2"),
        p(
            "There are essentially <b>none</b> for most of this tutorial. GitHub and Vercel both "
            "run in your web browser — you'll be clicking the same buttons on either machine.",
            "body",
        ),
        p(
            "The one place the platforms differ — extracting a downloaded ZIP file — is "
            "covered explicitly when you get to it.",
            "body",
        ),
    ]
    return out


def part_1_preview():
    return [
        PageBreak(),
        p("Part 1 · Preview the live site", "h1"),
        p("Time: ~3 minutes", "small"),
        section_divider(),
        p(
            "The fastest way to see what you're getting is to click the preview link "
            "in the email I sent.",
            "body",
        ),
        p("Steps", "h2"),
        *numbered([
            "<b>Open the email</b> from Beaconshire Advisory. It will have a subject line like "
            "<i>\"A website for KNB Detailing — preview it now, launch when you're ready.\"</i>",
            "<b>Find the line that says \"Live preview\"</b> — there's a URL underneath that ends in "
            "<font face='Courier'>.vercel.app</font>. Click that URL.",
            "<b>The website opens in a new browser tab.</b> You'll see your real cyan-and-black KNB Detailing "
            "logo at the top, your branded silver work van as the hero image, and the Best of BusinessRate 2025 "
            "award called out beneath it.",
            "<b>Click around.</b> Check the home page, Services &rarr; Boat detailing (your real boat and pontoon "
            "photos), About (your photo at the top), Gallery (13 real KNB photos), and Book (the form works but "
            "doesn't actually book anything yet).",
            "<b>Decide.</b> If you like what you see, continue with this tutorial. If you don't, stop. There's no "
            "obligation either way.",
        ]),
        p("What you'll notice", "h2"),
        p(
            "The site is fully designed and styled with your real brand assets. The pages all render, "
            "the menus all work, the photos load. What's <b>not</b> live yet:",
            "body",
        ),
        *bullets([
            "Submitting the booking form doesn't book anything (no database connected yet)",
            "The \"Sign in\" link on the portal won't actually sign anyone in",
            "The \"Admin\" area isn't accessible",
            "No real emails or text messages get sent",
        ]),
        callout(
            "These activate when <b>you</b> deploy your own copy in Parts 3 through 6."
        ),
    ]


def part_2_github_signup():
    return [
        PageBreak(),
        p("Part 2 · Sign up for GitHub", "h1"),
        p("Time: ~5 minutes", "small"),
        section_divider(),
        p(
            "<b>GitHub</b> is where the code that powers your website is stored. Think of it as a "
            "\"Google Drive for software.\" You'll need a free GitHub account to save your own copy of the code.",
            "body",
        ),
        p("Steps", "h2"),
        *numbered([
            "<b>Open a new browser tab.</b> Type <font face='Courier'>github.com</font> and press Enter.",
            "<b>Click \"Sign up\"</b> in the top-right corner.",
            "<b>Email:</b> type the email address you want to use for business signups. (We recommend using "
            "the same email for every account you create today — easier to keep track.)",
            "<b>Password:</b> create a strong one. Save it in a password manager or write it in a notes app. "
            "You will need it.",
            "<b>Username:</b> this becomes part of your repo URL. Pick something simple, lowercase, no spaces. "
            "Good examples: <font face='Courier'>knb-detailing</font>, <font face='Courier'>krista-hohman</font>, "
            "<font face='Courier'>khohman</font>.",
            "<b>Solve the puzzle</b> GitHub shows you. It confirms you're not a bot.",
            "<b>Verify your email:</b> GitHub sends you a code. Type that code into the GitHub page.",
            "<b>Plan:</b> pick <b>Free</b>. You will never need to upgrade.",
            "<b>Skip the personalization wizard</b> — any questions about \"what brings you to GitHub\" — by clicking "
            "\"Skip personalization\" at the bottom.",
            "<b>You're in.</b> You should land on a page that says \"Welcome to GitHub!\" or shows your empty dashboard.",
        ]),
        p("What to write down", "h2"),
        p("Keep these in a notes app or password manager:", "body"),
        *bullets([
            "Your GitHub username: ______________________________",
            "Your GitHub email: ______________________________",
            "Your GitHub password: (in your password manager)",
        ]),
    ]


def part_3_find_repo():
    return [
        PageBreak(),
        p("Part 3 · Find the website code on GitHub", "h1"),
        p("Time: ~2 minutes", "small"),
        section_divider(),
        p(
            "I've pushed a complete copy of your website code to a public GitHub repository. You don't "
            "own it yet — but in Part 4 you'll get your own copy.",
            "body",
        ),
        p("Steps", "h2"),
        *numbered([
            "<b>Find the link in my email</b> labeled \"Setup walkthrough\" or \"GitHub repository.\" It will "
            "look like: <font face='Courier'>https://github.com/beaconshire-advisory/knb-detailing-template</font>",
            "<b>Click that link.</b> Your browser opens the GitHub page for the project.",
            "<b>Look around.</b> You'll see the repository name at the top, a list of folders and files "
            "(named things like <font face='Courier'>src</font>, <font face='Courier'>public</font>, "
            "<font face='Courier'>handoff</font>), a README displayed below the file list, a green <b>Code</b> "
            "button on the upper-right of the file list, and a grey <b>Fork</b> button slightly higher up in the "
            "very top-right of the page.",
        ]),
        callout(
            "Don't click anything yet. We'll click <b>Fork</b> in Part 4."
        ),
    ]


def part_4_fork():
    return [
        PageBreak(),
        p("Part 4 · Fork the code into your own account", "h1"),
        p("Recommended path · Time: ~3 minutes", "small"),
        section_divider(),
        p(
            "<b>Forking</b> is GitHub's term for \"make a copy of this repository in my own account.\" The "
            "forked copy is yours. You can change it, deploy it, share it. The original stays where it was. "
            "This is exactly what we want.",
            "body",
        ),
        callout(
            "<b>In plain English:</b> forking is like taking a photocopy of a recipe book. The original stays at "
            "the library, but now you have your own copy at home that you can write notes on."
        ),
        p("Steps", "h2"),
        *numbered([
            "<b>On the GitHub repo page</b> from Part 3, look in the top-right corner of the page. You'll see "
            "three buttons in a row: <b>Sponsor</b>, <b>Watch</b>, and <b>Fork</b> with a small dropdown arrow next to it.",
            "<b>Click \"Fork\"</b> (the button itself, not the dropdown arrow).",
            "<b>A new page opens</b> titled \"Create a new fork.\"",
            "<b>Owner:</b> this should already be set to your GitHub username. If it shows multiple options (like "
            "an organization name), pick your personal username.",
            "<b>Repository name:</b> leave the default (<font face='Courier'>knb-detailing-template</font>) or shorten "
            "it to <font face='Courier'>knb-detailing</font>. Both work.",
            "<b>Description:</b> leave blank or type something like \"Our KNB Detailing website.\"",
            "<b>Copy the main branch only:</b> leave this checkbox <b>checked</b>.",
            "<b>Click the green \"Create fork\" button.</b>",
            "<b>Wait ~5 seconds.</b> GitHub copies the entire project into your account.",
            "<b>Confirmation:</b> you land on a page that looks identical to the previous one, but the URL bar now "
            "shows <font face='Courier'>https://github.com/YOUR-USERNAME/knb-detailing</font> (or "
            "<font face='Courier'>knb-detailing-template</font>). The top of the page shows <b>your username</b> as the owner, "
            "with a small \"forked from beaconshire-advisory/knb-detailing-template\" note in grey. <b>That's yours.</b>",
            "<b>Bookmark this page.</b> You'll come back to it in Part 6.",
        ]),
        p("What you've accomplished", "h2"),
        p(
            "You now own a complete copy of the website code. It's just sitting on GitHub — it isn't running "
            "anywhere yet. <b>In Part 6, you'll connect it to Vercel and turn it into a real, viewable website.</b>",
            "body",
        ),
    ]


def part_5_download_zip():
    return [
        PageBreak(),
        p("Part 5 · (Optional alternative) Download as a ZIP", "h1"),
        p("Skip this if you forked the code in Part 4.", "small"),
        section_divider(),
        callout(
            "If forking in Part 4 worked for you, <b>skip this entire section</b> — you don't need it. "
            "The fork path is faster and more reliable. This section exists only as a backup."
        ),
        p(
            "If forking didn't work or felt confusing, you can also download the code as a regular ZIP file and "
            "re-upload it later. This is slower but visually familiar.",
            "body",
        ),
        p("Steps (only if you skipped Part 4)", "h2"),
        *numbered([
            "<b>On the GitHub repo page</b>, find the green <b>Code</b> button on the upper-right of the file list.",
            "<b>Click \"Code.\"</b> A dropdown appears.",
            "<b>Click \"Download ZIP\"</b> at the bottom of the dropdown.",
            "<b>The file downloads</b> to your computer's Downloads folder. It will be named something like "
            "<font face='Courier'>knb-detailing-template-main.zip</font>.",
            "<b>Find the file in your Downloads folder:</b> On a Mac, open Finder &rarr; Downloads. On a PC, open "
            "File Explorer &rarr; Downloads.",
            "<b>Extract the ZIP file:</b> On a Mac, double-click the ZIP and a new folder appears next to it. On a "
            "PC, right-click the ZIP &rarr; \"Extract All...\" &rarr; click \"Extract\" in the dialog.",
            "<b>You now have a folder</b> named <font face='Courier'>knb-detailing-template-main</font> (or similar) "
            "containing the website code.",
        ]),
        p("What to do with the downloaded folder", "h2"),
        p(
            "Vercel cannot deploy from a folder on your computer — it needs the code on GitHub. So if you went this "
            "route, you now need to put the folder back on GitHub as your own repo:",
            "body",
        ),
        *numbered([
            "On GitHub, click the <b>+ icon</b> at the top-right &rarr; <b>New repository</b>.",
            "Repository name: <font face='Courier'>knb-detailing</font>.",
            "Visibility: <b>Private</b> (recommended).",
            "<b>Click \"Create repository.\"</b>",
            "On the new repo's page, you'll see a section labeled \"…or upload an existing file.\" Click that link.",
            "<b>Drag the contents of the extracted folder</b> into the upload box.",
            "<b>Click \"Commit changes\"</b> at the bottom.",
        ]),
        callout(
            "<b>GitHub's web uploader has limits.</b> It refuses very large file batches and won't preserve hidden "
            "files (anything starting with a <font face='Courier'>.</font>). If it fails partway, scroll back up and "
            "<b>strongly prefer Part 4 (Fork)</b> instead — it's safer and faster.",
            "warn",
        ),
    ]


def part_6_vercel_signup():
    return [
        PageBreak(),
        p("Part 6 · Sign up for Vercel", "h1"),
        p("Time: ~3 minutes", "small"),
        section_divider(),
        p(
            "<b>Vercel</b> is where your website will actually run. They specialize in hosting websites built with "
            "the framework yours uses (Next.js). The free plan covers everything a small business needs.",
            "body",
        ),
        p("Steps", "h2"),
        *numbered([
            "<b>New browser tab.</b> Go to <font face='Courier'>vercel.com</font>.",
            "<b>Click \"Sign Up\"</b> in the top-right corner.",
            "<b>Important:</b> click <b>\"Continue with GitHub\"</b> — not email. This connects your Vercel account "
            "to your GitHub account in one step.",
            "<b>GitHub asks:</b> \"Authorize Vercel?\" Click <b>\"Authorize Vercel.\"</b>",
            "<b>Vercel asks:</b> \"What's your name?\" Type your name (or your business name).",
            "<b>Vercel asks:</b> \"Which best describes you?\" Pick <b>\"Building products / Doing my own thing.\"</b>",
            "<b>Plan:</b> pick <b>Hobby</b> (free).",
            "<b>Click \"Continue.\"</b>",
            "<b>You land on your Vercel dashboard.</b> It's mostly empty — that's correct.",
        ]),
    ]


def part_7_deploy():
    return [
        PageBreak(),
        p("Part 7 · Deploy your website", "h1"),
        p("Time: ~10 minutes", "small"),
        section_divider(),
        p(
            "This is the magic part. With one button click, Vercel will pull your forked code from GitHub, build it, "
            "and put it on a live URL.",
            "body",
        ),
        p("Steps", "h2"),
        *numbered([
            "<b>On your Vercel dashboard,</b> click <b>\"Add New...\"</b> in the top-right &rarr; <b>\"Project.\"</b>",
            "<b>You'll see:</b> \"Let's build something new.\" A list of your GitHub repositories appears below.",
            "<b>Find</b> <font face='Courier'>knb-detailing</font> (or <font face='Courier'>knb-detailing-template</font>) "
            "in the list. Click the <b>\"Import\"</b> button next to it. If you don't see your repo in the list, click "
            "<b>\"Adjust GitHub App Permissions\"</b> at the bottom of the list and grant Vercel access. Then refresh.",
            "<b>The \"Configure Project\" screen opens.</b> Vercel automatically detects this is a Next.js project — "
            "leave all the framework settings as they are.",
            [
                "<b>Scroll down to \"Environment Variables.\"</b> This is where you tell the site how to connect to "
                "your database, payment processor, and so on. <b>For this first preview deploy, you can skip them "
                "all</b> — the site will deploy without them and the parts that need them will simply be disabled.",
                callout(
                    "If you want to fill them in to make everything work, that's covered in the separate "
                    "<b>Setup Walkthrough</b> document. For just the visual preview, leave this section blank."
                ),
            ],
            "<b>Click the big \"Deploy\" button</b> at the bottom of the page.",
            "<b>Wait ~3 minutes.</b> A progress bar shows the build steps: Cloning, Building, Deploying, "
            "Assigning domains.",
            "<b>Celebration screen.</b> You'll see confetti and your new URL: "
            "<font face='Courier'>https://knb-detailing-XYZ.vercel.app</font> (the XYZ is a unique code Vercel generates).",
            "<b>Click \"Continue to Dashboard.\"</b> You land on your project's page.",
            "<b>Click the URL</b> at the top of the page (the big <font face='Courier'>*.vercel.app</font> link). A new "
            "tab opens — <b>and that's your live website.</b>",
        ]),
    ]


def part_8_what_just_happened():
    return [
        PageBreak(),
        p("Part 8 · What just happened", "h1"),
        section_divider(),
        callout(
            "<b>Congratulations.</b> You now have a live website at "
            "<font face='Courier'>https://knb-detailing-XYZ.vercel.app</font> that anyone with the URL can visit, a "
            "free Vercel project that automatically rebuilds the site any time you change the code on GitHub, a "
            "free GitHub repository that holds your code — and <b>no subscription</b>, <b>no monthly fee to "
            "Beaconshire Advisory</b>, and <b>no obligation to do anything else</b>."
        ),
        p("What's not yet working", "h2"),
        p(
            "Your live site is <b>visually complete</b> but the dynamic features are dormant. Specifically:",
            "body",
        ),
        kv_table(
            [
                ["Feature", "Why it doesn't work yet"],
                ["The booking form", "No database connected"],
                ["Customer sign-in", "No authentication service connected"],
                ["Real payments", "Stripe not connected"],
                ["Booking confirmation emails", "Email service not connected"],
                ["SMS reminders", "Twilio not connected"],
                ["Admin dashboard", "Above"],
                ["Custom knbdetailing.com domain", "Domain not connected"],
            ],
            col_widths=[2.6 * inch, (PAGE_W - 2 * MARGIN) - 2.6 * inch],
            header=True,
        ),
        Spacer(1, 10),
        p(
            "The <b>Setup Walkthrough</b> document (<font face='Courier'>02-setup-walkthrough.md</font> in the same "
            "handoff folder) takes you through activating each of those — about 2 hours of clicking, plus 1–3 days "
            "of waiting on Stripe and Twilio to verify your business.",
            "body",
        ),
        p("What you decide right now", "h2"),
        p("You have a working preview. You can:", "body"),
        *numbered([
            "<b>Stop here</b> — share the <font face='Courier'>*.vercel.app</font> URL with friends and family, "
            "gather feedback, decide if you want to go all the way.",
            "<b>Continue with the Setup Walkthrough</b> — connect the database, payments, email, SMS, and a custom "
            "domain. This takes about 2 hours of clicking plus 1–3 days of waiting on Stripe and Twilio to verify "
            "your business.",
        ]),
        callout(
            "There's no wrong answer. The preview alone is already more than most small businesses have on the internet."
        ),
    ]


def optional_local_preview():
    return [
        PageBreak(),
        p("Optional · Preview on your own computer", "h1"),
        p("Advanced — skip unless you're curious or comfortable with the command line.", "small"),
        section_divider(),
        p(
            "Some developers like to run the website on their own computer before deploying it. This lets you make "
            "changes and test them privately. It is <b>not necessary</b> for any of the steps above.",
            "body",
        ),
        p("On a Mac", "h2"),
        *numbered([
            "Open <b>Terminal</b> (press Cmd+Space, type \"Terminal\", press Enter).",
            "Install Homebrew by pasting this and pressing Enter:",
        ]),
        p('/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
          "code"),
        *numbered([
            "After it finishes, install Node, pnpm, and Git:",
        ]),
        p("brew install node pnpm git", "code"),
        *numbered([
            "Navigate to the unzipped folder:",
        ]),
        p("cd ~/Downloads/knb-detailing-template-main", "code"),
        *numbered([
            "Install dependencies and start the site:",
        ]),
        p("pnpm install\npnpm dev", "code"),
        *numbered([
            "Open your browser to <font face='Courier'>http://localhost:3000</font>. The site is now running on your laptop.",
        ]),
        Spacer(1, 8),
        p("On a PC", "h2"),
        *numbered([
            "Download Node.js from <font face='Courier'>https://nodejs.org</font> (pick the LTS version, click the Windows installer).",
            "Run the installer. Click Next on every screen until it finishes.",
            "Download Git from <font face='Courier'>https://git-scm.com/download/win</font>. Same drill — click Next on every screen.",
            "Open <b>Command Prompt</b> (press Windows key, type \"cmd\", press Enter).",
            "Type these one at a time:",
        ]),
        p("npm install -g pnpm\ncd %USERPROFILE%\\Downloads\\knb-detailing-template-main\npnpm install\npnpm dev", "code"),
        *numbered([
            "Open your browser to <font face='Courier'>http://localhost:3000</font>. The site is now running on your PC.",
        ]),
        Spacer(1, 6),
        p(
            "To stop the running site, press <b>Ctrl+C</b> in the Terminal or Command Prompt.",
            "body",
        ),
    ]


def faq():
    return [
        PageBreak(),
        p("FAQ", "h1"),
        section_divider(),
        p("\"I forgot my GitHub password.\"", "h3"),
        p(
            "On GitHub's sign-in page, click \"Forgot password?\" — they'll email you a reset link.",
            "body",
        ),
        p("\"I clicked the wrong button somewhere.\"", "h3"),
        p(
            "Just close the tab and start over. None of these steps cost money or commit you to anything. The worst "
            "case is you've created an unused empty repo or Vercel project, which you can delete from your account settings.",
            "body",
        ),
        p("\"I see an error page when I open my Vercel URL.\"", "h3"),
        p(
            "Wait one more minute, then refresh. Sometimes the deploy takes a little longer than the dashboard says. "
            "If it still shows an error after 5 minutes, go to your Vercel dashboard &rarr; click your project &rarr; "
            "\"Deployments\" tab &rarr; click the most recent deployment &rarr; look at the logs. The error message "
            "at the bottom usually tells you what went wrong.",
            "body",
        ),
        p("\"My preview URL works but the booking form doesn't do anything.\"", "h3"),
        p(
            "That's expected. The form is a real form, but without a connected database, it just logs the submission "
            "to Vercel's logs and shows a thank-you message. You'll connect the database (Supabase) in the full "
            "Setup Walkthrough.",
            "body",
        ),
        p("\"How do I make this look different / change the colors / edit the home page?\"", "h3"),
        p(
            "For now, that's something Beaconshire Advisory can do for you, or any web developer with Next.js "
            "experience. Everything is in your GitHub repo: <font face='Courier'>src/lib/constants.ts</font> "
            "(business info), <font face='Courier'>src/lib/images.ts</font> (photos), "
            "<font face='Courier'>src/app/(marketing)/page.tsx</font> (home page), "
            "<font face='Courier'>src/app/globals.css</font> (colors). Not difficult once you've seen the pattern.",
            "body",
        ),
        p("\"Can I take this somewhere else later?\"", "h3"),
        p(
            "Yes. Everything is in your accounts. You can delete Vercel and use Netlify. You can fire your developer "
            "and hire another. You can rebuild the design from scratch and keep the customer data. <b>You own this.</b> "
            "There's no lock-in.",
            "body",
        ),
    ]


def closing():
    return [
        PageBreak(),
        p("Where to go next", "h1"),
        section_divider(),
        p("Once you've decided you want to fully launch:", "body"),
        *numbered([
            "<b>Open</b> <font face='Courier'>02-setup-walkthrough.md</font> <b>in the</b> "
            "<font face='Courier'>handoff/</font> <b>folder of your repo.</b> This is the full step-by-step for connecting "
            "your database, payments, email, SMS, and custom domain.",
            "<b>Block 90 minutes on your calendar</b>, plus give yourself 3 business days of background time for "
            "Stripe and SMS carrier approvals.",
            "<b>Follow it top to bottom.</b> You won't need to call me unless something is truly unusual.",
        ]),
        callout(
            "If you decide to stay with just the preview for now: enjoy. You can always come back later and complete "
            "the full launch."
        ),
        Spacer(1, 36),
        p(
            "<i>This tutorial was prepared by Beaconshire Advisory specifically for KNB Detailing. You own this website "
            "outright — there is no ongoing fee to me, no subscription, and no commitment. Thanks for the opportunity "
            "to build it for you.</i>",
            "body",
        ),
        Spacer(1, 6),
        p("<i>— James Flecker, Beaconshire Advisory</i>", "body"),
    ]


# ── Main ──────────────────────────────────────────────────────────────────
def main():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = build_doc(str(OUTPUT))

    story = []
    # Cover (no header/footer chrome — uses the 'cover' template)
    story += cover_page()
    # Switch to content template
    from reportlab.platypus.doctemplate import NextPageTemplate
    story.append(NextPageTemplate("content"))

    story += before_you_start()
    story += part_1_preview()
    story += part_2_github_signup()
    story += part_3_find_repo()
    story += part_4_fork()
    story += part_5_download_zip()
    story += part_6_vercel_signup()
    story += part_7_deploy()
    story += part_8_what_just_happened()
    story += optional_local_preview()
    story += faq()
    story += closing()

    doc.build(story)
    print(f"✓ Generated {OUTPUT}")
    print(f"  {OUTPUT.stat().st_size:,} bytes")


if __name__ == "__main__":
    main()
