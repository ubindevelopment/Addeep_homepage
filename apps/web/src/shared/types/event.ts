export interface PersonDetail {
  desc?: string[];
  en_name?: string;
  speaker?: string;
  sub_title?: string;
  title?: string;
}

export interface AgendaItem {
  time: string;
  title: string;
  subTitle?: string;
  duration: string;
  speaker?: string;
  desc?: string[];
}

export interface HeroData {
  title?: string[];
  description?: string[];
  date?: string;
  location?: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;

  // 선택적 필드들
  thumbnail_url?: string;
  video_link?: string;
  event_date?: string;
  location?: string;
  form_link?: string;

  // JSONB 필드
  hero_data?: HeroData;
  agenda_data?: AgendaItem[];
  speaker_images?: string[];
  detail_content?: string;

  // 기존 필드 (하위 호환성)
  banner_description?: string[];
  Person?: {
    data: PersonDetail[];
  };
}
