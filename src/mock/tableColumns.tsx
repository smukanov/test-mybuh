import { Column } from "react-table";
import Switch from 'react-switch';

const socialStatusLabels: any = {
    resident: 'Резидент',
    pensioner: 'Пенсионер',
    invalid: 'Инвалид',
    motherOfManyChildren: 'Многодетная мать',
};

export const tableColumns: Array<Column> = [
    {
      Header: 'ID', 
      accessor: 'id',
      Cell: () => null,
    },
    {Header: 'ФИО', accessor: 'name'},
    {Header: 'Должность', accessor: 'position'},
    {
      Header: 'Социальный статус', 
      accessor: 'socialStatus',
      Cell: ({value}) => (
        <div className="socialStatusStyle">
          {Object.entries(value).map(([statusName, statusValue], ind) => (
            <div key={ind}>
              <span>{socialStatusLabels[statusName]}</span>
              <Switch onChange={() => {}} checked={statusValue as boolean}/>
            </div>
          ))}
        </div>
      )
    },
    {
      Header: 'Зарплаты',
      accessor: 'salaries',
      Cell: ({value}: {value: Array<{sum: number, date: string}>}) => (
        <div className="salariesStyle">
          {value.map(({sum, date}, ind) => (
            <div key={ind}>
              <div>
                <div>{sum.toLocaleString()} тг.</div>
                <div className="date">{date}</div>
              </div>
              <div className="crossStyle"></div>
            </div>
          ))}
          <button>Добавить оклад</button>
        </div>
      )
    }
];