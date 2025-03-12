import e from 'express';
import {pool} from '../db.js';

export const getCotizaciones = async (req, res) => {

    const { rows } = await pool.query('SELECT * from cotizaciones');
    res.send(rows);

}

export const getCotizacion = async (req, res) => {

    const {id} = req.params;
    const { rows } = await pool.query('SELECT * from cotizaciones where id = $1 ORDER BY id ASC', [id]);

    if(rows.length === 0){
        return res.status(404).json({message: 'Cotización no encontrada', estado: 0});
    }

    res.send(rows[0]);

}

export const saveCotizacion = async (req, res) => {
    
    const { cedula, nombre, correo, valorMercancia, numeroContenedores, tipoContenedor, paisOrigen, paisDestino, valorServicio} = req.body;
    const { rows, rowCount } = await pool.query("insert into cotizaciones (cedula, nombre, correo, valorMercancia, numeroContenedores, tipoContenedor, paisOrigen, paisDestino, valorServicio, estado) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, 1) RETURNING *", [cedula, nombre, correo, valorMercancia, numeroContenedores, tipoContenedor, paisOrigen, paisDestino, valorServicio]);

    if(rowCount === 0){
        return res.status(404).json({message: 'No se pudo Guardar la cotización', estado: 0});
    }

    //console.log(rows);

    res.json({message: 'Cotización guardada', estado: 1, result: rows[0]});

}

export const deleteCotizacion = async (req, res) => {

    const {id} = req.params;
    const { rows, rowCount } = await pool.query('UPDATE cotizaciones SET estado = 0 where id = $1 RETURNING *', [id]);

    // muestra la info borrada
    //console.log(rows);

    if(rowCount === 0){
        return res.status(404).json({message: 'No se pudo eliminar la cotización, no existe', estado: 0});
    }

    res.json({message: 'Cotización Eliminada #' + id, estado: 1});

}

export const updateCotizacion =  async (req, res) => {

    const {id} = req.params;

    const { cedula, nombre, correo, valorMercancia, numeroContenedores, tipoContenedor, paisOrigen, paisDestino, valorServicio} = req.body;
    const { rows, rowCount } = await pool.query("UPDATE cotizaciones SET cedula = $1, nombre = $2, correo = $3, valorMercancia = $4, numeroContenedores = $5, tipoContenedor = $6, paisOrigen = $7, paisDestino = $8, valorServicio = $9 WHERE id = $10  RETURNING *", [cedula, nombre, correo, valorMercancia, numeroContenedores, tipoContenedor, paisOrigen, paisDestino, valorServicio, id]);

    if(rowCount === 0){
        return res.status(404).json({message: 'No se pudo actualizar la cotización', estado: 0});
    }

    //console.log(rows);

    res.json({message: 'Cotización actulizada #' + id, estado: 1});

}

export const activeCotizacion = async (req, res) => {

    const {id} = req.params;
    const { rows, rowCount } = await pool.query('UPDATE cotizaciones SET estado = 1 where id = $1 RETURNING *', [id]);

    // muestra la info borrada
    //console.log(rows);

    if(rowCount === 0){
        return res.status(404).json({message: 'No se pudo Activar la cotización, no existe', estado: 0});
    }

    res.json({message: 'Cotización Activada #' + id, estado: 1});

}
