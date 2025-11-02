"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "../../../../../../lib/supabase";
import { Event } from "../../../../store/interface/event";
import { updateEvent } from "../../actions";

interface PersonDetail {
  en_name: string;
  title: string;
  sub_title: string;
  speaker: string;
  desc: string[];
}

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as unknown as number;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    banner_description: [""],
    persons: [
      {
        en_name: "",
        title: "",
        sub_title: "",
        speaker: "",
        desc: [""],
      },
    ] as PersonDetail[],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const getEventData = async () => {
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
      console.error("getEventData 에러:", err);
      throw err;
    }
  };

  const {
    data: eventData,
    isLoading,
    error,
  } = useQuery<Event>({
    queryKey: ["event", id],
    queryFn: () => getEventData(),
    retry: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });

  useEffect(() => {
    if (eventData) {
      setFormData({
        title: eventData.title,
        description: eventData.description,
        banner_description:
          eventData.banner_description &&
          eventData.banner_description.length > 0
            ? eventData.banner_description
            : [""],
        persons:
          eventData.Person?.data && eventData.Person.data.length > 0
            ? eventData.Person.data.map((person) => ({
                en_name: person.en_name || "",
                title: person.title || "",
                sub_title: person.sub_title || "",
                speaker: person.speaker || "",
                desc:
                  person.desc && person.desc.length > 0 ? person.desc : [""],
              }))
            : [
                {
                  en_name: "",
                  title: "",
                  sub_title: "",
                  speaker: "",
                  desc: [""],
                },
              ],
      });
    }
  }, [eventData]);

  const { mutate: updateEventMutation, isPending } = useMutation({
    mutationFn: (data: {
      title: string;
      description: string;
      banner_description: string[];
      persons: PersonDetail[];
    }) => updateEvent(id, data),
    onSuccess: () => {
      alert("이벤트가 성공적으로 수정되었습니다.");
      router.push(`/dashboard/events/${id}`);
    },
    onError: (error) => {
      console.error("updateEvent 에러:", error);
      alert("이벤트 수정 중 오류가 발생했습니다.");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBannerDescChange = (index: number, value: string) => {
    const newBannerDesc = [...formData.banner_description];
    newBannerDesc[index] = value;
    setFormData((prev) => ({ ...prev, banner_description: newBannerDesc }));
  };

  const addBannerDesc = () => {
    setFormData((prev) => ({
      ...prev,
      banner_description: [...prev.banner_description, ""],
    }));
  };

  const removeBannerDesc = (index: number) => {
    if (formData.banner_description.length > 1) {
      const newBannerDesc = formData.banner_description.filter(
        (_, i) => i !== index
      );
      setFormData((prev) => ({ ...prev, banner_description: newBannerDesc }));
    }
  };

  const handlePersonChange = (
    index: number,
    field: keyof PersonDetail,
    value: string
  ) => {
    const newPersons = [...formData.persons];
    if (field === "desc") {
      return;
    }
    newPersons[index] = { ...newPersons[index], [field]: value };
    setFormData((prev) => ({ ...prev, persons: newPersons }));
  };

  const handlePersonDescChange = (
    personIndex: number,
    descIndex: number,
    value: string
  ) => {
    const newPersons = [...formData.persons];
    newPersons[personIndex].desc[descIndex] = value;
    setFormData((prev) => ({ ...prev, persons: newPersons }));
  };

  const addPersonDesc = (personIndex: number) => {
    const newPersons = [...formData.persons];
    newPersons[personIndex].desc.push("");
    setFormData((prev) => ({ ...prev, persons: newPersons }));
  };

  const removePersonDesc = (personIndex: number, descIndex: number) => {
    const newPersons = [...formData.persons];
    if (newPersons[personIndex].desc.length > 1) {
      newPersons[personIndex].desc = newPersons[personIndex].desc.filter(
        (_, i) => i !== descIndex
      );
      setFormData((prev) => ({ ...prev, persons: newPersons }));
    }
  };

  const addPerson = () => {
    setFormData((prev) => ({
      ...prev,
      persons: [
        ...prev.persons,
        { en_name: "", title: "", sub_title: "", speaker: "", desc: [""] },
      ],
    }));
  };

  const removePerson = (index: number) => {
    if (formData.persons.length > 1) {
      const newPersons = formData.persons.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, persons: newPersons }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = "제목을 입력해주세요.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "내용을 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submitData = {
      ...formData,
      banner_description: formData.banner_description.filter((desc) =>
        desc.trim()
      ),
      persons: formData.persons.map((person) => ({
        ...person,
        desc: person.desc.filter((d) => d.trim()),
      })),
    };

    updateEventMutation(submitData);
  };

  const handleCancel = () => {
    router.back();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-50 via-primary-50/30 to-dark-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={handleCancel}
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

          <div className="bg-white rounded-2xl p-6 shadow-medium border border-dark-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
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
              </div>
              <div>
                <h1 className="text-3xl font-bold text-dark-900">
                  이벤트 수정하기
                </h1>
                <p className="text-dark-600 text-sm mt-1">
                  이벤트 내용을 수정합니다 (ID: {id})
                </p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-2xl p-8 shadow-medium border border-dark-100">
            <h2 className="text-xl font-bold text-dark-900 mb-6 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              기본 정보
            </h2>
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-dark-900 mb-2"
                >
                  제목 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="이벤트 제목을 입력하세요"
                  className={`w-full px-4 py-3 border rounded-xl text-dark-900 placeholder-dark-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.title
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-dark-200 focus:ring-primary-500 focus:border-primary-500"
                  }`}
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-dark-900 mb-2"
                >
                  내용 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="이벤트 내용을 입력하세요"
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-xl text-dark-900 placeholder-dark-400 focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
                    errors.description
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-dark-200 focus:ring-primary-500 focus:border-primary-500"
                  }`}
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Banner Description */}
          <div className="bg-white rounded-2xl p-8 shadow-medium border border-dark-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-dark-900 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-primary-600"
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
              <button
                type="button"
                onClick={addBannerDesc}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-medium hover:bg-primary-200 transition-colors"
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                항목 추가
              </button>
            </div>
            <div className="space-y-3">
              {formData.banner_description.map((desc, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-10 flex items-center justify-center bg-primary-100 text-primary-700 rounded-lg font-semibold">
                    {index + 1}
                  </div>
                  <input
                    type="text"
                    value={desc}
                    onChange={(e) =>
                      handleBannerDescChange(index, e.target.value)
                    }
                    placeholder={`배너 설명 ${index + 1}`}
                    className="flex-1 px-4 py-2 border border-dark-200 rounded-lg text-dark-900 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                  />
                  {formData.banner_description.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBannerDesc(index)}
                      className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Person Details */}
          <div className="bg-white rounded-2xl p-8 shadow-medium border border-dark-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-dark-900 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-secondary-600"
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
              <button
                type="button"
                onClick={addPerson}
                className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg font-medium hover:bg-secondary-200 transition-colors"
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                참석자 추가
              </button>
            </div>
            <div className="space-y-6">
              {formData.persons.map((person, personIndex) => (
                <div
                  key={personIndex}
                  className="p-6 bg-gradient-to-br from-secondary-50 to-white rounded-xl border border-secondary-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-dark-900">
                      참석자 {personIndex + 1}
                    </h3>
                    {formData.persons.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePerson(personIndex)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-dark-900 mb-2">
                          이름 (영문)
                        </label>
                        <input
                          type="text"
                          value={person.en_name}
                          onChange={(e) =>
                            handlePersonChange(
                              personIndex,
                              "en_name",
                              e.target.value
                            )
                          }
                          placeholder="John Doe"
                          className="w-full px-4 py-2 border border-dark-200 rounded-lg text-dark-900 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-dark-900 mb-2">
                          직책
                        </label>
                        <input
                          type="text"
                          value={person.title}
                          onChange={(e) =>
                            handlePersonChange(
                              personIndex,
                              "title",
                              e.target.value
                            )
                          }
                          placeholder="CEO"
                          className="w-full px-4 py-2 border border-dark-200 rounded-lg text-dark-900 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-dark-900 mb-2">
                          부제목
                        </label>
                        <input
                          type="text"
                          value={person.sub_title}
                          onChange={(e) =>
                            handlePersonChange(
                              personIndex,
                              "sub_title",
                              e.target.value
                            )
                          }
                          placeholder="Company Name"
                          className="w-full px-4 py-2 border border-dark-200 rounded-lg text-dark-900 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-dark-900 mb-2">
                          연사
                        </label>
                        <input
                          type="text"
                          value={person.speaker}
                          onChange={(e) =>
                            handlePersonChange(
                              personIndex,
                              "speaker",
                              e.target.value
                            )
                          }
                          placeholder="Keynote Speaker"
                          className="w-full px-4 py-2 border border-dark-200 rounded-lg text-dark-900 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-semibold text-dark-900">
                          설명
                        </label>
                        <button
                          type="button"
                          onClick={() => addPersonDesc(personIndex)}
                          className="text-sm text-secondary-600 hover:text-secondary-700 font-medium"
                        >
                          + 항목 추가
                        </button>
                      </div>
                      <div className="space-y-2">
                        {person.desc.map((desc, descIndex) => (
                          <div key={descIndex} className="flex gap-2">
                            <input
                              type="text"
                              value={desc}
                              onChange={(e) =>
                                handlePersonDescChange(
                                  personIndex,
                                  descIndex,
                                  e.target.value
                                )
                              }
                              placeholder={`설명 ${descIndex + 1}`}
                              className="flex-1 px-4 py-2 border border-dark-200 rounded-lg text-dark-900 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-all duration-200"
                            />
                            {person.desc.length > 1 && (
                              <button
                                type="button"
                                onClick={() =>
                                  removePersonDesc(personIndex, descIndex)
                                }
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 bg-white border border-dark-200 text-dark-700 rounded-xl font-semibold hover:bg-dark-50 transition-all duration-200 shadow-soft"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl font-semibold hover:from-orange-700 hover:to-orange-600 transition-all duration-200 shadow-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "수정 중..." : "수정하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
