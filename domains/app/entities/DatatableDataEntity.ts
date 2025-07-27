export const createEmptyDatatableEntity = <T>(): IDatatable<T> => {
    return {
        data: [],
        meta: {
            total: 0,
            total_pages: 1
        }
    }
}

// const jobs = ref<TJobs>(createEmptyDatatableEntity());

// interface IDatatable<T> {
//     data    : T[];
//     meta    : {
//         total: number;
//         total_pages: number;
//     };
// }

// export interface IJob {
//     uuid            : string
//     policies        : IJobPolicy[]
//     name            : string
//     reference       : string
//     address_line_1  : string
//     address_line_2  : string
//     locality        : string
//     state           : string
//     postcode        : string
//     client          : string
//     customer        : string
//     surveyor        : string
//     status          : TJobStatuses
//     notes           : string
// }

// export type TJobs = IDatatable<IJob>
