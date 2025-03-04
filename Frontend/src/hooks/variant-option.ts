/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import type { Prisma, VariantOption } from "@prisma/client";
import type { UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { getHooksContext } from '@zenstackhq/tanstack-query/runtime-v5/react';
import { useModelQuery, useInfiniteModelQuery, useModelMutation } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { PickEnumerable, CheckSelect, QueryError, ExtraQueryOptions, ExtraMutationOptions } from '@zenstackhq/tanstack-query/runtime-v5';
import type { PolicyCrudKind } from '@zenstackhq/runtime'
import metadata from './__model_meta';
type DefaultError = QueryError;
import { useSuspenseModelQuery, useSuspenseInfiniteModelQuery } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { UseSuspenseQueryOptions, UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';

export function useCreateVariantOption(options?: Omit<(UseMutationOptions<(VariantOption | undefined), DefaultError, Prisma.VariantOptionCreateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.VariantOptionCreateArgs, DefaultError, VariantOption, true>('VariantOption', 'POST', `${endpoint}/variantOption/create`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.VariantOptionCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.VariantOptionCreateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, VariantOption, Prisma.VariantOptionGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.VariantOptionCreateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, VariantOption, Prisma.VariantOptionGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useCreateManyVariantOption(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.VariantOptionCreateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.VariantOptionCreateManyArgs, DefaultError, Prisma.BatchPayload, false>('VariantOption', 'POST', `${endpoint}/variantOption/createMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.VariantOptionCreateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.VariantOptionCreateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.VariantOptionCreateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useFindManyVariantOption<TArgs extends Prisma.VariantOptionFindManyArgs, TQueryFnData = Array<Prisma.VariantOptionGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.VariantOptionFindManyArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('VariantOption', `${endpoint}/variantOption/findMany`, args, options, fetch);
}

export function useInfiniteFindManyVariantOption<TArgs extends Prisma.VariantOptionFindManyArgs, TQueryFnData = Array<Prisma.VariantOptionGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.VariantOptionFindManyArgs>, options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useInfiniteModelQuery<TQueryFnData, TData, TError>('VariantOption', `${endpoint}/variantOption/findMany`, args, options, fetch);
}

export function useSuspenseFindManyVariantOption<TArgs extends Prisma.VariantOptionFindManyArgs, TQueryFnData = Array<Prisma.VariantOptionGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.VariantOptionFindManyArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('VariantOption', `${endpoint}/variantOption/findMany`, args, options, fetch);
}

export function useSuspenseInfiniteFindManyVariantOption<TArgs extends Prisma.VariantOptionFindManyArgs, TQueryFnData = Array<Prisma.VariantOptionGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.VariantOptionFindManyArgs>, options?: Omit<UseSuspenseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseInfiniteModelQuery<TQueryFnData, TData, TError>('VariantOption', `${endpoint}/variantOption/findMany`, args, options, fetch);
}

export function useFindUniqueVariantOption<TArgs extends Prisma.VariantOptionFindUniqueArgs, TQueryFnData = Prisma.VariantOptionGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.VariantOptionFindUniqueArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('VariantOption', `${endpoint}/variantOption/findUnique`, args, options, fetch);
}

export function useSuspenseFindUniqueVariantOption<TArgs extends Prisma.VariantOptionFindUniqueArgs, TQueryFnData = Prisma.VariantOptionGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.VariantOptionFindUniqueArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('VariantOption', `${endpoint}/variantOption/findUnique`, args, options, fetch);
}

export function useFindFirstVariantOption<TArgs extends Prisma.VariantOptionFindFirstArgs, TQueryFnData = Prisma.VariantOptionGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.VariantOptionFindFirstArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('VariantOption', `${endpoint}/variantOption/findFirst`, args, options, fetch);
}

export function useSuspenseFindFirstVariantOption<TArgs extends Prisma.VariantOptionFindFirstArgs, TQueryFnData = Prisma.VariantOptionGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.VariantOptionFindFirstArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('VariantOption', `${endpoint}/variantOption/findFirst`, args, options, fetch);
}

export function useUpdateVariantOption(options?: Omit<(UseMutationOptions<(VariantOption | undefined), DefaultError, Prisma.VariantOptionUpdateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.VariantOptionUpdateArgs, DefaultError, VariantOption, true>('VariantOption', 'PUT', `${endpoint}/variantOption/update`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.VariantOptionUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.VariantOptionUpdateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, VariantOption, Prisma.VariantOptionGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.VariantOptionUpdateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, VariantOption, Prisma.VariantOptionGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useUpdateManyVariantOption(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.VariantOptionUpdateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.VariantOptionUpdateManyArgs, DefaultError, Prisma.BatchPayload, false>('VariantOption', 'PUT', `${endpoint}/variantOption/updateMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.VariantOptionUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.VariantOptionUpdateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.VariantOptionUpdateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertVariantOption(options?: Omit<(UseMutationOptions<(VariantOption | undefined), DefaultError, Prisma.VariantOptionUpsertArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.VariantOptionUpsertArgs, DefaultError, VariantOption, true>('VariantOption', 'POST', `${endpoint}/variantOption/upsert`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.VariantOptionUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.VariantOptionUpsertArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, VariantOption, Prisma.VariantOptionGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.VariantOptionUpsertArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, VariantOption, Prisma.VariantOptionGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteVariantOption(options?: Omit<(UseMutationOptions<(VariantOption | undefined), DefaultError, Prisma.VariantOptionDeleteArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.VariantOptionDeleteArgs, DefaultError, VariantOption, true>('VariantOption', 'DELETE', `${endpoint}/variantOption/delete`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.VariantOptionDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.VariantOptionDeleteArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, VariantOption, Prisma.VariantOptionGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.VariantOptionDeleteArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, VariantOption, Prisma.VariantOptionGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteManyVariantOption(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.VariantOptionDeleteManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.VariantOptionDeleteManyArgs, DefaultError, Prisma.BatchPayload, false>('VariantOption', 'DELETE', `${endpoint}/variantOption/deleteMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.VariantOptionDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.VariantOptionDeleteManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.VariantOptionDeleteManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregateVariantOption<TArgs extends Prisma.VariantOptionAggregateArgs, TQueryFnData = Prisma.GetVariantOptionAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.VariantOptionAggregateArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('VariantOption', `${endpoint}/variantOption/aggregate`, args, options, fetch);
}

export function useSuspenseAggregateVariantOption<TArgs extends Prisma.VariantOptionAggregateArgs, TQueryFnData = Prisma.GetVariantOptionAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.VariantOptionAggregateArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('VariantOption', `${endpoint}/variantOption/aggregate`, args, options, fetch);
}

export function useGroupByVariantOption<TArgs extends Prisma.VariantOptionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.VariantOptionGroupByArgs['orderBy'] } : { orderBy?: Prisma.VariantOptionGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
    Array<PickEnumerable<Prisma.VariantOptionGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.VariantOptionGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.VariantOptionGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.VariantOptionGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.VariantOptionGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('VariantOption', `${endpoint}/variantOption/groupBy`, args, options, fetch);
}

export function useSuspenseGroupByVariantOption<TArgs extends Prisma.VariantOptionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.VariantOptionGroupByArgs['orderBy'] } : { orderBy?: Prisma.VariantOptionGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
    Array<PickEnumerable<Prisma.VariantOptionGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.VariantOptionGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.VariantOptionGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.VariantOptionGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.VariantOptionGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('VariantOption', `${endpoint}/variantOption/groupBy`, args, options, fetch);
}

export function useCountVariantOption<TArgs extends Prisma.VariantOptionCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.VariantOptionCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.VariantOptionCountArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('VariantOption', `${endpoint}/variantOption/count`, args, options, fetch);
}

export function useSuspenseCountVariantOption<TArgs extends Prisma.VariantOptionCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.VariantOptionCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.VariantOptionCountArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('VariantOption', `${endpoint}/variantOption/count`, args, options, fetch);
}

export function useCheckVariantOption<TError = DefaultError>(args: { operation: PolicyCrudKind; where?: { id?: number; variantId?: number; attributeValueId?: number }; }, options?: (Omit<UseQueryOptions<boolean, TError, boolean>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<boolean, boolean, TError>('VariantOption', `${endpoint}/variantOption/check`, args, options, fetch);
}
