export class GlobalConfigConstants {
    public static readonly TOAST_CONFIG = {
        KEY: 'od-toast',
        LIFE: 5000,
        POSITION: 'top-right',
        HEADER: {
            SUCCESS: 'MENSAJE DE ÉXITO',
            WARNING: 'MENSAJE DE ADVERTENCIA',
            INFO: 'MENSAJE DE INFORMACIÓN',
            ERROR: 'MENSAJE DE ERROR',
        },
    };

    public static readonly CONFIRM_DIALOG_CONFIG = {
        KEY: 'od-confirm-dialog',
        HEADER: 'CONFIRMACIÓN',
        ICON: 'pi pi-exclamation-triangle',
        ACCEPT_LABEL: 'SI',
        REJECT_LABEL: 'NO',
    };

    public static readonly TABLE_CONFIG = {
        DATA_KEY: 'id',
        PAGE_SIZE_LIST: [10, 20, 30, 40, 50, 100],
        SCROLL_SIZE_REM: '60vh',
        REPORT_TEMPLATE: 'Mostrando de {first} a {last} de {totalRecords} elementos',
        FOOTER_TEMPLATE: 'NO SE ENCONTRARON RESULTADOS',
        PAGE_INDEX: 1,
        PAGE_SIZE: 10,
    };
}
