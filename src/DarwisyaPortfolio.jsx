import { useState, useEffect, useRef } from "react";
import "@fontsource/pinyon-script";
import "@fontsource/playfair-display";
import "@fontsource/playfair-display/700.css";
import "@fontsource/playfair-display/400-italic.css";

// ─── Color palette ────────────────────────────────────────────────────────────
const p = {
    mauve: "#9B8A8B",
    blush: "#E8D5D5",
    cream: "#F5EFE6",
    dark: "#5C3D2E",
    lightPink: "#F0E0E0",
    warmGray: "#BFB0B0",
    parchment: "#EDE0CC",
    softPink: "#F7E8E8",
};

const NAV_SECTION_MAP = { "Overview": "overview" };

const NAV_ITEMS = [
    { label: "Overview", sectionId: "overview" },
    { label: "Experience", pageId: "experience" },
    { label: "Achievement", pageId: "achievements" },
    { label: "Reflection", pageId: "reflections" },
];

const FOOTER_ITEMS = [
    { label: "Overview", sectionId: "overview" },
    { label: "Life Motto", sectionId: "life-motto" },
    { label: "About Me", sectionId: "about-me" },
    { label: "Education", sectionId: "education" },
    { label: "Skills", sectionId: "skills" },
    { label: "Journals", sectionId: "journals" },
    { label: "Experience", pageId: "experience" },
    { label: "Achievement", pageId: "achievements" },
    { label: "Reflection", pageId: "reflections" },
    { label: "Contact", sectionId: "contact" },
];

function loadFonts() {
    if (document.getElementById("darwisya-fonts")) return;
    const link = document.createElement("link");
    link.id = "darwisya-fonts";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap";
    document.head.appendChild(link);
}

const polkaBg = (base) =>
    `radial-gradient(circle at 1px 1px, rgba(180,160,140,0.22) 1px, transparent 0) 0 0 / 22px 22px, ${base}`;

const tornTop = "polygon(0 100%,2% 20%,5% 80%,8% 10%,11% 70%,14% 30%,17% 90%,20% 15%,23% 75%,26% 40%,29% 85%,32% 20%,35% 60%,38% 10%,41% 80%,44% 35%,47% 90%,50% 15%,53% 70%,56% 30%,59% 80%,62% 20%,65% 75%,68% 40%,71% 85%,74% 20%,77% 60%,80% 10%,83% 80%,86% 35%,89% 90%,92% 15%,95% 70%,98% 30%,100% 100%)";
const tornBottom = "polygon(0 0,2% 80%,5% 20%,8% 90%,11% 30%,14% 70%,17% 10%,20% 85%,23% 25%,26% 60%,29% 15%,32% 80%,35% 40%,38% 90%,41% 20%,44% 65%,47% 10%,50% 85%,53% 30%,56% 70%,59% 20%,62% 80%,65% 25%,68% 60%,71% 15%,74% 80%,77% 40%,80% 90%,83% 20%,86% 65%,89% 10%,92% 85%,95% 30%,98% 70%,100% 0)";

function ParchmentCard({ children, style }) {
    const cardBg = "rgba(242,234,218,0.82)";
    return (
        <div style={{ position: "relative", background: cardBg, border: "1px solid rgba(200,170,150,0.35)", borderRadius: 4, padding: "1.75rem 2rem", boxShadow: "2px 2px 0 rgba(180,150,130,0.15)", ...style }}>
            <div style={{ position: "absolute", top: -9, left: 0, right: 0, height: 12, background: cardBg, clipPath: tornTop }} />
            {children}
            <div style={{ position: "absolute", bottom: -9, left: 0, right: 0, height: 12, background: cardBg, clipPath: tornBottom }} />
        </div>
    );
}

function LaceBorder({ top }) {
    return (
        <div style={{ width: "100%", height: 20, background: `repeating-linear-gradient(90deg, rgba(200,175,165,0.38) 0px, rgba(200,175,165,0.38) 4px, transparent 4px, transparent 8px)`, [top ? "borderBottom" : "borderTop"]: "1px solid rgba(200,175,165,0.4)" }} />
    );
}

function ClipTag({ label }) {
    return (
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(245,235,210,0.93)", border: "1px solid rgba(200,175,140,0.5)", borderRadius: 3, padding: "0.3rem 1rem", marginBottom: "1.5rem", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
            <div style={{ width: 12, height: 18, background: "linear-gradient(180deg,#D4A843,#B8882A)", borderRadius: "2px 2px 0 0" }} />
            <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.25rem", color: p.dark }}>{label}</span>
        </div>
    );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav({ activePage, setActivePage, activeSection, setActiveSection }) {
    const [visible, setVisible] = useState(true);
    const lastY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            setVisible(y < lastY.current || y < 60);
            lastY.current = y;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = (item) => {
        if (item.pageId) { setActivePage(item.pageId); return; }
        if (activePage !== "home") {
            setActivePage("home");
            setTimeout(() => { const el = document.getElementById(item.sectionId); if (el) el.scrollIntoView({ behavior: "smooth" }); }, 60);
        } else {
            const el = document.getElementById(item.sectionId);
            if (el) el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, borderBottom: `1px solid ${p.warmGray}`, padding: "1.6rem 1.6rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", transform: visible ? "translateY(0)" : "translateY(-110%)", transition: "transform 0.3s ease", overflow: "visible", backgroundColor: "#EADECD" }}>
            <button onClick={() => { setActivePage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ display: "flex", alignItems: "center", gap: "0.7rem", background: "none", border: "none", cursor: "pointer", padding: 0, position: "relative", zIndex: 2 }}>
                <img src="digitports_edited.png" alt="Logo" style={{ width: "50px", height: "50px" }} />
                <span style={{ fontFamily: "'EB Garamond', serif", fontSize: "1rem", color: p.dark, fontStyle: "italic" }}>Nur Darwisya</span>
            </button>
            <ul style={{ display: "flex", gap: "1.2rem", listStyle: "none", margin: 0, padding: 0, flexWrap: "wrap", position: "relative", zIndex: 2 }}>
                {NAV_ITEMS.map((item) => {
                    const isActive = item.pageId ? activePage === item.pageId : (activePage === "home" ? activeSection === item.label : false);
                    return (
                        <li key={item.label}>
                            <button onClick={() => handleClick(item)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, textDecoration: isActive ? "underline" : "none", color: p.dark, fontSize: "1rem", fontFamily: "'EB Garamond', serif", fontWeight: isActive ? 500 : 400 }}>
                                {item.label}
                            </button>
                        </li>
                    );
                })}
            </ul>
            {/* The lacestrip is now anchored strictly to top: "100%" so it hangs perfectly off the bottom border */}
            <img src="lacestrip.png" alt="" aria-hidden="true" style={{ position: "absolute", left: 0, top: "45%", width: "100%", height: "auto", minHeight: "25px", objectFit: "cover", pointerEvents: "none", zIndex: 1, userSelect: "none" }} />
        </nav>
    );
}
// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
    // Adjusted clamp values: lower minimum bounds and smoother vw scaling 
    // so they shrink proportionally as the screen gets smaller.
    const decoItems = [
        { top: "18%", left: "12%", Image: "Png pic_edited_edited.png", width: "clamp(50px, 9vw, 140px)", transform: "rotate(-8deg)" },
        { top: "35%", left: "3%", Image: "_(7)_edited.png", width: "clamp(70px, 12vw, 180px)", transform: "" },
        { top: "72%", left: "7%", Image: "_pheebs_png_edited.png", width: "clamp(60px, 10vw, 160px)", transform: "rotate(-8deg)" },
        { top: "15%", right: "5%", Image: "_(5)(1).png", width: "clamp(60px, 10vw, 150px)", transform: "rotate(5deg)" },
        { top: "38%", right: "11%", Image: "cake.png", width: "clamp(90px, 15vw, 240px)", transform: "rotate(-5deg)" },
        { top: "74%", right: "6%", Image: "lace_bow_edited.png", width: "clamp(60px, 10vw, 160px)", transform: "rotate(10deg)" },
    ];
    
    return (
        <section id="overview" style={{ background: "url('Background.png')", minHeight: "85vh", backgroundSize: "auto", backgroundRepeat: "repeat", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8rem 1rem 2rem", position: "relative", overflow: "hidden" }}>

            {/* Rendered directly inside the section so they anchor to the far edges of the screen */}
            {decoItems.map((d, i) => <DecoItem key={i} d={d} />)}

            <h1 style={{ fontFamily: "'Pinyon Script', cursive", fontSize: "clamp(3rem,8vw,6rem)", textShadow: "1px 1px 0 #B6A5A0, 4px 4px 0 #B6A5A0", color: "#5E523A", fontWeight: 350, margin: "0 0 1.75rem", position: "relative", textAlign: "center", zIndex: 3 }}>
                Darwisya's Portfolio
            </h1>

            <div style={{ position: "relative", width: "min(300px, 76vw)", height: "min(360px, 90vw)", zIndex: 2 }}>
                <img src="CoverBackground.png" alt="" style={{ position: "absolute", left: "50%", top: "45%", transform: "translate(-50%,-50%)", width: "375%", height: "375%", objectFit: "contain", zIndex: 1 }} />
                <img src="Image-of-Darwisya-Cover.png" alt="Darwisya" style={{ position: "absolute", bottom: "18%", left: "50%", transform: "translateX(-50%)", width: "100%", height: "90%", objectFit: "cover", borderRadius: "50% 50% 0 0", zIndex: 3 }} />
                <img src="Image-Of-Flower-Cover.png" alt="" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", height: "90%", width: "160%", zIndex: 4, top: "38%" }} />
            </div>

            <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontSize: "clamp(1rem,2.2vw,2.2rem)", color: "#5E523A", marginTop: "8%", letterSpacing: "0.05em", zIndex: 6, position: "relative", textAlign: "center", textShadow: "2px 2px 0 #B6A5A0, 4px 4px 0 #B6A5A0" }}>
                Business Student &nbsp;•&nbsp; Yearn to Learn &nbsp;•&nbsp; Driven by Depth
            </p>
        </section>
    );
}

function DecoItem({ d }) {
    const [hovered, setHovered] = useState(false);
    const baseAngle = (() => { const m = (d.transform || "").match(/rotate\((-?[\d.]+)deg\)/); return m ? parseFloat(m[1]) : 0; })();
    const currentTransform = hovered ? `rotate(${baseAngle + 5}deg)` : d.transform || "none";
    return (
        // Added zIndex: 10 to guarantee they float above the cover frame
        <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ position: "absolute", top: d.top, left: d.left, right: d.right, bottom: d.bottom, zIndex: 10, userSelect: "none", transform: currentTransform, filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.08))", transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)", cursor: "default" }}>
            <img src={d.Image} alt="" style={{ width: d.width, height: "auto", objectFit: "contain", display: "block" }} onError={(e) => { e.target.style.display = "none"; if (e.target.nextSibling) e.target.nextSibling.style.display = "flex"; }} />
            <div style={{ display: "none", width: d.width, height: d.width, background: "rgba(200,175,165,0.35)", border: "1px dashed rgba(155,138,139,0.5)", borderRadius: 4, alignItems: "center", justifyContent: "center", fontSize: "0.55rem", color: p.mauve, textAlign: "center", padding: 4 }}>{d.Image}</div>
        </div>
    );
}

// ─── ABOUT ME ─────────────────────────────────────────────────────────────────
function AboutMe() {
    return (
        <section id="about-me" style={{ background: 'url("AboutmeBG.png")', padding: "7rem 1.5rem" }}>
            <h2 style={{ fontFamily: "'Pinyon Script', cursive", fontSize: "clamp(4.5rem,7.5vw,5.5rem)", color: "#5E523A", fontWeight: 350, textAlign: "center", marginBottom: "2.5rem", textShadow: "1px 1px 0 #B6A5A0, 4px 4px 0 #B6A5A0" }}>About Me</h2>
            <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", gap: "3rem", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
                <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "nowrap", justifyContent: "center" }}>
                    <div style={{ order: 0, flex: "0 0 320px", width: 320, height: 420, borderRadius: "50%", overflow: "hidden", border: "4px solid rgba(200,170,160,0.5)", boxShadow: "0 0 0 8px rgba(240,220,210,0.4)", background: `linear-gradient(160deg, ${p.warmGray}, ${p.mauve})`, display: "block" }}>
                        <img src="IMG_8194.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                    <div style={{ order: 1, position: "relative", flex: "0 0 720px", width: 750, height: 560, display: "flex", alignItems: "center", justifyContent: "center", overflow: "visible" }}>
                        <img src="rimage.png" alt="Darwisya" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 12, display: "block" }} />
                        <div style={{ position: "absolute", top: 0, left: 50, width: "85%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: 28, color: "#4F4023", fontSize: "1.15rem", fontWeight: 400, textAlign: "center", borderRadius: 18, pointerEvents: "none", whiteSpace: "pre-line" }}>
                            {`Hi and welcome! I'm Darwisya, and I'm currently pursuing a diploma in Business Management at Nanyang Polytechnic, specialising in Supply Chain & Logistics Management and Event Design Management.\n\nI am interested in industries where structure meets experience, where careful planning and thoughtful execution come together. I value work that requires both attention to detail and a deeper understanding of how things function, and I aim to approach each opportunity with intention and consistency.\n\nI spend most of my time exploring different forms of expression through reading, journalling, and creative work such as oil pastels, sketching, and designing journal spreads. I also write as a way to better understand and articulate my thoughts. Beyond that, I love baking from time to time!`}
                        </div>
                    </div>
                </div>
            </div>
            <img src="lacetop.png" style={{ transform: "translatex(-10%) translatey(105%)" }} />
        </section>
    );
}

// ─── LIFE MOTTO ───────────────────────────────────────────────────────────────
function LifeMotto() {
    return (
        <section id="life-motto" style={{ background: "url('Background.png')", backgroundSize: "auto", backgroundRepeat: "repeat" }}>
            <div style={{ padding: "10rem 8rem", paddingBottom: "20rem", position: "relative" }}>
                <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: "3rem", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
                    <div style={{ position: "relative", width: 280, height: 340, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img src="LifeMottoBG.png" alt="" style={{ position: "absolute", inset: 0, width: "450%", height: "180%", transform: "translate(-40.5%, -20%)", objectFit: "fill" }} onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
                        <div style={{ display: "none", position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(230,220,210,0.7)", border: "8px solid rgba(210,195,180,0.5)", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", color: p.mauve, textAlign: "center", padding: "1rem" }}>LifeMottoBG.png (oval lace)</div>
                        <p style={{ position: "relative", zIndex: 1, transform: "translateY(10%) translateX(-10%)", fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.3rem", fontWeight: 500, lineHeight: 1.3, color: "#4F4023", textAlign: "center", margin: "0 2rem" }}>
                            "What is meant for<br /> you will reach you,<br /> even if it is beneath<br /> two mountains. What<br />is not meant for you<br /> will not reach you,<br /> even if it is between<br /> your two lips."
                        </p>
                    </div>
                    <div style={{ flex: 1, minWidth: 320, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        <h2 style={{ fontFamily: "'Pinyon Script', cursive", zIndex: 1, transform: "translateX(5%) translatey(75%)", fontSize: "clamp(3rem,5.5vw,4rem)", color: "#5E523A", margin: 0, textAlign: "center", textShadow: "1px 1px 0 #B6A5A0, 4px 4px 0 #B6A5A0" }}>Life Motto</h2>

                        <div style={{ position: "relative", width: "100%", minHeight: 250, display: "flex", alignItems: "center", justifyContent: "center", margin: "1.5rem 0" }}>
                            <img src="LifeMottoBG(2).png" alt="" style={{ position: "absolute", zIndex: 0, top: "0%", left: "50%", transform: "translateX(-45%)", width: "100%", height: "110%", objectFit: "fill" }} />
                            <div style={{ position: "relative", zIndex: 1, width: "95%", display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                                <p style={{ fontFamily: "'Times New Roman', serif", fontSize: "clamp(1.05rem, 1.8vw, 1.4rem)", fontWeight: 500, lineHeight: 1.5, color: "#4F4023", textAlign: "center", margin: 0, borderRadius: 8, padding: "1.2rem 1.5rem", marginTop: "2rem", marginLeft: "10%" }}>
                                    This belief shapes how I respond to both good and difficult moments.<br /><br />Whether things unfold as expected or not, I trust that they are never without a reason.<br /><br />It allows me to stay balanced and move forward with intention rather than fear.
                                </p>
                            </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "flex-end", marginTop: "2rem" }}>
                            <img src="CurlyArrow.png" alt="" style={{ width: 100, height: 100, objectFit: "contain", transform: "rotate(10deg)" }} />
                            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(0.95rem, 1.6vw, 1.3rem)", fontWeight: 500, color: p.dark, fontStyle: "italic", margin: 0, whiteSpace: "nowrap", textAlign: "right" }}>
                                A saying inspired by Islamic teachings on qadr (divine decree)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <img src="lacestrip.png" alt="" aria-hidden="true" style={{ width: "100%", height: "auto", display: "block", transform: "translateY(50%)" }} />
        </section>
    );
}
// ─── EDUCATION ────────────────────────────────────────────────────────────────
function Education() {
    const schools = [
        { name: "Nanyang Polytechnic", dates: "Apr 2024 – Apr 2027", abbr: "NYPLOGO.png", color: "#003087", items: ["Diploma in Business Management", "Dual Specialisation in Supply Chain & Logistics Management, Event Design Management", "Class Chairperson (Year 2 & 3)", "Co-Curricular Activities:", "— Supply Chain Management Club", "— School of Business Management Club", "— Ambassadorial Team", "— Primers"] },
        { name: "Fuchun Secondary School", dates: "Jan 2020 – Nov 2023", abbr: "FuchunLOGO.png", color: "#8B1A1A", items: ["GCE Ordinary Level (O-Level)", "Member of 34th Student Council (2021–2023)", "Patrol leader of Girl Guides (2022–2023)", "Committee member of VIA projects (2022–2023)", "Awardee of Aileen Lau Book Prize Award (2022–2023)"] },
        { name: "Greenwood Primary School", dates: "2014 – 2019", abbr: "GreenwoodLOGO.png", color: "#1A6B3C", items: ["Primary School Leaving Examination (PSLE)", "Member of prefectorial board (2015–2019)", "Chairperson of Malay Dance (2018–2019)"] },
    ];
    return (
        <section id="education" style={{ position: "relative", background: `url('EducationBG.png')`, padding: "-1rem 1.5rem" }}>
            <img src="lacebottom.png" style={{ transform: "translatex(-10%) translatey(-50%)" }} />
            <h2 style={{ fontFamily: "'Pinyon Script', cursive", fontSize: "clamp(4.5rem,7.5vw,5.5rem)", color: "#5E523A", fontWeight: 350, textAlign: "center", marginBottom: "2.5rem", textShadow: "1px 1px 0 #B6A5A0, 4px 4px 0 #B6A5A0" }}>Education Background</h2><div style={{ textAlign: "center", height: "5%" }}>
                <img src="Image-Of-Flower-Cover.png" alt="decorative flowers" style={{ width: "420px", maxWidth: "72%", height: "auto", display: "inline-block", pointerEvents: "none", userSelect: "none" }} />
            </div>
            <div style={{ maxWidth: 660, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {schools.map((s, i) => (    
                    <div key={i} style={{ background: "#F6E9E5", border: "1.5px solid #e8d2cc", borderRadius: 8, padding: "2rem 4.5rem 2rem 2.5rem", position: "relative", boxShadow: "2px 4px 0 rgba(180,150,130,0.18)" }}>
                        <span style={{ position: "absolute", top: "1rem", right: "3.5rem", fontSize: "0.84rem", color: p.mauve, fontStyle: "italic", fontFamily: "'EB Garamond', serif" }}>{s.dates}</span>
                        <div style={{ position: "absolute", top: "0.9rem", right: "0.6rem", width: 40, height: 40, background: p.cream, borderRadius: 6, border: `1px solid ${p.warmGray}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: 4 }}>
                            <img src={s.abbr} alt={`${s.name} logo`} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} onError={(e) => { e.target.style.display = "none"; if (e.target.nextSibling) e.target.nextSibling.style.display = "flex"; }} />
                            <div style={{ display: "none", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", color: s.color, fontWeight: 700, textAlign: "center" }}>{s.abbr}</div>
                        </div>
                        <h3 style={{ fontFamily: "'Pinyon Script', cursive", fontSize: "2.6rem", textShadow: "1px 1px 0 #B6A5A0, 4px 4px 0 #B6A5A0", color: p.dark, textAlign: "center", marginBottom: "0.9rem", marginTop: 0 }}>{s.name}</h3>
                        <ul style={{ margin: "0 0 0 1.2rem", padding: 0, fontSize: "1.1rem", lineHeight: 1.9, color: p.dark, fontFamily: "'EB Garamond', serif" }}>
                            {s.items.map((item, j) => <li key={j} style={{ listStyle: item.startsWith("—") ? "none" : "disc", marginLeft: item.startsWith("—") ? "1.1rem" : 0 }}>{item}</li>)}
                        </ul>
                    </div>
                ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
                <img src="Image-Of-Flower-Cover.png" alt="decorative flowers" style={{ width: "420px", maxWidth: "72%", height: "auto", display: "inline-block", pointerEvents: "none", userSelect: "none" }} />
            </div>
            <img src="lacetop.png" style={{ transform: "translatex(-10%) translatey(45%)" }} />
        </section>
    );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────
function Skills() {
    const softSkills = [
        { label: "Curiosity-Driven Thinking", img: "1_edited.jpg", desc: "I approach tasks with a strong sense of curiosity, wanting to understand not just what needs to be done, but why it matters. I tend to question processes, look deeper into how things work, and connect different ideas to form a clearer understanding. This allows me to move beyond completing tasks mechanically and instead approach them with thought and purpose." },
        { label: "Intentional Work", img: "2_edited.jpg", desc: "I approach my work with intention, making sure there is clarity behind what I am doing at every stage. I do not rush into execution, but take time to think through how something should be structured and delivered. This helps me produce outcomes that feel considered, aligned, and reflective of the effort put into them." },
        { label: "Determination", img: "5_edited_edited.jpg", desc: "Once I commit to something, I follow through with consistency and discipline. Even when tasks become repetitive or challenging, I stay focused on maintaining the quality of my work. I see determination as showing up fully in the process, not just pushing for an end result." },
        { label: "Situational Awareness", img: "4_edited.jpg", desc: "I pay close attention to my surroundings, especially in environments that require quick thinking and responsiveness. I am aware of how situations unfold in real time, and I adjust my actions accordingly to support what is needed. This allows me to stay grounded while still being responsive to changes happening around me." },
        { label: "Conflict Resolution", img: "digitports-(Website)-(12)_edited.jpg", desc: "I approach conflict with the intention to understand before responding. I take time to consider different perspectives and focus on resolving the issue in a way that is practical and respectful. Rather than reacting emotionally, I aim to keep the situation grounded and solution-focused." },
        { label: "Attention To Detail", img: "Opera-Snapshot_2026-001_214951_www_edited.jpg", desc: "I notice small details that can impact the overall outcome. I make an effort to ensure accuracy and consistency, especially in tasks that require precision. By paying attention to these details, I’m able to produce work that is more reliable and thoughtfully executed." },
        { label: "Adaptability", img: "7_edited.jpg", desc: "I am able to adjust when situations shift, whether it is new feedback, changes in direction, or unexpected challenges. I focus on staying steady and finding a way to move forward without losing clarity in what needs to be done. This allows me to remain composed while still being flexible in my approach." },
        { label: "Communication", img: "digitports(Website)(11)_edited.jpg", desc: "I value clear and thoughtful communication, especially when working with others. I make an effort to express ideas in a way that is easy to understand, while also listening actively to different inputs. This helps create a more aligned and productive environment when collaborating." },
    ];
    return (
        <>
            {/* Added position: "relative" so the bottom lace anchors exactly to the seam */}
            <section id="skills" style={{ position: "relative", background: 'url("9 (1).png")', padding: "2rem 1.5rem 7rem", paddingBottom: "10rem" }}>
                <img src="lacebottom.png" style={{ transform: "translatex(-10%) translatey(-65%)" }} />
                <div style={{ maxWidth: "min(1120px,96vw)", margin: "1.5rem auto 0" }}>
                    <h2 style={{ fontFamily: "'Pinyon Script', cursive", fontSize: "clamp(3rem,6vw,4rem)", textShadow: "2px 2px 0 #dac8c2, 6px 6px 0 #dac8c2", color: "#5E523A", fontweight: 350, textAlign: "center", marginBottom: "1.5rem" }}>My Skillsets</h2>
                    <img src="SoftSkillsClip.png" style={{ width: "30%", maxWidth: "400px", transform: "translateX(35%)", display: "block", marginBottom: "2rem" }} />
                    <div style={{ display: "flex", gap: "3rem", justifyContent: "center", marginBottom: "4rem", flexWrap: "nowrap", overflowX: "visible" }}>
                        {softSkills.slice(0, 3).map((s, i) => <SkillCard key={i} skill={s} />)}
                    </div>
                    <div style={{ display: "flex", gap: "3rem", justifyContent: "center", marginBottom: "3.5rem", flexWrap: "nowrap" }}>
                        {softSkills.slice(3, 5).map((s, i) => <SkillCard key={i + 3} skill={s} />)}
                    </div>
                    <div style={{ display: "flex", gap: "3rem", justifyContent: "center", flexWrap: "wrap" }}>
                        {softSkills.slice(5).map((s, i) => <SkillCard key={i + 5} skill={s} />)}
                    </div>
                </div>
                <div style={{ marginTop: "8rem" }}>
                    <img src="HardSkillsClip.png" style={{ width: "20%", maxWidth: "400px", transform: "translateX(120%) translateY(50%)", display: "block", margin: "2rem auto 0" }} />
                </div>
                <div style={{ textAlign: "center", marginBottom: "8rem" }}>
                    <img src="HardSkillsBook.png" style={{ width: "75%", height: "75%" }} />
                </div>

                {/* Replaced percentage margins with absolute positioning to perfectly hug the bottom edge */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10 }}>
                    <img src="lacetop.png" style={{ width: "100%", height: "auto", display: "block", transform: "translateY(35%)" }} alt="lace decoration" />
                </div>
            </section>
        </>
    );
}

function SkillCard({ skill }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ border: "1px solid rgba(220,195,180,0.5)", borderRadius: 6, padding: "1.25rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "3rem", width: 290, height: 450, position: "relative", overflow: "hidden", cursor: "default", transition: "box-shadow 0.2s, transform 0.18s", boxShadow: hovered ? "0 6px 22px rgba(92,61,46,0.18)" : "none", flexShrink: 0 }}>
            <img src={skill.img} alt={skill.label} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", zIndex: 0 }} onError={(e) => { e.target.style.display = "none"; }} />
            <div style={{ position: "absolute", inset: 0, background: "rgba(242,230,218,0.28)", zIndex: 1 }} />
            <p style={{ fontSize: "1.3rem", color: p.dark, fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontWeight: 400, textAlign: "center", margin: 0, lineHeight: 1.45, position: "relative", zIndex: 4, pointerEvents: "none" }}>{skill.label}</p>
            <div style={{ position: "absolute", inset: 0, background: hovered ? "rgba(242,230,218,0.8)" : "rgba(242,230,218,0)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "4rem 1rem 1rem", opacity: hovered ? 1 : 0, transition: "opacity 0.2s ease, background 0.18s ease", pointerEvents: hovered ? "auto" : "none", borderRadius: 6, border: "1px solid rgba(200,170,150,0.4)", zIndex: 3 }}>
                <p style={{ fontSize: "1rem", color: p.dark, fontFamily: "'EB Garamond', serif", lineHeight: 1.6, textAlign: "center", margin: 0 }}>{skill.desc}</p>
            </div>
        </div>
    );
}

// ─── JOURNALS ─────────────────────────────────────────────────────────────────
function Journals({ setActivePage }) {
    useEffect(() => {
        if (document.getElementById("journal-wiggle-styles")) return;
        const s = document.createElement("style");
        s.id = "journal-wiggle-styles";
        s.innerHTML = `@keyframes journalWiggle { 0%{transform:translateY(0) rotate(0deg);} 25%{transform:translateY(-3px) rotate(-0.6deg);} 50%{transform:translateY(0) rotate(0deg);} 75%{transform:translateY(-2px) rotate(0.6deg);} 100%{transform:translateY(0) rotate(0deg);} }`;
        document.head.appendChild(s);
    }, []);
    const journals = [
        { id: "experience", label: "Experience", imageSrc: "ExperienceBook.png", placeholderColor: "#7A6658" },
        { id: "achievements", label: "Achievements", imageSrc: "AchievementsBook.png", placeholderColor: "#6B5C4E" },
        { id: "reflections", label: "Reflections", imageSrc: "ReflectionBook.png", placeholderColor: "#8E7060" },
    ];
    return (
        <section id="journals" style={{ background: p.blush, padding: "0rem", display: "flex", flexDirection: "column", alignItems: "center", position: "relative", overflow: "hidden" }}>
            {/* Updated width to 100% so it perfectly aligns with the top lace piece from the Skills section */}
            <img src="lacebottom.png" style={{ width: "100%", height: "auto", display: "block", transform: "translateY(-35%)", margin: 0 }} />
            <div style={{ padding: "0rem 1.5rem 4rem", paddingBottom: "8rem", width: "100%", maxWidth: 960, margin: "0 auto" }}>
                <h2 style={{ fontFamily: "'Pinyon Script', cursive", fontSize: "clamp(2.3rem,5vw,3.4rem)", textShadow: "1px 1px 0 #B6A5A0, 4px 4px 0 #B6A5A0", color: "#5E523A", fontweight: 350, fontStyle: "italic", textAlign: "center", marginBottom: "2.5rem", fontWeight: 400 }}>
                    Click on my&nbsp; journals to explore more about me!
                </h2>
                <div style={{ display: "flex", gap: "4rem", justifyContent: "center", flexWrap: "nowrap", overflowX: "visible" }}>
                    {journals.map((j) => <JournalCard key={j.id} journal={j} setActivePage={setActivePage} />)}
                </div>
            </div>
        </section>
    );
}

function JournalCard({ journal, setActivePage }) {
    const [hovered, setHovered] = useState(false);
    const rotation = journal.id === "experience" ? -6 : (journal.id === "achievements" ? 6 : -5);
    return (
        <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => setActivePage(journal.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
            <div style={{ width: 280, height: 270, position: "relative", transform: hovered ? "translateY(-6px) scale(1.03)" : "translateY(0) scale(1)", transition: "transform 0.22s ease", borderRadius: 10, overflow: "visible", background: "transparent" }}>
                <img src="JournalBG.png" alt="journal background" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", objectPosition: "center", display: "block", zIndex: 1, pointerEvents: "none" }} onError={(e) => { e.target.style.display = "none"; }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, pointerEvents: "none", animation: "journalWiggle 4s ease-in-out infinite" }}>
                    <div style={{ width: "56%", height: "64%", borderRadius: 6, overflow: "hidden", transform: `rotate(${rotation}deg)` }}>
                        <img src={journal.imageSrc} alt={journal.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
                        <div style={{ display: "none", width: "100%", height: "100%", background: journal.placeholderColor, alignItems: "center", justifyContent: "center", fontSize: "0.8rem", color: "rgba(255,255,255,0.9)", textAlign: "center", padding: 6, flexDirection: "column", gap: 6 }}>
                            <span style={{ fontSize: "1.8rem" }}>📔</span><span>{journal.label} journal image</span>
                        </div>
                    </div>
                </div>
            </div>
            <span style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontSize: "1.9rem", color: p.dark, letterSpacing: "0.04em" }}>{journal.label}</span>
        </div>
    );
}



// ─── EXPERIENCE PAGE ──────────────────────────────────────────────────────────

function ExperienceMindMap() {
    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    const nodes = [
        { img: "12-.png", alt: "Events & Experience Design", label: "Events &\nExperience Design", top: "6%", left: "30%", targetId: "events-experience" },
        { img: "13-.png", alt: "Supply Chain & Industry Experience", label: "Supply Chain &\nIndustry Experience", top: "6%", left: "65%", targetId: "supply-chain" },
        { img: "14-.png", alt: "Co-Startup: Recruited", label: "Co-Startup:\nRecrafted", top: "46%", left: "80%", targetId: "co-startup" },
        { img: "17.png", alt: "Part-Time Work Experience", label: "Part-Time Work\nExperience", top: "80%", left: "70%", targetId: "part-time" },
        { img: "16.png", alt: "Teaching Enterprise Programme (TEP)", label: "Teaching Enterprise\nProgramme (TEP)", top: "90%", left: "40%", targetId: "tep" },
        { img: "15-.png", alt: "Co-Curricular Development", label: "Co-Curricular\nInvolvement", top: "46%", left: "25%", targetId: "co-curricular" },
    ];

    return (
        /* Reduced maxWidth and height to scale down container */
        <div style={{ position: "relative", maxWidth: 600, margin: "0 auto 1.5rem", height: 380 }}>
            {/* Adjusted background doily size and position */}
            <img src="11.png" alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "165%", height: "165%", objectFit: "contain", pointerEvents: "none", zIndex: 0, left: "-30%", top: "-30%" }} />
            {nodes.map((node, i) => (
                <div
                    key={i}
                    onClick={() => scrollToSection(node.targetId)}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.05)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)"}
                    style={{
                        position: "absolute", top: node.top, left: node.left,
                        transform: "translate(-50%, -50%) scale(1)", zIndex: 2,
                        textAlign: "center", width: 180, cursor: "pointer",
                        transition: "transform 0.2s ease"
                    }}
                >
                    {/* Reduced image dimensions from 200 to 140 */}
                    <div style={{ width: 140, height: 140, overflow: "hidden", margin: "0 auto 0.35rem" }}>
                        <img src={node.img} alt={node.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                    {/* Scaled down font size */}
                    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "0.95rem", fontWeight: 600, color: p.dark, margin: 0, lineHeight: 1.2, transform: "translateY(-80%)" }}>{node.label}</p>
                </div>
            ))}
        </div>
    );
}

// Shared entry card styles
const entryCardStyle = { marginBottom: "2.25rem", padding: "1.5rem 1.75rem", background: "rgba(245,235,215,0.5)", borderRadius: 8, border: "1px solid rgba(200,175,155,0.3)" };
const entryTitleStyle = { fontFamily: "'EB Garamond', serif", fontSize: "1.3rem", fontWeight: 500, color: "#5C3D2E", margin: "0 0 1.1rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(200,175,155,0.3)" };
const entryTextStyle = { flex: 1, fontFamily: "'EB Garamond', serif", fontSize: "1.15rem", lineHeight: 1.85, color: "#5C3D2E", margin: 0, whiteSpace: "pre-line", minWidth: 200 };
const entryImgStyle = (w, h) => ({ width: w, height: h, objectFit: "cover", borderRadius: 6, border: "1px solid rgba(200,170,150,0.4)", flexShrink: 0, display: "block" });

// Standard two-column entry
function ExperienceEntry({ number, title, images = [], imagePosition = "left", text }) {
    const imgGroup = images.length > 0 ? (
        <div style={{ display: "flex", gap: "0.65rem", flexShrink: 0, flexWrap: "wrap", alignItems: "flex-start" }}>
            {images.map((img, i) => (
                <img key={i} src={img.src} alt={img.alt || ""} style={{ width: img.width || (images.length > 1 ? 175 : 270), height: img.height || (images.length > 1 ? 150 : 190), objectFit: "cover", borderRadius: 6, border: "1px solid rgba(200,170,150,0.4)", flexShrink: 0, display: "block" }} />
            ))}
        </div>
    ) : null;
    return (
        <div style={entryCardStyle}>
            <h4 style={entryTitleStyle}>{number}. {title}</h4>
            <div style={{ display: "flex", gap: "1.75rem", alignItems: "flex-start", flexWrap: "wrap" }}>
                {imagePosition === "left" && imgGroup}
                <p style={{ flex: 1, fontFamily: "'EB Garamond', serif", fontSize: "1.15rem", lineHeight: 1.85, color: p.dark, margin: 0, whiteSpace: "pre-line", minWidth: 220 }}>{text}</p>
                {imagePosition === "right" && imgGroup}
            </div>
        </div>
    );
}

// ── Highlighted text helper ─────────────────────────────────────────────────
// Wraps keywords in a warm brown span
function H({ children }) {
    return <span style={{ color: "#a95e5e", fontWeight: 500 }}>{children}</span>;
}

// ─────────────────────────────────────────────────────────────────────────────
// PhotoTextEntry  ← REUSABLE TEMPLATE for every experience entry
function PhotoTextEntry({ title, imageSrc, imageLeft = true, children, tmargintop = "0", maxwidth = 1100, scale = 1.35, gap = "1rem" }) {
    const imgCol = (
        <div style={{
            flex: "1 1 300px",
            maxWidth: "50%", // Ensures it shares exactly half the space with the text box
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
            position: "relative"
        }}>
            <img
                src={imageSrc}
                alt={title || "Experience Image"}
                style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    display: "block",
                    filter: "drop-shadow(2px 4px 12px rgba(0,0,0,0.15))",
                    transform: `scale(${scale})` // Zooms the image to overlap the text without breaking the layout
                }}
                onError={(e) => { e.target.style.display = "none"; }}
            />
        </div>
    );

    const txtCol = (
        <div style={{
            flex: "1 1 350px",
            maxWidth: "600px", // Prevents the text from stretching too wide
            boxSizing: "border-box",
            background: "#f8f5e8",
            borderRadius: 8,
            padding: "2rem 2.5rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            fontFamily: "'EB Garamond', serif",
            fontSize: "1.1rem",
            lineHeight: 1.8,
            color: p.dark,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            zIndex: 1,
            marginTop: tmargintop
        }}>
            {children}
        </div>
    );

    return (
        <div style={{ width: "100%", maxWidth: maxwidth, margin: "0 auto 5.5rem", padding: "0 1.5rem", boxSizing: "border-box" }}>
            {title && (
                <h1 style={{
                    fontFamily: "'EB Garamond', serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "clamp(1.8rem, 4vw, 2.3rem)",
                    color: p.dark,
                    textAlign: "center",
                    margin: "0 0 3rem",
                    letterSpacing: "0.01em",
                }}>
                    {title}
                </h1>
            )}
            {/* The gap prop is now used here so it can be customized per entry */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: gap, width: "100%" }}>
                {imageLeft ? (
                    <>
                        {imgCol}
                        {txtCol}
                    </>
                ) : (
                    <>
                        {txtCol}
                        {imgCol}
                    </>
                )}
            </div>
        </div>
    );
}

function ExperiencePage({ setActivePage }) {
    return (
        <div style={{ background: 'url("ExpBG.png")', backgroundSize: "auto", backgroundRepeat: "repeat", backgroundPosition: "0 0", backgroundColor: p.blush, minHeight: "100vh", padding: "5rem 1.5rem 6rem" }}>

            {/* Back button — Perfectly aligned to left edge */}
            <div style={{ width: "100%", marginBottom: "2rem", display: "flex", justifyContent: "flex-start", paddingTop: "20px" }}>
                <button onClick={() => setActivePage("home")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'EB Garamond', serif", fontStyle: "italic", color: p.dark, fontSize: "1.1rem", padding: 0, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    ← Back to portfolio
                </button>
            </div>

            {/* Page title */}
            <h1 style={{ fontFamily: "'Pinyon Script', cursive", fontSize: "clamp(3rem,8vw,6rem)", /* textShadow: "1px 1px 0 #B6A5A0, 4px 4px 0 #B6A5A0" ,*/ color: "#5E523A", fontWeight: 350, margin: "0 0 1.75rem", position: "relative", textAlign: "center", zIndex: 3 }}>
                My Experience
            </h1>
            <img src="lacestrip.png" alt="lace strip decoration" style={{ width: "105%", height: "auto", display: "block", marginLeft: "-3%" }} />

            {/* Subtitle graphic */}
            <div style={{ textAlign: "center" }}>
                <img src="4.png" alt="" style={{ maxWidth: 520, width: "90%", height: "auto" }} />
            </div>
            <br /><br /><br /><br />

            {/* Mind map */}
            <ExperienceMindMap />

            {/* Lace strip */}
            <img src="lacestrip.png" alt="lace strip decoration" style={{ width: "105%", height: "auto", display: "block", marginLeft: "-3%", marginTop: "4.5rem", marginBottom: "5rem" }} />

            <div style={{ maxWidth: 960, margin: "0 auto" }}>

                {/* ── Events & Experience Design ── */}
                <div id="events-experience" style={{ marginBottom: "3.5rem" }}>
                    {/* Section header image (5.png = "Events & Experience Design" title graphic) */}
                    <div style={{ textAlign: "center", marginBottom: "3rem", marginTop: "-10.5rem" }}>
                        <img src="5.png" alt="Events & Experience Design section title" style={{ maxWidth: 700, width: "100%", height: "auto" }} />
                    </div>

                    {/* ── 1. GrillFest 2025 ── */}
                    <PhotoTextEntry
                        title="1. GrillFest 2025 — On-Ground Operations"
                        imageSrc="18.png"
                        imageLeft={true}
                        scale={2}
                        maxwidth={1100}
                    >
                        <p style={{ margin: "0 0 1.1rem" }}>
                            I supported <H>event operations</H>, assisting with the{" "}
                            <H>setup of seating arrangements</H> while ensuring the layout
                            remained organised and functional throughout the event. I was also
                            stationed at the entrance, <H>managing crowd entry</H> and
                            maintaining a steady flow of visitors into the space.
                        </p>
                        <p style={{ margin: 0 }}>
                            Working on-ground taught me the importance of{" "}
                            <H>consistency and awareness</H>. Small actions, like repositioning
                            tables or monitoring crowd movement, directly impacted the{" "}
                            <H>overall experience and safety of the event</H>. It strengthened
                            my ability to <H>stay attentive</H>, <H>adapt quickly</H>, and{" "}
                            <H>carry out responsibilities reliably</H> in a fast-paced
                            environment.
                        </p>
                    </PhotoTextEntry>

                    {/* ── 2. Singapore Comic Con ── */}
                    <PhotoTextEntry
                        title="2. Singapore Comic Con 2025"
                        imageSrc="19.png"
                        imageLeft={true}
                        scale={1.35}
                        gap="4rem" // <-- Increased gap specifically for this section
                        maxwidth={1100}
                    >
                        <p style={{ margin: "0 0 1.1rem" }}>
                            Being in this role required a <H>strong sense of situational awareness and attention to detail</H>. I had to remain alert to who was entering the space,
                            while also ensuring operations ran smoothly behind the scenes. This experience reinforced my ability to <H>manage controlled environments</H>,<H> maintain
                                organisation</H>, and support <H>multiple responsibilities at once.</H>
                        </p>
                    </PhotoTextEntry>

                    <PhotoTextEntry
                        title=""
                        imageSrc="20.png"
                        imageLeft={false}
                        scale={1.35}
                        gap="4rem" // <-- Increased gap specifically for this section
                        maxwidth={1100}
                    >
                        <p style={{ margin: "0 0 1.1rem" }}>
                            Being in this role required a <H>strong sense of situational awareness and attention to detail</H>. I had to remain alert to who was entering the space,
                            while also ensuring operations ran smoothly behind the scenes. This experience reinforced my ability to <H>manage controlled environments</H>,<H> maintain
                                organisation</H>, and support <H>multiple responsibilities at once.</H>
                        </p>
                    </PhotoTextEntry>

                    {/* ── 3. Risk Assessment ── */}
                    <PhotoTextEntry
                        title="3. Risk Assessment & Management Planning"
                        imageSrc="21.png"
                        imageLeft={true}
                        scale={0.9} // Tall image, needs slightly less scale
                        tmargintop="1.5rem"
                        maxwidth={950}
                    >
                        <p style={{ margin: "0 0 1.1rem" }}>
                            Being in this role required a <H>strong sense of situational awareness and attention to detail</H>. I had to remain alert to who was entering the space,
                            while also ensuring operations ran smoothly behind the scenes. This experience reinforced my ability to <H>manage controlled environments</H>,<H> maintain
                                organisation</H>, and support <H>multiple responsibilities at once.</H>
                        </p>
                    </PhotoTextEntry>

                    <PhotoTextEntry
                        title=""
                        imageSrc="22.png"
                        imageLeft={false}
                        scale={1.3}
                        tmargintop="1.5rem"
                        maxwidth={1100}
                        gap="4rem"
                    >
                        <p style={{ margin: "0 0 1.1rem" }}>
                            I proposed <H>mitigation strategies and control measures</H> to reduce risks to acceptable levels, ensuring each was supported by <H>structured
                                response planning and accountability</H>. This work was awarded a <H>distinction</H>, reflecting my ability to approach event planning with <H>strong
                                    analytical thinking, safety awareness,</H> and <H>operational control</H>.
                        </p>
                    </PhotoTextEntry>

                </div>

                {/* Lace strip */}
                <img
                    src="lacestrip.png"
                    alt="lace strip decoration"
                    style={{ width: "105vw", height: "auto", display: "block", marginLeft: "50%", transform: "translateX(-50%)", marginTop: "5%" }}
                />

                {/* ── 1. Supply Chain Challenge++ (SCC++) 2025 (Collage Layout) ── */}
                <div id="supply-chain" style={{ marginBottom: "5rem", position: "relative" }}>
                    <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                        <img src="SCCILace.png" alt="Events & Experience Design section title" style={{ maxWidth: 700, width: "100%", height: "auto", marginTop: "-5%" }} />
                    </div>

                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "2rem",
                        maxWidth: 1200,
                        margin: "0 auto"
                    }}>
                        {/* --- LEFT COLUMN --- */}
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            gap: "2.5rem",
                            width: "clamp(260px, 28%, 350px)",
                            flexShrink: 1,
                            position: "relative",
                            zIndex: 10
                        }}>
                            <div style={{
                                background: "#f8f5e8",
                                padding: "1.5rem",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                                fontFamily: "'EB Garamond', serif",
                                fontSize: "1.1rem",
                                lineHeight: 1.7,
                                color: p.dark,
                                textAlign: "center"
                            }}>
                                As part of <H>SCC++ 2025</H>, my team and I worked on a real-world logistics case, where we analysed <H>operational challenges</H> within a warehouse environment and <H>proposed scalable solutions</H>.
                            </div>

                            <div style={{
                                background: "#f8f5e8",
                                padding: "1.5rem",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                                fontFamily: "'EB Garamond', serif",
                                fontSize: "1.1rem",
                                lineHeight: 1.7,
                                color: p.dark,
                                textAlign: "center",
                                width: "135%",
                                transform: "translate(10%, 1.5rem)",
                                position: "relative"
                            }}>
                                Through this experience, I developed a stronger ability to <H>approach problems analytically</H> by understanding their root causes and proposing solutions that are both practical and scalable. It also reinforced how <H>structured thinking</H> and <H>research</H> play a key role in <H>supply chain decision-making</H>.
                            </div>
                        </div>

                        {/* --- MIDDLE COLUMN (IMAGE) --- */}
                        <div style={{
                            width: "clamp(280px, 35%, 400px)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            zIndex: 2
                        }}>
                            <img
                                src="23.png"
                                alt="SCC++ 2025 team"
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    aspectRatio: "4/5",
                                    objectFit: "cover",
                                    transform: "rotate(2deg)"
                                }}
                            />
                        </div>

                        {/* --- RIGHT COLUMN --- */}
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            width: "clamp(260px, 28%, 350px)",
                            flexShrink: 1
                        }}>
                            <div style={{
                                background: "#f8f5e8",
                                padding: "1.5rem",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                                fontFamily: "'EB Garamond', serif",
                                fontSize: "1.1rem",
                                lineHeight: 1.7,
                                color: p.dark,
                                textAlign: "center"
                            }}>
                                My role involved <H>researching</H> and <H>evaluating</H> different approaches to improve <H>efficiency, accuracy, and workflow</H> within the system. This included looking into areas such as <H>inventory tracking</H>, <H>warehouse flow</H>, and <H>system integration</H> to support more effective operations.
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── 2. Logistics Exhibitions: Industry Insights & Exploration (Collage Layout) ── */}
                <div style={{ marginBottom: "4.5rem", position: "relative", marginTop: "3rem" }}>
                    <h4 style={{
                        fontFamily: "'EB Garamond', serif",
                        fontStyle: "italic",
                        fontWeight: 400,
                        fontSize: "clamp(1.6rem, 3vw, 2rem)",
                        color: p.dark,
                        textAlign: "center",
                        marginBottom: "2rem",
                        letterSpacing: "0.02em"
                    }}>
                        Logistics Exhibitions: Industry Insights & Exploration
                    </h4>

                    {/* Shrunk overall container to fit better on laptop screens */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.2rem", maxWidth: 900, margin: "0 auto", padding: "0 1rem" }}>

                        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignItems: "center", width: "100%", gap: "1rem" }}>

                            {/* Left Image */}
                            <div style={{ flex: "1 1 180px", maxWidth: 240, zIndex: 1, display: "flex", justifyContent: "center" }}>
                                <img
                                    src="24.png"
                                    alt="Logistics exhibition photo 1"
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        display: "block",
                                        transform: "scale(2.4) rotate(-4deg)", // Reduced scale so it's less huge
                                        filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.12))"
                                    }}
                                />
                            </div>

                            {/* Center Text Column - Shrunk paddings, max-width, and gaps */}
                            <div style={{ flex: "1 1 260px", maxWidth: 360, display: "flex", flexDirection: "column", gap: "1rem", zIndex: 10, position: "relative" }}>
                                <div style={{ background: "#f8f5e8", padding: "1.2rem 1.5rem", boxShadow: "0 4px 10px rgba(0,0,0,0.06)", fontFamily: "'EB Garamond', serif", fontSize: "0.95rem", lineHeight: 1.6, color: p.dark, textAlign: "center" }}>
                                    I attended <H>CeMAT Southeast Asia</H> and <H>TLACSEA 2025</H>, where I explored how logistics companies present and implement <H>real-world solutions</H> across operations, automation, and supply chain systems.
                                </div>

                                <div style={{ background: "#f8f5e8", padding: "1.2rem 1.5rem", boxShadow: "0 4px 10px rgba(0,0,0,0.06)", fontFamily: "'EB Garamond', serif", fontSize: "0.95rem", lineHeight: 1.6, color: p.dark, textAlign: "center" }}>
                                    Rather than simply observing, I approached these exhibitions with intention — paying attention to how different solutions addressed challenges such as <H>efficiency, visibility, and workflow optimisation</H>. I found myself analysing how each system functioned, how it improved existing processes, and how it could be applied in actual operational settings.
                                </div>
                            </div>

                            {/* Right Image */}
                            <div style={{ flex: "1 1 180px", maxWidth: 240, zIndex: 1, display: "flex", justifyContent: "center" }}>
                                <img
                                    src="25.png"
                                    alt="Logistics exhibition photo 2"
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        display: "block",
                                        transform: "scale(2) rotate(4deg)", // Reduced scale
                                        filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.12))"
                                    }}
                                />
                            </div>
                        </div>

                        {/* Wide Bottom Text Box - Shrunk size */}
                        <div style={{
                            width: "100%", maxWidth: 700, zIndex: 10, background: "#f8f5e8",
                            padding: "1.25rem 1.75rem", boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
                            fontFamily: "'EB Garamond', serif", fontSize: "0.95rem", lineHeight: 1.6, color: p.dark, textAlign: "center"
                        }}>
                            This experience allowed me to move beyond theory and <H>engage directly with industry practices</H>. It strengthened my ability to <H>observe critically</H>, <H>ask better questions</H>, and <H>understand</H> how supply chain concepts are translated into <H>practical, scalable solutions</H>.
                        </div>
                    </div>
                </div>

                {/* ── 3. Workflow Optimisation: Picking Operations Design ── */}
                <div style={{ marginBottom: "5rem", position: "relative", marginTop: "4rem" }}>
                    <h4 style={{
                        fontFamily: "'EB Garamond', serif",
                        fontStyle: "italic",
                        fontWeight: 400,
                        fontSize: "2.2rem",
                        color: p.dark,
                        textAlign: "center",
                        marginBottom: "3.5rem",
                        letterSpacing: "0.02em"
                    }}>
                        Workflow Optimisation: Picking Operations Design
                    </h4>

                    {/* Top: Large Centered Image */}
                    <div style={{ textAlign: "center", marginBottom: "2.5rem", padding: "0 1rem" }}>
                        <img
                            src="26.png"
                            alt="Workflow optimisation diagram"
                            style={{
                                width: "100%",
                                maxWidth: 950,
                                height: "auto",
                                border: "6px solid #634731",
                                boxShadow: "2px 4px 16px rgba(0,0,0,0.15)",
                                display: "inline-block"
                            }}
                        />
                    </div>

                    {/* Bottom: Two Side-by-Side Text Boxes */}
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: "2.5rem",
                        maxWidth: 1050,
                        margin: "0 auto",
                        padding: "0 1rem"
                    }}>
                        <div style={{
                            flex: "1 1 350px",
                            background: "#f8f5e8",
                            padding: "1.75rem 2rem",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                            fontFamily: "'EB Garamond', serif",
                            fontSize: "1.1rem",
                            lineHeight: 1.8,
                            color: p.dark,
                            textAlign: "center"
                        }}>
                            I developed a <H>workflow redesign</H> for warehouse picking operations, comparing the <H>current single-order method</H> with a proposed <H>multi-order cluster loop system</H>, based on a <H>real operational challenge</H> presented by <H>Hen Tick</H>. The redesign focused on <H>reducing travel redundancy</H>, <H>improving efficiency</H>, and streamlining the movement of goods across the warehouse.
                        </div>

                        <div style={{
                            flex: "1 1 350px",
                            background: "#f8f5e8",
                            padding: "1.75rem 2rem",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                            fontFamily: "'EB Garamond', serif",
                            fontSize: "1.1rem",
                            lineHeight: 1.8,
                            color: p.dark,
                            textAlign: "center"
                        }}>
                            <p style={{ margin: "0 0 1rem 0" }}>
                                By restructuring the process into a <H>single-pass system</H> with pre-sorted bins, the solution aimed to <H>increase productivity while maintaining accuracy and flow</H>.
                            </p>
                            <p style={{ margin: 0 }}>
                                This project strengthened my ability to <H>analyse inefficiencies</H> and translate them into <H>practical, structured improvements</H>, and was recognised as a well-considered and effective approach.
                            </p>
                        </div>

                        <img
                            src="lacestrip.png"
                            alt="lace strip decoration"
                            style={{ width: "105vw", height: "auto", display: "block", marginLeft: "50%", transform: "translateX(-10%)", marginTop: "5%" }}
                        />
                    </div>
                </div>

                {/* ── 4 & 5. Co-Startup & Workshop Execution (Combined Layout) ── */}
                <div id="co-startup" style={{ position: "relative", maxWidth: 1100, margin: "4rem auto 5rem", padding: "0 1rem" }}>

                    {/* --- TITLE & OVERVIEW --- */}
                    <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                        <img src="7.png" alt="Co-Startup: Recrafted Title" style={{ maxWidth: 700, width: "100%", height: "auto", marginTop: "-10%" }} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", marginTop: "-10%" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                            <img src="megaphone_icon.png" alt="Megaphone" style={{ width: "clamp(100px, 15vw, 250px)", height: "auto", transform: "rotate(-10deg) translate(-10%, 20%)" }} onError={(e) => e.target.style.display = 'none'} />
                            <div style={{ background: "#b2a29d", color: "#FDFBF7", padding: "0.5rem 3rem", fontFamily: "'EB Garamond', serif", fontSize: "1.6rem", fontWeight: 600 }}>
                                Overview
                            </div>
                            <img src="Recycle_Icon.png" alt="Recycle" style={{ width: "clamp(100px, 15vw, 250px)", height: "auto", transform: "rotate(10deg) translate(10%, 20%)" }} onError={(e) => e.target.style.display = 'none'} />
                        </div>

                        <div style={{
                            background: "#f8f5e8", padding: "1.75rem 2.5rem", boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                            fontFamily: "'EB Garamond', serif", fontSize: "1.1rem", lineHeight: 1.8, color: p.dark, textAlign: "center", maxWidth: 750
                        }}>
                            <H>Recrafted</H> is a <H>student-led initiative</H> focused on <H>creating handmade items using sustainable and repurposed materials</H>. The project centres around giving new life to materials that would otherwise be discarded, while encouraging more <H>mindful and creative consumption</H> through <H>hands-on workshops</H>.
                        </div>
                    </div>

                    {/* --- SCRAPBOOK, CLIPBOARD & WORKSHOP CLUSTER --- */}
                    <div style={{
                        position: "relative",
                        marginTop: "4rem",
                        width: "100%",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "2rem"
                    }}>

                        {/* 1. Posters (Left Half) */}
                        <div style={{ position: "relative", flex: "1 1 350px", maxWidth: "450px", minHeight: "420px", zIndex: 1 }}>
                            {/* Base Green Poster - Smaller, moved Up & Left */}
                            <img src="RecraftedwithBodaciousPoster.png" alt="Recrafted with Bodacious Poster" style={{
                                position: "absolute", left: "-20%", top: "0%", width: "60%", height: "auto",
                                transform: "rotate(-4deg)", boxShadow: "2px 4px 12px rgba(0,0,0,0.15)", zIndex: 1
                            }} />
                            {/* Scrapbook overlapping on top - Smaller, moved Up & Left proportionally */}
                            <img src="OurSustainabilityJourneyScrapbook.png" alt="Poster" style={{
                                position: "absolute", left: "20%", top: "10%", zIndex: 2, width: "65%", height: "auto",
                                transform: "rotate(5deg)", boxShadow: "2px 4px 12px rgba(0,0,0,0.15)"
                            }} onError={(e) => { e.target.src = "https://placehold.co/450x600/8B7355/FFFFFF?text=Sustainability+Scrapbook" }} />
                        </div>

                        {/* 2. Text Box & Clipboard (Right Half) */}
                        <div style={{ flex: "1 1 400px", maxWidth: "480px", display: "flex", flexDirection: "column", position: "relative", zIndex: 5, marginTop: "1rem" }}>

                            {/* Banner Title */}
                            <div style={{ background: "#b2a29d", width: "140%", left: "-17%", color: "#FDFBF7", padding: "0.8rem 1.5rem", fontFamily: "'EB Garamond', serif", fontSize: "1.6rem", fontWeight: 600, textAlign: "center", zIndex: 10, alignSelf: "flex-start", marginLeft: "5%", marginBottom: "-1rem", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", position: "relative" }}>
                                Co-IC: Logistics & Social Media Visual Content
                            </div>

                            {/* Text Box - Tighter padding and width to fit text without extra space */}
                            <div style={{
                                background: "#f8f5e8", width: "100%",
                                padding: "2.5rem 2rem",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.08)", fontFamily: "'EB Garamond', serif", fontSize: "1.1rem", lineHeight: 1.8, color: p.dark, textAlign: "center", zIndex: 5, position: "relative", boxSizing: "border-box"
                            }}>
                                I was in charge of <H>logistics</H> and <H>social media design</H>, where I planned the <H>flow of materials, coordinated resources</H> for workshops, and ensured that operations ran smoothly. I also <H>designed visual content</H> to support outreach and engagement, aligning the presentation of the brand with its overall concept.
                            </div>

                            {/* Clipboard - Smaller and moved further down */}
                            <div style={{ position: "absolute", right: "-8%", top: "70%", width: "22%", minWidth: "120px", zIndex: 20 }}>
                                <img
                                    src="Clipboardwithcards.png"
                                    alt="Clipboard with cards"
                                    style={{ width: "100%", height: "auto", filter: "drop-shadow(2px 4px 12px rgba(0,0,0,0.25))", transform: "rotate(3deg)" }}
                                    onError={(e) => { e.target.src = "https://placehold.co/260x700/D4C3B3/FFFFFF?text=Clipboard+Cards" }}
                                />
                            </div>
                        </div>

                    </div>

                    {/* CENTERED TITLE (Beside clipboard bottom) */}
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem", marginBottom: "4rem", position: "relative", zIndex: 10 }}>
                        <div style={{ background: "#b2a29d", color: "#FDFBF7", padding: "0.5rem 2rem", fontFamily: "'EB Garamond', serif", fontSize: "1.6rem", fontWeight: 600, textAlign: "center", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
                            Workshop Execution & Coordination
                        </div>
                    </div>

                    {/* WORKSHOP IMAGE CLUSTER & FLOATING TEXT BOXES */}
                    <div style={{ position: "relative", display: "flex", flexDirection: "column", width: "100%", maxWidth: "1000px", margin: "0 auto", paddingBottom: "6rem" }}>

                        {/* Top Section: Main Image + Overlapping Text Boxes */}
                        <div style={{ position: "relative", display: "flex", justifyContent: "flex-start", paddingLeft: "12%", width: "100%", zIndex: 5 }}>

                            {/* Left Floating Text */}
                            <div style={{ position: "absolute", left: "-7%", top: "-15%", width: "220px", maxWidth: "35%", background: "#f8f5e8", padding: "1.5rem", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", fontFamily: "'EB Garamond', serif", fontSize: "1.05rem", lineHeight: 1.7, color: p.dark, textAlign: "center", zIndex: 10 }}>
                                I have been involved in <H>organising and executing two official workshops</H>, where we guided participants through the <H>creation process</H> while <H>managing materials, timing, and overall coordination.</H>
                            </div>

                            {/* Main Center Image (Moved Left, Border Removed) */}
                            <img src="Workshop_Main.png" alt="Workshop Execution" style={{ width: "55%", height: "auto", transform: "rotate(-4deg)", boxShadow: "2px 4px 16px rgba(0,0,0,0.15)", zIndex: 3 }} onError={(e) => { e.target.src = "https://placehold.co/500x300/8B7355/FFFFFF?text=Main+Workshop+Image" }} />

                            {/* Right Floating Text (Made Wider) */}
                            <div style={{ position: "absolute", right: "0", top: "50%", width: "360px", maxWidth: "45%", background: "#f8f5e8", padding: "1.5rem", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", fontFamily: "'EB Garamond', serif", fontSize: "1.05rem", lineHeight: 1.7, color: p.dark, textAlign: "center", zIndex: 10 }}>
                                This experience strengthened my ability to <H>take ownership of both operational and creative aspects</H>, while ensuring that ideas were carried out in a structured and practical way.
                            </div>
                        </div>

                        {/* Bottom Section: 2 Overlapping Images */}
                        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", width: "100%", marginTop: "1rem", paddingRight: "5%", zIndex: 6 }}>

                            {/* Bottom Left Image (Moved down to the corner of the bottom right image, Border Removed) */}
                            <img src="Workshop_BottomLeft.png" alt="Team photo" style={{ width: "32%", height: "auto", transform: "rotate(-5deg) translate(-27%, 20%)", boxShadow: "2px 4px 16px rgba(0,0,0,0.15)", zIndex: 9 }} onError={(e) => { e.target.src = "https://placehold.co/250x180/8B7355/FFFFFF?text=Bottom+Left" }} />

                            {/* Bottom Right Image (Moved under right text box, Border Removed) */}
                            <img src="Workshop_BottomRight.png" alt="Workshop activity" style={{ width: "48%", height: "auto", transform: "rotate(3deg) translate(-33%, -2%)", boxShadow: "2px 4px 16px rgba(0,0,0,0.15)", zIndex: 8 }} onError={(e) => { e.target.src = "https://placehold.co/380x220/8B7355/FFFFFF?text=Bottom+Right" }} />

                        </div>

                    </div>
                    <div style={{ width: "100vw", marginLeft: "50%", transform: "translateX(-50%)" }}>
                        <img src="lacestrip.png" alt="Lace Separator" style={{ width: "100%", height: "auto", display: "block" }} />
                    </div>
                    {/* ── 6. Part-Time Work Experience ── */}
                    <div id="part-time" style={{ position: "relative", maxWidth: 1100, margin: "6rem auto 5rem", padding: "0 1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>

                        {/* --- HEADER: Lace Oval --- */}
                        <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: "100%", maxWidth: "700px", height: "140px", marginBottom: "1rem" }}>
                            <img
                                src="8.png"
                                alt="Lace Background"
                                style={{ maxWidth: 700, width: "100%", height: "auto", }}
                                onError={(e) => { e.target.src = "https://placehold.co/500x140/E8D5D5/9B8A8B?text=Lace+Oval+Placeholder" }}
                            />

                        </div>

                        {/* --- SUB-HEADER --- */}
                        <h4 style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontSize: "1.6rem", color: p.dark, margin: "0 0 4rem 0", marginTop: "5%", fontWeight: 400, textAlign: "center" }}>
                            Customer Service & Retail Operations
                        </h4>

                        {/* --- TITLE TAG WITH STICKER --- */}
                        <div style={{ position: "relative", marginBottom: "3rem" }}>
                            {/* The Pink BHG Sticker */}
                            <div style={{ position: "absolute", left: "-60px", top: "-25px", zIndex: 10 }}>
                                <img
                                    src="BHGLOGO.png"
                                    alt="BHG Sticker"
                                    style={{ width: "80px", transform: "rotate(-12deg)", filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.15))" }}
                                    onError={(e) => {
                                        e.target.style.display = "none";
                                        if (e.target.nextSibling) e.target.nextSibling.style.display = "block";
                                    }}
                                />
                                {/* CSS Fallback if sticker image doesn't exist yet */}
                                <div style={{ display: "none", transform: "rotate(-12deg)", background: "#E91E63", color: "white", fontWeight: 900, fontFamily: "sans-serif", padding: "4px 8px", fontSize: "1.4rem", letterSpacing: "1px", border: "2px solid white", boxShadow: "2px 2px 6px rgba(0,0,0,0.2)" }}>
                                    BHG
                                </div>
                            </div>

                            {/* Grey Banner */}
                            <div style={{ background: "#b2a29d", padding: "0.5rem 2rem", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
                                <span style={{ fontFamily: "'EB Garamond', serif", fontWeight: 700, fontSize: "1.4rem", color: "#FDFBF7", letterSpacing: "0.02em" }}>
                                    BHG — Retail Assistant & Cashier
                                </span>
                            </div>
                        </div>

                        {/* --- 3-COLUMN CONTENT CLUSTER --- */}
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "2.5rem", width: "100%" }}>

                            {/* Left Text Box */}
                            <div style={{ flex: "1 1 250px", maxWidth: "300px", background: "#f8f5e8", padding: "2rem 1.5rem", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", fontFamily: "'EB Garamond', serif", fontSize: "1.05rem", lineHeight: 1.7, color: p.dark, textAlign: "center", zIndex: 2 }}>
                                I handled <H>daily cashiering operations</H>, managing both cash and card transactions while processing vouchers, discounts, refunds, and returns accurately. I also supported <H>store opening and closing routines, replenished merchandise</H>, and maintained the <H>overall organisation</H> of the retail space.
                            </div>

                            {/* Center Image (Polaroid/Photobooth style) */}
                            <div style={{ flex: "0 0 auto", zIndex: 5, position: "relative" }}>
                                <img
                                    src="BHG_Photobooth.png"
                                    alt="BHG Photobooth"
                                    style={{
                                        display: "block",
                                        width: "240px",
                                        height: "auto",
                                        border: "10px solid #634731",
                                        transform: "rotate(4deg)",
                                        boxShadow: "2px 4px 16px rgba(0,0,0,0.15)"
                                    }}
                                    onError={(e) => { e.target.src = "https://placehold.co/240x320/555/FFF?text=Photobooth+Image" }}
                                />
                            </div>

                            {/* Right Text Box */}
                            <div style={{ flex: "1 1 250px", maxWidth: "300px", background: "#f8f5e8", padding: "2rem 1.5rem", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", fontFamily: "'EB Garamond', serif", fontSize: "1.05rem", lineHeight: 1.7, color: p.dark, textAlign: "center", zIndex: 2 }}>
                                Beyond operations, I was involved in <H>customer service</H>, assisting with enquiries and <H>resolving issues</H> efficiently. I also supported cashiering during <H>in-store events</H>, where maintaining <H>speed and accuracy</H> was important in handling higher customer volume.
                            </div>

                        </div>

                    </div>
                </div>
                {/* --- TITLE TAG: BAKERELLA --- */}
                <div style={{ display: "flex", justifyContent: "center", marginTop: "6rem", marginBottom: "3rem", width: "100%" }}>
                    {/* Grey Banner */}
                    <div style={{ background: "#b2a29d", padding: "0.5rem 2rem", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
                        <span style={{ fontFamily: "'EB Garamond', serif", fontWeight: 700, fontSize: "1.4rem", color: "#FDFBF7", letterSpacing: "0.02em" }}>
                            Bakerella — Event Cashier Support
                        </span>
                    </div>
                </div>

                {/* --- 2-COLUMN CONTENT CLUSTER: BAKERELLA --- */}
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "3rem", width: "100%" }}>

                    {/* Left Text Box */}
                    <div style={{ flex: "1 1 450px", maxWidth: "550px", background: "#f8f5e8", padding: "2.5rem 2.5rem", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", fontFamily: "'EB Garamond', serif", fontSize: "1.1rem", lineHeight: 1.8, color: p.dark, textAlign: "center", zIndex: 2 }}>
                        <p style={{ margin: "0 0 1.5rem 0" }}>
                            I supported <H>cashiering operations</H> during event sales, ensuring accurate transactions while managing the <H>flow of customers</H>. I also assisted with <H>tracking inventory of baked goods</H> in real time, ensuring stock availability throughout the event.
                        </p>
                        <p style={{ margin: 0 }}>
                            This role strengthened my ability to <H>stay organised and attentive in a fast-paced setting</H>, while maintaining a positive and efficient customer experience.
                        </p>
                    </div>

                    {/* Right Image with Sticker */}
                    <div style={{ flex: "0 0 auto", position: "relative", zIndex: 5 }}>
                        {/* Main Bakery Image */}
                        <img
                            src="Bakerella_Booth.png"
                            alt="Bakerella Booth"
                            style={{
                                display: "block",
                                width: "420px",
                                height: "auto",
                                border: "10px solid #634731",
                                transform: "rotate(3deg)",
                                boxShadow: "2px 4px 16px rgba(0,0,0,0.15)"
                            }}
                            onError={(e) => { e.target.src = "https://placehold.co/420x280/555/FFF?text=Bakerella+Booth" }}
                        />

                        {/* Bakerella Logo Sticker */}
                        <div style={{ position: "absolute", top: "-25px", right: "-35px", zIndex: 10 }}>
                            <img
                                src="Bakerella_Logo.png"
                                alt="Bakerella Logo"
                                style={{
                                    width: "110px",
                                    height: "auto",
                                    transform: "rotate(-5deg)",
                                    filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.15))"
                                }}
                                onError={(e) => {
                                    e.target.style.display = "none";
                                    if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
                                }}
                            />
                            {/* CSS Fallback if sticker image doesn't exist yet */}
                            <div style={{
                                display: "none", width: "100px", height: "100px", background: "white",
                                border: "1px solid #eee", boxShadow: "2px 4px 12px rgba(0,0,0,0.1)",
                                alignItems: "center", justifyContent: "center", transform: "rotate(-5deg)",
                                fontFamily: "'Dancing Script', cursive", fontSize: "1.2rem", color: "#333"
                            }}>
                                Bakerella
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ width: "100vw", marginLeft: "50%", transform: "translateX(-50%)" }}>
                    <img src="lacestrip.png" alt="Lace Separator" style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
                {/* ── 7. Teaching Enterprise Programme (TEP) ── */}
                <div id="tep" style={{ position: "relative", maxWidth: 1100, margin: "8rem auto 5rem", marginTop: "0%", padding: "0 1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>

                    {/* --- HEADER --- */}
                    <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: "100%", maxWidth: "700px", height: "140px", marginBottom: "1.5rem" }}>
                        <img
                            src="9.png"
                            alt="Lace Background"
                            style={{ position: "absolute", maxWidth: 700, width: "100%", height: "auto" }}
                            onError={(e) => { e.target.src = "https://placehold.co/700x140/E8D5D5/9B8A8B?text=Lace+Oval+Placeholder" }}
                        />

                    </div>

                    {/* --- INTRO PARAGRAPH --- */}
                    <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontSize: "1.2rem", color: p.dark, textAlign: "center", maxWidth: 800, margin: "0 auto 5rem auto", marginTop: "3%", lineHeight: 1.7 }}>
                        The Teaching Enterprise Programme (TEP) is a project-based module where I worked in teams to deliver solutions for real clients. It involved research, analysis, and application across different areas, allowing me to translate what I have learned into practical and structured outputs.
                    </p>

                    {/* --- 2-COLUMN CLUSTER: IMAS --- */}
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "flex-start", gap: "2rem", width: "100%", maxWidth: 1000 }}>

                        {/* LEFT COLUMN: Cards, Logo & Text Box */}
                        <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>

                            {/* Overlapping Articulate Cards */}
                            <div style={{ position: "relative", width: "100%", height: "380px" }}>
                                <img
                                    src="IMAS_Card1.png"
                                    alt="Course Card 1"
                                    style={{ position: "absolute", left: "5%", top: "0", width: "220px", transform: "rotate(-6deg)", border: "4px solid #634731", boxShadow: "2px 4px 12px rgba(0,0,0,0.15)", zIndex: 1 }}
                                    onError={(e) => { e.target.src = "https://placehold.co/220x300/8B7355/FFFFFF?text=Course+1" }}
                                />
                                <img
                                    src="IMAS_Card2.png"
                                    alt="Course Card 2"
                                    style={{ position: "absolute", left: "40%", top: "40px", width: "220px", transform: "rotate(4deg)", border: "4px solid #634731", boxShadow: "2px 4px 12px rgba(0,0,0,0.15)", zIndex: 2 }}
                                    onError={(e) => { e.target.src = "https://placehold.co/220x300/8B7355/FFFFFF?text=Course+2" }}
                                />
                            </div>

                            {/* Articulate 360 Logo */}
                            <div style={{ width: "100%", paddingLeft: "10%", marginBottom: "2rem", zIndex: 3 }}>
                                <img
                                    src="Articulate360_Logo.png"
                                    alt="Articulate 360 Logo"
                                    style={{ width: "200px", height: "auto" }}
                                    onError={(e) => {
                                        e.target.style.display = "none";
                                        if (e.target.nextSibling) e.target.nextSibling.style.display = "block";
                                    }}
                                />

                            </div>

                            {/* Bottom Left Text Box */}
                            <div style={{ background: "#f8f5e8", padding: "2rem 1.75rem", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", fontFamily: "'EB Garamond', serif", fontSize: "1.1rem", lineHeight: 1.8, color: p.dark, textAlign: "center", width: "95%", zIndex: 10 }}>
                                I also contributed to developing a <H>detailed evaluation checklist</H>, which included defined criteria and scoring guidelines to ensure quality across modules. This required a <H>high level of attention to detail</H>, particularly in maintaining <H>consistency</H> in layout, content flow, and overall user experience.
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Title, Tags, Text Box & Checklist */}
                        <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>

                            {/* Title & Banner Cluster */}
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "1.5rem" }}>
                                <h4 style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontSize: "1.8rem", color: p.dark, margin: "0 0 1rem 0", fontWeight: 500, textAlign: "center" }}>
                                    1. IMAS — E-Learning Module Development
                                </h4>
                                <div style={{ background: "#b2a29d", padding: "0.6rem 1.5rem", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", width: "100%", maxWidth: "380px" }}>
                                    <span style={{ fontFamily: "'EB Garamond', serif", fontWeight: 700, fontSize: "1.2rem", color: "#FDFBF7", letterSpacing: "0.02em", textAlign: "center", display: "block", lineHeight: 1.4 }}>
                                        Content Structuring, Quality Evaluation & Platform Application
                                    </span>
                                </div>
                            </div>

                            {/* Top Right Text Box */}
                            <div style={{ background: "#f8f5e8", padding: "2rem 1.75rem", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", fontFamily: "'EB Garamond', serif", fontSize: "1.1rem", lineHeight: 1.8, color: p.dark, textAlign: "center", width: "100%", zIndex: 5, marginBottom: "2rem" }}>
                                For our client, <H>IMAS</H>, we developed <H>e-learning modules</H> aimed at <H>improving staff engagement and knowledge retention</H>. To support this, I self-studied the features and best practices of <H>Articulate Rise 360</H>, focusing on how content could be structured in a way that is clear, interactive, and consistent.
                            </div>

                            {/* Checklist Image */}
                            <div style={{ zIndex: 2, width: "100%", display: "flex", justifyContent: "center" }}>
                                <img
                                    src="IMAS_Checklist.png"
                                    alt="Evaluation Checklist"
                                    style={{
                                        width: "85%",
                                        height: "auto",
                                        border: "4px solid #634731",
                                        transform: "rotate(-2deg)",
                                        boxShadow: "2px 4px 12px rgba(0,0,0,0.15)",
                                        marginTop: "-1rem" // Creates the overlapping effect with the text box
                                    }}
                                    onError={(e) => { e.target.src = "https://placehold.co/400x500/8B7355/FFFFFF?text=Evaluation+Checklist" }}
                                />
                            </div>
                        </div>

                    </div>
                    {/* --- 2. EYESIGHT.SG CLUSTER --- */}
                    <div style={{ width: "100%", maxWidth: 1000, margin: "6rem auto 0" }}>

                        {/* TOP ROW: Title, Banner, Left Text & Presentation Photo */}
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "3rem", width: "100%" }}>

                            {/* Left Side: Title & Text */}
                            <div style={{ flex: "1 1 400px", maxWidth: "550px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>

                                {/* Title */}
                                <h4 style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontSize: "1.8rem", color: p.dark, margin: "0 0 1rem 0", fontWeight: 500 }}>
                                    2. Eyesight.sg — Sustainability Research & Reporting
                                </h4>

                                {/* Grey Banner */}
                                <div style={{ background: "#b2a29d", padding: "0.5rem 1.5rem", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", display: "inline-block", marginBottom: "1.5rem" }}>
                                    <span style={{ fontFamily: "'EB Garamond', serif", fontWeight: 700, fontSize: "1.2rem", color: "#FDFBF7", letterSpacing: "0.02em" }}>
                                        ESG Framework Analysis & Peer Benchmarking
                                    </span>
                                </div>

                                {/* Text Box */}
                                <div style={{ background: "#f8f5e8", padding: "2rem 1.75rem", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", fontFamily: "'EB Garamond', serif", fontSize: "1.1rem", lineHeight: 1.8, color: p.dark, textAlign: "center", width: "100%", maxWidth: "500px" }}>
                                    For <H>Eyesight.sg</H>, I was involved in <H>supporting the development</H> of their sustainability report. This required me to first <H>build a foundational understanding</H> of key <H>reporting frameworks</H> such as TCFD, GRI, SASB, and ISSB, and <H>how they are applied</H> in real organisational contexts.
                                </div>
                            </div>

                            {/* Right Side: Presentation Photo */}
                            <div style={{ flex: "0 0 auto", zIndex: 5, marginTop: "1rem" }}>
                                <img
                                    src="Eyesight_Presentation.png"
                                    alt="Eyesight Presentation"
                                    style={{
                                        display: "block",
                                        width: "320px",
                                        height: "auto",
                                        border: "8px solid #634731",
                                        transform: "rotate(3deg)",
                                        boxShadow: "2px 4px 16px rgba(0,0,0,0.15)"
                                    }}
                                    onError={(e) => { e.target.src = "https://placehold.co/320x400/8B7355/FFFFFF?text=Presentation+Photo" }}
                                />
                            </div>
                        </div>

                        {/* BOTTOM ROW: Overlapping Meeting Photos & Right Text Box */}
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "3rem", width: "100%", marginTop: "3rem", marginLeft: "7%" }}>

                            {/* Left Side: Scattered Meeting Photos */}
                            <div style={{ flex: "1 1 400px", maxWidth: "350px", position: "relative", minHeight: "350px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <img
                                    src="Eyesight_Meeting1.png"
                                    alt="Team Meeting 1"
                                    style={{
                                        position: "absolute", left: "-45%", top: "5%", width: "65%", height: "auto",
                                        transform: "rotate(-8deg)",
                                        boxShadow: "2px 4px 12px rgba(0,0,0,0.15)", zIndex: 1
                                    }}
                                    onError={(e) => { e.target.src = "https://placehold.co/300x250/8B7355/FFFFFF?text=Meeting+Photo+1" }}
                                />
                                <img
                                    src="Eyesight_Meeting2.png"
                                    alt="Team Meeting 2"
                                    style={{
                                        position: "absolute", right: "0", bottom: "5%", width: "70%", height: "auto",
                                        transform: "rotate(5deg)",
                                        boxShadow: "2px 4px 12px rgba(0,0,0,0.15)", zIndex: 2
                                    }}
                                    onError={(e) => { e.target.src = "https://placehold.co/300x250/8B7355/FFFFFF?text=Meeting+Photo+2" }}
                                />
                            </div>

                            {/* Right Side: Text Box */}
                            <div style={{ flex: "1 1 350px", maxWidth: "450px", background: "#f8f5e8", padding: "2rem 1.75rem", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", fontFamily: "'EB Garamond', serif", fontSize: "1.1rem", lineHeight: 1.8, color: p.dark, textAlign: "center", zIndex: 5 }}>
                                Following the client kickoff, I worked on researching <H>selected industry peers</H> in depth, analysing their sustainability reports as benchmarks. This involved examining <H>reporting structure, disclosures</H>, and <H>overall positioning</H>. Through this process, I developed a <H>stronger ability to analyse large amounts of information</H> and translate them into <H>structured insights</H> that would support the client’s reporting direction.
                            </div>
                        </div>

                    </div>
                </div>
                {/* --- 3. EAE OUTREACH CLUSTER --- */}
                <div style={{ width: "100%", maxWidth: 1050, margin: "8rem auto 0", position: "relative" }}>

                    {/* Title */}
                    <h4 style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontSize: "1.8rem", color: p.dark, margin: "0 0 2rem 5%", fontWeight: 500, textAlign: "left" }}>
                        3. EAE Outreach Planning Committee
                    </h4>

                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "flex-start", gap: "2rem", padding: "0 1rem" }}>

                        {/* Left Column: Image + Overlapping Text */}
                        <div style={{ flex: "1 1 400px", maxWidth: "450px", position: "relative", minHeight: "450px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>

                            {/* Image */}
                            <img
                                src="EAE_Outreach.png"
                                alt="EAE Outreach Planning"
                                style={{
                                    width: "85%", height: "auto", border: "8px solid #634731",
                                    transform: "rotate(-4deg)", boxShadow: "2px 4px 16px rgba(0,0,0,0.15)",
                                    zIndex: 1, marginLeft: "10%"
                                }}
                                onError={(e) => { e.target.src = "https://placehold.co/400x300/8B7355/FFFFFF?text=EAE+Outreach+Meeting" }}
                            />

                            {/* Overlapping Text Box */}
                            <div style={{
                                background: "#f8f5e8", padding: "1.5rem", boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                fontFamily: "'EB Garamond', serif", fontSize: "1.05rem", lineHeight: 1.7,
                                color: p.dark, textAlign: "center", width: "260px", position: "absolute",
                                top: "75%", left: "0%", zIndex: 5
                            }}>
                                The focus was on creating a <H>smooth and engaging experience</H>, while ensuring clarity in both instructions and delivery by facilitators.
                            </div>
                        </div>

                        {/* Right Column: Banner + 2 Text Boxes */}
                        <div style={{ flex: "1 1 450px", maxWidth: "500px", display: "flex", flexDirection: "column", alignItems: "center" }}>

                            {/* Banner */}
                            <div style={{
                                alignSelf: "flex-end", background: "#b2a29d", padding: "0.5rem 1.5rem",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.1)", marginBottom: "1rem", marginRight: "-5%",
                                zIndex: 2, position: "relative"
                            }}>
                                <span style={{ fontFamily: "'EB Garamond', serif", fontWeight: 700, fontSize: "1.2rem", color: "#FDFBF7", letterSpacing: "0.02em" }}>
                                    EAE Outreach Activity Design & Planning
                                </span>
                            </div>

                            {/* Top Text Box */}
                            <div style={{
                                background: "#f8f5e8", padding: "2rem 1.75rem", boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                fontFamily: "'EB Garamond', serif", fontSize: "1.1rem", lineHeight: 1.8, color: p.dark,
                                textAlign: "center", width: "100%", marginBottom: "3rem", zIndex: 1
                            }}>
                                As part of the EAE <H>outreach planning team</H>, I contributed to <H>designing interactive activities</H> for secondary school students to better understand the specialisations under the Diploma in Business Management.
                            </div>

                            {/* Bottom Text Box */}
                            <div style={{
                                background: "#f8f5e8", padding: "2rem 1.75rem", boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                fontFamily: "'EB Garamond', serif", fontSize: "1.1rem", lineHeight: 1.8, color: p.dark,
                                textAlign: "center", width: "85%", zIndex: 1
                            }}>
                                This involved ensuring that each activity was <H>aligned with the overall theme</H>, <H>engaging for participants</H>, and <H>manageable</H> within the given time. I was involved in <H>planning logistics</H> such as materials and printed assets, as well as <H>designing elements</H> like activity cards and instructions.
                            </div>
                        </div>
                    </div>

                </div>
                <img
                    src="lacestrip.png"
                    alt="lace strip decoration"
                    style={{ width: "105vw", height: "auto", display: "block", marginTop: "5%" }}
                />
                {/* ── 8. Co-Curricular Involvement ── */}
                <div id="co-curricular" style={{ position: "relative", maxWidth: 1100, margin: "8rem auto 5rem", padding: "0 1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>

                    {/* --- HEADER: Lace Oval --- */}
                    <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: "100%", maxWidth: "700px", height: "140px", marginBottom: "1rem" }}>
                        <img
                            src="10.png"
                            alt="Lace Background"
                            style={{ position: "absolute", maxWidth: 700, width: "100%", height: "auto" }}
                            onError={(e) => { e.target.src = "https://placehold.co/700x140/E8D5D5/9B8A8B?text=Lace+Oval+Placeholder" }}
                        />
                    </div>

                    {/* --- SUB-HEADER --- */}
                    <h4 style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontSize: "1.6rem", color: p.dark, margin: "0 0 4rem 0", marginTop: "5%", fontWeight: 400, textAlign: "center" }}>
                        Leadership, Service & Personal Development
                    </h4>

                    {/* --- 2-COLUMN CLUSTER: AMBASSADORIAL TEAM --- */}
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "flex-start", gap: "2rem", width: "100%", maxWidth: 1000 }}>

                        {/* LEFT COLUMN: Meeting Photo */}
                        <div style={{ flex: "1 1 400px", maxWidth: "450px", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2, marginTop: "2rem" }}>
                            <img
                                src="AT_Meeting.png"
                                alt="Ambassadorial Team Meeting"
                                style={{
                                    width: "100%", height: "auto",
                                    transform: "rotate(-3deg)", boxShadow: "2px 4px 16px rgba(0,0,0,0.15)", display: "block"
                                }}
                                onError={(e) => { e.target.src = "https://placehold.co/450x300/8B7355/FFFFFF?text=AT+Meeting+Photo" }}
                            />
                        </div>

                        {/* RIGHT COLUMN: Title, Banner & Text Box */}
                        <div style={{ flex: "1 1 450px", maxWidth: "500px", display: "flex", flexDirection: "column", alignItems: "center", zIndex: 5 }}>

                            {/* Title & Banner Cluster */}
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "1.5rem", width: "100%" }}>
                                <h4 style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontSize: "1.8rem", color: p.dark, margin: "0 0 0.5rem 0", fontWeight: 500, textAlign: "center" }}>
                                    1. Ambassadorial Team (AT)
                                </h4>
                                <div style={{ background: "#b2a29d", padding: "0.5rem 1.5rem", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", width: "90%", maxWidth: "380px" }}>
                                    <span style={{ fontFamily: "'EB Garamond', serif", fontWeight: 700, fontSize: "1.2rem", color: "#FDFBF7", letterSpacing: "0.02em", textAlign: "center", display: "block" }}>
                                        Workshops & Personal Development
                                    </span>
                                </div>
                            </div>

                            {/* Text Box */}
                            <div style={{ background: "#f8f5e8", padding: "2rem 1.75rem", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", fontFamily: "'EB Garamond', serif", fontSize: "1.1rem", lineHeight: 1.8, color: p.dark, textAlign: "center", width: "100%" }}>
                                <p style={{ margin: "0 0 1rem 0" }}>
                                    As part of the Ambassadorial Team, I participated in a series of <H>workshops</H> focused on both <H>personal and professional development</H>, including topics such as unconscious bias, critical thinking, self-awareness, first aid, and mental resilience.
                                </p>
                                <p style={{ margin: 0 }}>
                                    These sessions allowed me to build <H>greater awareness</H> of <H>how I think, respond, and communicate in different situations</H>. While my involvement was primarily through participation, the experience contributed to <H>my growth</H> in areas such as <H>adaptability, awareness, and decision-making</H>.
                                </p>
                            </div>
                        </div>
                        {/* --- 2. PRIMERS CLUSTER --- */}
                        <div style={{ position: "relative", width: "100%", maxWidth: 1050, margin: "6rem auto 0", padding: "0 1rem" }}>

                            {/* Top Header (Title + Banner) */}
                            <div style={{ width: "100%", maxWidth: "500px", display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "1.5rem" }}>
                                <h4 style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontSize: "2rem", color: p.dark, margin: "0 0 0.5rem 0", fontWeight: 500 }}>
                                    2. Primers
                                </h4>
                                <div style={{ background: "#b2a29d", padding: "0.4rem 1.5rem", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
                                    <span style={{ fontFamily: "'EB Garamond', serif", fontWeight: 700, fontSize: "1.2rem", color: "#FDFBF7", letterSpacing: "0.02em" }}>
                                        National Day Parade (NDP) Motivator
                                    </span>
                                </div>
                            </div>

                            {/* Top Content Area */}
                            <div style={{ position: "relative", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "2rem" }}>

                                {/* LEFT COLUMN: Top Text Box */}
                                <div style={{ flex: "1 1 400px", maxWidth: "450px", zIndex: 2 }}>
                                    <div style={{ background: "#f8f5e8", padding: "2rem 1.75rem", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", fontFamily: "'EB Garamond', serif", fontSize: "1.1rem", lineHeight: 1.8, color: p.dark, textAlign: "center", width: "100%" }}>
                                        I was part of a four-month initiative as an <H>NDP Motivator for the National Day Parade 2024</H>, where I supported in <H>energising and engaging participants</H> throughout the preparation period and event.
                                    </div>
                                </div>

                                {/* RIGHT COLUMN: Circle Selfie */}
                                <div style={{ flex: "1 1 350px", maxWidth: "450px", display: "flex", justifyContent: "center", zIndex: 1, marginTop: "-2rem" }}>
                                    <img
                                        src="Primers_TopRight.png"
                                        alt="Circle Selfie"
                                        style={{ width: "320px", height: "auto", border: "8px solid #634731", transform: "rotate(4deg)", boxShadow: "2px 4px 16px rgba(0,0,0,0.15)" }}
                                        onError={(e) => { e.target.src = "https://placehold.co/320x300/8B7355/FFFFFF?text=Circle+Selfie" }}
                                    />
                                </div>
                            </div>

                            {/* BOTTOM CLUSTER (Images + Text) */}
                            <div style={{ position: "relative", width: "100%", marginTop: "2rem" }}>

                                {/* The 3 Photos */}
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", position: "relative", paddingLeft: "10%" }}>
                                    <img
                                        src="Primers_BottomLeft.png"
                                        alt="Stadium Event"
                                        style={{ width: "220px", height: "auto", border: "8px solid #634731", transform: "rotate(-3deg) translate(-65%, -15%)", zIndex: 3, boxShadow: "2px 4px 12px rgba(0,0,0,0.15)", marginBottom: "4rem" }}
                                        onError={(e) => { e.target.src = "https://placehold.co/220x280/8B7355/FFFFFF?text=Stadium+Photo" }}
                                    />
                                    <img
                                        src="Primers_Center.png"
                                        alt="Center Group Selfie"
                                        style={{ width: "240px", height: "auto", border: "8px solid #634731", transform: "rotate(2deg) translate(-35%, 0)", zIndex: 4, marginLeft: "-1.5rem", marginBottom: "7rem", boxShadow: "2px 4px 12px rgba(0,0,0,0.15)" }}
                                        onError={(e) => { e.target.src = "https://placehold.co/240x260/8B7355/FFFFFF?text=Center+Group" }}
                                    />
                                    <img
                                        src="Primers_BottomRight.png"
                                        alt="Large Group"
                                        style={{ width: "350px", height: "auto", border: "8px solid #634731", transform: "rotate(-4deg)", zIndex: 2, marginLeft: "-2rem", marginTop: "-2rem", boxShadow: "2px 4px 12px rgba(0,0,0,0.15)" }}
                                        onError={(e) => { e.target.src = "https://placehold.co/350x240/8B7355/FFFFFF?text=Large+Group" }}
                                    />
                                </div>

                                {/* Bottom Text Box (Overlapping, left-aligned like the top text box) */}
                                <div style={{
                                    background: "#f8f5e8", padding: "1.5rem 2.5rem", boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                                    fontFamily: "'EB Garamond', serif", fontSize: "1.1rem", lineHeight: 1.8, color: p.dark,
                                    textAlign: "center", width: "100%", maxWidth: "580px", position: "relative", zIndex: 10,
                                    marginTop: "-8rem", marginLeft: "8%"
                                }}>
                                    This experience allowed me to <H>step out of my usual environment</H> and <H>contribute to something larger in scale</H>, while building confidence in interacting with others and <H>maintaining a positive and encouraging presence</H>.
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                {/* --- 3. BBSG SHARE-A-GIFT CLUSTER --- */}
                <div style={{ position: "relative", width: "100%", maxWidth: 1050, margin: "6rem auto 0", padding: "0 1rem" }}>

                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "2rem" }}>

                        {/* LEFT COLUMN: Schedule Documents */}
                        <div style={{ flex: "1 1 400px", maxWidth: "450px", position: "relative", minHeight: "550px", zIndex: 1 }}>
                            <img
                                src="BBSG_Schedule1.png"
                                alt="Schedule Document 1"
                                style={{
                                    position: "absolute", left: "0", top: "0", width: "70%", height: "auto",
                                    transform: "rotate(-5deg)", boxShadow: "2px 4px 12px rgba(0,0,0,0.15)", zIndex: 1
                                }}
                                onError={(e) => { e.target.src = "https://placehold.co/300x400/8B7355/FFFFFF?text=Schedule+1" }}
                            />
                            <img
                                src="BBSG_Schedule2.png"
                                alt="Schedule Document 2"
                                style={{
                                    position: "absolute", left: "30%", top: "15%", width: "70%", height: "auto",
                                    transform: "rotate(3deg)", boxShadow: "2px 4px 12px rgba(0,0,0,0.15)", zIndex: 2
                                }}
                                onError={(e) => { e.target.src = "https://placehold.co/300x400/8B7355/FFFFFF?text=Schedule+2" }}
                            />
                        </div>

                        {/* RIGHT COLUMN: Banner, Text 1 & Group Photo */}
                        <div style={{ flex: "1 1 450px", maxWidth: "500px", display: "flex", flexDirection: "column", zIndex: 5 }}>

                            {/* Grey Banner */}
                            <div style={{
                                alignSelf: "flex-end", background: "#b2a29d", padding: "0.8rem 2rem",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.1)", marginBottom: "2rem", marginRight: "-5%", zIndex: 10
                            }}>
                                <span style={{ fontFamily: "'EB Garamond', serif", fontWeight: 700, fontStyle: "italic", fontSize: "1.4rem", color: "#FDFBF7", textAlign: "center", display: "block", lineHeight: 1.4 }}>
                                    BBSG Share-A-Gift 2024<br />
                                    (Assistant Student Organiser)
                                </span>
                            </div>

                            {/* Top Text Box */}
                            <div style={{
                                background: "#f8f5e8", padding: "2rem 1.75rem", boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                fontFamily: "'EB Garamond', serif", fontSize: "1.1rem", lineHeight: 1.8, color: p.dark,
                                textAlign: "center", width: "100%", marginBottom: "1rem", zIndex: 5
                            }}>
                                As an <H>Assistant Student Organiser</H>, I was involved in <H>planning and coordinating</H> the overall programme flow for the <H>Share-A-Gift initiative</H>. This included developing a <H>structured timeline</H> for participants, <H>assigning</H> groups to specific HDB blocks, and <H>organising the distribution</H> of donations.
                            </div>

                            {/* Group Photo */}
                            <div style={{ alignSelf: "flex-end", zIndex: 2, marginRight: "5%", marginTop: "-1rem" }}>
                                <img
                                    src="BBSG_GroupPhoto.png"
                                    alt="BBSG Group Photo"
                                    style={{
                                        display: "block", width: "260px", height: "auto",
                                        transform: "rotate(-6deg) translate(10%, 0)",
                                        boxShadow: "2px 4px 16px rgba(0,0,0,0.15)"
                                    }}
                                    onError={(e) => { e.target.src = "https://placehold.co/260x320/8B7355/FFFFFF?text=Group+Photo" }}
                                />
                            </div>

                        </div>
                    </div>

                    {/* BOTTOM ROW: Overlapping Text Box */}
                    <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "-12rem", position: "relative", zIndex: 10, paddingLeft: "5%" }}>
                        <div style={{
                            background: "#f8f5e8", padding: "2rem 2.5rem", boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                            fontFamily: "'EB Garamond', serif", fontSize: "1.1rem", lineHeight: 1.8, color: p.dark,
                            textAlign: "center", width: "100%", maxWidth: "680px"
                        }}>
                            I also contributed to <H>contingency planning</H>, such as preparing <H>alternative walking routes</H> in the event of bad weather, ensuring that operations could continue smoothly. Beyond planning, I participated in the <H>actual distribution of food donations</H> to residents in Ang Mo Kio, allowing me to see the <H>full process from coordination to execution</H>.
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

// ─── JOURNAL DETAIL PAGES ─────────────────────────────────────────────────────
const journalContent = {
    experience: { title: "Experience", content: ["Replace this with your actual work experience, internships, and roles.", "Each paragraph here could describe a key responsibility, a project you led, or a skill you developed on the job.", "You can restructure this section however you like — timeline format, card format, or simple paragraphs all work beautifully."] },
    achievements: { title: "Achievements", content: ["List your proudest accomplishments here — awards, certifications, competitions, and recognitions.", "Describe the context and impact of each achievement so readers understand what it took to earn it.", "Don't be modest — this is your space to celebrate your hard work!"] },
    reflections: { title: "Reflections", content: ["This section is a space for your personal reflections — on your journey, your growth, and the lessons you've learned.", "You might write about a challenge that shaped you, a value you've come to hold deeply, or a moment that changed your perspective.", "Reflections make your portfolio human and memorable."] },
};

// ─── REFLECTIONS PAGE ────────────────────────────────────────────────────────
function ReflectionsPage({ setActivePage }) {

    // Reusable two-column "What I Did / Key Takeaways" header block
    function TwoColHeader({ whatIDid, keyTakeaways }) {
        const boxStyle = {
            background: "#edd8d3", // Pale warm background matching image
            border: "4px solid #b2a29d", // Muted reddish-brown border
            padding: "1.5rem 2.5rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            borderRadius: "2px", // Sharp corners
            opacity: 0.85
        };
        const titleStyle = {
            fontFamily: "'EB Garamond', serif",
            fontStyle: "italic",
            fontSize: "1.6rem",
            color: "#A35E5A",
            margin: "0 0 1.2rem",
            textAlign: "center",
            fontWeight: 400
        };
        const liStyle = { marginBottom: "0.8rem", listStyleType: "disc" };

        return (
            <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem", flexWrap: "wrap", alignItems: "stretch" }}>
                <div style={{ ...boxStyle, flex: "1.8 1 400px" }}>
                    <h4 style={titleStyle}>What I Did</h4>
                    <ul style={{ margin: 0, paddingLeft: "1.2rem", fontFamily: "'EB Garamond', serif", fontSize: "1.05rem", lineHeight: 1.6, color: p.dark }}>
                        {whatIDid.map((item, i) => <li key={i} style={liStyle}>{item}</li>)}
                    </ul>
                </div>
                <div style={{ ...boxStyle, flex: "1 1 200px" }}>
                    <h4 style={titleStyle}>Key Takeaways</h4>
                    <ul style={{ margin: 0, marginTop:"3rem", paddingLeft: "1.2rem", fontFamily: "'EB Garamond', serif", fontSize: "1.05rem", lineHeight: 2, color: p.dark }}>
                        {keyTakeaways.map((item, i) => <li key={i} style={liStyle}>{item}</li>)}
                    </ul>
                </div>
            </div>
        );
    }

    // Reusable reflection text block with optional date badge & internal images
    function ReflectionBlock({ dateRange, children, images = [] }) {
        return (
            <div style={{
                background: "#edd8d3",
                border: "4px solid #b2a29d",
                padding: "2.5rem 2.5rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                borderRadius: "2px",
                opacity: 0.85
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
                    <h4 style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontSize: "1.8rem", color: "#A35E5A", margin: 0, fontWeight: 400 }}>Reflection</h4>
                    {dateRange && (
                        <span style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontSize: "1.1rem", color: "#A35E5A" }}>{dateRange}</span>
                    )}
                </div>

                <div style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.05rem", lineHeight: 1.8, color: p.dark, margin: 0 }}>
                    {children}
                </div>

                {images && images.length > 0 && (
                    <div style={{ display: "flex", justifyContent: "center", gap: "2.5rem", marginTop: "3rem", flexWrap: "wrap" }}>
                        {images.map((img, i) => (
                            <img
                                key={i}
                                src={img.src}
                                alt={img.alt}
                                style={{
                                    width: img.w || "42%",
                                    height: "auto",
                                    objectFit: "contain",
                                }}
                                onError={(e) => { e.target.src = `https://placehold.co/400x300/D4C3B3/FFFFFF?text=${img.alt.replace(/ /g, "+")}` }}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Section title card — matching the clean italic serif in the image
    function SectionTitle({ title }) {
        return (
            <div style={{ textAlign: "center", margin: "4rem 0 2rem" }}>
                <h3 style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontSize: "2rem", color: p.dark, margin: 0, fontWeight: 400, letterSpacing: "0.02em" }}>
                    {title}
                </h3>
            </div>
        );
    }

   const entries = [
        {
            title: "Sustainability Research & Peer Benchmarking Project",
            whatIDid: [
                "Researched key sustainability reporting frameworks (TCFD, GRI, SASB, ISSB) to understand structure and requirements",
                "Analysed selected industry peers' reports to identify patterns and reporting approached",
                "Extracted and organised relevant insights to support the client's reporting direction",
                "Contributed to aligning research findings with the project timeline and deliverables",
            ],
            keyTakeaways: [
                "sustainability reporting frameworks",
                "peer benchmarking",
                "filtering key information",
                "structuring research clearly",
            ],
            dateRange: "Apr - May 2026",
            reflection: (
                <>
                    <p style={{ marginBottom: "1.5rem" }}>
                        Working with eyesight.sg experience required me to slow down and work through large amounts of information with clarity. Sustainability reports are detailed and structured in different ways, so it took time to <AHighlight>understand what actually mattered</AHighlight> and how each company chose to present it. I found myself becoming more selective in what I focused on, rather than trying to take in everything at once.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        As I went deeper into the research, I started to <AHighlight>recognise patterns</AHighlight> across different reports. It became less about reading and more about <AHighlight>understanding how information is positioned,</AHighlight> what is <AHighlight>prioritised,</AHighlight> and how it <AHighlight>supports the company’s overall direction.</AHighlight> This shifted how I approached the task: from gathering information to interpreting it more intentionally.
                    </p>
                    <p style={{ margin: 0 }}>
                        What stood out to me was how much <AHighlight>clarity comes from structure.</AHighlight> When information is organised well, it becomes easier to analyse and apply. This experience strengthened how I approach research by making sense of them in a way that supports a clear outcome.
                    </p>
                    
                    {/* Hardcoded Image Block for equal height without cropping */}
                    <div style={{ display: "flex", justifyContent: "center", gap: "2.5rem", marginTop: "3rem", height: "240px", width: "100%" }}>
                        <img 
                            src="Interrelation_Frameworks.png" 
                            alt="Interrelation of Frameworks" 
                            style={{ height: "100%", width: "auto", objectFit: "contain", boxShadow: "2px 4px 12px rgba(0,0,0,0.15)" }} 
                            onError={(e) => { e.target.src = "https://placehold.co/400x300/D4C3B3/FFFFFF?text=Interrelation+of+Frameworks" }}
                        />
                        <img 
                            src="Eyesight_Meeting_Zoom.png" 
                            alt="Zoom Meeting" 
                            style={{ height: "100%", width: "auto", objectFit: "contain", boxShadow: "2px 4px 12px rgba(0,0,0,0.15)" }} 
                            onError={(e) => { e.target.src = "https://placehold.co/400x300/D4C3B3/FFFFFF?text=Zoom+Meeting" }}
                        />
                    </div>
                </>
            ),
            images: [],
        },
        {
            title: "E-Learning Design with Articulate Rise 360 Project",
            whatIDid: [
                "Self-studied Articulate Rise 360 features and platform best practices to support module development",
                "Contributed to developing evaluation criteria and scoring guidelines for module quality assessment",
                "Structured and refined e-learning content to maintain consistency in layout and user experience",
                "Supported development of staff learning modules focused on engagement and knowledge retention",
            ],
            keyTakeaways: [
                "logistics coordination",
                "resource sourcing & planning",
                "brand presentation & visual design",
                "balancing operations with creativity",
            ],
            dateRange: "Mar - Apr 2026",
            reflection: (
                <>
                    <p style={{ marginBottom: "1.5rem" }}>
                        For my Investment Management Association of Singapore IMAS client project, I had to learn <AHighlight>Articulate Rise 360</AHighlight> independently while understanding how <AHighlight>digital learning experiences are structured.</AHighlight> Since the platform was unfamiliar to me at the beginning, much of the process involved testing features, exploring different layouts, and understanding how each element affected the learner's experience.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        The more I worked on the modules, the more <AHighlight>detail-oriented</AHighlight> I became. Things like consistency in spacing, content flow, interactivity, and pacing started to matter more because they influenced how smoothly the information was received. It made me realise that effective e-learning design goes beyond visuals and <AHighlight>depends heavily on how intentionally the content is structured.</AHighlight>
                    </p>
                    <p style={{ margin: 0 }}>
                        Developing the evaluation checklist also shifted the way I <AHighlight>approached quality control.</AHighlight> Instead of only focusing on completing tasks, I became more <AHighlight>aware of the standards</AHighlight> behind them and how <AHighlight>consistency contributes</AHighlight> to a <AHighlight>clearer</AHighlight> and more <AHighlight>reliable</AHighlight> learning experience overall.
                    </p>
                </>
            ),
            images: [],
        },
        {
            title: "Recrafted – Startup Operations & Development",
            whatIDid: [
                "Co-managed logistics planning (sourcing materials, organising quantities, coordinating purchasing needs)",
                "Planned and executed a fabric donataion drive to collect materials for the second workshop",
                "Designed and refined social media visual content to support outreach and brand presentation",
                "Contributed to workshop preparation, coordination and overall operational planning"
            ],
            keyTakeaways: [
                "logistics & coordination",
                "resource planning",
                "visual branding",
                "workshop execution",
                "operational thinking",
                "teamwork & collaboration",
            ],
            dateRange: "Mar - Apr 2026",
            reflection: (
                <>
                    <p style={{ marginBottom: "1.5rem" }}>
                        Recrafted started as a way for my friends and I to challenge ourselves beyond the classroom and experience what it actually feels like to <AHighlight>build and manage something from the ground up</AHighlight>. Although the project is still developing and not always consistently active, the process itself taught me a lot about the amount of <AHighlight>planning and coordination needed</AHighlight> behind even smaller-scale operations.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        Being involved in logistics made me more aware of how important organisation is in keeping things functional. Tasks such as <AHighlight>sourcing materials</AHighlight>, <AHighlight>managing quantities</AHighlight>, and <AHighlight>preparing resources</AHighlight> for workshops required more thought than I initially expected. At the same time, <AHighlight>handling social media visuals</AHighlight> reminded me that presentation also shapes how people <AHighlight>connect with a brand</AHighlight> and its purpose.
                    </p>
                    <p style={{ margin: 0 }}>
                        What made this experience meaningful was that it felt less like completing an assignment and more like a <AHighlight>realistic simulation</AHighlight> of running a small business. It pushed me to <AHighlight>balance structure with creativity</AHighlight>, while learning how different operational and branding decisions come together to support an overall direction.
                    </p>
                </>
            ),
            images: [
                { src: "ref3a.png", alt: "Recrafted workshop setup", w: "20%" },
                { src: "ref3b.png", alt: "Fabric donation drive", w: "20%" },
                { src: "ref3c.png", alt: "Brand materials", w: "20%" },
                { src: "ref3d.png", alt: "Recrafted workshop in action", w: "20%" },],
        },
        {
            // The flex div ensures it stays perfectly centered, and nowrap keeps it on one line
            title: (
                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                    <span style={{ whiteSpace: "nowrap", fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
                        Boys' Brigade Share-a-Gift (BBSG) – Programme Planning & Execution
                    </span>
                </div>
            ),
            whatIDid: [
                "Co-developed a structured programme timeline to guide participants throughout the donation drive",
                "Coordinated participant allocation across different HDB blocks for smoother distribution flow",
                "Supported on-ground execution and food donation distribution to residents in Ang Mo Kio",
                "Planned contingency walking routes to prepare for potential bad weather conditions"
            ],
            keyTakeaways: [
                "programe execution",
                "contingency planning",
                "teamwork & communication",
                "on-ground execution",
                "adaptability",
            ],
            dateRange: "Mar - Apr 2026",
            reflection: (
                <>
                    <p style={{ marginBottom: "1.5rem" }}>
                        This experience showed me <AHighlight>how much coordination happens behind programmes</AHighlight> that may appear simple on the surface. <AHighlight>Planning the timeline, organising participant movement,</AHighlight> and <AHighlight>preparing contingency routes</AHighlight> required me to think ahead and consider how different parts of the programme would connect in real time.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        During execution, things moved much faster than they seemed during planning. There were moments where <AHighlight>adjustments had to be made quickly,</AHighlight> whether it involved participant coordination, movement flow, or responding to changes on the ground. It made me <AHighlight>more aware of the importance of staying calm and adaptable</AHighlight> while still keeping the overall programme organised.
                    </p>
                    <p style={{ margin: 0 }}>
                        What I appreciated most was seeing how <AHighlight>planning directly affected the experience</AHighlight> for both participants and residents. Being <AHighlight>involved from preparation to actual distribution</AHighlight> allowed me to understand the <AHighlight>importance of structure, teamwork, and clear coordination</AHighlight> in making community initiatives run smoothly.
                    </p>
                </>
            ),
            images: [],
        },
        {
            title: <>SUSS Analytics & Visualisation Challenge 2024 —<br />Data Analytics & Dashboard Design</>,
            whatIDid: [
                "Analysed datasets to identify trends, patterns, and performance insights",
                "Designed and developed an interactive dashboard using Tableau",
                "Structured data visualisations to improve clarity and usability for users",
                "Refined dashboard layout and interactivity to support clearer interpretation of information",
            ],
            keyTakeaways: [
                "Tableau dashboard design",
                "data visualisation",
                "analytical thinking",
                "dashboard interactivity",
                "translating data into insights",
            ],
            dateRange: "Mar - Apr 2026",
            reflection: (
                <>
                    <p style={{ marginBottom: "1.5rem" }}>
                        This experience was one of the first times I worked so closely with data in a <AHighlight>more visual and analytical way.</AHighlight> At the beginning, <AHighlight>Tableau</AHighlight> felt unfamiliar and slightly overwhelming because there were many functions, tools, and ways to structure information. A large part of the process involved <AHighlight>experimenting, troubleshooting,</AHighlight> and understanding how different visualisations could influence the way data is interpreted.
                    </p>
                    <p style={{ marginBottom: "1.5rem" }}>
                        As I developed the dashboard, I realised that <AHighlight>presenting data clearly requires more thought</AHighlight> than simply placing charts onto a screen. Decisions involving <AHighlight>layout, filters, interactivity,</AHighlight> and <AHighlight>visual hierarchy</AHighlight> all affected how easily users could navigate and understand the information. It pushed me to think more carefully about <AHighlight>usability</AHighlight> and how to make insights <AHighlight>feel clearer and more accessible.</AHighlight>
                    </p>
                    <p style={{ margin: 0 }}>
                        What I enjoyed most about this experience was seeing how <AHighlight>raw data could be translated into something more meaningful and structured.</AHighlight> It changed the way I viewed reporting and analytics. They are tools that help businesses understand performance, make decisions, and communicate information more effectively.
                    </p>
                </>
            ),
            images: [
                { src: "ref5a.png", alt: "SUSS dashboard screenshot 1", w: "45%" },
                { src: "ref5b.png", alt: "SUSS dashboard screenshot 2", w: "45%" },
            ],
        },
    ];

    return (
        <div style={{ background: 'url("EducationBG.png")', backgroundSize: "auto", backgroundRepeat: "repeat", backgroundColor: "#EDE0CC", minHeight: "100vh", padding: "5rem 1.5rem 6rem" }}>

            {/* Back button — Perfectly aligned to left edge */}
            <div style={{ width: "100%", marginBottom: "2rem", display: "flex", justifyContent: "flex-start", paddingTop: "20px" }}>
                <button onClick={() => setActivePage("home")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'EB Garamond', serif", fontStyle: "italic", color: p.dark, fontSize: "1.1rem", padding: 0, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    ← Back to portfolio
                </button>
            </div>

            {/* Page title */}
            <h1 style={{ fontFamily: "'Pinyon Script', cursive", fontSize: "clamp(3rem,8vw,6rem)", color: "#5E523A", fontWeight: 350, margin: "0 0 1.75rem", position: "relative", textAlign: "center", zIndex: 3 }}>
                My Reflections
            </h1>

            {/* Lace strip */}
            <img src="lacestrip.png" alt="" aria-hidden="true" style={{ width: "105%", height: "auto", display: "block", marginLeft: "-3%", marginBottom: "1rem", pointerEvents: "none" }} />

            {/* Subtitle */}
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <img src="ReflectionSub.png" alt="Events & Experience Design section title" style={{ maxWidth: 450, width: "100%", height: "auto", marginTop: "0%",marginBottom: "2rem" }} />
            </div>

            {/* Entries Mapping (Using new UI) */}
            <div style={{ maxWidth: 850, margin: "0 auto" }}>
                {entries.map((entry, idx) => (
                    <div key={idx} style={{ marginBottom: "6rem" }}>
                        <SectionTitle title={entry.title} />

                        <TwoColHeader whatIDid={entry.whatIDid} keyTakeaways={entry.keyTakeaways} />

                        <ReflectionBlock dateRange={entry.dateRange} images={entry.images}>
                            {/* Checks if reflection is pure JSX or string, rendering appropriately */}
                            {typeof entry.reflection === "string" ? (
                                entry.reflection.split("\n\n").map((para, i, arr) => (
                                    <p key={i} style={{ marginBottom: i < arr.length - 1 ? "1.5rem" : 0 }}>
                                        {para}
                                    </p>
                                ))
                            ) : (
                                entry.reflection
                            )}
                        </ReflectionBlock>
                     {/* Lace strip */}
                    <img
                        src="lacestrip.png"
                        alt="lace strip decoration"
                        style={{ width: "105vw", height: "auto", display: "block", marginLeft: "50%", transform: "translateX(-50%)", marginTop: "5%" }}
                    />
                    </div>
                    
                ))}
            </div>
            <p style={{ fontFamily: "'Pinyon Script', cursive", fontSize: "clamp(1.2rem,3.7vw,2.7rem)", color: "#5E523A", fontWeight: 350, margin: "0 0 1.75rem", position: "relative", textAlign: "center", zIndex: 3 }}>
                More Reflections Coming Soon...
            </p>
        </div>
    );
}

function JournalPage({ pageId, setActivePage }) {
    const data = journalContent[pageId] || journalContent.experience;
    return (
        <div style={{ background: polkaBg(p.parchment), minHeight: "80vh", padding: "5rem 1.5rem 4rem" }}>

            {/* Back button — Perfectly aligned to left edge */}
            <div style={{ width: "100%", marginBottom: "2rem", display: "flex", justifyContent: "flex-start" }}>
                <button onClick={() => setActivePage("home")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'EB Garamond', serif", fontStyle: "italic", color: p.dark, fontSize: "1.1rem", padding: 0, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    ← Back to portfolio
                </button>
            </div>

            <div style={{ maxWidth: 700, margin: "0 auto" }}>
                <h2 style={{ fontFamily: "'Dancing Script', cursive", fontSize: "clamp(2rem,5vw,3.2rem)", color: p.dark, textAlign: "center", marginBottom: "2rem" }}>{data.title}</h2><ParchmentCard>
                    {data.content.map((txt, i) => <p key={i} style={{ fontFamily: "'EB Garamond', serif", fontSize: "1rem", lineHeight: 1.9, color: p.dark, marginBottom: i < data.content.length - 1 ? "1.2rem" : 0 }}>{txt}</p>)}
                </ParchmentCard>
            </div>
        </div>
    );
}

// ─── CONTACT FORM ─────────────────────────────────────────────────────────────
const WEB3FORMS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";

function Contact() {
    const [form, setForm] = useState({ email: "", firstName: "", lastName: "", message: "" });
    const [status, setStatus] = useState("idle");
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = async () => {
        if (!form.email || !form.firstName || !form.message) { alert("Please fill in Email, First name, and Message."); return; }
        setStatus("sending");
        try {
            const res = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ access_key: WEB3FORMS_KEY, email: form.email, name: `${form.firstName} ${form.lastName}`.trim(), message: form.message, subject: "New message from Darwisya's Portfolio" }) });
            const data = await res.json();
            setStatus(data.success ? "success" : "error");
        } catch { setStatus("error"); }
    };
    const inputStyle = { width: "100%", padding: "0.55rem 0.75rem", borderRadius: 4, border: "1px solid rgba(180,155,135,0.4)", background: "#fff", fontSize: "0.9rem", fontFamily: "'EB Garamond', serif", color: p.dark, outline: "none", boxSizing: "border-box" };

    return (
        <section id="contact" style={{ position: "relative", background: 'url("EducationBG.png")', padding: "4rem 1.5rem 8rem" }}>
            {/* Fixed the lace strip so it stays perfectly on the border line across all screen sizes */}
            <img src="lacestrip.png" alt="" aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "auto", transform: "translateY(-50%)", pointerEvents: "none", zIndex: 10, userSelect: "none" }} />

            <h2 style={{ fontFamily: "'Pinyon Script', cursive", fontSize: "clamp(3rem,6vw,4rem)", color: "#5E523A", fontWeight: 350, textAlign: "center", marginBottom: "3.5rem", textShadow: "1px 1px 0 #B6A5A0, 4px 4px 0 #B6A5A0" }}>
                Contact
            </h2>

            {/* A flexible container that holds both elements securely and wraps them cleanly on mobile */}
            <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", gap: "4rem", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>

                {/* Left Side: Envelope & Info */}
                <div style={{ flex: "1 1 300px", display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
                    <div style={{ position: "relative", width: "260px", height: "300px" }}>
                        <img src="Envelope.png" alt="Envelope" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -45%)", width: "200%", height: "200%", objectFit: "contain", display: "block", zIndex: 1 }} />

                        <div style={{ position: "absolute", top: "45%", left: "50%", transform: "translate(-50%, -50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.2rem", zIndex: 2, width: "100%" }}>
                            <a href="https://www.linkedin.com/in/nurdarwisya" target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem" }}>
                                <img src="LinkedIn.png" alt="LinkedIn" style={{ width: "30px", height: "30px", objectFit: "contain" }} />
                                <span style={{ fontFamily: "Georgia, serif", fontSize: "1.05rem", color: "#5C3D2E", textAlign: "center", whiteSpace: "nowrap" }}>www.linkedin.com/in/nurdarwisya</span>
                            </a>
                            <a href="mailto:ndarwwisya@gmail.com" style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem" }}>
                                <img src="Mail.png" alt="Email" style={{ width: "40px", height: "30px", objectFit: "contain" }} />
                                <span style={{ fontFamily: "Georgia, serif", fontSize: "1.05rem", color: "#5C3D2E", textAlign: "center", whiteSpace: "nowrap" }}>ndarwwisya@gmail.com</span>
                            </a>
                        </div>

                        <div style={{ position: "absolute", top: "110%", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", width: "300px", zIndex: 3 }}>
                            <span style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem", color: "#6B5040", fontStyle: "italic", textAlign: "center", whiteSpace: "nowrap" }}>If something here resonates</span>
                            <span style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem", color: "#6B5040", fontStyle: "italic", textAlign: "center", whiteSpace: "nowrap" }}>with you, feel free to reach</span>
                            <span style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem", color: "#6B5040", fontStyle: "italic", textAlign: "center", whiteSpace: "nowrap" }}>out. I'd be glad to connect! ^^</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Contact Form */}
                <div style={{ flex: "1 1 350px", maxWidth: "420px", background: p.blush, borderRadius: 12, padding: "2.5rem 2rem 2rem", position: "relative", boxShadow: "2px 4px 16px rgba(92,61,46,0.1)", zIndex: 2, marginTop: "1rem" }}>

                    {/* Tape pinned exactly to the top center of the form box */}
                    <div style={{ position: "absolute", top: "-20px", left: "50%", transform: "translateX(-50%)", width: "160px", zIndex: 10 }}>
                        <img src="ContactTape.png" alt="Tape" style={{ width: "100%", height: "auto", display: "block" }} />
                    </div>

                    {status === "success" ? (
                        <div style={{ textAlign: "center", padding: "2rem 0" }}>
                            <p style={{ fontFamily: "'Pinyon Script', cursive", fontSize: "1.5rem", color: "#5C3D2E", marginBottom: "0.5rem" }}>Message sent! ✉️</p>
                            <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "0.9rem", color: p.mauve }}>Thank you for reaching out. I'll get back to you soon!</p>
                            <button onClick={() => { setStatus("idle"); setForm({ email: "", firstName: "", lastName: "", message: "" }); }} style={{ marginTop: "1rem", background: "none", border: `1px solid ${p.mauve}`, borderRadius: 4, padding: "0.4rem 1rem", fontFamily: "'EB Garamond', serif", fontSize: "0.85rem", color: p.mauve, cursor: "pointer" }}>Send another</button>
                        </div>
                    ) : (
                        <>
                            {[{ label: "Email *", name: "email", type: "email" }, { label: "First name *", name: "firstName", type: "text" }, { label: "Last name", name: "lastName", type: "text" }].map((f) => (
                                <div key={f.name} style={{ marginBottom: "1rem" }}>
                                    <label style={{ display: "block", fontFamily: "'EB Garamond', serif", fontSize: "0.88rem", color: p.dark, marginBottom: "0.35rem" }}>{f.label}</label>
                                    <input name={f.name} type={f.type} value={form[f.name]} onChange={handleChange} style={inputStyle} />
                                </div>
                            ))}
                            <div style={{ marginBottom: "1.25rem" }}>
                                <label style={{ display: "block", fontFamily: "'EB Garamond', serif", fontSize: "0.88rem", color: p.dark, marginBottom: "0.35rem" }}>Type down your input! *</label>
                                <textarea name="message" value={form.message} onChange={handleChange} rows={4} style={{ ...inputStyle, resize: "vertical" }} />
                            </div>
                            <button onClick={handleSubmit} disabled={status === "sending"} style={{ width: "100%", padding: "0.65rem", background: "#4A3728", color: "#F5EFE6", border: "none", borderRadius: 6, fontFamily: "'EB Garamond', serif", fontSize: "0.95rem", cursor: status === "sending" ? "not-allowed" : "pointer", opacity: status === "sending" ? 0.7 : 1, transition: "opacity 0.2s" }}>
                                {status === "sending" ? "Sending…" : "Submit"}
                            </button>
                            {status === "error" && <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "0.82rem", color: "#A32D2D", textAlign: "center", marginTop: "0.75rem" }}>Something went wrong. Please try again or email directly.</p>}
                        </>
                    )}
                </div>
            </div>

        </section>

    );
}


// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ activePage, setActivePage }) {
    const scrollToSection = (sectionId) => {
        const el = document.getElementById(sectionId);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: "smooth" });
    };
    const handleClick = (item) => {
        if (item.pageId) { setActivePage(item.pageId); return; }
        if (activePage !== "home") { setActivePage("home"); setTimeout(() => scrollToSection(item.sectionId), 60); }
        else { scrollToSection(item.sectionId); }
    };
    return (
        <footer style={{ background: p.cream, borderTop: `1px solid ${p.warmGray}`, textAlign: "center", padding: "2rem 1rem", fontFamily: "'EB Garamond', serif", color: p.mauve }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center", marginBottom: "0.75rem" }}>
                {FOOTER_ITEMS.map((item) => (
                    <button key={item.label} onClick={() => handleClick(item)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: p.mauve, fontSize: "0.85rem", fontFamily: "'EB Garamond', serif", fontStyle: "italic" }}>
                        {item.label}
                    </button>
                ))}
            </div>
            <div style={{ fontStyle: "italic", fontSize: "0.9rem" }}>⭐️ © 2026 by Nur Darwisya ⭐️</div>
        </footer>
    );
}

// ─── Hash-based page persistence ─────────────────────────────────────────────
const SUB_PAGES = ["experience", "achievements", "reflections"];
function getPageFromHash() {
    const hash = window.location.hash.replace(/^#/, "").toLowerCase().trim();
    return SUB_PAGES.includes(hash) ? hash : "home";
}

// ─── NEW ACHIEVEMENTS PAGE ────────────────────────────────────────────────────
// Helper for the specific reddish highlight requested
// ─── NEW ACHIEVEMENTS PAGE ────────────────────────────────────────────────────
// Helper for the specific reddish highlight requested
const AHighlight = ({ children }) => (
    <span style={{ color: "#A35E5A", fontWeight: 600 }}>{children}</span>
);

function AchievementsPage({ setActivePage }) {
    const containerStyle = {
        maxWidth: 1100,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    };

    const flexLayout = {
        display: "flex",
        flexWrap: "wrap",
        gap: "2.5rem",
        width: "100%",
        marginTop: "3rem",
        justifyContent: "center",
        alignItems: "stretch"
    };

    const leftCol = {
        flex: "1 1 400px",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem"
    };

    const rightCol = {
        flex: "1 1 400px",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem"
    };

    const cardStyle = {
        background: "#edd8d3",
        padding: "2rem",
        color: p.dark,
        fontFamily: "'EB Garamond', serif"
    };

    // ─── STRICT IMAGE STYLES FOR UNIFORMITY (NO CROPPING) ───

    // For the large Key Achievement photos
    const mainImgStyle = {
        width: "78%",
        aspectRatio: "3 / 2", // Forces exact same dimensions
        display: "block",
        objectFit: "contain", // Shows entire image without cropping
    };

    // For standalone Competition photos
    const compImgStyle = {
        width: "220px",
        height: "300px",
        display: "block",
        objectFit: "contain",
        flexShrink: 0
    };

    // For Portrait Certificates (NDP, Edusave, Director's List)
    const certPortraitStyle = {
        width: "100%",
        aspectRatio: "3 / 4", // Standard vertical certificate ratio
        display: "block",
        objectFit: "contain",
    };

    // For Landscape Certificates (LinkedIn Courses)
    const certLandscapeStyle = {
        width: "100%",
        aspectRatio: "4 / 3", // Standard horizontal certificate ratio
        display: "block",
        objectFit: "contain"
    };

    const labelBoxStyle = {
        background: "#edd8d3",
        padding: "0.6rem 1rem",
        textAlign: "center",
        width: "100%",
        marginTop: "0.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    };

    const directorsList = [
        "Director’s List AY24/25 Y1S2",
        "Director’s List AY25/26 Y2S1",
        "Director’s List AY25/26 Y2S2"
    ];

    const edusaveList = [
        "Edusave Scholarship 2020",
        "Edusave Scholarship 2021",
        "Edusave Academic Achievement 2022",
        "Edusave Certificate of Academic Achievement 2025"
    ];

    const certificationsList = [
        "Analysis and Reporting for Supply Chain Management | LinkedIn Learning",
        "Supply Chain Foundations: Sales and Operations Planning | LinkedIn Learning",
        "How to Speak Smarter When Put on the Spot | LinkedIn Learning",
        "Project Management Foundations| LinkedIn Learning",
        "Writing with Flair: How to Become an Exceptional Writer | LinkedIn Learning",
        "Business Analysis: Essential Tools and Techniques | LinkedIn Learning",
        "Learning Gantt Charts | LinkedIn Learning",
        "Using Generative Artifical Intelligence (AI) in Supply Chains | LinkedIn Learning",
        "Business Development: Strategic Planning | LinkedIn Learning"
    ];

    return (
        <div style={{ backgroundImage: 'url("12.png")', backgroundSize: "auto", backgroundRepeat: "repeat", backgroundPosition: "0 0", backgroundColor: p.blush, minHeight: "100vh", padding: "5rem 1.5rem 6rem", position: "relative", overflowX: "hidden" }}>

            {/* Back button — Perfectly aligned to left edge */}
            <div style={{ width: "100%", marginBottom: "2rem", display: "flex", justifyContent: "flex-start", paddingTop: "20px" }}>
                <button onClick={() => setActivePage("home")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'EB Garamond', serif", fontStyle: "italic", color: p.dark, fontSize: "1.1rem", padding: 0, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    ← Back to portfolio
                </button>
            </div>

            <div style={containerStyle}>
                {/* ─── SECTION 1: KEY ACHIEVEMENT ─── */}
                <h1 style={{ fontFamily: "'Pinyon Script', cursive", fontSize: "clamp(3rem,8vw,6rem)", textShadow: "1px 1px 0 #B6A5A0, 4px 4px 0 #B6A5A0", color: "#5E523A", fontWeight: 350, margin: "0 0 1.75rem", position: "relative", textAlign: "center", zIndex: 3 }}>
                    Key Achievements
                </h1>

                <div style={{ background: p.parchment, padding: "0.6rem 2rem", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
                    <span style={{ fontFamily: "'EB Garamond', serif", fontWeight: 700, width: "120%", fontStyle: "italic", fontSize: "1.3rem", color: "#9B8A8B", letterSpacing: "0.02em" }}>
                        1st Runner-Up — Sustainability Youth Festival 2025
                    </span>
                </div>

                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem", // Reduced gap to bring columns together
                    width: "100%",
                    maxWidth: "750px", // Reduced max-width to shrink both images and text boxes proportionally
                    margin: "1.5rem auto 0",
                    justifyContent: "center",
                    alignItems: "stretch"
                }}>
                    {/* Left Column: Stacked Images */}
                    <div style={{
                        flex: "1 1 200px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.8rem",
                        alignItems: "flex-end" // Pushes the images right against the text boxes to close the gap
                    }}>
                        {/* Overriding the 78% width inline to 100% so it perfectly aligns without internal gaps */}
                        <img src="FestivalStagePresentation.png" alt="Festival Stage Presentation" style={{ ...mainImgStyle, width: "100%" }} onError={(e) => { e.target.src = "https://placehold.co/600x400/D4C3B3/FFFFFF?text=Festival+Stage+Photo" }} />
                        <img src="SemiFinalsGroupPhoto.png" alt="Semi-Finals Group" style={{ ...mainImgStyle, width: "100%" }} onError={(e) => { e.target.src = "https://placehold.co/600x400/D4C3B3/FFFFFF?text=Semi-Finals+Group+Photo" }} />
                        <img src="CraftingASustainableFuture.png" alt="Presentation Slide" style={{ ...mainImgStyle, width: "100%" }} onError={(e) => { e.target.src = "https://placehold.co/600x400/D4C3B3/FFFFFF?text=Crafting+A+Sustainable+Future" }} />
                    </div>

                    {/* Right Column: Text Cards */}
                    <div style={{
                        flex: "1 1 260px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.8rem"
                    }}>
                        <div style={{ ...cardStyle, textAlign: "right", padding: "1.2rem" }}>
                            <p style={{ fontStyle: "italic", margin: "0 0 0.25rem 0", fontSize: "0.85rem" }}>Mar - Aug 2025</p>
                            <p style={{ margin: 0, fontStyle: "italic", fontSize: "0.9rem", lineHeight: 1.4 }}>
                                Developed and presented a sustainability-focused concept<br />as part of a team, from research and ideation to final pitch.
                            </p>
                        </div>

                        <div style={{ ...cardStyle, padding: "1.2rem" }}>
                            <h3 style={{ textAlign: "center", margin: "0 0 0.8rem 0", fontSize: "1.05rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                                <span>🔎</span> Scope of Contribution <span>🔎</span>
                            </h3>
                            <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.85rem", lineHeight: 1.4 }}>
                                <li style={{ marginBottom: "0.4rem" }}>Co-developed a <AHighlight>sustainability-focused concept</AHighlight> as part of a team, from ideation to final pitch</li>
                                <li style={{ marginBottom: "0.4rem" }}>Conducted <AHighlight>research</AHighlight> to ensure the idea was relevant, and aligned with <AHighlight>real-world environmental concerns.</AHighlight></li>
                                <li style={{ marginBottom: "0.4rem" }}>Contributed to <AHighlight>refining the concept</AHighlight> through feedback, iteration, and group discussions</li>
                                <li style={{ marginBottom: "0.4rem" }}>Supported the <AHighlight>preparation of presentation materials</AHighlight> and delivery for judging</li>
                                <li><AHighlight>Collaborated closely</AHighlight> with teammates to align ideas, roles, and execution under time constraints</li>
                            </ul>
                        </div>

                        <div style={{ ...cardStyle, padding: "1.2rem" }}>
                            <h3 style={{ textAlign: "center", margin: "0 0 0.8rem 0", fontSize: "1.05rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                                <span>☁️</span> Reflection <span>☁️</span>
                            </h3>
                            <p style={{ fontSize: "0.85rem", lineHeight: 1.5, marginBottom: "0.6rem", marginTop: 0, textAlign: "center" }}>
                                This experience made me realise that a good idea is not enough. It has to be <AHighlight>thought through and refined to work in practice.</AHighlight> I found myself paying closer attention to the details, questioning whether each part of the concept made sense and could hold up beyond presentation.
                            </p>
                            <p style={{ fontSize: "0.85rem", lineHeight: 1.5, margin: 0, textAlign: "center" }}>
                                It also showed how I tend to work in a team setting. I usually <AHighlight>take time to observe and think things through</AHighlight> before contributing in ways that strengthen the overall direction. At the same time, I learned to stay open to feedback and adjust ideas when needed.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ─── SECTION 2: COMPETITION & ACADEMIC ACHIEVEMENTS ─── */}
                <h2 style={{ fontFamily: "'Pinyon Script', cursive", fontSize: "clamp(3rem,6vw,4.8rem)", color: "#5E523A", fontWeight: 350, margin: "6rem 0 2rem 0", textShadow: "1px 1px 0 rgba(255,255,255,0.3)", textAlign: "center", width: "100vw" }}>
                    Competition & Academic Achievements
                </h2>

                <div style={{ background: p.parchment, padding: "0.4rem 2rem", margin: "0 auto 3rem", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", display: "inline-block", borderRadius: "2px" }}>
                    <span style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontSize: "1.2rem", color: "#9B8A8B" }}>
                        Competitions & Participation
                    </span>
                </div>

                {/* Maritime Row */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center", alignItems: "center", marginBottom: "2rem", width: "100%", maxWidth: "900px" }}>
                    <img src="MaritimeCert.png" style={compImgStyle} onError={(e) => { e.target.src = "https://placehold.co/240x330/D4C3B3/FFFFFF?text=Maritime+Cert" }} />
                    <div style={{ flex: "1 1 400px", background: "#edd8d3", padding: "1.5rem 2rem", boxShadow: "2px 4px 12px rgba(0,0,0,0.1)" }}>
                        <p style={{ textAlign: "right", fontStyle: "italic", margin: "0 0 0.5rem 0", color: p.dark }}>Oct - Nov 2025</p>
                        <h4 style={{ margin: "0 0 1rem 0", fontSize: "1.2rem", fontStyle: "italic", fontWeight: 700 }}>Maritime ONE Case Revision 2023 — Participation</h4>
                        <p style={{ margin: 0, lineHeight: 1.6 }}>Explored real-world maritime challenges, working as a team to research and develop potential solutions. This involved understanding the problem constraints, preparing our approach, and refining ideas to ensure they were relevant and practical.</p>
                    </div>
                </div>

                {/* SLSS Row */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center", alignItems: "center", marginBottom: "4rem", width: "100%", maxWidth: "900px" }}>
                    <img src="SUSSCert.png" style={compImgStyle} onError={(e) => { e.target.src = "https://placehold.co/240x330/D4C3B3/FFFFFF?text=SLSS+Cert" }} />
                    <div style={{ flex: "1 1 400px", background: "#edd8d3", padding: "1.5rem 2rem", boxShadow: "2px 4px 12px rgba(0,0,0,0.1)" }}>
                        <p style={{ textAlign: "right", fontStyle: "italic", margin: "0 0 0.5rem 0", color: p.dark }}>Aug - Sep 2024</p>
                        <h4 style={{ margin: "0 0 1rem 0", fontSize: "1.2rem", fontStyle: "italic", fontWeight: 700 }}>SUSS Analytics & Visualization Challenge 2024 — Participation</h4>
                        <p style={{ margin: 0, lineHeight: 1.6 }}>Worked with data to uncover insights and present findings through structured analysis and visualization. Developed a dashboard using Tableau to communicate key patterns visually, focusing on clarity, readability, and relevance for decision-making.</p>
                    </div>
                </div>

                {/* 2-Column Certificates (NDP & Youth Festival) with Firefox Fix Included */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "3rem", justifyContent: "center", width: "100%", marginBottom: "4rem" }}>
                    {/* NDP */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", flex: "1 1 300px", maxWidth: "400px" }}>
                        <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <img src="NDPLetter.png" style={certPortraitStyle} onError={(e) => { e.target.src = "https://placehold.co/180x250/D4C3B3/FFFFFF?text=NDP+Letter" }} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <img src="NDPCert.png" style={certPortraitStyle} onError={(e) => { e.target.src = "https://placehold.co/180x250/D4C3B3/FFFFFF?text=NDP+Cert" }} />
                            </div>
                        </div>
                        <div style={labelBoxStyle}>
                            <p style={{ margin: "0 0 0.2rem 0", fontStyle: "italic", fontSize: "0.9rem" }}>May - Aug 2024</p>
                            <p style={{ margin: 0, fontWeight: 700, fontStyle: "italic", fontSize: "1.1rem" }}>National Day Parade 2024 — Contribution</p>
                        </div>
                    </div>
                    {/* Youth Festival */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", flex: "1 1 300px", maxWidth: "400px" }}>
                        <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <img src="SYFCert1.png" style={certPortraitStyle} onError={(e) => { e.target.src = "https://placehold.co/180x250/D4C3B3/FFFFFF?text=SYF+Cert+1" }} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <img src="SYFCert2.png" style={certPortraitStyle} onError={(e) => { e.target.src = "https://placehold.co/180x250/D4C3B3/FFFFFF?text=SYF+Cert+2" }} />
                            </div>
                        </div>
                        <div style={labelBoxStyle}>
                            <p style={{ margin: "0 0 0.2rem 0", fontStyle: "italic", fontSize: "0.9rem" }}>Mar - Aug 2025</p>
                            <p style={{ margin: 0, fontWeight: 700, fontStyle: "italic", fontSize: "1.1rem" }}>The Sustainability Youth Festival — 1st Runner Up</p>
                        </div>
                    </div>
                </div>

                {/* Director's List Grid */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center", width: "100%", marginBottom: "4rem" }}>
                    {directorsList.map((item, idx) => (
                        <div key={idx} style={{ display: "flex", flexDirection: "column", width: "240px", gap: "0.5rem" }}>
                            <img src={`DirectorsListCert${idx + 1}.png`} style={certPortraitStyle} onError={(e) => { e.target.src = `https://placehold.co/240x330/D4C3B3/FFFFFF?text=Director's+List+Cert+${idx + 1}` }} />
                            <div style={{ ...labelBoxStyle, flexGrow: 1 }}>
                                <p style={{ margin: 0, fontStyle: "italic", fontSize: "1rem" }}>{item}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Edusave Grid */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center", width: "100%", marginBottom: "4rem" }}>
                    {edusaveList.map((item, idx) => (
                        <div key={idx} style={{ display: "flex", flexDirection: "column", width: "220px", gap: "0.5rem" }}>
                            <img src={`EdusaveCert${idx + 1}.png`} style={certPortraitStyle} onError={(e) => { e.target.src = `https://placehold.co/220x300/D4C3B3/FFFFFF?text=Edusave+Cert+${idx + 1}` }} />
                            <div style={{ ...labelBoxStyle, padding: "0.6rem 0.5rem", flexGrow: 1 }}>
                                <p style={{ margin: 0, fontStyle: "italic", fontSize: "0.95rem", lineHeight: 1.3 }}>{item}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div> {/* End Container */}

            {/* Full-width Lace Separator */}
            <div style={{ width: "100vw", marginLeft: "50%", transform: "translateX(-50%)" }}>
                <img src="lacebottom.png" alt="Lace Separator" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>

            {/* ─── SECTION 3: CERTIFICATIONS & CONTINUOUS LEARNING ─── */}
            <div style={containerStyle}>
                <h2 style={{ fontFamily: "'Pinyon Script', cursive", fontSize: "clamp(3rem,6vw,4.8rem)", color: "#5E523A", fontWeight: 350, margin: "2rem 0 3rem 0", width: "100vw", textShadow: "1px 1px 0 rgba(255,255,255,0.3)", textAlign: "center" }}>
                    Certifications & Continuous Learning
                </h2>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center", width: "100%", maxWidth: "1000px" }}>
                    {certificationsList.map((item, idx) => (
                        <div key={idx} style={{ display: "flex", flexDirection: "column", width: "280px", gap: "0.5rem" }}>
                            <img src={`CourseCert${idx + 1}.png`} style={certLandscapeStyle} onError={(e) => { e.target.src = `https://placehold.co/280x200/D4C3B3/FFFFFF?text=Course+Cert+${idx + 1}` }} />
                            <div style={{ ...labelBoxStyle, padding: "0.8rem", flexGrow: 1 }}>
                                <p style={{ margin: 0, fontStyle: "italic", fontSize: "0.95rem", lineHeight: 1.4 }}>{item}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function DarwisyaPortfolio() {
    const [activePage, setActivePage] = useState(getPageFromHash);
    const [activeSection, setActiveSection] = useState("Overview");
    
    // State to track if the user is on a mobile device
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => { loadFonts(); }, []);

    // Mobile detection listener
    useEffect(() => {
        const handleResize = () => {
            // Checks if the screen width is less than 768px (standard mobile size)
            setIsMobile(window.innerWidth < 768); 
        };
        handleResize(); // Check immediately when the site loads
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (activePage === "home") {
            history.replaceState(null, "", window.location.pathname + window.location.search);
        } else {
            history.replaceState(null, "", "#" + activePage);
        }
    }, [activePage]);

    useEffect(() => {
        const onPopState = () => setActivePage(getPageFromHash());
        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
    }, []);

    useEffect(() => {
        if (activePage !== "home") window.scrollTo({ top: 0, behavior: "smooth" });
    }, [activePage]);

    useEffect(() => {
        let tabName = "Darwisya's Portfolio";

        if (activePage === "home") {
            // Use the active scroll section for the home page (e.g., "Overview", "About Me")
            tabName = activeSection ? `${activeSection} | Darwisya's Portfolio` : "Darwisya's Portfolio";
        } else {
            // Capitalize the active page name (e.g., "experience" -> "Experience")
            const pageName = activePage.charAt(0).toUpperCase() + activePage.slice(1);
            tabName = `${pageName} | Darwisya's Portfolio`;
        }

        document.title = tabName;
    }, [activePage, activeSection]);

    useEffect(() => {
        if (activePage !== "home") return;
        const sectionIds = Object.values(NAV_SECTION_MAP);
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible.length > 0) {
                    const id = visible[0].target.id;
                    const label = Object.keys(NAV_SECTION_MAP).find((k) => NAV_SECTION_MAP[k] === id);
                    if (label) setActiveSection(label);
                }
            },
            { rootMargin: "-10% 0px -60% 0px", threshold: 0 }
        );
        sectionIds.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
        return () => observer.disconnect();
    }, [activePage]);

    // ─── MOBILE BLOCKER SCREEN ───
    if (isMobile) {
        return (
            <div style={{ fontFamily: "'EB Garamond', 'Palatino Linotype', Georgia, serif", backgroundColor: p.blush, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center", background: "url('Background.png')", backgroundSize: "cover" }}>
                <h1 style={{ fontFamily: "'Pinyon Script', cursive", fontSize: "clamp(3rem, 12vw, 4rem)", color: "#5E523A", margin: "0 0 1.5rem 0", textShadow: "1px 1px 0 #B6A5A0" }}>
                    Darwisya's Portfolio
                </h1>
                <div style={{ background: "rgba(248, 245, 232, 0.95)", padding: "2.5rem 2rem", borderRadius: "8px", border: "1px solid rgba(200,175,155,0.4)", boxShadow: "0 4px 16px rgba(0,0,0,0.1)", maxWidth: "350px" }}>
                    <p style={{ fontSize: "1.2rem", lineHeight: 1.6, color: p.dark, margin: "0 0 1rem 0" }}>
                        This portfolio is currently best experienced on a desktop or laptop screen.
                    </p>
                    <p style={{ fontSize: "1.1rem", lineHeight: 1.6, color: p.dark, margin: 0, fontStyle: "italic" }}>
                        Please revisit on a larger device to explore my work!
                    </p>
                </div>
            </div>
        );
    }

    // ─── DESKTOP/LAPTOP RENDER ───
    return (
        <div style={{ fontFamily: "'EB Garamond', 'Palatino Linotype', Georgia, serif", backgroundColor: p.blush, color: p.dark, minHeight: "100vh", overflowX: "hidden" }}>
            <Nav activePage={activePage} setActivePage={setActivePage} activeSection={activeSection} setActiveSection={setActiveSection} />
            <div style={{ height: 62 }} />
            <main>
                {activePage === "experience" ? (
                    <ExperiencePage setActivePage={setActivePage} />
                ) : activePage === "achievements" ? (
                    <AchievementsPage setActivePage={setActivePage} />
                ) : activePage === "reflections" ? (
                    <ReflectionsPage setActivePage={setActivePage} />
                ) : activePage !== "home" ? (
                    <JournalPage pageId={activePage} setActivePage={setActivePage} />
                ) : (
                    <>
                        <Hero />
                        <LifeMotto />
                        <AboutMe />
                        <Education />
                        <Skills />
                        <Journals setActivePage={setActivePage} />
                        <Contact />
                    </>
                )}
            </main>
            <Footer activePage={activePage} setActivePage={setActivePage} />
        </div>
    );
}