export const sumVolumesByMonthAndIbama = (data, targetMonth = null) => {
 const currentDate = new Date();
 const currentMonth = currentDate.getMonth() + 1; 
 const selectedMonth = targetMonth || currentMonth;

 const filteredData130201 = data.filter((item) => {
  const itemMonth = new Date(item.data).getMonth() + 1; 
  return itemMonth === selectedMonth && item.link_id.cod_ibama === 130201;
 });

 const totalVolume130201 = filteredData130201.reduce((acc, item) => acc + item.volume, 0);

 const filteredData150202 = data.filter((item) => {
  const itemMonth = new Date(item.data).getMonth() + 1; 
  return itemMonth === selectedMonth && item.link_id.cod_ibama === 150202;
 });

 const totalVolume150202 = filteredData150202.reduce((acc, item) => acc + item.volume, 0);

 return {
  totalVolume130201,
  totalVolume150202,
 };
};
