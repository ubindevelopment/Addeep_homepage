"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Modal } from "../../../components/modal";
import { supabase } from "../../../../../lib/supabase";
import type { Event, PersonDetail } from "../../../store/interface/event";
import { deleteEvent } from "../actions";

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as unknown as number;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getEventDetailData = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Supabase 에러:", error);
        throw error;
      }
      return data;
    } catch (err) {
      console.error(`getEventDetailData 에러:`, err);
      throw err;
    }
  };

  const deleteEventDetailData = async (id: number) => {
    try {
      const result = await deleteEvent(id);
      return result.data;
    } catch (err) {
      console.error(`deleteEventDetailData 에러:`, err);
      throw err;
    }
  };

  const {
    data: eventDetail,
    isLoading,
    error,
  } = useQuery<Event>({
    queryKey: ["eventDetail", id],
    queryFn: () => getEventDetailData(),
    retry: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });

  const { mutate: deleteEventDetailDataMutation } = useMutation({
    mutationFn: (id: number) => deleteEventDetailData(id),
    onSuccess: () => {
      alert("삭제가 정상적으로 완료 되었습니다.");
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("deleteEventDetailData 에러:", error);
    },
  });

  console.log(eventDetail);

  function handleEdit(id: number): void {
    router.push(`/dashboard/events/edit/${id}`);
  }

  function handleDelete(id: number): void {
    console.log("삭제:", id);
    setIsModalOpen(true);
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-dark-50 via-primary-50/30 to-dark-50">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl mb-4 shadow-medium animate-pulse">
            <svg
              className="w-8 h-8 text-white animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <p className="text-dark-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-dark-50 via-primary-50/30 to-dark-50">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-lg font-semibold text-dark-900 mb-2">
            오류가 발생했습니다
          </p>
          <p className="text-dark-600">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!eventDetail) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-dark-50 via-primary-50/30 to-dark-50">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-dark-100 rounded-2xl mb-4">
            <svg
              className="w-8 h-8 text-dark-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-lg font-semibold text-dark-900">
            데이터를 찾을 수 없습니다
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return dateString ? dateString.split("T")[0] : "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-50 via-primary-50/30 to-dark-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto animate-fade-in">
        {/* Header Section */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-4 py-2 text-dark-600 hover:text-dark-900 font-medium transition-colors mb-4"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            뒤로 가기
          </button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white rounded-2xl p-6 shadow-medium border border-dark-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm font-semibold mb-3">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                이벤트
              </div>
              <h1 className="text-3xl font-bold text-dark-900 mb-2">
                {eventDetail.title}
              </h1>
              <p className="text-dark-600 text-sm">
                작성일: {formatDate(eventDetail.created_at)} • 수정일:{" "}
                {formatDate(eventDetail.updated_at)}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(eventDetail.id)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-all duration-200 shadow-soft"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                수정
              </button>
              <button
                onClick={() => handleDelete(eventDetail.id)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-all duration-200 shadow-soft"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                삭제
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          {/* Basic Info Card */}
          <div className="bg-white rounded-2xl shadow-medium border border-dark-100 overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-dark-50 to-white border-b border-dark-100">
              <h2 className="text-lg font-bold text-dark-900">기본 정보</h2>
            </div>
            <div className="divide-y divide-dark-100">
              <div className="px-8 py-6 hover:bg-dark-50/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-32">
                    <span className="text-sm font-semibold text-dark-700">
                      제목
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-dark-900 font-medium">
                      {eventDetail.title}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-8 py-6 hover:bg-dark-50/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-32">
                    <span className="text-sm font-semibold text-dark-700">
                      내용
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-dark-600 whitespace-pre-wrap">
                      {eventDetail.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-8 py-6 hover:bg-dark-50/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-32">
                    <span className="text-sm font-semibold text-dark-700">
                      작성 날짜
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 text-dark-600">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {formatDate(eventDetail.created_at)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-8 py-6 hover:bg-dark-50/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-32">
                    <span className="text-sm font-semibold text-dark-700">
                      수정 날짜
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 text-dark-600">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {formatDate(eventDetail.updated_at)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Banner Description Card */}
          {eventDetail.banner_description &&
            eventDetail.banner_description.length > 0 && (
              <div className="bg-white rounded-2xl shadow-medium border border-dark-100 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-primary-50 to-white border-b border-dark-100">
                  <h2 className="text-lg font-bold text-dark-900 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      />
                    </svg>
                    배너 설명
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {eventDetail.banner_description.map(
                      (item: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-4 bg-primary-50/50 rounded-xl border border-primary-100"
                        >
                          <div className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </div>
                          <p className="flex-1 text-dark-700">{item}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

          {/* Person Details Card */}
          {eventDetail.Person?.data && eventDetail.Person.data.length > 0 && (
            <div className="bg-white rounded-2xl shadow-medium border border-dark-100 overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-secondary-50 to-white border-b border-dark-100">
                <h2 className="text-lg font-bold text-dark-900 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-secondary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  주요 참석자 정보
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {eventDetail.Person.data.map(
                    (person: PersonDetail, index: number) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-secondary-50 to-white rounded-xl border border-secondary-200 p-6 card-hover"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                            {person.en_name
                              ? person.en_name.charAt(0)
                              : index + 1}
                          </div>
                          <div className="flex-1">
                            {person.en_name && (
                              <h3 className="text-lg font-bold text-dark-900 mb-1">
                                {person.en_name}
                              </h3>
                            )}
                            {person.title && (
                              <p className="text-sm font-semibold text-secondary-700 mb-1">
                                {person.title}
                              </p>
                            )}
                            {person.sub_title && (
                              <p className="text-sm text-dark-600 mb-2">
                                {person.sub_title}
                              </p>
                            )}
                            {person.speaker && (
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-secondary-100 text-secondary-700 rounded-lg text-xs font-medium mb-3">
                                <svg
                                  className="w-3.5 h-3.5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                                  />
                                </svg>
                                {person.speaker}
                              </div>
                            )}
                            {person.desc && person.desc.length > 0 && (
                              <div className="mt-3 space-y-1.5">
                                {person.desc.map(
                                  (description: string, descIndex: number) => (
                                    <div
                                      key={descIndex}
                                      className="flex items-start gap-2"
                                    >
                                      <span className="flex-shrink-0 w-1.5 h-1.5 bg-secondary-500 rounded-full mt-1.5"></span>
                                      <p className="text-sm text-dark-600 flex-1">
                                        {description}
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-dark-900 mb-1">
                삭제 확인
              </h2>
              <p className="text-sm text-dark-600">
                이 작업은 되돌릴 수 없습니다.
              </p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-800">
              정말로{" "}
              <span className="font-semibold">"{eventDetail.title}"</span>을(를)
              삭제하시겠습니까?
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={handleModalClose}
              className="px-6 py-2.5 bg-dark-100 text-dark-700 rounded-xl font-medium hover:bg-dark-200 transition-colors"
            >
              취소
            </button>
            <button
              onClick={() => deleteEventDetailDataMutation(id)}
              className="px-6 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors shadow-soft"
            >
              삭제하기
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
