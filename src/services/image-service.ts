import { IMAGES_URL } from '@/constants';

export class ImageService {
  static getFullSrc(posterPath: string, width: number = 300) {
    return `${IMAGES_URL}/w${width}${posterPath}`;
  }
}
