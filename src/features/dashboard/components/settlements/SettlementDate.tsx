import { SettlementDateProps } from '../../types/model';

export const SettlementDate = ({
  dayType,
  period,
  startDate,
  endDate,
  year,
  month,
}: SettlementDateProps) => {
  switch (dayType) {
    case 'DAILY':
      return <div>{period}</div>;

    case 'WEEKLY':
      return (
        <div>
          {startDate} ~ {endDate}
        </div>
      );

    case 'MONTHLY':
      return (
        <div>
          {year}년 {month}월
        </div>
      );

    case 'YEARLY':
      return <div>{year}년</div>;

    default:
      return null;
  }
};
