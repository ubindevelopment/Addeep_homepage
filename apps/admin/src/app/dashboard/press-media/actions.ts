"use server";

import { supabaseAdmin } from "../../../../lib/supabase";

export async function createPressMedia(data: {
  title: string;
  content: string;
  image_url?: string;
  file_url?: string;
  file_name?: string;
  file_type?: string;
  file_size?: number;
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
          file_url: data.file_url || null,
          file_name: data.file_name || null,
          file_type: data.file_type || null,
          file_size: data.file_size || null,
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
    file_url?: string;
    file_name?: string;
    file_type?: string;
    file_size?: number;
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
        file_url: data.file_url || null,
        file_name: data.file_name || null,
        file_type: data.file_type || null,
        file_size: data.file_size || null,
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

export async function uploadPressFile(file: File) {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `press-media/${fileName}`;

    const { data, error } = await supabaseAdmin.storage
      .from("press-media")
      .upload(filePath, file);

    if (error) {
      console.error("파일 업로드 에러:", error);
      throw error;
    }

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from("press-media").getPublicUrl(filePath);

    return {
      success: true,
      file_url: publicUrl,
      file_name: file.name,
      file_type: file.type,
      file_size: file.size,
    };
  } catch (err) {
    console.error("uploadPressFile 에러:", err);
    throw err;
  }
}
