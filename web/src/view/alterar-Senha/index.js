import {React, useState, useEffect} from "react";
import Navbar from "../../components/navbar/";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import '../index.css';
import './alterarSenha.css';
import Api from '../../components/api/';
import axios from "axios";
import Cookies from "js-cookie";
import { Redirect } from "react-router";

function AlterarSenha(){

    const [data, setData] = useState([]);
    const [updateData, setUpdateData] = useState(true);
    const [msg, setMsg] = useState(false);
    const [carregando, setCarregando] = useState();
    const [visualizar, setVisualizar] = useState(false);
    const [cliente, setCliente] = useState([]);
    const [usuario, setUsuario] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);

   
    const visu = () => {  
        setVisualizar(!visualizar);
    }
    const campos = ({
        cnome: '',
        csetor: '',
        telefone: '',
        cemail: '',
        csenha: '',
        cliente: ''
    })
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(campos)

    const selecionarUsuario = (item, opcao) => {
        setUsuarioSelecionado(item);
        (opcao === "Editar") && abrirFecharModalEditar() ;
        setVisualizar(false)
    }

    const abrirFecharModalEditar = () => {
        setMsg(false);
        setModalEditar(!modalEditar);
        setVisualizar(false)
       
    }
    const handleChange = e => {
        const { name, value } = e.target;
        setUsuarioSelecionado({
            ...usuarioSelecionado, [name]: value
        });
    }
    const UsuarioPut = async () => {
        setCarregando(1)
        await axios.put(Api + "/usuario/" + usuarioSelecionado.usuarioid, usuarioSelecionado)
        .then(resultado => {
            setCarregando(0)
            setUpdateData(true);
            setTimeout(() => {
                setMsg("Sucesso");
            }, 500)
          
            setTimeout(() => {
                abrirFecharModalEditar();
            }, 3000)
        }).catch(erro => {
            setCarregando(0)
            setTimeout(() => {
                setMsg("Erro");
            }, 500)    
        })
    }
    const usuarioGet = async () => {
        await axios.get(Api + "/usuarios" )
        .then(resultado => {
            setUsuario(resultado.data.filter(usuarioSelecionado =>  usuarioSelecionado.cemail === Cookies.get('cemail')))
        }).catch(error => {
            console.log(error);
        })
    }
    const clinteGet = async () =>{
        await axios.get(Api + '/clientes')
        .then(resultado => {
            setCliente(resultado.data)
        }).catch(error => {
            console.log(error);
        })
    }
   
    useEffect(() => {
        if (updateData) {
            usuarioGet();
            clinteGet();
            setUpdateData(false)
        }
    }, [updateData]);
    
    return(
        <>      
        {!Cookies.get('cemail') && <Redirect to='/' />}
            <Navbar />
            <div className="container-fluid d-flex" id="topo1">               
                <div className="alterarSenha" >                                                                  
                        <form class="form row g-3  border-end-0" >
                            {usuario.map( item=>(
                                <><div key={item.usuarioid}class="input-topo col-md-6">
                                    <label class="form-label">Nome</label> 
                                    <label type="text" class="form-control">{item.cnome}</label>
                                </div>
                                <div class="col-md-6 input-topo">
                                        <label class="form-label">Nivel de acesso</label>
                                        <label type="text" class="form-control">{item.csetor}</label>         
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Cliente</label>
                                    <label name="cliente" type="text" class="form-control">{item.cliente}</label>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Telefone</label>
                                    <label type="tel" class="form-control">{item.telefone}</label>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Email</label>
                                    <label type="email" class="form-control">{item.cemail}</label>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Senha</label>
                                    <label class="form-control">*********</label>
                                </div>
                                <label onClick={() => selecionarUsuario(item, "Editar")} className="editar-usuario btn-block btn btn-primary text-center" title="Editar">Editar</label>
                            </>))}
                        </form> 

                        <Modal isOpen={modalEditar}>
                        <label onClick={abrirFecharModalEditar} class=" fechar-modal mb-5"><i class="modal-fechar fs-2 fas fa-times-circle"></i></label>
                            <ModalHeader>Editar Usuário</ModalHeader>
                            <div className="mensagem-tela">
                                {  msg === 'Sucesso' && <p className="  text-center  bg-success  text-white "><i class="fas fa-check-circle m-2"></i>Dados atualizados com sucesso!</p>}
                                {msg === 'Erro' && <p className="p-1 text-center  lert alert-danger color-weigth " ><i class="fas fa-exclamation-triangle "></i> Não foi possível alterar os dados do usuario.</p>}
                            </div>
                            <ModalBody>
                                <form class="form row g-3  border-end-0" >
                                    <div class="input-topo col-md-6">
                                        <label for="inputEmail4" class="form-label">Nome</label>
                                        <input onChange={handleChange}  name="cnome" type="text" class="form-control"  value={usuarioSelecionado && usuarioSelecionado.cnome} />
                                    </div>
                                    <div class="col-md-6 input-topo">
                                        <label class="form-label">Nivel de acesso</label>
                                        <input  disabled type="text" class="form-control" value={usuarioSelecionado && usuarioSelecionado.csetor} />
                                    </div>
                                    <div class="col-md-6">
                                        <label  class="form-label">Cliente</label>
                                        <select onChange={handleChange} name="cliente" value={usuarioSelecionado && usuarioSelecionado.cliente}  type="text" class="form-select">
                                        <option selected></option>
                                        {cliente.map(item => (
                                            <option>{item.departamento}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="inputZip" class="form-label">Telefone</label>
                                        <input onChange={handleChange}  name="telefone" type="tel" class="form-control" value={usuarioSelecionado && usuarioSelecionado.telefone}/>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="inputZip" class="form-label">Email</label>
                                        <input onChange={handleChange}  name="cemail" type="email" class="form-control" value={usuarioSelecionado && usuarioSelecionado.cemail}/>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="inputZip" class="form-label">Senha</label>
                                        <input onChange={handleChange} pattern=".{6,}"  name="csenha" type={visualizar ? "text" : "password"} class="form-control" value={usuarioSelecionado && usuarioSelecionado.csenha}/>
                                        <label className="visualizar" type="button" onClick={() => visu ()}><i class="fas fa-eye"></i></label>
        
                                    </div>
                                 
                                
                                </form>
                            </ModalBody>
                            <a href="#topo" id="topo1" className="text-decoration-none text-light" title="Voltar ao topo"><i class="fas fa-arrow-up"></i></a>                  

                            <ModalFooter>
                                {   carregando ? <button class="btn btn-secondary " type="button" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...</button>
                                :   <button onClick={() => UsuarioPut()} class="btn btn-primary " type="button">Editar</button>}
                                <button  onClick={() => abrirFecharModalEditar()}  className=" btn  btn-danger" type="button">Cancelar</button>
                            </ModalFooter>
                        </Modal>

                        
                </div>               
            </div>           
        </>
    )
}

export default AlterarSenha;