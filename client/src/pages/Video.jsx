import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Chip } from "@heroui/react";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import { updateUser } from "../redux/user/userSlice";
import { HiCheckCircle } from "react-icons/hi2";
import { PiPlayCircle, PiCheckCircle } from "react-icons/pi";
import { CpdShield } from "../components/CpdBadge";

// ── YouTube IFrame API loader ──────────────────────────────────────────
let ytApiLoaded   = false;
let ytApiLoading  = false;
const ytCallbacks = [];

function loadYouTubeApi() {
  return new Promise((resolve) => {
    if (ytApiLoaded) return resolve();
    ytCallbacks.push(resolve);
    if (!ytApiLoading) {
      ytApiLoading = true;
      const tag    = document.createElement("script");
      tag.src      = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = () => {
        ytApiLoaded = true;
        ytCallbacks.forEach((cb) => cb());
        ytCallbacks.length = 0;
      };
    }
  });
}

// ── VideoCard ────────────────────────────────────────────────────────
function VideoCard({ video, onWatch }) {
  const playerRef    = useRef(null);
  const containerRef = useRef(null);
  const [expanded, setExpanded]   = useState(false);
  const [marking, setMarking]     = useState(false);
  const [localWatched, setLocalWatched] = useState(video.watched);
  const [awardedPts, setAwardedPts]     = useState(null);

  const initPlayer = useCallback(async () => {
    await loadYouTubeApi();
    if (playerRef.current) return; // already initialised
    playerRef.current = new window.YT.Player(containerRef.current, {
      videoId:    video.youtubeId,
      playerVars: { modestbranding: 1, rel: 0 },
      height:     "100%",
      width:      "100%",
    });
  }, [video.youtubeId]);

  const handleExpand = () => {
    if (!expanded) initPlayer();
    setExpanded((e) => !e);
  };

  const handleMarkWatched = async () => {
    if (localWatched || marking) return;
    setMarking(true);
    try {
      const res  = await fetchWithAuth(`/api/videos/${video._id}/watched`, { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setLocalWatched(true);
        setAwardedPts(data.cpdAwarded);
        onWatch(data);
      }
    } finally {
      setMarking(false);
    }
  };

  return (
    <div className={`bg-white rounded-2xl border overflow-hidden transition-all duration-200 ${
      localWatched ? "border-green-200" : "border-slate-200"
    }`}>

      {/* Thumbnail / Player */}
      <div className="relative aspect-video bg-slate-100 cursor-pointer" onClick={handleExpand}>
        {!expanded && (
          <>
            <img
              src={video.thumbnailUrl || `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
              <PiPlayCircle className="text-white text-6xl drop-shadow-lg" />
            </div>
            {localWatched && (
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                <HiCheckCircle className="text-sm" />
                Watched
              </div>
            )}
          </>
        )}
        <div
          ref={containerRef}
          className={expanded ? "w-full h-full" : "hidden"}
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {video.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-500 px-2.5 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-sm font-semibold text-[#010143] leading-snug mb-1">
          {video.title}
        </p>

        {video.description && (
          <p className="text-xs text-gray-400 leading-relaxed mb-3 line-clamp-2">
            {video.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <CpdShield size="sm" />
            <span className="font-medium text-[#010143]">{video.cpdPoints} pts</span>
            <span>· {video.duration} min</span>
          </div>

          {localWatched ? (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-green-600">
              <HiCheckCircle className="text-base" />
              {awardedPts !== null && awardedPts > 0
                ? `+${awardedPts} pts earned`
                : "Already earned"}
            </div>
          ) : (
            <Button
              size="sm"
              radius="full"
              className="bg-[#010143] text-white font-semibold text-xs h-8"
              isLoading={marking}
              startContent={!marking && <PiCheckCircle className="text-sm" />}
              onPress={handleMarkWatched}
            >
              Mark as watched
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Videos page ──────────────────────────────────────────────────────
export default function Videos() {
  const dispatch               = useDispatch();
  const { currentUser }        = useSelector((state) => state.user);
  const [videos, setVideos]    = useState([]);
  const [tags, setTags]        = useState([]);
  const [activeTag, setActiveTag] = useState(null);
  const [loading, setLoading]  = useState(true);
  const [error, setError]      = useState(null);

  const profession = currentUser?.profile?.profession ?? "veterinarian";

  const fetchVideos = async (tag = null) => {
    setLoading(true);
    setError(null);
    try {
      const url = tag ? `/api/videos?tag=${encodeURIComponent(tag)}` : "/api/videos";
      const res = await fetchWithAuth(url);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setVideos(data);
    } catch (err) {
      setError("Failed to load videos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const res  = await fetchWithAuth("/api/videos/tags");
      const data = await res.json();
      if (res.ok) setTags(data);
    } catch {}
  };

  useEffect(() => {
    fetchTags();
    fetchVideos();
  }, []);

  const handleTagFilter = (tag) => {
    const next = activeTag === tag ? null : tag;
    setActiveTag(next);
    fetchVideos(next);
  };

  const handleWatch = (data) => {
    if (data.updatedUser) {
      dispatch(updateUser(data.updatedUser));
    }
    // Update watched state in local video list
    if (!data.alreadyWatched) {
      setVideos((prev) =>
        prev.map((v) =>
          v._id === data.videoId ? { ...v, watched: true } : v,
        ),
      );
    }
  };

  const watchedCount    = videos.filter((v) => v.watched).length;
  const totalCpdEarned  = videos
    .filter((v) => v.watched)
    .reduce((sum, v) => sum + v.cpdPoints, 0)
    .toFixed(2);

  return (
    <div className="min-h-screen bg-[#f5f4f1] px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-[#2e8e61] uppercase tracking-widest mb-2">
            CPD Learning
          </p>
          <h1 className="text-3xl font-bold text-[#010143] mb-1">
            Video Library
          </h1>
          <p className="text-sm text-gray-400">
            Curated for{" "}
            {profession === "veterinary_nurse"
              ? "veterinary nurses"
              : profession === "student"
              ? "students"
              : "veterinarians"}
            . Watch and mark as complete to earn CPD points.
          </p>
        </div>

        {/* Stats row */}
        {videos.length > 0 && (
          <div className="flex gap-4 mb-6">
            <div className="bg-white rounded-2xl border border-slate-200 px-5 py-3 flex items-center gap-3">
              <HiCheckCircle className="text-green-500 text-xl" />
              <div>
                <p className="text-xs text-gray-400">Videos watched</p>
                <p className="text-base font-bold text-[#010143]">
                  {watchedCount} / {videos.length}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 px-5 py-3 flex items-center gap-3">
              <CpdShield size="sm" />
              <div>
                <p className="text-xs text-gray-400">CPD earned from videos</p>
                <p className="text-base font-bold text-[#010143]">
                  {totalCpdEarned} pts
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tag filters */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => handleTagFilter(null)}
              className={`text-xs font-semibold px-4 py-2 rounded-full border transition-colors ${
                activeTag === null
                  ? "bg-[#010143] text-white border-[#010143]"
                  : "bg-white text-gray-600 border-slate-200 hover:border-slate-300"
              }`}
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagFilter(tag)}
                className={`text-xs font-semibold px-4 py-2 rounded-full border transition-colors ${
                  activeTag === tag
                    ? "bg-[#010143] text-white border-[#010143]"
                    : "bg-white text-gray-600 border-slate-200 hover:border-slate-300"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* States */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
                <div className="aspect-video bg-slate-100" />
                <div className="p-4 flex flex-col gap-2">
                  <div className="h-3 bg-slate-100 rounded w-1/3" />
                  <div className="h-4 bg-slate-100 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-2xl bg-red-50 border border-red-200 px-5 py-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && videos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-sm">
              No videos found{activeTag ? ` for tag "${activeTag}"` : ""}.
            </p>
          </div>
        )}

        {!loading && !error && videos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.map((video) => (
              <VideoCard
                key={video._id}
                video={video}
                onWatch={handleWatch}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}