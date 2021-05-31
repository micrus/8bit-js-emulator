export const INSTRUCTION_SET = [
    {
        key: 1,
        id: 'CLS',
        name: 'CLS',
        mask: 0xffff,
        pattern: 0x00e0,
        args : []
    },
    {
        key: 2,
        id: 'RET',
        name: 'RET',
        mask: 0xffff,
        pattern: 0x00ee,
        args : []
    },
    {
        key: 3,
        id: 'JP_ADDR',
        name: 'JP',
        mask: 0xf000,
        pattern: 0x1000,
        args : [{mask: 0x0fff}]
    },
    {
        key: 4,
        id: 'CALL_ADDR',
        name: 'CALL',
        mask: 0xf000,
        pattern: 0x2000,
        args : [{mask: 0x0fff}]
    },
    {
        key: 5,
        id: 'SE_VX_NN',
        name: 'SE',
        mask: 0xf000,
        pattern: 0x3000,
        args : [{mask: 0x0f00, shift:8},{mask: 0x00ff}]
    },
/*     {
        key: ,
        id: '',
        name: '',
        mask: 0x,
        pattern: 0x,
        args : []
    }, */
];