CREATE DATABASE pt_cotizacion;

create table cotizaciones (
    id SERIAL primary key,
    cedula varchar(255),
    nombre varchar(255),
    correo varchar(255),
    valorMercancia varchar(255),
    numeroContenedores int,
    tipoContenedor varchar(20),
    paisOrigen varchar(50),
    paisDestino varchar(50),
    valorServicio varchar(100),
    estado int,
    fechaCreacion timestamp default current_timestamp
);
