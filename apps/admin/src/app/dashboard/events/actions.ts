"use server";

import { supabaseAdmin } from "../../../../lib/supabase";

interface PersonDetail {
  en_name: string;
  title: string;
  sub_title: string;
  speaker: string;
  desc: string[];
}

interface AgendaItem {
  time: string;
  title: string;
  subTitle?: string;
  duration: string;
  speaker?: string;
  desc?: string[];
}

interface HeroData {
  title?: string[];
  description?: string[];
  date?: string;
  location?: string;
}

export async function uploadEventImage(file: File) {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `event-images/${fileName}`;

    const { data, error } = await supabaseAdmin.storage
      .from("event-images")
      .upload(filePath, file);

    if (error) {
      console.error("파일 업로드 에러:", error);
      throw error;
    }

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from("event-images").getPublicUrl(filePath);

    return {
      success: true,
      url: publicUrl,
    };
  } catch (err) {
    console.error("uploadEventImage 에러:", err);
    throw err;
  }
}

export async function createEvent(data: {
  title: string;
  description: string;
  thumbnail_url?: string;
  video_link?: string;
  event_date?: string;
  location?: string;
  form_link?: string;
  hero_data?: HeroData;
  agenda_data?: AgendaItem[];
  speaker_images?: string[];
  detail_content?: string;
  banner_description?: string[];
  persons?: PersonDetail[];
}) {
  try {
    const { data: result, error } = await supabaseAdmin
      .from("events")
      .insert([
        {
          title: data.title,
          description: data.description,
          thumbnail_url: data.thumbnail_url || null,
          video_link: data.video_link || null,
          event_date: data.event_date || null,
          location: data.location || null,
          form_link: data.form_link || null,
          hero_data: data.hero_data || null,
          agenda_data: data.agenda_data || null,
          speaker_images: data.speaker_images || null,
          detail_content: data.detail_content || null,
          banner_description: data.banner_description || null,
          Person: data.persons ? { data: data.persons } : null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase 에러:", error);
      throw error;
    }

    return { success: true, data: result };
  } catch (err) {
    console.error("createEvent 에러:", err);
    throw err;
  }
}

export async function updateEvent(
  id: number,
  data: {
    title: string;
    description: string;
    thumbnail_url?: string;
    video_link?: string;
    event_date?: string;
    location?: string;
    form_link?: string;
    hero_data?: HeroData;
    agenda_data?: AgendaItem[];
    speaker_images?: string[];
    detail_content?: string;
    banner_description?: string[];
    persons?: PersonDetail[];
  }
) {
  try {
    const { data: result, error } = await supabaseAdmin
      .from("events")
      .update({
        title: data.title,
        description: data.description,
        thumbnail_url: data.thumbnail_url || null,
        video_link: data.video_link || null,
        event_date: data.event_date || null,
        location: data.location || null,
        form_link: data.form_link || null,
        hero_data: data.hero_data || null,
        agenda_data: data.agenda_data || null,
        speaker_images: data.speaker_images || null,
        detail_content: data.detail_content || null,
        banner_description: data.banner_description || null,
        Person: data.persons ? { data: data.persons } : null,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase 에러:", error);
      throw error;
    }

    return { success: true, data: result };
  } catch (err) {
    console.error("updateEvent 에러:", err);
    throw err;
  }
}

export async function deleteEvent(id: number) {
  try {
    const { data, error } = await supabaseAdmin
      .from("events")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase 에러:", error);
      throw error;
    }

    return { success: true, data };
  } catch (err) {
    console.error("deleteEvent 에러:", err);
    throw err;
  }
}
