/* eslint-disable no-redeclare */
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';
import { API_INFO_METADATA_KEY } from '@shared/constants/auth.constants';

export type APIInfoOption = ApiResponseOptions & { status: HttpStatus };

export interface APIInfoData {
    name: string;
    description: string;
}

export const apiData = (name: string, description: string) => {
    const decoratorFactory = (target: any, key?: any, descriptor?: any) => {
        // console.log('apiData', target, key, descriptor);
        if (!descriptor)
            throw Error('Decorator apiData is only apply in methods');

        Reflect.defineMetadata(
            API_INFO_METADATA_KEY,
            {
                name,
                description,
            } as APIInfoData,
            descriptor.value,
        );

        return descriptor;
    };

    decoratorFactory.KEY = API_INFO_METADATA_KEY;
    return decoratorFactory;
};

export function APIInfo({
    name,
    description,
}: {
    name: string;
    description: string;
}) {
    return applyDecorators(apiData(name, description));
}
