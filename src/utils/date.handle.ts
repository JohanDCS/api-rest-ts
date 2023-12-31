const horaformat = () => {
    const fechaactual = new Date()
    const fechaformat = fechaactual.toTimeString().split(' ')[0] 
    // Formatear la hora según tus necesidades
    console.log(fechaformat);
    return fechaformat;
}

const FechaFormat= () => {
    const fechaactual = new Date()
    const opcionesFecha = { day: '2-digit', month: '2-digit', year: 'numeric' } as const;
    const fechaLocal = fechaactual.toLocaleDateString('es-ES', opcionesFecha);

    return fechaLocal;
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