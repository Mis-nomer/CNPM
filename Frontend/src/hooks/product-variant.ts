/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import type { Prisma, ProductVariant } from "@prisma/client";
import type { UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { getHooksContext } from '@zenstackhq/tanstack-query/runtime-v5/react';
import { useModelQuery, useInfiniteModelQuery, useModelMutation } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { PickEnumerable, CheckSelect, QueryError, ExtraQueryOptions, ExtraMutationOptions } from '@zenstackhq/tanstack-query/runtime-v5';
import type { PolicyCrudKind } from '@zenstackhq/runtime'
import metadata from './__model_meta';
type DefaultError = QueryError;
import { useSuspenseModelQuery, useSuspenseInfiniteModelQuery } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { UseSuspenseQueryOptions, UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';

export function useCreateProductVariant(options?: Omit<(UseMutationOptions<(ProductVariant | undefined), DefaultError, Prisma.ProductVariantCreateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.ProductVariantCreateArgs, DefaultError, ProductVariant, true>('ProductVariant', 'POST', `${endpoint}/productVariant/create`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.ProductVariantCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.ProductVariantCreateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, ProductVariant, Prisma.ProductVariantGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.ProductVariantCreateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, ProductVariant, Prisma.ProductVariantGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useCreateManyProductVariant(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.ProductVariantCreateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.ProductVariantCreateManyArgs, DefaultError, Prisma.BatchPayload, false>('ProductVariant', 'POST', `${endpoint}/productVariant/createMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.ProductVariantCreateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.ProductVariantCreateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.ProductVariantCreateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useFindManyProductVariant<TArgs extends Prisma.ProductVariantFindManyArgs, TQueryFnData = Array<Prisma.ProductVariantGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ProductVariantFindManyArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('ProductVariant', `${endpoint}/productVariant/findMany`, args, options, fetch);
}

export function useInfiniteFindManyProductVariant<TArgs extends Prisma.ProductVariantFindManyArgs, TQueryFnData = Array<Prisma.ProductVariantGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ProductVariantFindManyArgs>, options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useInfiniteModelQuery<TQueryFnData, TData, TError>('ProductVariant', `${endpoint}/productVariant/findMany`, args, options, fetch);
}

export function useSuspenseFindManyProductVariant<TArgs extends Prisma.ProductVariantFindManyArgs, TQueryFnData = Array<Prisma.ProductVariantGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ProductVariantFindManyArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('ProductVariant', `${endpoint}/productVariant/findMany`, args, options, fetch);
}

export function useSuspenseInfiniteFindManyProductVariant<TArgs extends Prisma.ProductVariantFindManyArgs, TQueryFnData = Array<Prisma.ProductVariantGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ProductVariantFindManyArgs>, options?: Omit<UseSuspenseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseInfiniteModelQuery<TQueryFnData, TData, TError>('ProductVariant', `${endpoint}/productVariant/findMany`, args, options, fetch);
}

export function useFindUniqueProductVariant<TArgs extends Prisma.ProductVariantFindUniqueArgs, TQueryFnData = Prisma.ProductVariantGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.ProductVariantFindUniqueArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('ProductVariant', `${endpoint}/productVariant/findUnique`, args, options, fetch);
}

export function useSuspenseFindUniqueProductVariant<TArgs extends Prisma.ProductVariantFindUniqueArgs, TQueryFnData = Prisma.ProductVariantGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.ProductVariantFindUniqueArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('ProductVariant', `${endpoint}/productVariant/findUnique`, args, options, fetch);
}

export function useFindFirstProductVariant<TArgs extends Prisma.ProductVariantFindFirstArgs, TQueryFnData = Prisma.ProductVariantGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ProductVariantFindFirstArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('ProductVariant', `${endpoint}/productVariant/findFirst`, args, options, fetch);
}

export function useSuspenseFindFirstProductVariant<TArgs extends Prisma.ProductVariantFindFirstArgs, TQueryFnData = Prisma.ProductVariantGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ProductVariantFindFirstArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('ProductVariant', `${endpoint}/productVariant/findFirst`, args, options, fetch);
}

export function useUpdateProductVariant(options?: Omit<(UseMutationOptions<(ProductVariant | undefined), DefaultError, Prisma.ProductVariantUpdateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.ProductVariantUpdateArgs, DefaultError, ProductVariant, true>('ProductVariant', 'PUT', `${endpoint}/productVariant/update`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.ProductVariantUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.ProductVariantUpdateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, ProductVariant, Prisma.ProductVariantGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.ProductVariantUpdateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, ProductVariant, Prisma.ProductVariantGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useUpdateManyProductVariant(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.ProductVariantUpdateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.ProductVariantUpdateManyArgs, DefaultError, Prisma.BatchPayload, false>('ProductVariant', 'PUT', `${endpoint}/productVariant/updateMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.ProductVariantUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.ProductVariantUpdateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.ProductVariantUpdateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertProductVariant(options?: Omit<(UseMutationOptions<(ProductVariant | undefined), DefaultError, Prisma.ProductVariantUpsertArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.ProductVariantUpsertArgs, DefaultError, ProductVariant, true>('ProductVariant', 'POST', `${endpoint}/productVariant/upsert`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.ProductVariantUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.ProductVariantUpsertArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, ProductVariant, Prisma.ProductVariantGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.ProductVariantUpsertArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, ProductVariant, Prisma.ProductVariantGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteProductVariant(options?: Omit<(UseMutationOptions<(ProductVariant | undefined), DefaultError, Prisma.ProductVariantDeleteArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.ProductVariantDeleteArgs, DefaultError, ProductVariant, true>('ProductVariant', 'DELETE', `${endpoint}/productVariant/delete`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.ProductVariantDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.ProductVariantDeleteArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, ProductVariant, Prisma.ProductVariantGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.ProductVariantDeleteArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, ProductVariant, Prisma.ProductVariantGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteManyProductVariant(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.ProductVariantDeleteManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.ProductVariantDeleteManyArgs, DefaultError, Prisma.BatchPayload, false>('ProductVariant', 'DELETE', `${endpoint}/productVariant/deleteMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.ProductVariantDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.ProductVariantDeleteManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.ProductVariantDeleteManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregateProductVariant<TArgs extends Prisma.ProductVariantAggregateArgs, TQueryFnData = Prisma.GetProductVariantAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.ProductVariantAggregateArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('ProductVariant', `${endpoint}/productVariant/aggregate`, args, options, fetch);
}

export function useSuspenseAggregateProductVariant<TArgs extends Prisma.ProductVariantAggregateArgs, TQueryFnData = Prisma.GetProductVariantAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.ProductVariantAggregateArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('ProductVariant', `${endpoint}/productVariant/aggregate`, args, options, fetch);
}

export function useGroupByProductVariant<TArgs extends Prisma.ProductVariantGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.ProductVariantGroupByArgs['orderBy'] } : { orderBy?: Prisma.ProductVariantGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
    ? `Error: "by" must not be empty.`
    : HavingValid extends Prisma.False
    ? {
        [P in HavingFields]: P extends ByFields
        ? never
        : P extends string
        ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
        : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`,
        ]
    }[HavingFields]
    : 'take' extends Prisma.Keys<TArgs>
    ? 'orderBy' extends Prisma.Keys<TArgs>
    ? ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "take", you also need to provide "orderBy"'
    : 'skip' extends Prisma.Keys<TArgs>
    ? 'orderBy' extends Prisma.Keys<TArgs>
    ? ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "skip", you also need to provide "orderBy"'
    : ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields], TQueryFnData = {} extends InputErrors ?
    Array<PickEnumerable<Prisma.ProductVariantGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.ProductVariantGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.ProductVariantGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.ProductVariantGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.ProductVariantGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('ProductVariant', `${endpoint}/productVariant/groupBy`, args, options, fetch);
}

export function useSuspenseGroupByProductVariant<TArgs extends Prisma.ProductVariantGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.ProductVariantGroupByArgs['orderBy'] } : { orderBy?: Prisma.ProductVariantGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
    ? `Error: "by" must not be empty.`
    : HavingValid extends Prisma.False
    ? {
        [P in HavingFields]: P extends ByFields
        ? never
        : P extends string
        ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
        : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`,
        ]
    }[HavingFields]
    : 'take' extends Prisma.Keys<TArgs>
    ? 'orderBy' extends Prisma.Keys<TArgs>
    ? ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "take", you also need to provide "orderBy"'
    : 'skip' extends Prisma.Keys<TArgs>
    ? 'orderBy' extends Prisma.Keys<TArgs>
    ? ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "skip", you also need to provide "orderBy"'
    : ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields], TQueryFnData = {} extends InputErrors ?
    Array<PickEnumerable<Prisma.ProductVariantGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.ProductVariantGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.ProductVariantGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.ProductVariantGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.ProductVariantGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('ProductVariant', `${endpoint}/productVariant/groupBy`, args, options, fetch);
}

export function useCountProductVariant<TArgs extends Prisma.ProductVariantCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.ProductVariantCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ProductVariantCountArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('ProductVariant', `${endpoint}/productVariant/count`, args, options, fetch);
}

export function useSuspenseCountProductVariant<TArgs extends Prisma.ProductVariantCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.ProductVariantCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.ProductVariantCountArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('ProductVariant', `${endpoint}/productVariant/count`, args, options, fetch);
}

export function useCheckProductVariant<TError = DefaultError>(args: { operation: PolicyCrudKind; where?: { id?: number; productId?: number; sku?: string; quantity?: number; image?: string }; }, options?: (Omit<UseQueryOptions<boolean, TError, boolean>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<boolean, boolean, TError>('ProductVariant', `${endpoint}/productVariant/check`, args, options, fetch);
}
