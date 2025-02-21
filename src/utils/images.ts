import type { ImageMetadata } from 'astro';

import * as envConfig from 'virtual:config-loader';

const {
  environment: { STATIC_BASE },
} = envConfig;

const load = async function () {
  let images: Record<string, () => Promise<unknown>> | undefined = undefined;
  try {
    images = import.meta.glob(
      '@/assets/images/**/*.{jpeg,jpg,png,tiff,webp,gif,svg,JPEG,JPG,PNG,TIFF,WEBP,GIF,SVG}'
    );
  } catch (_e) {
    // continue regardless of error
  }
  return images;
};

let _images: Record<string, () => Promise<unknown>> | undefined = undefined;
export const fetchLocalImages = async () => {
  _images = _images || (await load());
  return _images;
};

export const findImage = async (
  imagePath?: string | ImageMetadata | null
): Promise<string | ImageMetadata | undefined | null> => {
  // Not string
  if (typeof imagePath !== 'string') {
    return imagePath;
  }

  // Absolute paths
  if (imagePath.startsWith('/icms/upload/')) {
    return STATIC_BASE + imagePath;
  }

  // Relative paths or not "~/assets/"
  if (!imagePath.startsWith('@/assets/images')) {
    return imagePath;
  }

  const images = await fetchLocalImages();
  const key = imagePath.replace('@/', '/src/');

  return images && typeof images[key] === 'function'
    ? ((await images[key]()) as { default: ImageMetadata })['default']
    : null;
};
