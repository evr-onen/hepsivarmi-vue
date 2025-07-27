
declare global {
    interface IInlineMessage extends InlineMessageProps {
        status: boolean
    }

    interface InlineMessageProps {
        type: string | 'success' | 'error' | 'warning' | 'info';
        title: string;
        message: string;
        closable: boolean;
    }

    type TErrorBag = Record<string, string[]>
    interface IDatatable<T> {
        data    : T[];
        meta    : {
            total: number;
            total_pages: number;
        };
    }
    type DatePicker = Date | undefined

    type AxiosParameterType = Record<string, string | number>

    type Select2 <T = {uuid:string, name:string}> = T | undefined;
    type UUID_NAME <T = {uuid:string, name:string}> = T;

    export interface IStatusBadge {
        type: string | 'active' | 'warning' | 'error' | 'ongoing' | 'disabled';
        text: string;
        dotVisible?: boolean;
        classNames?: string;
    }

    type Money = {raw:number, formatted:string, type:string | 'nil' | 'positive' | 'negative'};
}