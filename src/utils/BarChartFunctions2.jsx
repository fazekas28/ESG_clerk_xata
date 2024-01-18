const filterBarChart2 = (data) => {
 const filteredFiliais = [];
 const totalVolumes = [];

 data.forEach((record) => {
  if (record.link_id.cod_ibama === 150202) {
   filteredFiliais.push(record.link_id.filial);
   totalVolumes.push(record.total_volume)
  }
 });

 totalVolumes.sort((a, b) => a - b);

 return {
  filteredFiliais,
  totalVolumes
 }

}

export default filterBarChart2
