/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    //these make ts-jest faster: https://github.com/kulshekhar/ts-jest/issues/259

    //this turns off type checking :o
    // globals: {
    //     'ts-jest': {
    //         isolatedModules: true
    //     }
    // },

    maxWorkers: 1
};
