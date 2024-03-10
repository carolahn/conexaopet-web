// entrada: dataHora = '2024-02-28 10:30';
// saída: '28/02/24 10:30'
export const formatarDataHora = (dataHora) => {
  const data = new Date(dataHora);
  
  const dia = data.getDate().toString().padStart(2, '0');
  const mes = (data.getMonth() + 1).toString().padStart(2, '0');
  const ano = data.getFullYear().toString().slice(-2);

  const hora = data.getHours().toString().padStart(2, '0');
  const minuto = data.getMinutes().toString().padStart(2, '0');

  return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
};
  
  
// entrada: dataHora = '2024-02-28 10:30';
// saída: '28/02/24'
export const formatarData = (dataHora) => {
  const data = new Date(dataHora);
  
  const dia = data.getDate().toString().padStart(2, '0');
  const mes = (data.getMonth() + 1).toString().padStart(2, '0');
  const ano = data.getFullYear().toString().slice(-2);

  return `${dia}/${mes}/${ano}`;
};


// entrada: dataHora = '2024-02-28 10:30';
// saída: '10:30'
export const formatarHora = (dataHora) => {
  const data = new Date(dataHora);

  const hora = data.getHours().toString().padStart(2, '0');
  const minuto = data.getMinutes().toString().padStart(2, '0');

  return `${hora}:${minuto}`;
};