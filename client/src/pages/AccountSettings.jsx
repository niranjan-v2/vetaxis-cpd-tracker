import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Select, SelectItem, Button, Chip, Switch } from "@heroui/react";
import {
  RiUserLine,
  RiStethoscopeLine,
  RiMailLine,
  RiLockLine,
  RiAlertLine,
  RiCheckLine,
  RiShieldCheckLine,
  RiLogoutBoxLine,
  RiDeleteBinLine,
  RiPencilLine,
  RiLoader4Line,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import { updateUser, signOut } from "../redux/user/userSlice";

/* ─── Constants ─── */
const TITLES = ["Dr", "Mr", "Mrs", "Ms", "Prof", "Assoc Prof"];
const PROFESSIONS = [
  { key: "veterinarian", label: "Veterinarian" },
  { key: "veterinary_nurse", label: "Veterinary Nurse" },
  { key: "student", label: "Student" },
];
const AU_STATES = [
  { key: "ACT", label: "Australian Capital Territory" },
  { key: "NSW", label: "New South Wales" },
  { key: "NT", label: "Northern Territory" },
  { key: "QLD", label: "Queensland" },
  { key: "SA", label: "South Australia" },
  { key: "TAS", label: "Tasmania" },
  { key: "VIC", label: "Victoria" },
  { key: "WA", label: "Western Australia" },
];
const TIMEZONES = [
  { key: "Australia/Perth", label: "Perth (AWST)" },
  { key: "Australia/Adelaide", label: "Adelaide (ACST)" },
  { key: "Australia/Brisbane", label: "Brisbane (AEST)" },
  { key: "Australia/Sydney", label: "Sydney (AEST)" },
  { key: "Australia/Melbourne", label: "Melbourne (AEST)" },
  { key: "Australia/Hobart", label: "Hobart (AEST)" },
  { key: "Australia/Darwin", label: "Darwin (ACST)" },
];

const NAV = [
  { id: "profile", label: "Profile", icon: RiUserLine },
  { id: "professional", label: "Professional", icon: RiStethoscopeLine },
  { id: "account", label: "Account", icon: RiMailLine },
  { id: "security", label: "Security", icon: RiLockLine },
  { id: "danger", label: "Danger zone", icon: RiAlertLine },
];

/* ─── Form row with inline save state ─── */
function FormRow({ label, description, status, children }) {
  return (
    <div className="group grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-6 py-5 border-b border-gray-100 items-start hover:bg-gray-50/40 -mx-4 px-4 rounded-xl transition-colors">
      <div className="pt-2">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-[#010143]">{label}</p>
          {status === "saved" && (
            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-[#2e8e61] bg-[#2e8e61]/10 rounded-full px-1.5 py-0.5 animate-[fadeScale_0.3s_ease]">
              <RiCheckLine size={10} /> Saved
            </span>
          )}
          {status === "saving" && (
            <RiLoader4Line size={12} className="text-[#2e8e61] animate-spin" />
          )}
        </div>
        {description && (
          <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{description}</p>
        )}
      </div>
      <div className="max-w-sm">{children}</div>
    </div>
  );
}

export default function AccountSettings() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tab, setTab] = useState("profile");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [fieldStatus, setFieldStatus] = useState({});
  const [fading, setFading] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [cpdReminders, setCpdReminders] = useState(true);

  /* Sidebar sliding indicator */
  const navRefs = useRef({});
  const navContainerRef = useRef(null);
  const [navIndicator, setNavIndicator] = useState({ top: 0, height: 0 });

  const updateNavIndicator = useCallback(() => {
    const el = navRefs.current[tab];
    const container = navContainerRef.current;
    if (el && container) {
      const cRect = container.getBoundingClientRect();
      const eRect = el.getBoundingClientRect();
      setNavIndicator({ top: eRect.top - cRect.top, height: eRect.height });
    }
  }, [tab]);

  useEffect(() => {
    updateNavIndicator();
    window.addEventListener("resize", updateNavIndicator);
    return () => window.removeEventListener("resize", updateNavIndicator);
  }, [updateNavIndicator]);

  /* Form state */
  const [title, setTitle] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [timezone, setTimezone] = useState("");
  const [profession, setProfession] = useState("");
  const [stateProv, setStateProv] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!currentUser) return;
    const p = currentUser.profile ?? {};
    setTitle(p.title ?? "");
    setFullName(p.fullName ?? "");
    setPhone(p.phone ?? "");
    setTimezone(p.timezone ?? "");
    setProfession(p.profession ?? "");
    setStateProv(p.state ?? "");
    setRegNumber(p.registration?.regNumber ?? "");
    setUsername(currentUser.username ?? "");
    setEmail(currentUser.email ?? "");
  }, [currentUser]);

  /* Tab switch with crossfade */
  const switchTab = (id) => {
    if (id === tab) return;
    setFading(true);
    setTimeout(() => {
      setTab(id);
      setFieldStatus({});
      setTimeout(() => setFading(false), 20);
    }, 120);
  };

  /* Toast */
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  /* Save with per-field status */
  const saveAction = async (url, body, msg, fields) => {
    const statusMap = {};
    fields.forEach((f) => (statusMap[f] = "saving"));
    setFieldStatus(statusMap);
    setSaving(true);
    try {
      const res = await fetchWithAuth(url, { method: "PUT", body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      dispatch(updateUser(data));
      const savedMap = {};
      fields.forEach((f) => (savedMap[f] = "saved"));
      setFieldStatus(savedMap);
      showToast(msg);
      setTimeout(() => setFieldStatus({}), 2500);
    } catch (err) {
      setFieldStatus({});
      showToast(err.message || "Something went wrong.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveProfile = () =>
    saveAction("/api/user/update-profile", { title, fullName, phone, timezone }, "Profile updated.", ["title", "fullName", "phone", "timezone"]);
  const handleSaveProfessional = () =>
    saveAction("/api/user/update-professional", { profession, state: stateProv, regNumber }, "Professional details updated.", ["profession", "state", "regNumber"]);
  const handleSaveAccount = () =>
    saveAction("/api/user/update-account", { username, email }, "Account updated.", ["username", "email"]);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) return showToast("Passwords do not match.", "error");
    if (newPassword.length < 8) return showToast("Password must be at least 8 characters.", "error");
    setFieldStatus({ curPwd: "saving", newPwd: "saving", confirmPwd: "saving" });
    setSaving(true);
    try {
      const res = await fetchWithAuth("/api/user/change-password", {
        method: "PUT",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      showToast("Password changed.");
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
      setFieldStatus({ curPwd: "saved", newPwd: "saved", confirmPwd: "saved" });
      setTimeout(() => setFieldStatus({}), 2500);
    } catch (err) {
      setFieldStatus({});
      showToast(err.message || "Failed.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Permanently delete your account, CPD records, and all data?")) return;
    try {
      const res = await fetchWithAuth("/api/user/delete", { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json()).message);
      dispatch(signOut());
      navigate("/");
    } catch (err) {
      showToast(err.message || "Failed.", "error");
    }
  };

  const initials = (fullName || "").split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "?";
  const board = currentUser?.profile?.registration?.board ?? null;
  const verified = currentUser?.profile?.registration?.verified ?? false;
  const isPro = currentUser?.isPro ?? false;

  const activeNav = NAV.find((n) => n.id === tab);
  const ActiveIcon = activeNav?.icon ?? RiUserLine;

  /* Shared input classNames with hover/focus micro-interactions */
  const inputCls = { inputWrapper: "rounded-2xl border-gray-200 hover:border-[#2e8e61]/40 focus-within:!border-[#2e8e61] transition-colors" };
  const selectCls = { trigger: "rounded-2xl border-gray-200 hover:border-[#2e8e61]/40 data-[open=true]:border-[#2e8e61] transition-colors" };

  return (
    <div className="min-h-screen bg-white">
      {/* Keyframe for save badge */}
      <style>{`@keyframes fadeScale{from{opacity:0;transform:scale(0.85)}to{opacity:1;transform:scale(1)}}@keyframes toastSlide{from{opacity:0;transform:translateX(-50%) translateY(8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>

      <div className="max-w-5xl mx-auto flex min-h-screen">
        {/* ═══ LEFT SIDEBAR ═══ */}
        <aside className="w-48 flex-shrink-0 border-r border-gray-100 pt-10 pr-6 hidden sm:block">
          <p className="text-xs font-bold text-[#2e8e61] uppercase tracking-widest mb-4 px-3">
            Settings
          </p>
          <nav ref={navContainerRef} className="relative flex flex-col gap-0.5">
            {/* Sliding left accent bar */}
            <div
              className="absolute left-0 w-[3px] bg-[#2e8e61] rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
              style={{
                top: navIndicator.top,
                height: navIndicator.height,
                opacity: tab === "danger" ? 0 : 1,
              }}
            />

            {NAV.map((item) => {
              const active = tab === item.id;
              const danger = item.id === "danger";
              return (
                <button
                  key={item.id}
                  ref={(el) => (navRefs.current[item.id] = el)}
                  onClick={() => switchTab(item.id)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all text-left ${
                    active
                      ? danger
                        ? "bg-red-50 text-red-600 font-semibold"
                        : "bg-[#2e8e61]/10 text-[#2e8e61] font-semibold"
                      : danger
                        ? "text-gray-400 hover:text-red-500 hover:bg-red-50/50 font-medium"
                        : "text-gray-500 hover:text-[#010143] hover:bg-gray-50 font-medium"
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ═══ MOBILE TAB BAR ═══ */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 px-2 py-1.5 flex justify-around">
          {NAV.map((item) => {
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => switchTab(item.id)}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] font-medium transition-all ${
                  active
                    ? item.id === "danger" ? "text-red-500" : "text-[#2e8e61]"
                    : "text-gray-400"
                }`}
              >
                <item.icon size={18} />
                {item.label.split(" ")[0]}
              </button>
            );
          })}
        </div>

        {/* ═══ MAIN CONTENT ═══ */}
        <main className={`flex-1 pt-10 pb-24 sm:pb-10 px-6 sm:pl-10 sm:pr-4 max-w-2xl transition-opacity duration-120 ${fading ? "opacity-0" : "opacity-100"}`}>
          {/* Section header */}
          <div className="mb-8">
            <div className="w-12 h-12 rounded-2xl border border-gray-200 flex items-center justify-center text-gray-400 mb-4">
              <ActiveIcon size={22} />
            </div>
            <h1 className="text-2xl font-bold text-[#010143] tracking-tight">
              {activeNav?.label}
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {tab === "profile" && "Manage your personal information and display preferences."}
              {tab === "professional" && "Your profession, registration, and regulatory board."}
              {tab === "account" && "Your login credentials and account identifiers."}
              {tab === "security" && "Update your password to keep your account secure."}
              {tab === "danger" && "Irreversible actions that affect your account."}
            </p>
          </div>

          {/* ──── PROFILE ──── */}
          {tab === "profile" && (
            <>
              <p className="text-xs font-bold text-[#2e8e61] uppercase tracking-widest mb-1">
                Personal info
              </p>

              <FormRow label="Avatar">
                <div className="flex items-center gap-4">
                  <div className="group/avatar relative cursor-pointer">
                    <div className="w-14 h-14 rounded-2xl bg-[#2e8e61] text-white flex items-center justify-center text-lg font-bold ring-2 ring-transparent group-hover/avatar:ring-[#2e8e61]/20 transition-all">
                      {initials}
                    </div>
                    <span className="absolute inset-0 rounded-2xl bg-black/0 group-hover/avatar:bg-black/20 flex items-center justify-center transition-all">
                      <RiPencilLine size={14} className="text-white opacity-0 group-hover/avatar:opacity-100 transition-opacity" />
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {isPro && (
                      <Chip size="sm" classNames={{ base: "bg-amber-50 border border-amber-200 h-5", content: "text-amber-600 font-bold text-[10px] px-1" }}>
                        PRO
                      </Chip>
                    )}
                    {verified && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-[#2e8e61] border border-emerald-200">
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              </FormRow>

              <FormRow label="Title" status={fieldStatus.title}>
                <Select variant="bordered" placeholder="Select" classNames={selectCls} selectedKeys={title ? [title] : []} onSelectionChange={(k) => setTitle(Array.from(k)[0])}>
                  {TITLES.map((t) => (<SelectItem key={t}>{t}</SelectItem>))}
                </Select>
              </FormRow>

              <FormRow label="Full name" status={fieldStatus.fullName}>
                <Input variant="bordered" placeholder="Your full name" value={fullName} onValueChange={setFullName} classNames={inputCls} />
              </FormRow>

              <FormRow label="Phone" status={fieldStatus.phone}>
                <Input variant="bordered" placeholder="+61 4XX XXX XXX" value={phone} onValueChange={setPhone} classNames={inputCls} />
              </FormRow>

              <FormRow label="Timezone" status={fieldStatus.timezone}>
                <Select variant="bordered" placeholder="Select timezone" classNames={selectCls} selectedKeys={timezone ? [timezone] : []} onSelectionChange={(k) => setTimezone(Array.from(k)[0])}>
                  {TIMEZONES.map((tz) => (<SelectItem key={tz.key}>{tz.label}</SelectItem>))}
                </Select>
              </FormRow>

              <div className="flex gap-3 pt-6">
                <Button radius="full" isLoading={saving} className="bg-[#2e8e61] text-white font-semibold text-sm hover:bg-[#267a53] active:scale-[0.97] transition-all" onPress={handleSaveProfile}>
                  Save changes
                </Button>
                <Button radius="full" className="bg-gray-100 text-[#010143] font-medium text-sm hover:bg-gray-200 active:scale-[0.97] transition-all" onPress={() => navigate("/dashboard")}>
                  Cancel
                </Button>
              </div>
            </>
          )}

          {/* ──── PROFESSIONAL ──── */}
          {tab === "professional" && (
            <>
              <p className="text-xs font-bold text-[#2e8e61] uppercase tracking-widest mb-1">
                Registration
              </p>

              <FormRow label="Profession" status={fieldStatus.profession}>
                <Select variant="bordered" placeholder="Select profession" classNames={selectCls} selectedKeys={profession ? [profession] : []} onSelectionChange={(k) => setProfession(Array.from(k)[0])}>
                  {PROFESSIONS.map((p) => (<SelectItem key={p.key}>{p.label}</SelectItem>))}
                </Select>
              </FormRow>

              <FormRow label="State / Territory" status={fieldStatus.state}>
                <Select variant="bordered" placeholder="Select state" classNames={selectCls} selectedKeys={stateProv ? [stateProv] : []} onSelectionChange={(k) => setStateProv(Array.from(k)[0])}>
                  {AU_STATES.map((s) => (<SelectItem key={s.key}>{s.label}</SelectItem>))}
                </Select>
              </FormRow>

              <FormRow label="Registration number" description="Your board registration ID." status={fieldStatus.regNumber}>
                <Input variant="bordered" placeholder="e.g. VET-12345" value={regNumber} onValueChange={setRegNumber} classNames={inputCls} />
              </FormRow>

              {board && (
                <div className="flex items-start gap-3 border-l-3 border-[#2e8e61] bg-emerald-50/50 rounded-r-2xl px-4 py-3 mt-4">
                  <RiShieldCheckLine size={16} className="text-[#2e8e61] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Registered with <span className="text-[#010143] font-semibold">{board}</span>.{" "}
                    {verified ? "Your registration is verified." : "Verification pending — we'll notify you once confirmed."}
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-6">
                <Button radius="full" isLoading={saving} className="bg-[#2e8e61] text-white font-semibold text-sm hover:bg-[#267a53] active:scale-[0.97] transition-all" onPress={handleSaveProfessional}>
                  Save changes
                </Button>
                <Button radius="full" className="bg-gray-100 text-[#010143] font-medium text-sm hover:bg-gray-200 active:scale-[0.97] transition-all" onPress={() => navigate("/dashboard")}>
                  Cancel
                </Button>
              </div>
            </>
          )}

          {/* ──── ACCOUNT ──── */}
          {tab === "account" && (
            <>
              <p className="text-xs font-bold text-[#2e8e61] uppercase tracking-widest mb-1">
                Credentials
              </p>

              <FormRow label="Username" status={fieldStatus.username}>
                <Input variant="bordered" placeholder="Username" value={username} onValueChange={setUsername} classNames={inputCls} />
              </FormRow>

              <FormRow label="Email address" description="Used for sign-in and notifications." status={fieldStatus.email}>
                <Input variant="bordered" type="email" placeholder="you@example.com" value={email} onValueChange={setEmail} classNames={inputCls} />
              </FormRow>

              <div className="flex items-start gap-3 border-l-3 border-blue-400 bg-blue-50/50 rounded-r-2xl px-4 py-3 mt-2">
                <RiMailLine size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500 leading-relaxed">
                  Changing your email requires re-verification. A confirmation link will be sent to the new address.
                </p>
              </div>

              <p className="text-xs font-bold text-[#2e8e61] uppercase tracking-widest mt-8 mb-1">
                Notifications
              </p>

              <div className="group grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-6 py-5 border-b border-gray-100 items-center hover:bg-gray-50/40 -mx-4 px-4 rounded-xl transition-colors">
                <div>
                  <p className="text-sm font-medium text-[#010143]">Email notifications</p>
                  <p className="text-xs text-gray-400 mt-0.5">Course updates and CPD news</p>
                </div>
                <div>
                  <Switch
                    isSelected={emailNotifs}
                    onValueChange={setEmailNotifs}
                    size="sm"
                    classNames={{ wrapper: emailNotifs ? "bg-[#2e8e61]" : "bg-gray-300" }}
                  />
                </div>
              </div>

              <div className="group grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-6 py-5 border-b border-gray-100 items-center hover:bg-gray-50/40 -mx-4 px-4 rounded-xl transition-colors">
                <div>
                  <p className="text-sm font-medium text-[#010143]">CPD reminders</p>
                  <p className="text-xs text-gray-400 mt-0.5">Deadline and progress alerts</p>
                </div>
                <div>
                  <Switch
                    isSelected={cpdReminders}
                    onValueChange={setCpdReminders}
                    size="sm"
                    classNames={{ wrapper: cpdReminders ? "bg-[#2e8e61]" : "bg-gray-300" }}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-6">
                <Button radius="full" isLoading={saving} className="bg-[#2e8e61] text-white font-semibold text-sm hover:bg-[#267a53] active:scale-[0.97] transition-all" onPress={handleSaveAccount}>
                  Save changes
                </Button>
                <Button radius="full" className="bg-gray-100 text-[#010143] font-medium text-sm hover:bg-gray-200 active:scale-[0.97] transition-all" onPress={() => navigate("/dashboard")}>
                  Cancel
                </Button>
              </div>
            </>
          )}

          {/* ──── SECURITY ──── */}
          {tab === "security" && (
            <>
              <p className="text-xs font-bold text-[#2e8e61] uppercase tracking-widest mb-1">
                Password
              </p>

              <FormRow label="Current password" status={fieldStatus.curPwd}>
                <Input variant="bordered" type="password" placeholder="Enter current password" value={currentPassword} onValueChange={setCurrentPassword} classNames={inputCls} />
              </FormRow>

              <FormRow label="New password" description="At least 8 characters." status={fieldStatus.newPwd}>
                <Input variant="bordered" type="password" placeholder="Enter new password" value={newPassword} onValueChange={setNewPassword} classNames={inputCls} />
              </FormRow>

              <FormRow label="Confirm password" status={fieldStatus.confirmPwd}>
                <Input variant="bordered" type="password" placeholder="Re-enter new password" value={confirmPassword} onValueChange={setConfirmPassword} classNames={inputCls} />
              </FormRow>

              <div className="flex gap-3 pt-6">
                <Button radius="full" isLoading={saving} isDisabled={!currentPassword || !newPassword || !confirmPassword} className="bg-[#2e8e61] text-white font-semibold text-sm hover:bg-[#267a53] active:scale-[0.97] transition-all" onPress={handleChangePassword}>
                  Update password
                </Button>
                <Button radius="full" className="bg-gray-100 text-[#010143] font-medium text-sm hover:bg-gray-200 active:scale-[0.97] transition-all" onPress={() => { setCurrentPassword(""); setNewPassword(""); setConfirmPassword(""); }}>
                  Clear
                </Button>
              </div>
            </>
          )}

          {/* ──── DANGER ZONE ──── */}
          {tab === "danger" && (
            <>
              <FormRow label="Sign out everywhere" description="Invalidate all active sessions across every device.">
                <Button radius="full" size="sm" className="bg-white text-red-600 border border-red-200 font-semibold text-xs hover:bg-red-50 hover:border-red-300 active:scale-[0.97] transition-all" startContent={<RiLogoutBoxLine size={13} />}>
                  Sign out all
                </Button>
              </FormRow>

              <FormRow label="Delete account" description="Permanently remove your account, CPD records, and all data. This cannot be undone.">
                <Button radius="full" size="sm" className="bg-white text-red-600 border border-red-200 font-semibold text-xs hover:bg-red-50 hover:border-red-300 active:scale-[0.97] transition-all" startContent={<RiDeleteBinLine size={13} />} onPress={handleDeleteAccount}>
                  Delete account
                </Button>
              </FormRow>
            </>
          )}
        </main>
      </div>

      {/* ═══ TOAST ═══ */}
      {toast && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold z-[200] shadow-lg animate-[toastSlide_0.3s_ease] ${
            toast.type === "success" ? "bg-[#2e8e61] text-white" : "bg-red-600 text-white"
          }`}
        >
          {toast.type === "success" ? <RiCheckLine size={15} /> : <RiAlertLine size={15} />}
          {toast.message}
        </div>
      )}
    </div>
  );
}