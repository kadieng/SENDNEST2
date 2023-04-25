// import { CLOUDINARY } from '@hrnxworkspace/utils';
import { v2 } from 'cloudinary';
import { CLOUDINARY } from '../constant';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): any => {
    return v2.config({
      cloud_name: 'dcjpgszsy',
      api_key: '884189351745354',
      api_secret: '5EXIWYJPkuglkDc1_7IqydwW8OY',
    });
  },
};
