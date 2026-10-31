import { frontendHttp } from "@config/axios/frontend-http.config";
import { proxyEnvironment } from "@config/proxy-api.config";
import { unwrapApiError } from "@/lib/common/handle-api-error";
import type {
  Media,
  MediaContext,
  MediaRegisterRequest,
  MediaType,
  UploadSignature,
} from "@/lib/media/api/types";

const {
  api: {
    rest: {
      endpoints: { media: mediaUrl },
    },
  },
} = proxyEnvironment;

export async function uploadMedia(
  file: File,
  context?: MediaContext,
): Promise<Media> {
  const type: MediaType = file.type.startsWith("video/") ? "VIDEO" : "IMAGE";
  const sig = await fetchSignature(context);

  const form = new FormData();
  form.append("file", file);
  form.append("api_key", sig.apiKey);
  form.append("timestamp", String(sig.timestamp));
  form.append("signature", sig.signature);
  form.append("folder", sig.folder);

  const resource = type === "VIDEO" ? "video" : "image";
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${sig.cloudName}/${resource}/upload`,
    { method: "POST", body: form },
  );
  if (!res.ok) throw new Error("Échec de l'upload vers Cloudinary");

  const uploaded = (await res.json()) as {
    public_id: string;
    secure_url: string;
  };

  return registerMedia({
    url: uploaded.secure_url,
    publicId: uploaded.public_id,
    type,
  });
}

async function fetchSignature(
  context?: MediaContext,
): Promise<UploadSignature> {
  try {
    const { data } = await frontendHttp().get<UploadSignature>(
      `${mediaUrl}/signature`,
      {
        params: { context },
      },
    );

    return data;
  } catch (error) {
    throw unwrapApiError(error);
  }
}

async function registerMedia(payload: MediaRegisterRequest): Promise<Media> {
  try {
    const { data } = await frontendHttp().post<Media>(mediaUrl, payload);
    return data;
  } catch (error) {
    throw unwrapApiError(error);
  }
}
