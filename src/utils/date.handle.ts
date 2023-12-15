const horaformat = (fechaActual:Date) => {
    const horaActual = new Date(fechaActual)
    console.log(horaActual);
    const fechaformat = horaActual.toTimeString().split(' ')[0] 
    // Formatear la hora según tus necesidades
    console.log(fechaformat);
    return fechaformat;
}

const FechaFormat= (fechaActual:Date) => {
    const horaActual = new Date(fechaActual)
    const fecha = horaActual.toISOString().split('T')[0];
    const fechaFormat = fecha.split('-');
    const fechaSpanish = fechaFormat[2] + '/' + fechaFormat[1] + '/' + fechaFormat[0];
    console.log(fechaSpanish,fecha)
    return fechaSpanish;
}

const restarHoras = (hora1: string, hora2: string): string => {
    // Convertir las cadenas de texto a objetos Date
    const tiempo1 = new Date(`2000-01-01T${hora1}`);
    const tiempo2 = new Date(`2000-01-01T${hora2}`);

    // Calcular la diferencia en milisegundos
    const diferenciaEnMilisegundos = tiempo1.getTime() - tiempo2.getTime();

    // Crear un nuevo objeto Date con la diferencia
    const resultado = new Date(2000, 0, 1, 0, 0, 0, diferenciaEnMilisegundos);

    // Formatear la hora resultante como HH:mm:ss
    const horas = resultado.getHours().toString().padStart(2, '0');
    const minutos = resultado.getMinutes().toString().padStart(2, '0');
    const segundos = resultado.getSeconds().toString().padStart(2, '0');

    return `${horas}:${minutos}:${segundos}`;
}

export { horaformat, FechaFormat, restarHoras }