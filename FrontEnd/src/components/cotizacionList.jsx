import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { URL_API } from '../config';


const cotizacionList = () => {
  
    const url = URL_API;
    const [cotizaciones, setCotizaciones] = useState([]);
    const [id, setId] = useState('');
    const [cedula, setcedula] = useState('');
    const [nombre, setnombre] = useState('');
    const [correo, setcorreo] = useState('');
    const [valorMercancia, setvalorMercancia] = useState('');
    const [numeroContenedores, setnumeroContenedores] = useState('');
    const [tipoContenedor, settipoContenedor] = useState('');
    const [paisOrigen, setpaisOrigen] = useState('');
    const [paisDestino, setpaisDestino] = useState('');
    const [valorServicio, setvalorServicio] = useState('');

    const [tituloModal, setTituloModal] = useState('');
    const [tipoMod, setTipoMod] = useState('');

    const getCotizaciones = async () => {
      try {
        const { data } = await axios.get(url);
        setCotizaciones(data);
        console.log(data)
      } catch (error) {
        console.error("Error:", error);
      }
    }

    const ModalCrearActulizar = (tipoMod, data) => {
      setId('');
      setcedula('');
      setnombre('');
      setcorreo('');
      setvalorMercancia('');
      setnumeroContenedores('');
      settipoContenedor('');
      setpaisOrigen('');
      setpaisDestino('');
      setvalorServicio('');
      setTipoMod(tipoMod);
      
      setTituloModal(tipoMod == 'create' ? 'Crear Cotizacion' : 'Actualizar Cotizacion #'+data.id);
      
      if(tipoMod == 'update'){
        setId(data.id);
        setcedula(data.cedula);
        setnombre(data.nombre);
        setcorreo(data.correo);
        setvalorMercancia(data.valormercancia);
        setnumeroContenedores(data.numerocontenedores);
        settipoContenedor(data.tipocontenedor);
        setpaisOrigen(data.paisorigen);
        setpaisDestino(data.paisdestino);
        setvalorServicio(data.valorservicio);
      }
        
    }

    const guardarCotizacion = async (parametros) => {
      try {
        const { data } = await axios.post(url, parametros);

        if(data.estado == 1){

          getCotizaciones();
          document.getElementById('btnCerrar').click();

          Swal.fire({
            title: "success",
            text: data.message,
            icon: "success"
          });

        }else{

          Swal.fire({
            title: "error",
            text: data.message,
            icon: "error"
          });

        }

      } catch (error) {
        console.error("Error :", error);
      }
    }

    const actulizarCotizacion = async (parametros) => {
      try {
        const { data } = await axios.put(url+'/'+id, parametros);

        //console.log(data);

        if(data.estado == 1){

          getCotizaciones();
          document.getElementById('btnCerrar').click();

          Swal.fire({
            title: "success",
            text: data.message,
            icon: "success"
          });

        }else{

          Swal.fire({
            title: "error",
            text: data.message,
            icon: "error"
          });

        }

      } catch (error) {
        console.error("Error:", error);
      }
    }

    const eliminarCotizacion = async (idCoti) => {
      const confirmacion = await Swal.fire({
        title: "¿Seguro que quieres eliminarlo?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
      });
    
      if (confirmacion.isConfirmed) {
        try {
          const { data } = await axios.delete(`${url}/${idCoti}`);
    
          if (data.estado === 1) {
            getCotizaciones(); // Recargar datos
            document.getElementById("btnCerrar").click();
    
            await Swal.fire({
              title: "Eliminado",
              text: data.message,
              icon: "success"
            });
    
          } else {
            await Swal.fire({
              title: "Error",
              text: data.message,
              icon: "error"
            });
          }
    
        } catch (error) {
          console.error("Error al eliminar:", error);
        }
      }
    };

    const activarCotizacion = async (idCoti) => {
      try {
        const { data } = await axios.put(url+'/active/'+idCoti);

        //console.log(data);

        if(data.estado == 1){

          getCotizaciones();
          document.getElementById('btnCerrar').click();

          Swal.fire({
            title: "success",
            text: data.message,
            icon: "success"
          });

        }else{

          Swal.fire({
            title: "error",
            text: data.message,
            icon: "error"
          });

        }

      } catch (error) {
        console.error("Error:", error);
      }
    }

    const validarCampos = () => {
      if(cedula == ''){

        Swal.fire({
          title: "Warning",
          text: "Falta el campo CEDULA",
          icon: "warning"
        });

      }else if(nombre == '') {

        Swal.fire({
          title: "Warning",
          text: "Falta el campo NOMBRE",
          icon: "warning"
        });

      }else if(correo == '') {

        Swal.fire({
          title: "Warning",
          text: "Falta el campo CORREO",
          icon: "warning"
        });

      }else if(valorMercancia == '') {

        Swal.fire({
          title: "Warning",
          text: "Falta el campo VALOR MERCANCIA",
          icon: "warning"
        });

      }else if(numeroContenedores == '') {

        Swal.fire({
          title: "Warning",
          text: "Falta el campo NUMERO DE CONTENEDORES",
          icon: "warning"
        });

      }else if(tipoContenedor == '') {

        Swal.fire({
          title: "Warning",
          text: "Falta el campo TIPO DE CONTENEDOR",
          icon: "warning"
        });

      }else if(paisOrigen == '') {

        Swal.fire({
          title: "Warning",
          text: "Falta el campo PAIS ORIGEN",
          icon: "warning"
        });

      }else if(paisDestino == '') {

        Swal.fire({
          title: "Warning",
          text: "Falta el campo PAIS DESTINO",
          icon: "warning"
        });

      }else if(valorServicio == '') {

        Swal.fire({
          title: "Warning",
          text: "Falta el campo VALOR SERVICIO",
          icon: "warning"
        });

      }else {

        var parametros = {
          cedula: cedula, 
          nombre: nombre,
          correo: correo,
          valorMercancia: valorMercancia,
          numeroContenedores: numeroContenedores,
          tipoContenedor: tipoContenedor,
          paisOrigen: paisOrigen,
          paisDestino: paisDestino,
          valorServicio: valorServicio
        }

        if(tipoMod == 'create'){

          guardarCotizacion(parametros);

        }else {

          actulizarCotizacion(parametros);

        }

      }


    }

    useEffect(() => {
        getCotizaciones();
    }, []);


  return (
    <div className='App'>

      <div className="container-fluid">
        <div className="row mt-3 justify-content-center">
          <div className="col-md-4 d-flex justify-content-center">
            <button 
              type="button" 
              className="btn btn-primary" 
              data-bs-toggle="modal" 
              data-bs-target="#modalCreate" 
              data-bs-whatever="@mdo"
              onClick={() => ModalCrearActulizar('create')}
            >
              <i className="bi bi-send-plus"></i> Crear Cotización
            </button>
          </div>
        </div>

        <div className="row mt-3 justify-content-center">
          <div className="col-md-8"> {/* Ajusta el ancho de la tabla */}
            <table className="table table-bordered  table-hover table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Cedula</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Pais Origen</th>
                  <th scope="col">Pais Destino</th>
                  <th scope="col">Valor Servicio</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>

                {cotizaciones.length > 0 ? (
                  
                    cotizaciones.map((cotizacion, id) => (

                      <tr key={cotizacion.id}>
                        <th scope="row">{cotizacion.id}</th>
                        <td>{cotizacion.cedula}</td>
                        <td>{cotizacion.nombre}</td>
                        <td>{cotizacion.correo}</td>
                        <td>{cotizacion.paisorigen}</td>
                        <td>{cotizacion.paisdestino}</td>
                        <td>${new Intl.NumberFormat('es-CO').format(cotizacion.valorservicio)}</td>
                        <td>{ cotizacion.estado == 1 ? <span className="badge rounded-pill text-bg-success">Vigente</span> : <span className="badge rounded-pill text-bg-danger">Eliminado</span>}</td>
                        <td>
                          {cotizacion.estado == 1 ? (
                            <div className="d-grid gap-1 d-md-block">

                              <button className="btn btn-warning" type="button" 
                              data-bs-toggle="modal" 
                              data-bs-target="#modalCreate" 
                              data-bs-whatever="@mdo"
                              onClick={() => ModalCrearActulizar('update', cotizacion)}>
                              <i className="bi bi-pencil-square"></i>
                              </button>

                              <button className="btn btn-danger mx-1" type="button" onClick={ () => eliminarCotizacion(cotizacion.id) }>
                                <i className="bi bi-trash3-fill"></i>
                              </button>
                            </div>
                          ) : (
                            <td>
                              <button className="btn btn-success" type="button" onClick={ () => activarCotizacion(cotizacion.id) }>
                              <i className="bi bi-arrow-up-circle"></i>
                              </button>
                            </td>
                          )}
                        </td>
                      </tr>
                    ))
                  

                ) : (

                  <tr>
                    <td colspan="12" className="text-center">No hay datos</td>
                  </tr>

                )}

                  <tr>
                    <td colspan="12" className="text-center" scope="col">{ cotizaciones.length }</td>
                  </tr>
                


              </tbody>
            </table>
          </div>
        </div>

      </div>

      <div className="modal fade" id="modalCreate" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{ tituloModal }</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
              <div className="row">
                  <input type="hidden" id="id" value={id} onChange={(e) => setId(e.target.value) }/>
                  <div className="col-md-3">
                    <label className="col-form-label">Cedula:</label>
                    <input type="number" className="form-control" id="cedula" placeholder='ingresar Cedula' value={cedula} onChange={(e) => setcedula(e.target.value) }/>
                  </div>
                  <div className="col-md-5">
                    <label className="col-form-label">Nombre:</label>
                    <input type="text" className="form-control" id="nombre" placeholder='ingresar Nombre' value={nombre} onChange={(e) => setnombre(e.target.value) }/>
                  </div>
                  <div className="col-md-4">
                    <label className="col-form-label">Correo:</label>
                    <input type="email" className="form-control" id="correo" placeholder='ingresar Correo' value={correo} onChange={(e) => setcorreo(e.target.value) }/>
                  </div>
                </div>

                <div className="row mt-3">

                  <div className="col-md-4">
                    <label className="col-form-label">Valor Mercancia:</label>
                    <input type="number" className="form-control" id="valorMercancia" placeholder='ingresar Valor Mercancia' value={valorMercancia} onChange={(e) => setvalorMercancia(e.target.value) }/>
                  </div>

                  <div className="col-md-4">
                    <label className="col-form-label">Numero De Contenedores:</label>
                    <input type="number" className="form-control" id="numeroContenedores" placeholder='ingresar Numero de Contenedores' value={numeroContenedores} onChange={(e) => setnumeroContenedores(e.target.value) }/>
                  </div>

                  <div className="col-md-4">
                    <label className="col-form-label">Tipo Contenedor:</label>
                    <select id="tipoContenedor" className="form-control" value={tipoContenedor} onChange={(e) => settipoContenedor(e.target.value) }>
                      <option selected="">Tipo...</option>
                      <option value="20FT">20FT</option>
                      <option value="40FT">40FT</option>
                    </select>
                  </div>
                </div>

                <div className="row mt-3">

                  <div className="col-md-4">
                    <label className="col-form-label">Pais Origen:</label>
                    <select id="paisOrigen" className="form-control" value={paisOrigen} onChange={(e) => setpaisOrigen(e.target.value) }>
                      <option selected value="">Pais...</option>
                      <option value="Afghanistan">Afghanistan</option>
                      <option value="Aland Islands">Aland Islands</option>
                      <option value="Albania">Albania</option>
                      <option value="Alemania">Alemania</option>
                      <option value="Algeria">Algeria</option>
                      <option value="American Samoa">American Samoa</option>
                      <option value="Andorra">Andorra</option>
                      <option value="Angola">Angola</option>
                      <option value="Anguilla">Anguilla</option>
                      <option value="Antigua And Barbuda">Antigua And Barbuda</option>
                      <option value="Argentina">Argentina</option>
                      <option value="Armenia">Armenia</option>
                      <option value="Aruba">Aruba</option>
                      <option value="Australia">Australia</option>
                      <option value="Austria">Austria</option>
                      <option value="Azerbaijan">Azerbaijan</option>
                      <option value="Bahamas">Bahamas</option>
                      <option value="Bahrain">Bahrain</option>
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="Barbados">Barbados</option>
                      <option value="Belarus">Belarus</option>
                      <option value="Belgium">Belgium</option>
                      <option value="Belize">Belize</option>
                      <option value="Benin">Benin</option>
                      <option value="Bermuda">Bermuda</option>
                      <option value="Bhutan">Bhutan</option>
                      <option value="Bolivia">Bolivia</option>
                      <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                      <option value="Botswana">Botswana</option>
                      <option value="Brazil">Brazil</option>
                      <option value="Bulgaria">Bulgaria</option>
                      <option value="Burkina Faso">Burkina Faso</option>
                      <option value="Burundi">Burundi</option>
                      <option value="Cambodia">Cambodia</option>
                      <option value="Cameroon">Cameroon</option>
                      <option value="Canada">Canada</option>
                      <option value="Chile">Chile</option>
                      <option value="China">China</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Costa Rica">Costa Rica</option>
                      <option value="Cuba">Cuba</option>
                      <option value="España">España</option>
                      <option value="Estados Unidos">Estados Unidos</option>
                      <option value="Francia">Francia</option>
                      <option value="Holanda">Holanda</option>
                      <option value="India">India</option>
                      <option value="Italia">Italia</option>
                      <option value="Japón">Japón</option>
                      <option value="México">México</option>
                      <option value="Reino Unido">Reino Unido</option>
                      <option value="Rusia">Rusia</option>
                      <option value="Sudáfrica">Sudáfrica</option>
                      <option value="Venezuela">Venezuela</option>
                      <option value="Vietnam">Vietnam</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="col-form-label">Pais Destino:</label>
                    <select id="paisDestino" className="form-control" value={paisDestino} onChange={(e) => setpaisDestino(e.target.value) }>
                      <option selected value="">Pais...</option>
                      <option value="Colombia">Colombia</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="col-form-label">Valor Servicio:</label>
                    <input type="number" className="form-control" id="valorServicio" placeholder='ingresar Valor Mercancia' value={valorServicio} onChange={(e) => setvalorServicio(e.target.value) }/>
                  </div>
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" id="btnCerrar" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              {tipoMod == 'create' ? (
                <button type="button" className="btn btn-success" onClick={ () => validarCampos() }>Guardar Cotizacion</button>
              ) : (
                <button type="button" className="btn btn-warning" onClick={ () => validarCampos() }>Actulizar Cotizacion</button> 
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  )

}

export default cotizacionList