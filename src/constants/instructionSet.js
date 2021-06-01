export const MASK_NNN = {mask: 0x0fff};
export const MASK_X = {mask: 0x0f00, shift:8};
export const MASK_KK = {mask: 0x00ff};
export const MASK_Y = {mask:0x00f0, shift:4};
export const MASK_N = {mask:0x000f};


export const MASK_HIGHEST_BYTE = 0xf000;
export const MASK_HIGHEST_AND_LOWEST_BYTE = 0xf00f;


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
        mask: MASK_HIGHEST_BYTE,
        pattern: 0x1000,
        args : [MASK_NNN]
    },
    {
        key: 4,
        id: 'CALL_ADDR',
        name: 'CALL',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0x2000,
        args : [MASK_NNN]
    },
    {
        key: 5,
        id: 'SE_VX_KK',
        name: 'SE',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0x3000,
        args : [MASK_X,MASK_KK]
    },
    {
        key: 6,
        id: 'SNE_VX_KK',
        name: 'SNE',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0x4000,
        args : [MASK_X,MASK_KK]
    },
    {
        key: 7,
        id: 'SE_VX_VY',
        name: 'SE',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x5000,
        args : [MASK_X,MASK_Y]
    },
    {
        key: 8,
        id: 'LD_VX_KK',
        name: 'LD',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0x6000,
        args : [MASK_X,MASK_KK]
    },
    {
        key: 9,
        id: 'ADD_VX_KK',
        name: 'LD',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0x7000,
        args : [MASK_X,MASK_KK]
    },
    {
        key: 10,
        id: 'LD_VX_VY',
        name: 'LD',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x8000,
        args : [MASK_X,MASK_Y]
    },
    {
        key: 11,
        id: 'OR_VX_VY',
        name: 'OR',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x8001,
        args : [MASK_X,MASK_Y]
    },
    {
        key: 12,
        id: 'AND_VX_VY',
        name: 'AND',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x8002,
        args : [MASK_X,MASK_Y]
    },
    {
        key: 13,
        id: 'XOR_VX_VY',
        name: 'XOR',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x8003,
        args : [MASK_X,MASK_Y]
    },
    {
        key: 14,
        id: 'ADD_VX_VY',
        name: 'ADD',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x8004,
        args : [MASK_X,MASK_Y]
    },
    {
        key: 15,
        id: 'SUB_VX_VY',
        name: 'SUB',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x8005,
        args : [MASK_X,MASK_Y]
    },
    {
        key: 16,
        id: 'SHR_VX_VY',
        name: 'SHR',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x8006,
        args : [MASK_X,MASK_Y]
    },
    {
        key: 17,
        id: 'SUBN_VX_VY',
        name: 'SUBN',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x8007,
        args : [MASK_X,MASK_Y]
    },
    {
        key: 18,
        id: 'SHL_VX_VY',
        name: 'SHL',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x800e,
        args : [MASK_X,MASK_Y]
    },
    {
        key: 19,
        id: 'SNE_VX_VY',
        name: 'SNE',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x9000,
        args : [MASK_X,MASK_Y]
    },
    {
        key: 20,
        id: 'LD_I_ADDR',
        name: 'LD',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0xa000,
        args : [MASK_NNN]
    },
    {
        key: 21,
        id: 'JP_V0_ADDR',
        name: 'JP',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0xb000,
        args : [MASK_NNN]
    },
    {
        key: 22,
        id: 'RND_VX',
        name: 'RND',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0xc000,
        args : [MASK_X,MASK_KK]
    },
    {
        key: 23,
        id: 'DRW_VX_VY_N',
        name: 'DRW',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0xd000,
        args : [MASK_X,MASK_Y,MASK_N]
    },
    {
        key: 24,
        id: 'SKP_VX',
        name: 'SKP',
        mask: 0xf0ff,
        pattern: 0xe09e,
        args : [MASK_X]
    },
    {
        key: 25,
        id: 'SKNP_VX',
        name: 'SKNP',
        mask: 0xf0ff,
        pattern: 0xe0a1,
        args : [MASK_X]
    },
    {
        key: 26,
        id: 'LD_VX_DT',
        name: 'LD',
        mask: 0xf0ff,
        pattern: 0xf007,
        args : [MASK_X]
    },
    {
        key: 27,
        id: 'LD_VX_K',
        name: 'LD',
        mask: 0xf0ff,
        pattern: 0xf00a,
        args : [MASK_X]
    },
    {
        key: 28,
        id: 'LD_DT_VX',
        name: 'LD',
        mask: 0xf0ff,
        pattern: 0xf015,
        args : [MASK_X]
    }, 
    {
        key: 29,
        id: 'LD_ST_VX',
        name: 'LD',
        mask: 0xf0ff,
        pattern: 0xf018,
        args : [MASK_X]
    }, 
    {
        key: 30,
        id: 'ADD_I_VX',
        name: 'ADD',
        mask: 0xf0ff,
        pattern: 0xf01e,
        args : [MASK_X]
    }, 
    {
        key: 31,
        id: 'LD_F_VX',
        name: 'LD',
        mask: 0xf0ff,
        pattern: 0xf029,
        args : [MASK_X]
    }, 
    {
        key: 32,
        id: 'LD_B_VX',
        name: 'LD',
        mask: 0xf0ff,
        pattern: 0xf033,
        args : [MASK_X]
    }, 
    {
        key: 33,
        id: 'LD_I_VX',
        name: 'LD',
        mask: 0xf0ff,
        pattern: 0xf055,
        args : [MASK_X]
    }, 
    {
        key: 34,
        id: 'LD_VX_I',
        name: 'LD',
        mask: 0xf0ff,
        pattern: 0xf065,
        args : [MASK_X]
    }, 

];