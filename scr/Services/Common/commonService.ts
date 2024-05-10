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
    sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    },

    /**
     *
     * @param numString Number of string
     * @returns number
     */
    stringToFloat(numString: string): number {
        return parseFloat(numString.replace(/[^0-9]/g, ''));
    },

    /**
     *
     * @param amount Price number
     * @param toFixed Default round amount to two decimal places
     * @param cur Currency unit default empty string
     * @returns Transformed Price
     */
    formatCurrency: function (
        amount: number,
        cur: string = '',
        toFixed: number = 2,
    ): string {
        return `$${amount
            .toFixed(toFixed)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} ${cur}`;
    },
};

export default commonService;
