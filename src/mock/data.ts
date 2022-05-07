import { EmployeeType } from "../types";

export const employees: Array<EmployeeType> = [
    {
        id: 1,
        name: 'Ибраев Самат Каиркенович',
        position: 'Директор',
        socialStatus: {
            resident: true,
            pensioner: false,
            invalid: false,
            motherOfManyChildren: false,
        },
        salaries: [
            {date: '21.10.2021', sum: 800_000},
        ]
    },
    {
        id: 2,
        name: 'Фадеева Ольга Сергеевна',
        position: 'Главный бухгалтер',
        socialStatus: {
            resident: true,
            pensioner: false,
            invalid: false,
            motherOfManyChildren: true,
        },
        salaries: [
            {date: '21.10.2021', sum: 400_000},
        ]
    },
];

export const getEmployeesAPI = (): Promise<Array<EmployeeType>> => new Promise(res => {
    setTimeout(()=>{
        res(employees);
    },  1000)
})