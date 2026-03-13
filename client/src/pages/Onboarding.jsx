import { useState } from "react";
import { Card, CardBody, Select, SelectItem, Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/user/userSlice";
import { REGULATORY_BODIES } from "../../../api/config/regulatoryBodies.js";
import { fetchWithAuth } from "../utils/fetchWithAuth.js";

const PROFESSIONS = [
  { key: "veterinarian", label: "Veterinarian" },
  { key: "veterinary_nurse", label: "Veterinary Nurse" },
  { key: "student", label: "Student" },
];

const COUNTRIES = [{ key: "AU", label: "Australia" }];

const AU_STATES = [
  { key: "NSW", label: "New South Wales" },
  { key: "WA", label: "Western Australia" },
  { key: "VIC", label: "Victoria" },
  { key: "QLD", label: "Queensland" },
  { key: "SA", label: "South Australia" },
  { key: "TAS", label: "Tasmania" },
  { key: "NT", label: "Northern Territory" },
  { key: "ACT", label: "Australian Capital Territory" },
];

export default function Onboarding() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    profession: "",
    country: "",
    state: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleSelect = (field, value) => {
    const updated = { ...formData, [field]: value };
    if (field === "country") {
      updated.state = ""; // reset state when country changes
    }
    setFormData(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.profession || !formData.country || !formData.state) {
      setError("Please complete all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetchWithAuth("/api/user/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }
      dispatch(updateUser(data));
      navigate("/dashboard");
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const regulatoryBodyName = REGULATORY_BODIES[formData.state]?.name ?? "";

  return (
    <div className="min-h-screen bg-white">
      <div className="h-1 w-full bg-gradient-to-r from-rose-200 via-sky-200 to-violet-200" />
      <div className="flex min-h-[calc(100vh-4px)] items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <img src="/axisvet.svg" alt="AxisVet" className="h-9 w-auto" />
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
              Let's set up your profile
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              This helps us personalise your CPD requirements.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="rounded-3xl border border-slate-200 shadow-sm">
              <CardBody className="gap-5 p-6">
                <Select
                  isRequired
                  label="I am a"
                  variant="bordered"
                  classNames={{ trigger: "rounded-2xl border-slate-200" }}
                  onSelectionChange={(keys) =>
                    handleSelect("profession", Array.from(keys)[0])
                  }
                >
                  {PROFESSIONS.map((p) => (
                    <SelectItem key={p.key}>{p.label}</SelectItem>
                  ))}
                </Select>

                <Select
                  isRequired
                  label="Country"
                  variant="bordered"
                  classNames={{ trigger: "rounded-2xl border-slate-200" }}
                  onSelectionChange={(keys) =>
                    handleSelect("country", Array.from(keys)[0])
                  }
                >
                  {COUNTRIES.map((c) => (
                    <SelectItem key={c.key}>{c.label}</SelectItem>
                  ))}
                </Select>

                <Select
                  isRequired
                  isDisabled={!formData.country}
                  label="State of practice"
                  variant="bordered"
                  classNames={{ trigger: "rounded-2xl border-slate-200" }}
                  onSelectionChange={(keys) =>
                    handleSelect("state", Array.from(keys)[0])
                  }
                >
                  {AU_STATES.map((s) => (
                    <SelectItem key={s.key}>{s.label}</SelectItem>
                  ))}
                </Select>

                {/* Auto-populated — read only */}
                <Select
                  label="Regulatory body"
                  variant="bordered"
                  isDisabled
                  selectedKeys={regulatoryBodyName ? [regulatoryBodyName] : []}
                  classNames={{
                    trigger: "rounded-2xl border-slate-200 opacity-75",
                  }}
                >
                  {regulatoryBodyName ? (
                    <SelectItem key={regulatoryBodyName}>
                      {regulatoryBodyName}
                    </SelectItem>
                  ) : (
                    <SelectItem key="">Select a state first</SelectItem>
                  )}
                </Select>

                {error && (
                  <div className="rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  color="primary"
                  className="h-12 rounded-2xl font-semibold"
                  isLoading={loading}
                  isDisabled={loading}
                >
                  Continue
                </Button>
              </CardBody>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}
