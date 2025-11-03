"use server";

import { supabaseAdmin } from "../../../../lib/supabase";

export async function createPressMedia(data: {
  title: string;
  content: string;
  image_url?: string;
  published_date: string;
  is_featured?: boolean;
  display_order?: number;
}) {
  try {
    const { data: result, error } = await supabaseAdmin
      .from("press_media")
      .insert([
        {
          title: data.title,
          content: data.content,
          image_url: data.image_url || null,
          published_date: data.published_date,
          is_featured: data.is_featured || false,
          display_order: data.display_order || 0,
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
    console.error("createPressMedia 에러:", err);
    throw err;
  }
}

export async function updatePressMedia(
  id: string,
  data: {
    title: string;
    content: string;
    image_url?: string;
    published_date: string;
    is_featured?: boolean;
    display_order?: number;
  }
) {
  try {
    const { data: result, error } = await supabaseAdmin
      .from("press_media")
      .update({
        title: data.title,
        content: data.content,
        image_url: data.image_url || null,
        published_date: data.published_date,
        is_featured: data.is_featured || false,
        display_order: data.display_order || 0,
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
    console.error("updatePressMedia 에러:", err);
    throw err;
  }
}

export async function deletePressMedia(id: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from("press_media")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase 에러:", error);
      throw error;
    }

    return { success: true, data };
  } catch (err) {
    console.error("deletePressMedia 에러:", err);
    throw err;
  }
}
