"use server";

import { supabaseAdmin } from "../../../../lib/supabase";

interface PersonDetail {
  en_name: string;
  title: string;
  sub_title: string;
  speaker: string;
  desc: string[];
}

export async function createEvent(data: {
  title: string;
  description: string;
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
