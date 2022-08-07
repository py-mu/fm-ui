/**
 * 请求头
 */
export default [
    {
        slots: {title: 'params_index'},
        key: 'params_index',
        width: '5%',
        dataIndex: 'params_index',
        scopedSlots: {customRender: 'params_index'},
    },
    {

        slots: {title: 'params_used'},
        key: 'params_used',
        width: '5%',
        dataIndex: 'params_used',
        scopedSlots: {customRender: 'params_used'},
    },
    {
        dataIndex: 'params_name',
        key: 'params_name',
        width: '20%',
        slots: {title: 'params_name'},
        scopedSlots: {customRender: 'params_name'},
    },
    {
        slots: {title: 'params_value'},
        dataIndex: 'params_value',
        key: 'params_value',
        width: '30%',
        scopedSlots: {customRender: 'params_value'},
    },
    {
        slots: {title: 'params_description'},
        key: 'params_description',
        dataIndex: 'params_description',
        width: '30%',
        scopedSlots: {customRender: 'params_description'},
    },
    {
        slots: {title: 'action'},
        key: 'action',
        // fixed: 'right',
        width: '10%',
        dataIndex: 'action',
        scopedSlots: {customRender: 'action'},
    },
]