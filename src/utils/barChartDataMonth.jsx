const processMonthlyData = (filial_name, data) => {
 // Filter data for the given filial_name
 const filteredData = data.filter((item) => item.link_id.filial === filial_name);

 // Extract unique months from the filtered data
 const uniqueMonths = [...new Set(filteredData.map((item) => new Date(item.data).getMonth() + 1))];

 // Initialize an object to store volumes for each month
 const volumesByMonth = {};

 // Calculate volumes for each month
 uniqueMonths.forEach((month) => {
  volumesByMonth[month] = {
   130201: 0,
   150202: 0,
  };

  filteredData.forEach((item) => {
   const itemMonth = new Date(item.data).getMonth() + 1;

   if (itemMonth === month) {
    const codIbama = item.link_id.cod_ibama;
    volumesByMonth[month][codIbama] += item.volume;
   }
  });
 });

 // Convert months to labels
 const labels = uniqueMonths.map((month) => {
  const monthNames = [
   "Jan", "Fev", "Mar", "Apr", "Mai", "Jun", "Jul",
   "Ago", "Set", "Out", "Nov", "Dec",
  ];
  return monthNames[month - 1]; // Adjusting for zero-based months
 });

 // Extract volumes for 130201 and 150202
 const volumes = {
  oleo: uniqueMonths.map((month) => volumesByMonth[month][130201]),
  filter: uniqueMonths.map((month) => volumesByMonth[month][150202]),
 };

 return { labels, volumes };
};

export default processMonthlyData;
