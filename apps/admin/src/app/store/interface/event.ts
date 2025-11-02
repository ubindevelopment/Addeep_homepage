export interface PersonDetail {
  desc?: string[];
  en_name?: string;
  speaker?: string;
  sub_title?: string;
  title?: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  banner_description?: string[];
  Person?: {
    data: PersonDetail[];
  };
}
