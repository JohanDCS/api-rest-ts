const convertirHoraACadena24 = (horaCadena: string): Date | null => {
    const partes = horaCadena.match(/(\d+):(\d+)\s([apm]{2})/i);
    
    if (!partes) {
        console.error('Formato de hora no reconocido:', horaCadena);
        return null;
    }

    let [_, horas, minutos, periodo] = partes;

    let horas24 = parseInt(horas, 10);

    if (periodo.toLowerCase() === 'pm' && horas24 !== 12) {
        horas24 += 12;
    } else if (periodo.toLowerCase() === 'am' && horas24 === 12) {
        horas24 = 0;
    }

    return new Date(1970, 0, 1, horas24, parseInt(minutos, 10));
}

const horaformat = () => {
    // Obtener la fecha y hora actual
    const fechaActual: Date = new Date();

    // Extraer la hora y minutos de la fecha actual
    const horaActual: number = fechaActual.getHours();
    const minutosActuales: number = fechaActual.getMinutes();

    // Formatear la hora según tus necesidades
    const horaFormateada: string = `${horaActual}:${minutosActuales}`;
    return horaFormateada;
}

const restarHoras = (hora1: string, hora2: string): string | '' => {
    const fechaBase = new Date(1970, 0, 1); // Se utiliza como referencia para convertir horas a objetos de fecha
    
    const parsearHora = (hora: string): Date | null => {
        const partes = hora.match(/(\d{1,2}):(\d{2})/);

        if (!partes) {
            console.error('Formato de hora no reconocido:', hora);
            return null;
        }

        const [_, horas, minutos] = partes;

        const horas24 = parseInt(horas, 10);
        const minutosNum = parseInt(minutos, 10);

        if (horas24 >= 0 && horas24 < 24 && minutosNum >= 0 && minutosNum < 60) {
            return new Date(fechaBase.getTime() + horas24 * 60 * 60 * 1000 + minutosNum * 60 * 1000);
        } else {
            console.error('Formato de hora no válido:', hora);
            return null;
        }
    };

    const fechaHora1 = parsearHora(hora1);
    const fechaHora2 = parsearHora(hora2);

    if (fechaHora1 && fechaHora2) {
        const diferenciaEnMilisegundos = fechaHora1.getTime() - fechaHora2.getTime();
        const diferencia = new Date(fechaBase.getTime() + diferenciaEnMilisegundos);
        
        return `${diferencia.getUTCHours()}:${diferencia.getUTCMinutes()}:${diferencia.getUTCSeconds()}`;
    } else {
        return '';
    }
}

export { convertirHoraACadena24, horaformat, restarHoras }