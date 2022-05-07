import { SalaryType } from './../../types/salary';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getEmployeesAPI } from "../../mock/data";
import { EmployeeType, SocialStatusType } from "../../types";

export type employeesState = {
  employees: Array<EmployeeType>;
  selectedSalary: SalaryType | null;
  name: {id: number, value: string} | null;
  position: {id: number, value: string} | null;
  selectedEmployeeId: number | null;
  loading: boolean;
};

const initialState: employeesState = {
  employees: [],
  selectedSalary: null,
  name: null,
  position: null,
  selectedEmployeeId: null,
  loading: false,
};

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const res = await getEmployeesAPI();
    return res;
  }
);

export const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    selectEmployee: (state, action: {type: string; payload: number | null}) => {
        state.selectedEmployeeId = action.payload;
    },
    removeEmployee: (state, action: { type: string; payload: number }) => {
      state.employees = state.employees.filter(
        ({ id }) => id !== action.payload
      );
    },
    addEmployee: (state) => {
        const newEmployee: EmployeeType = {
            id: state.employees.reduce((prev, cur) => (
                cur.id > prev.id ? cur : prev
            )).id + 1,
            name: 'noname',
            position: 'noposition',
            socialStatus: {
                resident: false,
                pensioner: false,
                invalid: false,
                motherOfManyChildren: false,
            },
            salaries: [],
        };
        state.employees.push(newEmployee);
    },
    changeEmployeeSocialStatus: (
      state,
      action: {
        type: string;
        payload: { id: number; label: SocialStatusType; value: boolean };
      }
    ) => {
      state.employees = state.employees.map((emp) => {
        if (emp.id === action.payload.id) {
          return {
            ...emp,
            socialStatus: {
              ...emp.socialStatus,
              [action.payload.label]: action.payload.value,
            },
          };
        }
        return emp;
      });
    },
    removeEmployeeSalary: (
      state,
      action: { type: string; payload: { id: number; salaryIndex: number } }
    ) => {
        state.employees = state.employees.map(emp => {
            if(emp.id === action.payload.id){
                return {
                    ...emp,
                    salaries: emp.salaries.filter((_, ind) => ind !== action.payload.salaryIndex),
                }
            }
            return emp;
        })
    },
    setSalary: (state, action: {type: string; payload: SalaryType | null}) => {
        state.selectedSalary = action.payload;
    },
    addSalaryToEmployee: (state, action: {type: string; payload: SalaryType}) => {
        state.employees = state.employees.map(emp => {
            if(emp.id === action.payload.id){
                return {
                    ...emp,
                    salaries: [
                        ...emp.salaries,
                        {
                            sum: action.payload.value,
                            date: new Date().toDateString(),
                        }
                    ]
                }
            }
            return emp;
        })
    },
    changeEmployeeName: (state, action: {type: string; payload: {id: number, value: string} | null}) => {
        state.name = action.payload;
    },
    replaceEmployeeName: (state, action: {type: string; payload: {id: number, value: string}}) => {
        state.employees = state.employees.map(emp => {
            if(emp.id === action.payload.id){
                return {
                    ...emp,
                    name: action.payload.value,
                }
            }
            return emp; 
        });
    },
    changeEmployeePosition: (state, action: {type: string, payload: {id: number, value: string} | null}) => {
        state.position = action.payload;
    },
    replaceEmployeePosition: (state, action: {type: string; payload: {id: number, value: string}}) => {
        state.employees = state.employees.map(emp => {
            if(emp.id === action.payload.id){
                return {
                    ...emp,
                    position: action.payload.value,
                }
            }
            return emp; 
        });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmployees.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.loading = false;
      state.employees = action.payload;
    });
  },
});

export const { 
    selectEmployee,
    removeEmployee, 
    addEmployee,
    changeEmployeeSocialStatus,
    removeEmployeeSalary,
    setSalary,
    addSalaryToEmployee,
    changeEmployeeName,
    replaceEmployeeName,
    changeEmployeePosition,
    replaceEmployeePosition,
} = employeeSlice.actions;

export default employeeSlice.reducer;
