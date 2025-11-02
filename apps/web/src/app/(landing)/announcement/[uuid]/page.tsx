"use client";

import { use } from "react";
import React, { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { supabase } from "../../../../lib/supabase";
import { NEXT_PUBLIC_CDN_BASE } from "../../../../lib/env";

interface AnnouncementDetail {
  id: string;
  title: string;
  description: string;
  created_at: string;
  thumbnail_url?: string;
}

interface AttachmentFile {
  id: string;
  name: string;
  size: string;
  url: string;
}

// ── 유틸
function formatDotDate(input: string) {
  const d = new Date(input);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

// ── 아이콘
function CalendarIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="15" rx="2" />
      <path d="M3 10h18M7 3v4M17 3v4" strokeLinecap="round" />
    </svg>
  );
}

function DownloadIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FileIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ZipIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface AnnouncementDetailContentProps {
  uuid: string;
}

function AnnouncementDetailContent({ uuid }: AnnouncementDetailContentProps) {
  const getAnnouncementDetail = async () => {
    try {
      const { data, error } = await supabase
        .from("announcement")
        .select("*")
        .eq("id", uuid)
        .single();

      if (error) {
        console.error("Supabase 에러:", error);
        throw error;
      }

      return data as AnnouncementDetail;
    } catch (err) {
      console.error("getAnnouncementDetail 에러:", err);
      throw err;
    }
  };

  const {
    data: announcement,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["announcementDetail", uuid],
    queryFn: () => getAnnouncementDetail(),
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });

  // 목업 파일 데이터 (실제 구현시 Supabase에서 가져옴)
  const mockFiles: AttachmentFile[] = [
    {
      id: "1",
      name: "AI 솔루션 상세 자료 AI 솔루션 상세 자료.pdf",
      size: "2.4MB",
      url: "#",
    },
    {
      id: "2",
      name: "제품 이미지.zip",
      size: "5.1MB",
      url: "#",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-xl font-medium text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-xl font-medium text-red-600">
          Error: {error.message}
        </div>
      </div>
    );
  }

  if (!announcement) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-xl font-medium text-gray-600">
          게시글을 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-16">
        {/* 헤더 - 날짜와 제목 */}
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 text-purple-600 mb-6">
            <CalendarIcon className="w-5 h-5" />
            <time
              dateTime={announcement.created_at}
              className="text-base md:text-lg font-medium"
            >
              {formatDotDate(announcement.created_at)}
            </time>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            {announcement.title}
          </h1>
        </header>

        {/* 썸네일 이미지 */}
        {announcement.thumbnail_url && (
          <div className="w-full rounded-2xl overflow-hidden mb-12">
            <img
              src={announcement.thumbnail_url}
              alt={announcement.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* 본문 */}
        <article className="prose prose-lg max-w-none mb-12">
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base md:text-lg">
            {announcement.description}
          </div>
        </article>

        {/* Article Link 섹션 */}
        <section className="mb-16">
          <div className="text-base md:text-lg text-gray-900">
            <span className="font-bold">Article Link: </span>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              링크1 (하이퍼링크)
            </a>
          </div>
          <div className="text-base md:text-lg text-gray-900 mt-2 ml-[118px]">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              링크2 (하이퍼링크)
            </a>
          </div>
        </section>

        {/* 첨부 자료 섹션 (목업) */}
        {mockFiles.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              첨부 자료
            </h2>
            <div className="space-y-3">
              {mockFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-5 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {file.name.endsWith(".pdf") ? (
                      <FileIcon className="w-6 h-6 text-red-500 flex-shrink-0" />
                    ) : (
                      <ZipIcon className="w-6 h-6 text-blue-500 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 font-medium truncate">
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-500">{file.size}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-purple-600 font-medium transition-colors flex-shrink-0"
                  >
                    <DownloadIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 목록 보기 버튼 */}
        <div className="flex justify-center">
          <Link
            href="/announcement"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 5L7.5 10L12.5 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            목록 보기
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function NoticeDetailPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const resolvedParams = use(params);

  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="text-xl font-medium text-gray-600">Loading...</div>
        </div>
      }
    >
      <AnnouncementDetailContent uuid={resolvedParams.uuid} />
    </Suspense>
  );
}
