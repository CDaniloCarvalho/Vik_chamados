import {React, useState, useEffect} from "react";
import Navbar from "../../components/navbar/";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import './usuarios.css';
import Api from '../../components/api/';
import axios from "axios";
import Cookies from "js-cookie";
import { Redirect } from "react-router";
import Logo from "../../components/img/Grupo-14.svg";


function Usuarios(){

    const [data, setData] = useState([]);
    const [modalIncluir, setModalIncluir] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalExcluir, setModalExcluir] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [msg, setMsg] = useState(false);
    const [carregando, setCarregando] = useState();
    const [visualizar, setVisualizar] = useState(false);
    const [cliente, setCliente] = useState([]);
   
    const visu = () => {  
        setVisualizar(!visualizar);
    }
    const campos = ({
        cnome: '',
        csetor: 'Operacional',
        telefone:'',
        cemail:'',
        csenha:'',
        cliente:''
    })
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(campos)
    
    const selecionarUsuario = (item, opcao) => {
        setUsuarioSelecionado(item);
        (opcao === "Editar") ? abrirFecharModalEditar() : abrirFecharModalExcluir();
        setVisualizar(false)
    }

    const abrirFecharModalIncluir = () => {
        setMsg(false);
        setModalIncluir(!modalIncluir);
        setVisualizar(false)
        setUsuarioSelecionado(campos);
    }
    const abrirFecharModalEditar = () => {
        setMsg(false);
        setModalEditar(!modalEditar);
       
    }

    const abrirFecharModalExcluir = () => {
        setMsg(false);
        setModalExcluir(!modalExcluir);
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setUsuarioSelecionado({
            ...usuarioSelecionado, [name]: value
        });
    }
    
    const usuarioGet = async () => {
        await axios.get(Api + "/usuarios")
        .then(resultado => {
            setData(resultado.data);
        }).catch(error => {
            console.log(error);
        })
    }
    const clienteGet = async () => {
        await axios.get(Api + "/clientes")
        .then(resultado => {
            setCliente(resultado.data);
        }).catch(error => {
            console.log(error);
        })
    }
    const usuarioPost = async (e) => {
        e.preventDefault();
        setCarregando(1)
        if(!usuarioSelecionado.cemail || !usuarioSelecionado.csenha || !usuarioSelecionado.cnome || !usuarioSelecionado.telefone || !usuarioSelecionado.csetor){
            setCarregando(0)
            setMsg("vazio");
            setTimeout(() => {
                setMsg(false);
               
            }, 4000)
        }else{
            await axios.post(Api + "/usuario", usuarioSelecionado)
            .then(resultado => {
                setUpdateData(true);
                setTimeout(() => {
                setMsg("Sucesso");
                setCarregando(0)
            }, 500)
                setData(data.concat(resultado.data));
                setTimeout(() => {
                    abrirFecharModalIncluir();
                }, 2000)
                
            }).catch(error => {
                setCarregando(0)
                setTimeout(() => {
                    setMsg("Erro");
                }, 500)
            })        
        }       
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
            }, 2000)
        }).catch(erro => {
            setCarregando(0)
            setTimeout(() => {
                setMsg("Erro");
            }, 500)    
        })
    }

    const UsuarioDelete = async () => {
        setCarregando(1)
        await axios.delete(Api + "/usuario/" + usuarioSelecionado.usuarioid).then(resultado => {
            setData(data.filter(usuarioSelecionado => usuarioSelecionado.usuarioid !== resultado.data))
            setTimeout(() => {
                setMsg('Sucesso');
            }, 500)
            setUpdateData(true)
            setTimeout(() => {
                abrirFecharModalExcluir();
            }, 2000)
            setCarregando(0);
        }).catch(erro => {
            setMsg('Erro');
            setCarregando(0);
        })
    }

    useEffect(() => {
        if (updateData) {
            usuarioGet();
            setUpdateData(false)
            clienteGet();
        }
    }, [updateData]);
    window.onscroll = function() {myFunction()};

    function myFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById("topo1").className = "voltaTopo";
    }else {
        document.getElementById("topo1").className = "voltaTopo2";
      }
    }
    
    return(
        <>
        {Cookies.get('csetor') !== ('Adm') ? <Redirect to='/' /> : ''}
        <div className="container-fluid d-flex" id="topo">
             <Navbar />
            <div className="main">
                <h3 className="text-center ">USUÁRIOS</h3>        
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className="btn btn-usuario btn-home btn-sm btn-lg" data-toggle="modal" data-target=".bd-example-modal-lg" onClick={() => abrirFecharModalIncluir()} ><nobr>Novo</nobr></button>
                </div>
                    <div className=" main2 mx-auto mt-3 shadow-sm rounded">
                        <table className=" form table table-hover border shadow-sm p-3 mb-3 bg-body rounded text-center">
                            <tbody >
                                <tr className="bg-info  ">
                                    <th className="bg-info"><nobr>NOME</nobr></th>
                                    <th className="bg-info"><nobr>NIVEL DE ACESSO</nobr></th>
                                    <th className="bg-info"><nobr>TELEFONE</nobr></th>
                                    <th className="bg-info"><nobr>EMAIL</nobr></th>
                                    <th className="bg-info"><nobr>AÇÕES</nobr></th>

                                </tr>  
                                {data.map(item => (
                                        <>
                                            <tr key={item.usuarioId}>
                                                <td><nobr>{item.cnome}</nobr></td>
                                                <td><nobr>{item.csetor}</nobr></td>
                                                <td><nobr>{item.telefone}</nobr></td>
                                                <td><nobr>{item.cemail}</nobr>&nbsp;&nbsp;</td>
                                                { Cookies.get ('csetor') == ("Adm") ?<>
                                                <td><nobr><button onClick={() => selecionarUsuario(item, "Excluir")} className="remover-detalhe btn" type="button"><i class="fas fa-trash-alt"></i></button>
                                                <button onClick={() => selecionarUsuario(item, "Editar")} className="editar-detalhe btn" title="+ Detalhes"><i class=" icone-editar fas fa-edit"></i></button></nobr></td>
                                                </>: <td ><i class="fas fa-chevron-circle-left"></i></td>}
                                            </tr>
                                        </>
                                    ))}
                            </tbody>
                        </table>
                    </div>       
                <div class="d-grid gap-2 d-md-flex justify-content-md-end col-md-6">
                </div>   
                <button className="  btn btn-novo2 " onClick={() => abrirFecharModalIncluir()} ><nobr>Novo</nobr></button>
                <a href="#topo" id="topo1" className="text-decoration-none text-light" title="Voltar ao topo"><i class="fas fa-arrow-up"></i></a>                  
                <Modal isOpen={modalIncluir}>
                <label onClick={abrirFecharModalIncluir} class=" fechar-modal mb-5"><i class="modal-fechar fs-2 fas fa-times-circle"></i></label>
                    <ModalHeader>Novo Usuário</ModalHeader>
                    <div className="mensagem-tela">
                        {  msg === 'Sucesso' && <p className="  text-center  bg-success  text-white "><i class="fas fa-check-circle m-2"></i>Cadastro realizado com sucesso!</p>}
                        {msg === 'Erro' && <p className="p-1 text-center  lert alert-danger color-weigth " ><i class="fas fa-exclamation-triangle "></i> Não foi possível realizar o cadastro.</p>}
                        {msg === 'vazio' && <p className="p-1 text-center  lert alert-danger color-weigth " ><i class="fas fa-exclamation-triangle "></i> Preencha todos os campos para concluir o cadastro.</p>}
                    </div>
                    <ModalBody>
                        <form class="form row g-3  border-end-0" onSubmit={usuarioPost} >
                            <div class="input-topo col-md-6">
                                <label for="inputEmail4" class="form-label">Nome</label>
                                <input onChange={handleChange} name="cnome" type="text" class="form-control" />
                            </div>
                            <div class="col-md-6 input-topo">
                                <label class="form-label">Nivel de acesso</label>
                                <select onChange={handleChange}  name="csetor" type="text" class="form-select">
                                <option>Operacional</option>
                                <option>Facilites</option>
                                <option>Rh</option>
                                </select>
                            </div>
                            <div class="col-md-6 input-topo">
                                <label class="form-label">Cliente</label>
                                <select onChange={handleChange} name="cliente" type="text" class="form-select" >
                                    <option selected>Selecione uma opção</option>
                                    {cliente.map(item => (
                                        <option>{item.departamento}</option>
                                    ))}
                                </select>
                            </div>   
                            <div class="col-md-6">
                                <label for="inputZip" class="form-label">Telefone</label>
                                <input onChange={handleChange} name="telefone" type="tel" pattern="[(]{0,1}[0-9]{2,3}[)]{0,1}[-]{0,2}[0-9,-]{8,10}" class="form-control" placeholder="Ex: 11-000000000" required />
                            </div>
                            <div class="col-md-6">
                                <label for="inputZip" class="form-label">Email</label>
                                <input type="email" onChange={handleChange} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" placeholder="Ex: email@email.com"   name="cemail" class="form-control" />
                            </div>
                            <div class="col-md-6">
                                <label for="inputZip" class="form-label">Senha</label>
                                <input onChange={handleChange} autocomplete="new-password"  pattern=".{5,}"  name="csenha" type={visualizar ? "text" :"password"} class="form-control" />
                            </div>
                            <div className="col-sm visualizar-editar">
                         <label type="button" onClick={() => visu ()}><i class="fas fa-eye"></i></label>
                            </div>
                            <ModalFooter>
                                { carregando ? <button class="btn btn-secondary " type="button" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...</button>
                                : <button className=" btn btn-primary  " type="submit">Cadastrar</button>}
                                <button  onClick={() => abrirFecharModalIncluir()}  className=" btn  btn-danger" type="button">Cancelar</button>
                            </ModalFooter>
                        </form>
                    </ModalBody>
                  
                </Modal>

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
                                <select onChange={handleChange}  name="csetor" type="text" class="form-select" value={usuarioSelecionado && usuarioSelecionado.csetor}>
                                <option>Operacional</option>
                                <option>Facilites</option>
                                <option>Rh</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label  class="form-label">Cliente</label>
                                
                                <select onChange={handleChange} name="cliente" class="form-select" value={usuarioSelecionado && usuarioSelecionado.cliente}  >
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
                                <input onChange={handleChange}  name="csenha" type={visualizar ? "text" : "password"} class="form-control" value={usuarioSelecionado && usuarioSelecionado.csenha}/>
                                <label className="visualizar" type="button" onClick={() => visu ()}><i class="fas fa-eye"></i></label>

                            </div>
                         
                        
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        {   carregando ? <button class="btn btn-secondary " type="button" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...</button>
                        :   <button onClick={() => UsuarioPut()} class="btn btn-primary " type="button">Editar</button>}
                        <button  onClick={() => abrirFecharModalEditar()}  className=" btn  btn-danger " type="button">Cancelar</button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalExcluir}>
                <label onClick={abrirFecharModalExcluir} class=" fechar-modal "><i class="modal-fechar fs-2 fas fa-times-circle"></i></label>
                    <ModalHeader>Excluir Usuário</ModalHeader>                    
                    <ModalBody>
                    <div className="mensagem-tela">
                        { msg === 'Sucesso' && <p className="  mb-2 text-center  bg-success  text-white "><i class="fas fa-check-circle m-2"></i>Usuario excluido com sucesso!</p>}
                        {msg === 'Erro' && <p className="p-1 text-center  lert alert-danger color-weigth " ><i class="fas fa-exclamation-triangle "></i> Não foi possível excluido o usuario.</p>}
                    </div>
                    <p>Tem certeza que deseja excluir</p>
                    </ModalBody>
                    <ModalFooter>
                        { carregando ?<button class="btn btn-secondary " type="button" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...</button>
                         :   <button onClick={() => UsuarioDelete()} className=" btn-danger btn btn-primary  " type="button">Excluir</button>}
                        <button  onClick={() => abrirFecharModalExcluir()}  className=" btn  btn-darger" type="button">Cancelar</button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
        </>
    )
}

export default Usuarios;