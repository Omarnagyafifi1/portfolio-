from __future__ import annotations

import json
from html import escape
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / "src" / "data" / "portfolio.json").read_text(encoding="utf-8"))
OUTPUT = ROOT / "public" / "omar-nagy-cv.pdf"
BLACK = colors.HexColor("#111111")
MID = colors.HexColor("#555555")
LIGHT = colors.HexColor("#B6B6B6")


def clean(value: object) -> str:
    return str(value).replace("\u2013", "-").replace("\u2014", "-").replace("\u2011", "-")


def p(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(text, style)


def safe(value: object) -> str:
    return escape(clean(value))


styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    name="CVName", fontName="Helvetica-Bold", fontSize=24, leading=27,
    textColor=BLACK, alignment=1, spaceAfter=2,
))
styles.add(ParagraphStyle(
    name="CVTitle", fontName="Helvetica", fontSize=9.2, leading=12,
    textColor=MID, alignment=1, tracking=1.25, spaceAfter=7,
))
styles.add(ParagraphStyle(
    name="Contact", fontName="Helvetica", fontSize=7.35, leading=10,
    textColor=MID, alignment=1, spaceAfter=2,
))
styles.add(ParagraphStyle(
    name="Section", fontName="Helvetica-Bold", fontSize=8.7, leading=11,
    textColor=BLACK, tracking=0.8, spaceBefore=1, spaceAfter=4,
))
styles.add(ParagraphStyle(
    name="BodyCompact", fontName="Helvetica", fontSize=7.55, leading=10.3,
    textColor=BLACK, spaceAfter=3,
))
styles.add(ParagraphStyle(
    name="BulletCompact", fontName="Helvetica", fontSize=7.35, leading=9.7,
    textColor=BLACK, leftIndent=9, firstLineIndent=-7, bulletIndent=0, spaceAfter=1.5,
))
styles.add(ParagraphStyle(
    name="Role", fontName="Helvetica-Bold", fontSize=7.9, leading=10,
    textColor=BLACK,
))
styles.add(ParagraphStyle(
    name="Date", fontName="Helvetica", fontSize=7.1, leading=10,
    textColor=MID, alignment=2,
))
styles.add(ParagraphStyle(
    name="Org", fontName="Helvetica-Oblique", fontSize=7.3, leading=9.3,
    textColor=MID, spaceAfter=2,
))
styles.add(ParagraphStyle(
    name="Project", fontName="Helvetica-Bold", fontSize=7.7, leading=9.5,
    textColor=BLACK, spaceAfter=1,
))


def section(title: str, story: list) -> None:
    story.append(p(title.upper(), styles["Section"]))
    story.append(HRFlowable(width="100%", thickness=0.55, color=LIGHT, spaceBefore=0, spaceAfter=5))


def add_bullet(story: list, text: str) -> None:
    story.append(Paragraph(safe(text), styles["BulletCompact"], bulletText="-"))


def add_role(story: list, item: dict) -> None:
    period = safe(item["period"])
    if item.get("current"):
        period = f"{period} | Ongoing"
    header = Table(
        [[p(safe(item["role"]), styles["Role"]), p(period, styles["Date"])]],
        colWidths=[126 * mm, 39 * mm],
    )
    header.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(header)
    story.append(p(f"{safe(item['organization'])} | {safe(item['type'])}", styles["Org"]))
    if item.get("current"):
        add_bullet(story, item["description"])
    for contribution in item["contributions"]:
        add_bullet(story, contribution)
    story.append(Spacer(1, 3))


def add_project(story: list, item: dict) -> None:
    story.append(p(f"{safe(item['name'])}  |  {safe(item['subtitle'])}", styles["Project"]))
    story.append(p(safe(item["summary"]), styles["BodyCompact"]))


def draw_footer(canvas, document) -> None:
    canvas.saveState()
    canvas.setStrokeColor(LIGHT)
    canvas.setLineWidth(0.45)
    canvas.line(document.leftMargin, 14 * mm, A4[0] - document.rightMargin, 14 * mm)
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(MID)
    canvas.drawString(document.leftMargin, 9 * mm, "OMAR NAGY  |  DATA ENGINEER")
    canvas.drawRightString(A4[0] - document.rightMargin, 9 * mm, f"{document.page}")
    canvas.restoreState()


identity = DATA["identity"]
story: list = [
    p(safe(identity["name"]).upper(), styles["CVName"]),
    p("DATA ENGINEER", styles["CVTitle"]),
    p(
        f"{safe(identity['location'])}  |  {safe(identity['phone'])}  |  "
        f'<link href="mailto:{safe(identity["email"])}" color="#555555">{safe(identity["email"])}</link>',
        styles["Contact"],
    ),
    p(
        f'<link href="{safe(identity["github"])}" color="#555555">GitHub / Omarnagyafifi1</link>'
        f'  |  <link href="{safe(identity["linkedin"])}" color="#555555">LinkedIn / omarnagyafifi</link>',
        styles["Contact"],
    ),
    Spacer(1, 4),
]

section("Profile", story)
story.append(p(
    "Computer Engineering and Automatic Control graduate building Python and SQL data workflows, "
    "ETL pipelines, applied machine learning services, and retrieval-backed applications. Recent work "
    "spans a bilingual text-to-SQL system, model serving, data validation, and cloud deployment.",
    styles["BodyCompact"],
))

section("Core skills", story)
story.append(p(
    "<b>Data engineering:</b> Python, SQL, ETL, data modeling, DataOps, data validation, schema discovery, "
    "SQLite, PostgreSQL, MySQL, SQL Server, Oracle<br/>"
    "<b>Analytics and ML:</b> Pandas, NumPy, scikit-learn, XGBoost, EDA, feature engineering, model evaluation<br/>"
    "<b>Platforms and development:</b> LangGraph, FastAPI, Flask, React, Next.js, Docker, GitHub Actions, "
    "Azure Container Apps, Git, REST APIs, RAG",
    styles["BodyCompact"],
))

section("Experience and training", story)
for experience in DATA["experience"]:
    add_role(story, experience)

section("Selected projects", story)
for project in DATA["projects"]:
    add_project(story, project)

section("Education", story)
education = DATA["education"]
story.append(p(
    f"<b>{safe(education['degree'])}</b> | {safe(education['institution'])}, "
    f"{safe(education['location'])} | {safe(education['graduationYear'])} | {safe(education['grade'])}",
    styles["BodyCompact"],
))

section("Certification", story)
for certificate in DATA["certifications"]:
    story.append(p(
        f"<b>{safe(certificate['name'])}</b> | {safe(certificate['issuer'])} | {safe(certificate['date'])}",
        styles["BodyCompact"],
    ))

document = SimpleDocTemplate(
    str(OUTPUT), pagesize=A4,
    rightMargin=22 * mm, leftMargin=22 * mm,
    topMargin=13 * mm, bottomMargin=20 * mm,
    title="Omar Nagy - Data Engineer",
    author="Omar Nagy",
    subject="Public professional CV",
)
document.build(story, onFirstPage=draw_footer, onLaterPages=draw_footer)
print(f"Created public CV: {OUTPUT}")
