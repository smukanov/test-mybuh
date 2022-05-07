import { FC, useEffect, useMemo } from 'react';
import { Column, useTable } from 'react-table';
import './App.scss';
import Switch from 'react-switch';
import { useSelector } from 'react-redux';
import { 
  fetchEmployees, 
  removeEmployee, 
  changeEmployeeSocialStatus,
  removeEmployeeSalary,
  setSalary,
  addSalaryToEmployee,
  changeEmployeeName,
  replaceEmployeeName,
  changeEmployeePosition,
  replaceEmployeePosition,
  selectEmployee,
  addEmployee
} from './redux/slicers/employeeSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';
import { SocialStatusType } from './types';
import { Input } from './components';

const App:FC = () => {
  const { 
    loading, 
    employees, 
    selectedSalary,
    name,
    position,
    selectedEmployeeId,
  } = useSelector(({loading, employees, selectedSalary, name, position, selectedEmployeeId}: RootState) => ({
    loading, 
    employees, 
    selectedSalary,
    name,
    position,
    selectedEmployeeId
  }));

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, []);

  const removeEmployeeByID = (id: number) => {
    dispatch(removeEmployee(id));
  };

  const changeEmployeeSalaryByID = (id: number | null, value: number = 0) => {
    if(!id){
      dispatch(setSalary(null));
      return;
    }
    dispatch(setSalary({id, value}));
  };

  const changeEmployeeSocialStatusByID = (id: number, {label, value}: {label: SocialStatusType, value: boolean}) => {
    dispatch(changeEmployeeSocialStatus({id, label, value}));
  };

  const removeEmployeeSalaryByID = (id: number, salaryIndex: number) => {
    dispatch(removeEmployeeSalary({id, salaryIndex}));
  };

  const addSalaryByID = (id: number, value: number) => {
    dispatch(addSalaryToEmployee({id, value}));
  };

  const changeEmployeeNameByID = (id: number | null, value: string = '') => {
    if(!id){
      dispatch(changeEmployeeName(null));
      return;
    }
    dispatch(changeEmployeeName({id, value}));
  };

  const replaceEmployeeNameByID = (id: number, value: string) => {
    if(value.trim().length === 0){
      dispatch(replaceEmployeeName({id, value: 'noname'}));
      return;
    }
    dispatch(replaceEmployeeName({id, value}));
  };

  const changeEmployeePositionByID = (id: number | null, value: string = '') => {
    if(!id){
      dispatch(changeEmployeePosition(null));
      return;
    }
    dispatch(changeEmployeePosition({id, value}));
  };

  const replaceEmployeePositionByID = (id: number, value: string) => {
    if(value.trim().length === 0){
      dispatch(replaceEmployeePosition({id, value: 'noposition'}));
      return;
    }
    dispatch(replaceEmployeePosition({id, value}));
  };

  const selectEmployeeByID = (id: number | null) => {
    dispatch(selectEmployee(id));
  };

  const resetAllProps = () => {
    changeEmployeeNameByID(null);
    changeEmployeePositionByID(null);
    changeEmployeeSalaryByID(null);
  };

  const addEmployeeToEmployees = () => {
    dispatch(addEmployee());
  };

  const displayEmployees = () => {
    console.log(employees);
  };

  const socialStatusLabels: any = {
    resident: 'Резидент',
    pensioner: 'Пенсионер',
    invalid: 'Инвалид',
    motherOfManyChildren: 'Многодетная мать',
  };

  const columns = useMemo<Array<Column>>(() => [
    {
      Header: 'ID', 
      accessor: 'id',
      Cell: () => null,
    },
    {
      Header: 'ФИО',
      accessor: 'name',
      Cell: (row) => {
        const {
          value,
          row: {
            values: {id},
          }
        } = row;
        return (
          <div>
            {name?.id !== id
              ? <div 
                  style={{
                    cursor: 'pointer',
                    color: selectedEmployeeId === id ? '#2782EE' : '',
                  }}
                  onClick={() => {
                    if(selectedEmployeeId !== id){
                      return;
                    }
                    changeEmployeeNameByID(id);
                  }}>
                    {value}
                </div>
              : <Input 
                  value={name?.value}
                  onChange={e => changeEmployeeNameByID(id, e.target.value)}
                  onOkBtnClick={() => {
                    replaceEmployeeNameByID(id, name!.value);
                    changeEmployeeNameByID(null);
                  }}
                  onCancelBtnClick={() => {
                    changeEmployeeNameByID(null);
                  }}/>}
          </div>
        )
      }
    },
    {
      Header: 'Должность', 
      accessor: 'position',
      Cell: (row) => {
        const {
          row: {
            values: {id},
          },
          value,
        } = row;
        return (
          <div className='positionStyle'>
          {position?.id !== id
            ? <div
                style={{
                  cursor: 'pointer',
                  color: selectedEmployeeId === id ? '#2782EE' : '',
                }}
                onClick={() => {
                  if(selectedEmployeeId !== id){
                    return;
                  }
                  changeEmployeePositionByID(id);
                }}>
                  {value}
              </div>
            : <Input 
            value={position?.value}
            onChange={e => changeEmployeePositionByID(id, e.target.value)}
            onOkBtnClick={() => {
              replaceEmployeePositionByID(id, position!.value);
              changeEmployeePositionByID(null);
            }}
            onCancelBtnClick={() => {
              changeEmployeePositionByID(null);
            }}/>}
        </div>
        )
      }
    },
    {
      Header: 'Социальный статус', 
      accessor: 'socialStatus',
      Cell: (row) => {
        const { 
          row: {
            values: {
              id
            }
          },
          value,
         } = row;
        return (
          <div className="socialStatusStyle">
          {Object.entries(value).map(([statusName, statusValue], ind) => (
            <div key={ind}>
              <span>{socialStatusLabels[statusName]}</span>
              <Switch onChange={() => {
                changeEmployeeSocialStatusByID(id, {
                  label: statusName as SocialStatusType,
                  value: !statusValue as boolean,
                })
                }} 
              checked={statusValue as boolean}
              disabled={selectedEmployeeId !== id}/>
            </div>
          ))}
        </div>
        )
      }
    },
    {
      Header: 'Зарплаты',
      accessor: 'salaries',
      Cell: (row) => {
        const {
          row: {
            values: {
              id,
            }
          },
        } = row;
        return (
          <div className="salariesStyle">
          {row.value.map((value: {sum: number, date: string}, ind: number) => (
            <div className='salary' key={ind}>
              <div>
                <div>{value.sum.toLocaleString()} тг.</div>
                <div className="date">{value.date}</div>
              </div>
              {selectedEmployeeId === id && (
                <div 
                className="crossStyle"
                onClick={() => removeEmployeeSalaryByID(id, ind)}></div>
              )}
            </div>
          ))}
          {selectedSalary?.id !== id 
            ? selectedEmployeeId === id ? <button onClick={() => changeEmployeeSalaryByID(id)}>Добавить оклад</button> : null
            : (
              <Input 
                value={selectedSalary?.value}
                onChange={e => {
                  changeEmployeeSalaryByID(id, +e.target.value.replace(/\D/g, ""));
                }}
                onOkBtnClick={() => {
                  addSalaryByID(id, selectedSalary!.value);
                  changeEmployeeSalaryByID(null);
                }}
                onCancelBtnClick={() => {
                  changeEmployeeSalaryByID(null);
                }}/>
            )}
        </div>
        )
      }
    }
], [selectedSalary, selectedEmployeeId, name, position]);

  const data = useMemo(() => employees, [employees]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({columns, data, initialState: {hiddenColumns: ['id']}}, (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: 'actions',
        Header: 'Действия',
        Cell: ({row}) => {
          const {
            values: {
              id
            }
          } = row;
          return (
            <div className='actionsStyle'>
              <button className='copyBtn'>Скопировать</button>
              {selectedEmployeeId === id 
                ? <button 
                  className='saveBtn'
                  onClick={() => {
                    resetAllProps();
                    selectEmployeeByID(null);
                  }}>
                    Сохранить
                </button>
                : <button 
                    className='editBtn'
                    onClick={() => {
                      resetAllProps();
                      selectEmployeeByID(id)
                    }}>
                      Изменить
                  </button>}
              <button 
                className='deleteBtn'
                onClick={() => removeEmployeeByID(id)}
                >
                  Удалить
              </button>
            </div>
          )
        }
      }
    ])
  });

  if(loading){
    return (
      <div className='loader'>
        Подождите...
      </div>
    )
  }

  return (
    <div className='App'>
      <div className='tableHeader'>
        <div className='container'>
        <div className='tableHeader__inner'>
          <h1>Работники</h1>
          <div>
            <button
              onClick={addEmployeeToEmployees}>
              Добавить работника
            </button>
          </div>
        </div>
        </div>
      </div>
      <div className='content'>
      <div className='container'>
      <table {...getTableProps()} className='customTable'>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
      </div>
      </div>
      <div className='tableFooter'>
      <div className='container'>
          <button onClick={displayEmployees}>Сохранить</button>
        </div>
      </div>
    </div>
  )
}

export default App;

