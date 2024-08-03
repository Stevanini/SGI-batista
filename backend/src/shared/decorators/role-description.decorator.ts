// /* eslint-disable no-redeclare */
// import { applyDecorators, HttpStatus } from '@nestjs/common';
// import { ApiResponseOptions } from '@nestjs/swagger';
// import { API_DESCRIPTION_METADATA_KEY } from '@shared/constants/auth.constants';

// export type ApiDocOption = ApiResponseOptions & { status: HttpStatus };

// export const PermissionDescription = (description: string) => {
//   const decoratorFactory = (target: any, key?: any, descriptor?: any) => {
//     if (!descriptor)
//       throw Error('Decorator PermissionDescription is only apply in methods');
//     Reflect.defineMetadata(
//       API_DESCRIPTION_METADATA_KEY,
//       description,
//       descriptor.value,
//     );
//     return descriptor;
//   };

//   decoratorFactory.KEY = API_DESCRIPTION_METADATA_KEY;
//   return decoratorFactory;
// };

// export function ApiDoc({ description }: { description: string }) {
//   return applyDecorators(PermissionDescription(description));
// }
