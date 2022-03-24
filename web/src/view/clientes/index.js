import {React, useState, useEffect} from "react";
import Navbar from "../../components/navbar";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import './cliente.css';
import '../../view/index.css';
import Api from '../../components/api';
import axios from "axios";
import { Redirect } from "react-router";
import Cookies from "js-cookie";
import Logo from "../../components/img/Grupo-14.svg";

function Clientes(){

    const [data, setData] = useState([]);
    const [modalIncluir, setModalIncluir] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalExcluir, setModalExcluir] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [msg, setMsg] = useState(false);
    const [carregando, setCarregando] = useState();
    
   const campos =({
    representante: '',
    departamento: '',
    telefone:'',
    email:''
   })
    const [departamentoSelecionado, setDepartamentoSelecionado] = useState(campos)

    const selecionarUsuario = (item, opcao) => {
        setDepartamentoSelecionado(item);
        (opcao === "Editar") ? abrirFecharModalEditar() : abrirFecharModalExcluir();
        
    }

    const abrirFecharModalIncluir = () => {
        setMsg(false);
        setModalIncluir(!modalIncluir);
        setDepartamentoSelecionado(campos);
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
        setDepartamentoSelecionado({
            ...departamentoSelecionado, [name]: value
        });
    }

    const departamentoGet = async () => {
        await axios.get(Api + "/clientes")
        .then(resultado => {
            setData(resultado.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const departamentoPost = async (e) => {
        e.preventDefault();
        if(!departamentoSelecionado.representante || !departamentoSelecionado.departamento || !departamentoSelecionado.telefone  || !departamentoSelecionado.email){
            setMsg("Vazio");
            setTimeout(() => {
                setMsg(false);
            }, 2000)
        }else{
            setCarregando(1)
            await axios.post(Api + "/cliente", departamentoSelecionado)
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

    const DepartamentoPut = async () => {
        setCarregando(1)
        await axios.put(Api + "/cliente/" + departamentoSelecionado.clienteId, departamentoSelecionado)
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

    const DepartamentoDelete = async () => {
        setCarregando(1)
        await axios.delete(Api + "/cliente/" + departamentoSelecionado.clienteId).then(resultado => {
            setData(data.filter(departamentoSelecionado => departamentoSelecionado.clienteId !== resultado.data))
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
            departamentoGet();
            setUpdateData(false)
        }
    }, [updateData]);
    
    function myFunction() {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            document.getElementById("topo1").className = "voltaTopo";
        }else {
            document.getElementById("topo1").className = "voltaTopo2";
          }
        }

    return(
        <>
             {Cookies.get('csetor') == 'Operacional' ? <Redirect to='/' /> : ''}
             <div className="container-fluid d-flex" id="topo">
             <Navbar />
            <div className="main">
                <h3 className="text-center mt-2">CLIENTES</h3>        
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className="btn btn-cliente btn-sm btn-lg" data-toggle="modal" data-target=".bd-example-modal-lg" onClick={() => abrirFecharModalIncluir()} ><nobr>Novo</nobr></button>
                </div>
                    <div className=" main2 mx-auto shadow-sm rounded">
                        <table className=" form table table-hover   shadow-sm  mb-3 bg-body rounded text-center">
                            <tbody >
                                <tr className="bg-info topo-tb-estoque ">
                                    <th className="bg-info"><nobr>GESTOR RESPONSÁVEL</nobr></th>
                                    <th className="bg-info"><nobr>CLIENTE</nobr></th>
                                    <th className="bg-info"><nobr>TELEFONE</nobr></th>
                                    <th className="bg-info"><nobr>EMAIL</nobr></th>
                                    <th className="bg-info"><nobr>AÇÕES</nobr></th>

                                </tr>  
                                {data.map(item => (
                                        <>
                                            <tr key={item.departamentoId}>
                                                <td><nobr>{item.representante}</nobr></td>
                                                <td><nobr>{item.departamento}</nobr></td>
                                                <td><nobr>{item.telefone}</nobr></td>
                                                <td><nobr>{item.email}</nobr>&nbsp;&nbsp;</td>
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
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-novo2 btn-home btn-sm btn-lg" data-toggle="modal" data-target=".bd-example-modal-lg" onClick={() => abrirFecharModalIncluir()} ><nobr>Novo</nobr></button>
                    </div>
                    <a href="#topo" id="topo1" className="text-decoration-none text-light" title="Voltar ao topo"><i class="fas fa-arrow-up"></i></a>                  
                <Modal isOpen={modalIncluir}>
                <label onClick={abrirFecharModalIncluir} class=" fechar-modal mb-5"><i class="modal-fechar fs-2 fas fa-times-circle"></i></label>
                    <ModalHeader>Novo Cliente</ModalHeader>
                    <div className="mensagem-tela">
                        {msg === 'Sucesso' && <p className=" p-1 mensagem alert alert-success"><i class="fas fa-check-circle "></i>&#160;Cadsatro realizado com sucesso!</p>}  
                        {msg === 'Erro' && <p className=" mensagem rounded p-1 lert alert-danger " ><i class="fas fa-exclamation-triangle "></i> &#160;Verifique se os dados estão corretos.</p>}
                        {msg === 'Vazio' && <p className="text-center p-1 my-0 alert alert-warning" ><i class="fas fa-exclamation-triangle "></i> &#160;Digite os campos obrigatórios para concluir.</p>}
                    </div>
                    <ModalBody>
                        <form class="form row g-3  border-end-0" onSubmit={departamentoPost} >
                            <div class="input-topo col-md-6">
                                <label for="inputEmail4" class="form-label">Gestor responsável</label>
                                <input onChange={handleChange} name="representante" type="text" class="form-control" required/>
                            </div>
                            <div class="col-md-6 input-topo">
                                <label class="form-label">Cliente</label>
                                <input onChange={handleChange} name="departamento" type="text" class="form-control" required  />
                            </div>
                            <div class="col-sm">
                                <label for="inputZip" class="form-label">Telefone</label>
                                <input onChange={handleChange} name="telefone" type="tel" class="form-control"   pattern="[(]{0,1}[0-9]{2,3}[)]{0,1}[-]{0,2}[0-9,-]{8,10}" placeholder="Ex: 11-000000000"required />
                            </div>
                            <div class="col-sm">
                                <label for="inputZip" class="form-label">Email</label>
                               
                                <input onChange={handleChange} name="email" type="email" className="form-control"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" placeholder="Ex: email@email.com" required/>
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
                    <ModalHeader>Editar Cliente</ModalHeader>
                    <div className="mensagem-tela">
                        {msg === 'Sucesso' && <p className=" p-1 text-center alert alert-success"><i class="fas fa-check-circle "></i>&#160;Atualizado com sucesso!</p>}  
                        {msg === 'Erro' && <p className=" mensagem rounded p-1 lert alert-danger " ><i class="fas fa-exclamation-triangle "></i> &#160;Verifique se os dados estão corretos.</p>}
                        {msg === 'Vazio' && <p className="mensagem p-1 my-0 alert alert-warning" ><i class="fas fa-exclamation-triangle "></i> &#160;Digite os campos obrigatórios para concluir.</p>}
                    </div>
                    <ModalBody>
                        <form class="form row g-3  border-end-0" >
                            <div class="input-topo col-md-6">
                                <label for="inputEmail4" class="form-label">Representante</label>
                                <input onChange={handleChange}  name="representante" type="text" class="form-control"  value={departamentoSelecionado && departamentoSelecionado.representante} />
                            </div>
                            <div class="col-md-6 input-topo">
                                <label class="form-label">Setor</label>
                                <input onChange={handleChange}  name="departamento" type="text" class="form-control" value={departamentoSelecionado && departamentoSelecionado.departamento}/>
                            </div>
                            <div class="col-sm">
                                <label for="inputZip" class="form-label">Telefone</label>
                                <input onChange={handleChange}  name="telefone" type="tel" class="form-control" value={departamentoSelecionado && departamentoSelecionado.telefone}/>
                            </div>
                            <div class="col-sm">
                                <label for="inputZip" class="form-label">Email</label>
                                <input onChange={handleChange}  name="email" type="email" class="form-control" value={departamentoSelecionado && departamentoSelecionado.email}/>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        {   carregando ? <button class="btn btn-secondary " type="button" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...</button>
                        :   <button onClick={() => DepartamentoPut()} class="btn btn-primary " type="button">Editar</button>}
                        <button  onClick={() => abrirFecharModalEditar()}  className=" btn  btn-danger" type="button">Cancelar</button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={modalExcluir}>
                <label onClick={abrirFecharModalExcluir} class=" fechar-modal "><i class="modal-fechar fs-2 fas fa-times-circle"></i></label>
                    <ModalHeader>Excluir Cliente</ModalHeader>                    
                    <ModalBody>
                    <div className="mensagem-tela">
                        {msg === 'Sucesso' && <p className=" p-1 text-center alert alert-success"><i class="fas fa-check-circle "></i>&#160;Excluido com sucesso!</p>}  
                        {msg === 'Erro' && <p className="  rounded p-1 lert alert-danger " ><i class="fas fa-exclamation-triangle "></i> &#160;Não foi possível excluir.</p>}
                    </div>
                    <p>Tem certeza que deseja excluir</p>
                    </ModalBody>
                    <ModalFooter>
                        { carregando ?<button class="btn btn-secondary " type="button" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...</button>
                         :   <button onClick={() => DepartamentoDelete()} className=" btn-danger btn   " type="button">Excluir</button>}
                        <button  onClick={() => abrirFecharModalExcluir()}  className=" btn  btn-primary" type="button">Cancelar</button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
        </>
    )
}

export default Clientes;