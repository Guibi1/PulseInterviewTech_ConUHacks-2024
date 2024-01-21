import type { CustomThemeConfig } from "@skeletonlabs/tw-plugin";

export const customTheme: CustomThemeConfig = {
    name: "customTheme",
    properties: {
        // =~= Theme Properties =~=
        "--theme-font-family-base": `system-ui`,
        "--theme-font-family-heading": `system-ui`,
        "--theme-font-color-base": "0 0 0",
        "--theme-font-color-dark": "255 255 255",
        "--theme-rounded-base": "9999px",
        "--theme-rounded-container": "8px",
        "--theme-border-base": "2px",
        // =~= Theme On-X Colors =~=
        "--on-primary": "0 0 0",
        "--on-secondary": "0 0 0",
        "--on-tertiary": "255 255 255",
        "--on-success": "0 0 0",
        "--on-warning": "0 0 0",
        "--on-error": "255 255 255",
        "--on-surface": "0 0 0",
        // =~= Theme Colors  =~=
        // primary | #62a0ea
        "--color-primary-50": "231 241 252", // #e7f1fc
        "--color-primary-100": "224 236 251", // #e0ecfb
        "--color-primary-200": "216 231 250", // #d8e7fa
        "--color-primary-300": "192 217 247", // #c0d9f7
        "--color-primary-400": "145 189 240", // #91bdf0
        "--color-primary-500": "98 160 234", // #62a0ea
        "--color-primary-600": "88 144 211", // #5890d3
        "--color-primary-700": "74 120 176", // #4a78b0
        "--color-primary-800": "59 96 140", // #3b608c
        "--color-primary-900": "48 78 115", // #304e73
        // secondary | #faaa3e
        "--color-secondary-50": "254 242 226", // #fef2e2
        "--color-secondary-100": "254 238 216", // #feeed8
        "--color-secondary-200": "254 234 207", // #feeacf
        "--color-secondary-300": "253 221 178", // #fdddb2
        "--color-secondary-400": "252 196 120", // #fcc478
        "--color-secondary-500": "250 170 62", // #faaa3e
        "--color-secondary-600": "225 153 56", // #e19938
        "--color-secondary-700": "188 128 47", // #bc802f
        "--color-secondary-800": "150 102 37", // #966625
        "--color-secondary-900": "123 83 30", // #7b531e
        // tertiary | #252aaa
        "--color-tertiary-50": "222 223 242", // #dedff2
        "--color-tertiary-100": "211 212 238", // #d3d4ee
        "--color-tertiary-200": "201 202 234", // #c9caea
        "--color-tertiary-300": "168 170 221", // #a8aadd
        "--color-tertiary-400": "102 106 196", // #666ac4
        "--color-tertiary-500": "37 42 170", // #252aaa
        "--color-tertiary-600": "33 38 153", // #212699
        "--color-tertiary-700": "28 32 128", // #1c2080
        "--color-tertiary-800": "22 25 102", // #161966
        "--color-tertiary-900": "18 21 83", // #121553
        // success | #84cc16
        "--color-success-50": "237 247 220", // #edf7dc
        "--color-success-100": "230 245 208", // #e6f5d0
        "--color-success-200": "224 242 197", // #e0f2c5
        "--color-success-300": "206 235 162", // #ceeba2
        "--color-success-400": "169 219 92", // #a9db5c
        "--color-success-500": "132 204 22", // #84cc16
        "--color-success-600": "119 184 20", // #77b814
        "--color-success-700": "99 153 17", // #639911
        "--color-success-800": "79 122 13", // #4f7a0d
        "--color-success-900": "65 100 11", // #41640b
        // warning | #e5a50a
        "--color-warning-50": "251 242 218", // #fbf2da
        "--color-warning-100": "250 237 206", // #faedce
        "--color-warning-200": "249 233 194", // #f9e9c2
        "--color-warning-300": "245 219 157", // #f5db9d
        "--color-warning-400": "237 192 84", // #edc054
        "--color-warning-500": "229 165 10", // #e5a50a
        "--color-warning-600": "206 149 9", // #ce9509
        "--color-warning-700": "172 124 8", // #ac7c08
        "--color-warning-800": "137 99 6", // #896306
        "--color-warning-900": "112 81 5", // #705105
        // error | #a51d2d
        "--color-error-50": "242 221 224", // #f2dde0
        "--color-error-100": "237 210 213", // #edd2d5
        "--color-error-200": "233 199 203", // #e9c7cb
        "--color-error-300": "219 165 171", // #dba5ab
        "--color-error-400": "192 97 108", // #c0616c
        "--color-error-500": "165 29 45", // #a51d2d
        "--color-error-600": "149 26 41", // #951a29
        "--color-error-700": "124 22 34", // #7c1622
        "--color-error-800": "99 17 27", // #63111b
        "--color-error-900": "81 14 22", // #510e16
        // surface | #f6f5f4
        "--color-surface-50": "254 254 253", // #fefefd
        "--color-surface-100": "253 253 253", // #fdfdfd
        "--color-surface-200": "253 253 252", // #fdfdfc
        "--color-surface-300": "251 251 251", // #fbfbfb
        "--color-surface-400": "249 248 247", // #f9f8f7
        "--color-surface-500": "246 245 244", // #f6f5f4
        "--color-surface-600": "221 221 220", // #dddddc
        "--color-surface-700": "185 184 183", // #b9b8b7
        "--color-surface-800": "148 147 146", // #949392
        "--color-surface-900": "121 120 120", // #797878
    },
};
