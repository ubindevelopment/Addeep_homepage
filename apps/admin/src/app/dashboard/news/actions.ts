"use server";

import { supabaseAdmin } from "../../../../lib/supabase";

export async function createNews(data: {
  title: string;
  content: string;
  image?: string;
}) {
  try {
    const { data: result, error } = await supabaseAdmin
      .from("news")
      .insert([
        {
          title: data.title,
          content: data.content,
          image: data.image || null,
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
    console.error("createNews 에러:", err);
    throw err;
  }
}

export async function updateNews(
  id: number,
  data: {
    title: string;
    content: string;
    image?: string;
  }
) {
  try {
    const { data: result, error } = await supabaseAdmin
      .from("news")
      .update({
        title: data.title,
        content: data.content,
        image: data.image || null,
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
    console.error("updateNews 에러:", err);
    throw err;
  }
}

export async function deleteNews(id: number) {
  try {
    const { data, error } = await supabaseAdmin
      .from("news")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase 에러:", error);
      throw error;
    }

    return { success: true, data };
  } catch (err) {
    console.error("deleteNews 에러:", err);
    throw err;
  }
}
