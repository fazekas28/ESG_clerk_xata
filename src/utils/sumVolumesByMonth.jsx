export const sumVolumesByMonth = (data, targetMonth = null) => {
 const currentDate = new Date();
 const currentMonth = currentDate.getMonth() + 1; // Adding 1 because months are zero-based
 const selectedMonth = targetMonth || currentMonth;

 const filteredData = data.filter((item) => {
   const itemMonth = new Date(item.data).getMonth() + 1; // Adding 1 for the same reason as above
   return itemMonth === selectedMonth;
 });

 const totalVolume = filteredData.reduce((acc, item) => acc + item.volume, 0);

 return totalVolume;
};
