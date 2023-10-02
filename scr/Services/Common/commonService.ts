/* eslint-disable no-useless-escape */

/* eslint-disable @typescript-eslint/no-unused-vars */
import moment from 'moment';

import DateTimeFormatConst from '../../Constant/DateTimeFormat';

const commonService = {
    /**
     *
     * @param data
     * @returns boolean
     */
    checkDataExist: function (data: any) {
        if (typeof data === 'number') {
            return true;
        }
        return !(
            (
                data == null ||
                data === undefined ||
                data.length === 0 ||
                Object.keys(data).length === 0
            ) // e.g. {}
        );
    },

    /**
     * @deprecated use wildCardSearch
     * @param data
     * @param keywords
     * @returns search result
     */
    search: function (data: Array<any>, keywords: string) {
        return data.filter((item) =>
            Object.keys(item).some((k) => {
                return (
                    this.checkDataExist(item[k]) &&
                    // item[k].toString().toLowerCase().includes(keywords.toLowerCase())
                    JSON.stringify(item[k])
                        .toLowerCase()
                        .includes(keywords.toLowerCase())
                );
            }),
        );
    },

    /**
     *
     * @param format Default YYYY-MM-DD
     * @returns 1900-01-01
     */
    defaultDate: function (format: string = DateTimeFormatConst.Today) {
        return moment('1900-01-01').format(format);
    },

    /**
     *
     * @param format Default YYYY-MM-DD HH:mm:ss
     * @returns Now datetime string
     */
    now: function (format: string = DateTimeFormatConst.Now) {
        return moment().format(format);
    },

    /**
     *
     * @param formatDefault Default YYYY-MM-DD
     * @returns Today date string
     */
    today: function (format: string = DateTimeFormatConst.Today): string {
        return moment(new Date().toISOString().slice(0, 10)).format(format);
    },

    /**
     *
     * @param date Convert date object
     * @param format Default YYYY-MM-DD
     * @returns Date string
     */
    toDateString: function (
        date: Date | string,
        format: string = DateTimeFormatConst.Today,
    ): string {
        return moment(date).format(format);
    },

    /**
     *
     * @param date Date of birth
     * @returns Age number
     */
    getAge: function (date: string): number {
        var years = moment().diff(this.toDateString(date), 'years');
        return years;
    },

    /**
     *
     * @param array Sorting arry
     * @param key Sorting key
     * @param asc Default Ascending
     * @param DDKey Option
     * @returns Sorted array
     */
    sortByKey: function (
        array: Array<any>,
        key: any,
        asc: boolean = true,
        DDKey: string = '',
    ) {
        // CHANGE REQUEST : ADD ORDERING PARAMETER. DEFAULT ASC.
        //                : function(array: Array<any>, key: any, asc: boolean = true, DDKey: string = '')
        return array.sort(function (a: any, b: any) {
            let x = DDKey ? a[DDKey][key] : a[key];
            let y = DDKey ? b[DDKey][key] : b[key];
            return x < y ? (asc ? -1 : 1) : x > y ? (asc ? 1 : -1) : 0;
        });
    },

    /**
     *
     * @param obj
     * @param keyword
     * @returns boolean
     */
    wildCardSearch(obj: any, keyword: string) {
        for (const [key, value] of Object.entries(obj)) {
            if (JSON.stringify(value).includes(keyword)) {
                return true;
            }
        }
        return false;
    },

    /**
     *
     * @param PhoneNum Phone number
     * @returns boolean
     */
    HKPhoneNumberValidChecking(PhoneNum: string): boolean {
        const tempPhoneNum = PhoneNum.split('');
        const PhoneNoMask = /[\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        return !PhoneNoMask.test(PhoneNum) && tempPhoneNum.length === 8;
    },

    /**
     *
     * @param Email Email
     * @returns boolean
     */
    EmailValidChecking(Email: string): boolean {
        const EmailMask =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return EmailMask.test(Email.toLowerCase());
    },

    /**
     *
     * @param arr Grouping array
     * @param fn
     * @returns
     */
    arrGroup(arr: any, fn: Function) {
        const obj: any = {};
        arr.forEach((item: any) => {
            const key: string = JSON.stringify(fn(item));
            obj[key] = obj[key] || [];
            obj[key].push(item);
        });
        return Object.keys(obj).map((k) => {
            return obj[k];
        });
    },

    /**
     *
     * @param array Grouping list
     * @param key Key
     * @returns Grouped List
     */
    arrGroupByKey(array: any, key: string) {
        return array.reduce(function (rv: any, x: any) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    },

    /**
     *
     * @param list Sorting list
     * @param key Key
     * @returns Sorted list
     */
    arrby(list: any, key: string) {
        let sorted = this.arrGroup(list, (item: any) => {
            return [item[key]];
        });
        return sorted;
    },

    /**
     *
     * @param list Transform list
     * @param key Transform by key
     * @returns Transformed list
     */
    SectionListGroup(list: any, key: string): any[] {
        let tempList = this.arrby(list, key);
        let result: any[] = [];
        tempList.forEach((item) => {
            result.push({ title: item[0][key], data: item });
        });
        return result;
    },

    /**
     *
     * @param ms Delay minimum second (1000ms = 1s)
     * @returns Promise
     */
    sleep(ms: number): Promise<any> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    },
};

export default commonService;
