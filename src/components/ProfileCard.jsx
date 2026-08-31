import { Github, Linkedin, MapPin, ShieldCheck } from "lucide-react";
import { useLanguage } from "../context/LanguageProvider";

export default function ProfileCard() {
  const { t } = useLanguage();

  return (
    <div className="profile-card">
      <div className="profile-orb profile-orb-blue" />
      <div className="profile-orb profile-orb-green" />
      <div className="profile-card-inner">
        <div className="profile-card-top">
          <div className="profile-label"><ShieldCheck size={15} /><span>{t("profile.label")}</span></div>
          <div className="profile-status"><span /> {t("profile.available")}</div>
        </div>
        <div className="profile-photo-wrap">
          <div className="profile-photo-ring">
            <img src="/images/profile.jpg" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "/images/profile.jpg"; }} alt={t("profile.alt")} className="profile-photo" />
          </div>
        </div>
        <div className="profile-info">
          <h2>Ye Thiha</h2>
          <p>{t("hero.teacher")} <b>•</b> {t("hero.developer")} <b>•</b> {t("hero.securityLearner")}</p>
          <span className="profile-location"><MapPin size={13} /> {t("profile.location")}</span>
        </div>
        <div className="profile-focus-list">
          <div className="profile-focus blue"><span className="profile-focus-icon">&lt;/&gt;</span><div><strong>{t("profile.web")}</strong><small>{t("profile.webText")}</small></div></div>
          <div className="profile-focus green"><span className="profile-focus-icon">⌘</span><div><strong>{t("profile.cyber")}</strong><small>{t("profile.cyberText")}</small></div></div>
          <div className="profile-focus purple"><span className="profile-focus-icon">✦</span><div><strong>{t("profile.education")}</strong><small>{t("profile.educationText")}</small></div></div>
        </div>
        <div className="profile-socials">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer"><Github size={17} /> GitHub</a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><Linkedin size={17} /> LinkedIn</a>
        </div>
      </div>
    </div>
  );
}
