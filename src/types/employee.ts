export type EmployeeType = {
    id: number,
    name: string;
    position: string;
    socialStatus: {
        resident: boolean;
        pensioner: boolean;
        invalid: boolean;
        motherOfManyChildren: boolean;
    };
    salaries: Array<{date: string; sum: number}>;
};