import type { MEDIA_CONTEXTS, MEDIA_TYPES } from "../schemas/media";

export type MediaType = (typeof MEDIA_TYPES)[number];
export type MediaContext = (typeof MEDIA_CONTEXTS)[number];

export interface Media {
  id: number;
  url: string;
  publicId: string;
  type: MediaType;
  inUse: boolean;
  createdAt: string;
}

export interface UploadSignature {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  folder: string;
}

export type MediaRegisterRequest = {
  url: string;
  publicId: string;
  type: MediaType;
};
