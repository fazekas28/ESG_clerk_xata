const processChartData = (data, month = null) => {
 const currentDate = new Date();
 const targetMonth = month || currentDate.getMonth() + 1;
 const filialData = {
  130201: {}, // Volume data for cod_ibama 130201
  150202: {}, // Volume data for cod_ibama 150202
 };

 data.forEach((item) => {
  const itemMonth = new Date(item.data).getMonth() + 1;

  if (itemMonth === targetMonth) {
   const filial = item.link_id.filial;
   const codIbama = item.link_id.cod_ibama;

   if (!filialData[codIbama][filial]) {
    filialData[codIbama][filial] = 0;
   }

   filialData[codIbama][filial] += item.volume;
  }
 });

 const labels = Object.keys(filialData[130201]); // Assuming both cod_ibama values have the same filials
 const volumes = {
  oleo: Object.values(filialData[130201]),
  filtro: Object.values(filialData[150202]),
 };

 return { labels, volumes };
};

export default processChartData;
