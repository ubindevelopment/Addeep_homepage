"use server";

import { supabaseAdmin } from "../../../../lib/supabase";

export async function createPressMedia(data: {
  title: string;
  content: string;
  image_url?: string;
  file_url?: string;
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
          published_date: data.published_date,
          is_featured: data.is_featured || false,
          display_order: data.display_order || 0,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase 에러:", error);
      return {
        success: false,
        error: error.message || "보도자료 생성 중 오류가 발생했습니다.",
      };
    }

    return { success: true, data: result };
  } catch (err) {
    console.error("createPressMedia 에러:", err);
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "보도자료 생성 중 오류가 발생했습니다.",
    };
  }
}

export async function updatePressMedia(
  id: string,
  data: {
    title: string;
    content: string;
    image_url?: string;
    file_url?: string;
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
        published_date: data.published_date,
        is_featured: data.is_featured || false,
        display_order: data.display_order || 0,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase 에러:", error);
      return {
        success: false,
        error: error.message || "보도자료 수정 중 오류가 발생했습니다.",
      };
    }

    return { success: true, data: result };
  } catch (err) {
    console.error("updatePressMedia 에러:", err);
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "보도자료 수정 중 오류가 발생했습니다.",
    };
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
      return {
        success: false,
        error: error.message || "보도자료 삭제 중 오류가 발생했습니다.",
      };
    }

    return { success: true, data };
  } catch (err) {
    console.error("deletePressMedia 에러:", err);
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "보도자료 삭제 중 오류가 발생했습니다.",
    };
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
      return {
        success: false,
        error: error.message || "파일 업로드 중 오류가 발생했습니다.",
      };
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
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "파일 업로드 중 오류가 발생했습니다.",
    };
  }
}
